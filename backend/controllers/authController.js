const User = require('../models/user');
const EmailConfirmations = require('../models/emailConfirmations');
const authService = require('../services/authSevice');
const emailService = require('../services/emailService');
const returnSafeUserData = require('../utils/returnSafeUserData');

const isProduction = process.env.NODE_ENV === 'production';


// Register new user
const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({message: 'Пароли не совпадают.'});
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'Регистрация не удалась. Возможно, email уже используется.'});
        }
        
        const hashedPassword = await authService.hashPassword(password);
        const user = new User({name, email, password: hashedPassword});
        await user.save();
        
        res.status(200).json({message: 'Пользователь успешно создан.'});
    } catch (error) {
        console.log('Registration Error: ', error);
        res.status(500).json({ message: "Ошибка при регистрации пользователя" });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.password) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const isMatch = await authService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Неверные учетные данные" });
        }

        const accessToken = authService.generateAccessToken(user._id);
        const refreshToken = authService.generateRefreshToken(user._id);

        res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: isProduction,
                sameSite: 'None',
                path: '/',
                maxAge: 31 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
                message: 'Вход выполнен успешно',
                accessToken,
                userData: returnSafeUserData(user)
            });
    } catch (error) {
        console.log('Login Error: ', error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

// Refresh token
const refreshToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.user);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const accessToken = authService.generateAccessToken(user._id);

        return res.json({
            accessToken: accessToken,
            userData: returnSafeUserData(user)
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({email: email});
        
        if (!user) {
            // For security reasons, still return success even if user not found
            return res.status(200).json({message: 'Если указанный email зарегистрирован, инструкции по сбросу пароля были отправлены'});
        }

        const resetToken = authService.generateResetToken(email);
        const resetTokenExpiration = Date.now() + 3600000;

        try {
            await emailService.sendPasswordResetEmail(email, resetToken);
            
            user.passwordReset = {
                resetToken,
                resetTokenExpiration,
                resetTokenUsed: false,
                resetTokenCreatedAt: Date.now()
            };
            
            await user.save();
            
            res.status(200).json({message: 'Токен для сброса пароля отправлен на email'});
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(500).json({message: 'Ошибка при отправке письма сброса пароля'});
        }
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({message: 'Ошибка при сбросе пароля'});
    }
};

// Confirm password reset
const confirmPasswordReset = async (req, res) => {
    const { token, password } = req.body;
    
    try {
        const decodedToken = authService.verifyToken(token);
        const email = decodedToken.email;

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        if (user.passwordReset.resetToken !== token) {
            return res.status(400).json({message: 'Недействительный токен сброса'});
        }

        if (user.passwordReset.resetTokenUsed) {
            return res.status(400).json({message: 'Токен сброса уже использован'});
        }
        
        if (user.passwordReset.resetTokenExpiration < Date.now()) {
            return res.status(400).json({message: 'Срок действия токена сброса истек'});
        }

        const hashedPassword = await authService.hashPassword(password);
        user.password = hashedPassword;
        user.passwordReset.resetTokenUsed = true;
        await user.save();

        res.status(200).json({message: 'Пароль успешно сброшен'});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Ошибка при сбросе пароля'});
    }
};

const requestEmailConfirmation = async (req, res) => {
    const { email } = req.body;
    
    // Validate email
    if (!email) {
        return res.status(400).json({ message: 'Email обязателен.' });
    }
    
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }
        
        const token = authService.generateResetToken(email);
        
        // Send the confirmation email and await the result
        await emailService.sendConfirmEmailLink(email, token);

        const emailConfirmationRecord = new EmailConfirmations({
            email: email,
            token: token,
        })

        await emailConfirmationRecord.save();
        
        return res.status(200).json({ message: 'Пожалуйста, проверьте свой Email ссылки для подтверждения. Не забудьте папку «СПАМ»' });
    } catch (error) {
        console.error('Error in requestEmailConfirmation:', error);
        return res.status(500).json({ 
            message: 'Ошибка при отправке электронного письма для подтверждения'
        });
    }
};

const confirmEmailVerification = async (req, res) => {
    const { token } = req.body;
  
    try {
      const tokenInDatabase = await EmailConfirmations.findOne({ token });
  
      if (!tokenInDatabase) {
        return res.status(404).json({ message: 'Недействительная или просроченная ссылка' });
      }
  
      if (tokenInDatabase.used) {
        return res.status(200).json({ message: 'Email уже подтвержден!' });
      }
  
      let decodedToken;
      try {
        decodedToken = authService.verifyToken(token);
      } catch (err) {
        return res.status(400).json({ message: 'Недействительный или просроченный токен' });
      }
  
      const email = decodedToken.email;
      const user = await User.findOne({ email });
  
      if (!email || !user) {
        return res.status(404).json({ message: 'Что-то пошло не так.' });
      }
  
      user.isVerified = true;
      tokenInDatabase.used = true;
      tokenInDatabase.usedAt = Date.now();
  
      await user.save();
      await tokenInDatabase.save();
  
      return res.status(200).json({ message: 'Email успешно подтвержден!' });
  
    } catch (error) {
      console.error('Email verification error:', error);
      return res.status(500).json({ message: 'Ошибка подтверждения электронной почты' });
    }
  };
  


// Logout
const logout = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
    res.json({message: 'Выход выполнен успешно'});
};

// Update password
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'});
        }

        const isMatch = await authService.comparePassword(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Текущий пароль неверный'});
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({message: 'Пароли не совпадают'});
        }

        const hashedPassword = await authService.hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        
        res.status(200).json({message: 'Пароль успешно обновлен'});
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({message: 'Ошибка при обновлении пароля'});
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    requestPasswordReset,
    requestEmailConfirmation,
    confirmEmailVerification,
    confirmPasswordReset,
    logout,
    updatePassword
};