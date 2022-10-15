import { connection } from "../database/db.js";

export default async function validateAuthToken(req, res, next) {
   const { authorization } = req.headers;
   const token = authorization?.replace("Bearer ", "");

   if (!token) {
      res.sendStatus(401);
      return;
   }

   try {
      const sessionIsValid = (
         await connection.query(
            "SELECT * FROM sessions WHERE token = ($1)",
            [token]
         )
      ).rows[0];
      if (!sessionIsValid) {
         res.sendStatus(401);
         return;
      }
      res.locals.user = sessionIsValid
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
      return;
   }

   next();
}
