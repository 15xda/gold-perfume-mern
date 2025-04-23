const express = require('express');
const cors = require('cors');
const User = require('./models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const productDetails = require('./models/productDetailes');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(cors({ 
    origin: "http://localhost:5174", 
    credentials: true 
}));


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 7,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(423).json({
            success: false,
            message: 'Вы слишком часто выполняете действия. Подождите немного и попробуйте снова.',
        });
    },
})




const jwtSecretKey = process.env.JWT_SECRET_KEY;
const apiUrlMS = process.env.MOYSKLAD_API_ENDPOINT;
const apiKeyMS = process.env.MOYSKLAD_SECRET_KEY; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pepsiman2001val@gmail.com',
      pass: 'kxcn dnwq punk hoio'
    }
});

const checkCreds = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No valid Authorization header');
        return res.status(401).json({ message: 'Требуется авторизация' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecretKey)
        req.userId = decoded.user;

    } catch (error) {
        
    }

    next();
};


app.get('/', (req, res) => {
    res.send('Сервер Gold Perfume.');
});


app.post('/register', apiLimiter, async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({message: 'Пароли не совпадают.'})
        }

        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({message: 'Регистрация не удалась. Возможно, email уже используется.'})
        }
        
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword})
        await user.save();
        res.status(200).json({message: 'Пользователь успешно создан.'})

    } catch (error) {
        console.log('Registration Error: ', error)
        res.status(500).json({ message: "Ошибка при регистрации пользователя" });
    }
})

const returnSafeData = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    telephone: user.telephone,
    addresses: user.addresses,
    orders: user.orders,
    favourites: user.favourites,
    cart: user.cart,
})

const returnSafeMoyskladData = (data) => {

    if (!data || typeof data !== 'object') return null;
    
    const dataList = Array.isArray(data) ? data : [data];

    const filteredData = dataList.map(product => ({
        id: product.id, 
        name: product.name, 
        salePrices: product.salePrices?.map(price => ({
            name: price.priceType?.name,
            value: (price.value / 100).toFixed(2),
        })) || [],
    }))

    return Array.isArray(data) ? filteredData : filteredData[0];
    
}

app.post('/login', apiLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user)

        if (!user || !user.password) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const accessToken = jwt.sign({ user: user._id }, jwtSecretKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user: user._id }, jwtSecretKey, { expiresIn: '31d' });

        res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                path: '/',
                maxAge: 31 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
                message: 'Вход выполнен успешно',
                accessToken,
                userData: returnSafeData(user)
            });

    } catch (error) {
        console.log('Login Error: ', error)
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});


const checkRefreshToken = (req, res, next) => {
    
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
        return res.status(401).json({ message: "Токен обновления не обнаружен." });
    }

    jwt.verify(refreshToken, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Недействительный токен обновления." });
        }
        req.user = decoded;
        next();
    });
};




