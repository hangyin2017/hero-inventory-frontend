import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import EmailVerificationModal from './components/EmailVerificationModal';
import ForgetPasswordModal from './components/ForgetPasswordModal';

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
  emailVerification: {
    path: '/auth/email_verification',
    exact: true,
    component: EmailVerificationModal,
  },
};

export default ROUTES;