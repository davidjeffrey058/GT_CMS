const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

 exports.handleErrors = (err) => {
    // console.log(err.message, err.code)
    let errors = { email: '', password: ''};

    // invalid doc id
    if(err.message.includes('invalid member id')){
      errors = 'Invalid member Id'
      return errors;
    }

    // incorrect email
    if(err.message.includes('incorrect email')){
      errors.email = 'That email is not registered'
    }

    // incorrect password
    if(err.message.includes('incorrect password')){
      errors.password = 'That password is incorrect'
    }

    // member id not found
    if(err.message.includes('member not found')){
      errors = 'Member not found'
      return errors;
    }

    // duplicate error code
    if(err.code === 11000){
      errors.email = 'Email is already registered';
      return errors;
    }

    // validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.json({user: user._id});
    
  } catch (err) {
    // console.log(err)
    const error = this.handleErrors(err)
    res.status(401).json({ error });
  }
};