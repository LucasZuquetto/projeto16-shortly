import { nanoid } from "nanoid";
import { connection } from "../database/db.js";

async function postShortenUrl(req, res) {
   const { url } = req.body;
   const { user } = res.locals;
   const shortUrl = nanoid();

   try {
      await connection.query(
         'INSERT INTO urls(url,"shortUrl","userId") VALUES($1,$2,$3);',
         [url, shortUrl, user.userId]
      );
      res.sendStatus(201);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function getUrlByIdController(req, res) {
   const { urlObject } = res.locals;
   res.status(200).send({
      id:urlObject.id,
      shortUrl:urlObject.shortUrl,
      url:urlObject.url
   });
}

async function openShortUrlController(req, res) {
   const { shortUrl } = req.params;
   const { urlObject } = res.locals;
   try {
      res.redirect(urlObject.url);
      await connection.query(
         'UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = ($1);',
         [shortUrl]
      );
      res.sendStatus(200);
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
   }
}

async function deleteUrlController(req,res){
   const {urlObject} = res.locals
   try {
      await connection.query('DELETE FROM urls WHERE id = ($1);',[urlObject.id])
      res.sendStatus(204)
   } catch (error) {
      console.log(error.message)
      res.sendStatus(500)
   }
}

export { postShortenUrl, getUrlByIdController, openShortUrlController,deleteUrlController };
