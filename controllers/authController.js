const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// ...........Generate JWT................
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};



// ....................User Registration......................
const registerUser = async (req, res) => {
    const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;

    try {
        const userExists = await User.findOne({ NIDNumber });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// .....................User Login........................
const loginUser = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
