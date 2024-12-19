const User = require('../models/userModel');

// ..............Get Single User Profile............
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// .........Get All User Profiles.............
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//.................. Update Single User...............
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user, req.body, { new: true, runValidators: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//........................ Delete Single User.......................
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProfile, getAllUsers, updateUser, deleteUser };
