const userService = require('../services/userService');

exports.findById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).send('User not found');
    }
};

exports.update = async (req, res) => {
    try {
        const updatedUser = await userService.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};