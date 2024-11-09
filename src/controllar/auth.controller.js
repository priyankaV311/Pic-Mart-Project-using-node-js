
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
}

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
            email: user.email,
        });



        return res.json({
            accessToken: accessToken,
        });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


const generateAccessToken = async (data) => {
    try {
        const token = jwt.sign(data, 'randomString', {
            expiresIn: '60s',
        });



        return token;
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports = {
    signupController,
    loginController,
};
