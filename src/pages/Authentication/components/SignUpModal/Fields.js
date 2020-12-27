import validator from 'validator';
import auth from '../../../../apis/auth';

const FIELDS = [{
  key: 'username',
  label: 'Username',
  type: 'text',
  validations: [{
    message: 'Please enter your username',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Username already exists',
    validator: async (value) => {
      if(!!value && value.length >= 6) {
        return await auth.checkUsername({ username: value })
          .then((res) => true)
          .catch((err) => false);
      }
      return true;
    },
  }],
},{
  key: 'email',
  label: 'Email',
  type: 'text',
  validations: [{
    message: 'Please enter your email address',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Please enter a valid email address',
    validator: (value) => validator.isEmail(value),
  }],
},{
  key: 'password',
  label: 'Password',
  type: 'password',
  validations: [{
    message: 'Please enter your password',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Password must be at least 8 characters',
    validator: (value) => validator.isLength(value, { min:8 }),
  }],
},{
  key: 'confirmPassword',
  label: 'Confirm Password',
  type: 'password',
  validations: [{
    message: 'Please confirm your password',
    validator: (value) => !validator.isEmpty(value),
  },{
    message: 'Confirmed password does not match the password',
    validator: (value, data) => value === data.password.value,
  }],
}];

export default FIELDS;