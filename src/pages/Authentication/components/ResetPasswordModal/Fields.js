import SignUpFields from '../SignUpModal/Fields';

const password = SignUpFields.find((f) => f.key === 'password');
const newPassword = {
  ...password,
  key: 'newPassword',
  label: 'New Password',
}

const confirmPassword = SignUpFields.find((f) => f.key === 'password');
const confirmNewPassword = {
  ...confirmPassword,
  key: 'confirmNewPassword',
  label: 'Confirm New Password',
}

const FIELDS = [
  newPassword,
  confirmNewPassword,
];

export default FIELDS;