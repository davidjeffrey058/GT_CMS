const authService = require('../services/authService');

 module.exports.handleErrors = (err) => {
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


module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await authService.login(username, password);

    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};