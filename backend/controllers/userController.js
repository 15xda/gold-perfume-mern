const User = require('../models/user');
const returnSafeUserData = require('../utils/returnSafeUserData');

const updateUserInfo = async (req, res) => {

    try {
        const updateData = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({message: 'Something Went Wrong'})
        }

        for (let key in updateData) user[key] = updateData[key];

        await user.save();
        return res.status(200).json({message: 'Information Updated', user: returnSafeUserData(user)})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

const addAddress = async (req, res) => {
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
}
  
const deleteAddress = async (req, res) => {

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
}


module.exports = {
    updateUserInfo,
    addAddress,
    deleteAddress,
}