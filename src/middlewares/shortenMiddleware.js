import { validateObject } from "./middlewareHelper.js";

export default function shortenMiddleware (req,res,next){
    const urlObject = req.body

    const urlSchema = Joi.object({
        url: Joi.string().uri().required(),
     });

     validateObject(urlSchema,urlObject,res)

    next()
}