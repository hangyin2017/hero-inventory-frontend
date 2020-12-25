import SignUpFields from '../SignUpModal/Fields';

const password = SignUpFields.find((f) => f.key === 'password');
const newPassword = {
  ...password,
  label: 'New Password',
}

const confirmPassword = SignUpFields.find((f) => f.key === 'confirmPassword');
const confirmNewPassword = {
  ...confirmPassword,
  label: 'Confirm New Password',
}

const FIELDS = [
  newPassword,
  confirmNewPassword,
];

export default FIELDS;