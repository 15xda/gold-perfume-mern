const express = require('express');
const client = require('./db');
const cors = require('cors');
const User = require('./models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const productDetails = require('./models/productDetailes');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ 
    origin: "http://localhost:5174", 
    credentials: true 
}));

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

app.get('/', (req, res) => {
    res.send('Сервер Gold Perfume.');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({message: 'Пароли не совпадают.'})
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует.'})
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

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = user && await bcrypt.compare(password, user.password)

        if ( !user || !isMatch ) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const accessToken = jwt.sign({user: user._id}, jwtSecretKey, {expiresIn: '1h'})
        const refreshToken = jwt.sign({user: user._id}, jwtSecretKey, {expiresIn: '31d'});
        
        res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, 
                sameSite: 'Lax',
                path: '/', 
                maxAge: 31 * 24 * 60 * 60 * 1000 // 31 days
            })
            .status(200)
            .json({  
                message: 'Вход выполнен успешно',
                accessToken,
                userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                favourites: user.favourites,
                cart: user.cart,
                }
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
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                favourites: user.favourites,
                cart: user.cart,
            }
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

        const mailOptions = {
            from: 'pepsiman2001val@gmail.com',
            to: 'adovudzoda@gmail.com',
            subject: 'Hello from Nodemailer',
            text: 'Follow the link to reset your password: http://localhost:5174/reset-password?token=' + resetToken,
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

        const response = await fetch(`${apiUrlMS}?search=${encodeURI(term)}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${apiKeyMS}`,
                "Content-Type": "application/json" 
            }})
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const matchedProductRatings = await productDetails.find({productId: data.rows.map(product => product.id)});
        
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
        res.status(200).json({apiData: data, productComments: productCommentsData});

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

app.post('/add-to-favorite', async (req, res) => {
    
    const {itemId, userId} = req.body;
    console.log(req.body)

    try {
        const user = await User.findById(userId);

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


app.post('/add-to-cart', async (req, res) => {
    
    const {itemId, userId} = req.body;

    try {
        const user = await User.findById(userId);
        const userHasItem = user.cart.some(item => item.itemId === itemId)

        console.log(userHasItem)


        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        if (userHasItem) {

            user.cart = user.cart.map(item => item.itemId === itemId ? {...item, quantity: item.quantity + 1} : item)
            
            await user.save();
            return res.status(200).json({message: 'Товар в корзине', cart: user.cart});
        }
        
        user.cart.push({itemId, quantity: 1})
        await user.save();

        res.status(200).json({message: 'Товар добавлен в корзину', cart: user.cart});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Внутренняя ошибка сервера'});
    
    }
})

app.put('/update-cart', async (req, res) => {
    try {
        const { itemId, userId, quantity } = req.body;
        const user = await User.findById(userId);

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

app.put('/delete-from-cart', async (req, res) => {
    try {
        const {itemId, userId} = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' }); 
        }

        const itemIndex = user.cart.findIndex(item => item.itemId === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Товар не найден в базе данных' });
        }

        user.cart = user.cart.filter(item => item.itemId !== itemId);
        user.save();
        res.status(200).json({message: 'Товар удален из корзины', cart: user.cart})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
})

app.post('/rating', async (req, res) => {

    try {

        console.log(req.body)

        const {userId, userName, productId, rating, comment} = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const product = await productDetails.findOne({productId});

        if (!product) {
            const product = new productDetails({productId: productId, productRating: {userId: userId, userName: userName, rating: rating, comment: comment, date: Date.now()}});
            await product.save();
            return res.status(200).json({message: 'Оценка успешно добавлена'})
        }

        product.productRating.push({userId: userId, userName: userName, rating: rating, comment: comment, date: Date.now()});
        await product.save();

        return res.status(200).json({message: 'Оценка успешно добавлена'})

    } catch (error) {
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
        console.error(error)
    }
});

app.post('/delete-rating', async (req, res) => {
    try {
        const {userId, productId} = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const product = await productDetails.findOne({productId});

        if (!product) {
            return res.status(404).json({message: 'Продукт не найден'});
        }

        product.productRating = product.productRating.filter(comment => comment.userId !== userId);
        await product.save();

        return res.status(200).json({message: 'Оценка успешно удалена'})
    } catch (error) {
        return res.status(500).json({message: 'Внутренняя ошибка сервера'});
    }
})



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server runnig on port: ${port}`)
})