app.get('/refresh-token', checkRefreshToken, async (req, res) => {

    try {
        const user = await User.findById(req.user.user);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const accessToken = jwt.sign({ user: user._id }, jwtSecretKey, { expiresIn: '1h' });

        return res.json({
            accessToken: accessToken,
            userData: returnSafeData(user)
        });

    } catch (error) {
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
});

const generateResetToken = (email) => {
    return jwt.sign({ email }, jwtSecretKey, { expiresIn: '1h' });
}


app.post('/reset-password', async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email: email}); 
        console.log(user.passwordReset.resetTokenExpiration)

        if (!user) {
            return;
        }


        const resetToken = generateResetToken(email);
        const resetTokenExpiration = Date.now() + 3600000;
        const resetTokenUsed = false;
        const resetTokenCreatedAt = Date.now();
        const utcString = new Date(Date.now()).toUTCString();

        const mailOptions = {
            from: 'pepsiman2001val@gmail.com',
            to: email,
            subject: 'Сброс пароля - Gold Perfume',
            html: `
                <div style="background-color:#1A1A1A; padding:30px; font-family:Arial, sans-serif; max-width:500px; margin:0 auto;">
                    <div style="text-align:center; margin-bottom:20px;">
                        <h2 style="color:#DAAC61; margin:0 0 15px;">Сброс пароля</h2>
                        <p style="color:#fff; font-size:14px; margin:0 0 20px;">Запрос создан: ${utcString}</p>
                        <a href="http://localhost:5174/reset-password?token=${resetToken}"
                           style="display:inline-block; background-color:#DAAC61; color:#000; font-weight:bold; padding:12px 25px; text-decoration:none;">
                           Сбросить пароль
                        </a>
                        <p style="color:#999; font-size:12px; margin-top:20px; border-top:1px solid #333; padding-top:15px;">
                            © Gold Perfume ${new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error:', error);
            } else {
              console.log('Email sent:', info.response);
            }
        });

        user.passwordReset = {resetToken, resetTokenExpiration, resetTokenUsed, resetTokenCreatedAt};
        await user.save();
        res.status(200).json({message: 'Токен для сброса пароля отправлен на email'});
        
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({message: 'Ошибка при отправке письма сброса пароля'});
    }
})

app.post('/update-password', apiLimiter, checkCreds, async (req, res) => {


    try {
        const {currentPassword, newPassword, confirmPassword} = req.body;
        const user = await User.findById(req.userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        if (!isMatch) {
            return res.status(400).json({message: 'Текущий пароль неверный'});
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({message: 'Пароли не совпадают'});
        }

        if (newPassword === user.password) {
            return res.status(400).json({message: 'Новый пароль не может совпадать с текущим паролем'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({message: 'Пароль успешно обновлен'});

    }
    catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({message: 'Ошибка при обновлении пароля'});
    }
})

app.patch('/update-user-info', apiLimiter, checkCreds, async (req, res) => {

    try {
        const updateData = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({message: 'Something Went Wrong'})
        }

        for (let key in updateData) user[key] = updateData[key];

        await user.save();
        return res.status(200).json({message: 'Information Updated', user: returnSafeData(user)})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

app.post('/reset-password/confirm', async (req, res) => {
    const {token, password} = req.body;
    try {
        const decodedToken = jwt.verify(token, jwtSecretKey);
        const email = decodedToken.email;

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        if (user.passwordReset.resetToken !== token) {
            return res.status(400).json({message: 'Недействительный токен сброса'});
        }
        

        if (user.passwordReset.resetTokenUsed) {
            return res.status(400).json({message: 'Токен сброса уже использован'})
        }
        if (user.passwordReset.resetTokenExpiration < Date.now()) {
            return res.status(400).json({message: 'Срок действия токена сброса истек'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.passwordReset.resetTokenUsed = true;
        await user.save();

        res.status(200).json({message: 'Пароль успешно сброшен'});

    } catch (error) {
        console.log(error)
    }
})


app.get('/search', async(req, res) => {
    
    try {
        const {term}  = req.query;

        const response = await fetch(`${apiUrlMS}?search=${encodeURI(term)} `, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKeyMS}`,
                "Content-Type": "application/json" 
            }})
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const safeDataMS = returnSafeMoyskladData(data.rows)

        const matchedProductRatings = await productDetails.find({productId: safeDataMS.map(product => product.id)});
        
        const combinedData = data.rows.map(product => {
            const matchingProduct = matchedProductRatings.find(rating => rating.productId === product.id)

            // const averageRating = matchingProduct && matchingProduct.productRating.length > 0 
            //     ? (matchingProduct.productRating.reduce((acc, rating) => acc + rating.rating, 0) / matchingProduct.productRating.length).toString().slice(0, 3) 
            //     : 0;

            return {
                ...product, 
                ratingsFromDatabase: matchingProduct ? matchingProduct.productRating : []
            };
        })

        return res.status(200).json(combinedData)
        

    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({error: 'Ошибка API MoySklad'})
    }
    
})


app.get('/product/:productId', async(req, res) => {

    const {productId} = req.params;

    try {
        
        const response = await fetch(`${apiUrlMS}/${productId}`, {
            method: 'GET',
            headers: {
                "Authorization" : `Bearer ${apiKeyMS}`,
                "Content-type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to Find The Product With Status: ${response.status}`)
        }

        const productComments = await productDetails.find({productId: productId});
        
        const data = await response.json();
        const productCommentsData = productComments.map(comment => comment.productRating).flat();

        if (productCommentsData.length > 10) productCommentsData.slice(0, 10);
        

        res.status(200).json({product: {
            ...returnSafeMoyskladData(data),
            productComments: productCommentsData
        }})


    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({error: 'Ошибка API MoySklad'})
    }

})

app.post('/product/batch', async (req, res) => {
    try {
        const { productIds } = req.body;
        const returnData = [];

        const productIdsSet = new Set(productIds);

        const response = await fetch(`${apiUrlMS}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${apiKeyMS}`,
                "Content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load products by batch IDs');
        }

        const data = await response.json();

        // Filter products based on requested IDs
        const filteredProducts = data.rows.filter(product => productIdsSet.has(product.id));

        // Fetch ratings from database
        const productRatings = await productDetails.find({
            productId: filteredProducts.map(product => product.id)
        });

        // Merge ratings into product objects
        const combinedData = filteredProducts.map(product => {
            const matchingProduct = productRatings.find(rating => rating.productId === product.id);

            return {
                ...product,
                ratingsFromDatabase: matchingProduct ? matchingProduct.productRating : []
            };
        });

        res.json(combinedData);

    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: 'Ошибка API MoySklad' });
    }
});



