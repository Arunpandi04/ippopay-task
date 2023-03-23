
import generateToken from '../Utils/tokenGenerator';
import { create, getByEmail, getById } from '../Dao'
import generateOTP from '../Utils/generateOTP'
import bcrypt from 'bcrypt';

export const signupService = async (data) => {
   try {
      console.error("Signup Service");
      const findUser = await getByEmail(data.email);
      if (findUser) {
         return { status: 409, data: { message: "user already exist" } };
      }
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(data.password, salt);
      const result = await create({ ...data, ['password']: password, ['otp']: generateOTP() });
      return { status: 200, data: { data: result, message: "user signup successfully"} }
   } catch (error) {
      console.error("Error in Service Signup Method", error);
      return error;
   }
}

export const signinService = async (data) => {
   try {
      console.error("Signin Service");
      const findUser = await getByEmail(data.email);
      if (!findUser) {
         return { status: 404, data: { message: "user not fount" } };
      }
      const match = await bcrypt.compare(data.password, findUser.password);
      if (!match) {
         return { status: 401, data: { message: "Given Password Mismatch" } }
      }
      return { status: 200, data: { data: findUser, message: "user signin successfully", accessToken: generateToken(findUser._id, 'access') } }
   } catch (error) {
      console.error("Error in Service Signin Method", error);
      return error;
   }
}

export const otpCheckService = async (data) => {
   try {
      console.error("OTP Check Service");
      const findUser = await getByEmail(data.email);
      console.log("findUser", findUser)
      if (findUser.otp !== data.otp) {
         return { status: 409, data: { message: "Otp wrong" } }
      }
      return { status: 200, data: { data: findUser, message: "otp verfied successfully", accessToken: generateToken(findUser._id, 'access') } }
   } catch (error) {
      console.error("Error in Service Otp Check Method", error);
     
   }
}


export const getService = async (id) => {
   try {
      console.error("Get Service");
      const result = await getById(id)
      if (!result) {
         return { status: 404, data: { message: "user not fount" } }
      }
      return { status: 200, data: { data: result, message: "get user detail successfully" } }
   } catch (error) {
      console.error("Error in Service Get User Method", error);
      return error;
   }
}