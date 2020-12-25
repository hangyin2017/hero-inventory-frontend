import validator from 'validator';

const FIELDS = [{
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
}];

export default FIELDS;