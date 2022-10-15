import Joi from "joi";
import { connection } from "../database/db.js";
import { validateObject } from "./middlewareHelper.js";

async function postSignUpMiddleware(req, res, next) {
   const userData = req.body;

   const authSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
   });

   validateObject(authSchema, userData, res);

   try {
      const emailExists = (
         await connection.query("SELECT * FROM users WHERE email = ($1)", [
            userData.email,
         ])
      ).rows[0];
      if (emailExists) {
         res.sendStatus(409);
         return;
      }
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
      return;
   }

   next();
}

async function postSignInMiddleware(req, res, next) {
   const loginData = req.body;

   const loginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
   });

   validateObject(loginSchema, loginData, res);

   next();
}

export { postSignUpMiddleware, postSignInMiddleware };
