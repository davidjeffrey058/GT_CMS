const User = require('../models/User');
const bcrypt = require('bcrypt');

// Login
exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('incorrect password')
  }

  throw Error('incorrect email')

  // const token = jwt.sign(
  //   {
  //     id: user._id,
  //     role: user.role
  //   },
  //   JWT_SECRET,
  //   { expiresIn: '1d' }
  // );

  // return {
  //   token,
  //   user: {
  //     id: user._id,
  //     username: user.username,
  //     role: user.role
  //   }
  // };
};