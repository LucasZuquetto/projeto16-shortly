import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function postSignUpController(req, res) {
   const { name, email, password } = req.body;
   const passwordHash = bcrypt.hashSync(password, 10);

   try {
      await connection.query(
         "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
         [name, email, passwordHash]
      );
      res.sendStatus(201);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function postSignInController(req, res) {
   const loginData = req.body;
   const user = (
      await connection.query("SELECT * FROM users WHERE email = ($1)", [
         loginData.email,
      ])
   ).rows[0];
   if (!user) {
      res.sendStatus(401);
      return;
   }

   const passwordIsValid = bcrypt.compareSync(
      loginData.password,
      user.password
   );
   if (!passwordIsValid) {
      res.sendStatus(401);
      return;
   } else {
      const token = uuid();
      try {
         await connection.query(
            'INSERT INTO sessions("userId",token) VALUES($1,$2)',
            [user.id, token]
         );
         res.status(200).send({ token });
      } catch (error) {
         console.log(error.message);
         res.sendStatus(500);
         return;
      }
   }
}

export { postSignUpController, postSignInController };
