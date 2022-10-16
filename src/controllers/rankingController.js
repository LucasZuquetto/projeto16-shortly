import { connection } from "../database/db.js";

export default async function rankingController(req, res) {
   try {
      const ranking = (
         await connection.query(
            'SELECT users.id,name,COUNT(urls.id) AS "urlCount",COALESCE(SUM("visitCount"), 0) AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;'
         )
      ).rows;
      res.send(ranking);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}
