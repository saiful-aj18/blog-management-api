const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const userObject = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    return jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: '60d' });
}

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ success: false, error: 'Please provide name, email and password' });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, error: 'User already exists' });
            }

            const user =  await User.create({ name, email, password });

            if (user) {
                res.status(201).json({
                    success: true,
                    data: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        token: generateToken(user)
                    }
                })
            }
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }


    async login(req, res) {
        const { email, password } = req.body;

        try {
        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user),
            },
        });
        } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        }
    }


     async getMe(req, res) {
        res.status(200).json({
            success: true,
            data: req.user,
        });
    }

}


module.exports = new AuthController();