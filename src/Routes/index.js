import authentication from '../Utils/authentication';
import { signupController, signinController, otpCheckController, getController} from '../Controller'

const getUserRoutes = (router) => {
    router.route('/').get((req, res) => res.send('Sample Node Application'));
    router.route('/ping').get((req, res) => res.send({ status: 'active', time: new Date() }));
    router.route('/signup').post(signupController);
    router.route('/signin').post(signinController);
    router.route('/otp').post(otpCheckController);
    router.route('/get/:id').get(authentication,getController);
    return router;
}

export default getUserRoutes;