import { connection } from "../database/db.js";
import bcrypt from "bcrypt";

async function postSignUpController(req, res) {
   const { name, email, password } = req.body;
   const passwordHash = bcrypt.hashSync(password, 10);

   try {
      await connection.query(
         "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
         [name, email, passwordHash]
      );
      res.sendStatus(201)
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

export { postSignUpController };
