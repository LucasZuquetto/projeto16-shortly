import { connection } from "../database/db.js";

export default async function usersInfoController(req, res) {
   const { user } = res.locals;
   try {
      const { visitCount } = (
         await connection.query(
            'SELECT sum("visitCount") AS "visitCount" FROM urls WHERE "userId"=($1);',
            [user.userId]
         )
      ).rows[0];

      const { name } = (
         await connection.query('SELECT name FROM users WHERE "id" = ($1);', [
            user.userId,
         ])
      ).rows[0];

      const shortenedUrls = (
         await connection.query(
            'SELECT urls.id,"shortUrl",url,"visitCount" FROM users JOIN urls ON users.id = urls."userId" WHERE "userId" = ($1);',
            [user.userId]
         )
      ).rows;
      res.send({
         id: user.userId,
         name,
         visitCount,
         shortenedUrls,
      });
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}
