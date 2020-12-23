import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import ForgetPasswordModal from './components/ForgetPasswordModal';
import ResetPasswordModal from './components/ResetPasswordModal';
import EmailVerificationModal from './components/EmailVerificationModal';

const ROUTES = {
  signIn: {
    path: '/auth/signin',
    exact: true,
    component: SignInModal,
  },
  signUp: {
    path: '/auth/signup',
    exact: true,
    component: SignUpModal,
  },
  forgetPassword: {
    path: '/auth/forget_password',
    exact: true,
    component: ForgetPasswordModal,
  },
  resetPassword: {
    path: '/auth/reset_password',
    exact: true,
    component: ResetPasswordModal,
  },
  emailVerification: {
    path: '/auth/email_verification',
    exact: true,
    component: EmailVerificationModal,
  },
};

export default ROUTES;