import { validateObject } from "./middlewareHelper.js";
import Joi from "joi";
import { connection } from "../database/db.js";

function shortenMiddleware(req, res, next) {
   const urlObject = req.body;

   const urlSchema = Joi.object({
      url: Joi.string().uri().required(),
   });

   validateObject(urlSchema, urlObject, res);

   next();
}

async function validateUrlById(req, res, next) {
   const { id } = req.params;
   try {
      const urlExists = (
         await connection.query("SELECT  * FROM urls WHERE id = ($1);", [id])
      ).rows[0];
      if (!urlExists) {
         res.sendStatus(404);
         return;
      }
      res.locals.urlObject = urlExists;
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
      return;
   }
   next();
}

async function openShortUrlMiddleware(req, res, next) {
   const { shortUrl } = req.params;
   try {
      const shortUrlExists = (
         await connection.query(
            'SELECT "url" FROM urls WHERE "shortUrl" = ($1);',
            [shortUrl]
         )
      ).rows[0];
      if (!shortUrlExists) {
         res.sendStatus(404);
         return;
      }
      res.locals.urlObject = shortUrlExists;
   } catch (error) {
      console.log(error.message);
      res.sendStatus(500);
      return;
   }
   next();
}

async function deleteUrlMiddleware(req, res, next) {
   const { urlObject } = res.locals;
   const { user } = res.locals;

   if (urlObject.userId !== user.userId) {
      res.sendStatus(401);
      return;
   }

   next();
}

export {
   shortenMiddleware,
   validateUrlById,
   openShortUrlMiddleware,
   deleteUrlMiddleware,
};
