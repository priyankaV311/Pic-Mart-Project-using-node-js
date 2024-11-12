const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    ACCESS_TOKEN_PRIVATE_KEY,
    REFRESH_TOKEN_PRIVATE_KEY,
} = require('../config');

const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('email and password are required');
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).send('user is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            user: newUser,
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('email and password are required');
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).send('user is not registered');
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(403).send('Password is incorrect');
        }

        const accessToken = await generateAccessToken({
            _id: user._id,
        });

        const refreshToken = await generateRefreshToken({
            _id: user._id,
        });

        return res.json({
            accessToken: accessToken,
            refreshToken,
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const refreshAccessTokenController = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(403).send('Refresh token is required');
        }

        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_PRIVATE_KEY);

        const _id = decoded._id;
        const accessToken = await generateAccessToken({ _id });    

        return res.status(201).json({ accessToken });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

//internal functions
const generateAccessToken = async (data) => {
    try {
        const token = jwt.sign(data, ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '60s',
        });

        return token;
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const generateRefreshToken = (data) => {
    try {
        const refreshToken = jwt.sign(data, REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y',
        });

        return refreshToken;
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController,
};