app.post('/logout', (req, res) => {

    console.log(`Logout Log: ${req.body}`)
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
    res.json({message: 'Выход выполнен успешно'});
});


app.post('/add-to-favorite', checkCreds, async (req, res) => {
    
    const {itemId} = req.body;

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        if (user.favourites.includes(itemId)) {

            user.favourites = user.favourites.filter(fav => fav !== itemId)
            await user.save();
            return res.status(200).json({message: 'Удалено из избранного', favourites: user.favourites});
        }
        user.favourites.push(itemId);
        await user.save();

        res.status(200).json({message: 'Товар добавлен в избранное', favourites: user.favourites});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Внутренняя ошибка сервера'});
    
    }
})


app.post('/add-to-cart', checkCreds, async (req, res) => {
    
    const {itemId, quantity} = req.body;

    try {
        const user = await User.findById(req.userId);
        const userHasItem = user.cart.some(item => item.itemId === itemId)

        console.log(userHasItem)


        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        if (userHasItem) {

            user.cart = user.cart.map(item => item.itemId === itemId ? {...item, quantity: item.quantity + quantity} : item)
            
            await user.save();
            return res.status(200).json({cart: user.cart});
        }
        
        user.cart.push({itemId, quantity: quantity})
        await user.save();

        res.status(200).json({message: 'Товар добавлен в корзину', cart: user.cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Внутренняя ошибка сервера'});
    
    }
})

app.put('/update-cart', checkCreds, async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }

        const itemIndex = user.cart.findIndex(item => item.itemId === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Товар не найден в базе данных' });
        }

        if (quantity > 0) {
            user.cart[itemIndex].quantity = quantity;
        } else {
            user.cart = user.cart.filter(item => item.itemId !== itemId);
        }

        await user.save();
        return res.status(200).json({message: 'Обновлено', cart: user.cart}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

app.put('/delete-from-cart', checkCreds, async (req, res) => {
    try {
        const {itemId} = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }

        const itemIndex = user.cart.findIndex(item => item.itemId === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Товар не найден в базе данных' });
        }

        user.cart = user.cart.filter(item => item.itemId !== itemId);
        await user.save();
        res.status(200).json({message: 'Товар удален из корзины', cart: user.cart})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
})

app.post('/rating', checkCreds, async (req, res) => {

    try {

        console.log(req.body)

        const {productId, rating, comment} = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const product = await productDetails.findOne({productId});

        if (!product) {
            const product = new productDetails({productId: productId, productRating: {userId: user.id, userName: user.name, rating: rating, comment: comment, date: Date.now()}});
            await product.save();
            return res.status(200).json({message: 'Оценка успешно добавлена'})
        }

        product.productRating.push({userId: user.id, userName: user.name, rating: rating, comment: comment, date: Date.now()});
        await product.save();

        return res.status(200).json({message: 'Оценка успешно добавлена'})

    } catch (error) {
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        console.error(error)
    }
});

app.post('/delete-rating', checkCreds, async (req, res) => {
    try {
        const {productId} = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const product = await productDetails.findOne({productId});

        if (!product) {
            return res.status(404).json({message: 'Продукт не найден'});
        }

        product.productRating = product.productRating.filter(comment => comment.userId !== user.id);
        await product.save();

        return res.status(200).json({message: 'Оценка успешно удалена'})
    } catch (error) {
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
})


app.post('/add-address', checkCreds, async (req, res) => {
    const { address } = req.body;
  
    try {
      if (!address) {
        return res.status(401).json({ message: 'Address Must Not Be Empty' });
      }
  
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid User' });
      }
  
      const addressAlready = user.addresses.some(saved => saved === address);
  
      if (addressAlready) {
        return res.status(401).json({ message: 'Address Already Saved' });
      }
  
      user.addresses.push(address);
      await user.save();
  
      return res.status(200).json({ message: 'Address added successfully', addresses: user.addresses });
  
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
app.post('/delete-address', checkCreds, async (req, res) => {

    const {address} = req.body;

    try {

        const user = await User.findById(req.userId);
        if (!user) return res.status(401).json({message: 'No User Found'})

        user.addresses = user.addresses.filter(savedAddress => savedAddress !== address);
        await user.save();
        return res.status(200).json({message: 'Address Removed', addresses: user.addresses})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server error'})
    }
})


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server runnig on port: ${port}`)
})