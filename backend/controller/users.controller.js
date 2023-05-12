const User = require('../models/users.model.js');

// Get user by ID
async function getUserById(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Update user
async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getUserById, updateUser };
