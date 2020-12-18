import EmailVerificationModal from './components/EmailVerificationModal';

const ROUTES = {
  emailVerification: {
    path: '/auth/email_verification',
    exact: true,
    component: EmailVerificationModal,
  },
}

export default ROUTES;