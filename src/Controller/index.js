import { signinService, signupService, otpCheckService, getService } from '../Services'

export const signupController = async(req,res) => {
    try {
        console.error("Signup Controller");
        const result = await signupService(req.body)
        res.status(result.status).send(result.data);
    } catch (error) {
       console.error("Error in Controller Signup Method", error);
       res.status(500).send({ message: error.message });
    }
}

export const signinController = async(req,res) => {
    try {
        console.error("Signin Controller");
        const result = await signinService(req.body)
        res.status(result.status).send(result.data);
    } catch (error) {
       console.error("Error in Controller Signin Method", error);
       res.status(500).send({ message: error.message });
    }
}

export const otpCheckController = async(req,res) => {
    try {
        console.error("OTP Check Controller");
        const result = await otpCheckService(req.body)
        res.status(result.status).send(result.data);
    } catch (error) {
       console.error("Error in Controller otp Check Method", error);
       res.status(500).send({ message: error.message });
    }
}

export const getController = async(req,res) => {
    try {
        console.error("Get Controller");
        const result = await getService(req.params.id)
        res.status(result.status).send(result.data);
    } catch (error) {
       console.error("Error in Controller Get User Method", error);
       res.status(500).send({ message: error.message });
    }
}