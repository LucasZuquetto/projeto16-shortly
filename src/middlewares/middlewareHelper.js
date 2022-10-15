function validateObject(schema, object, res) {
   const validate = schema.validate(object, { abortEarly: false });
   if (validate.error) {
      console.error(validate.error.details.map((detail) => detail.message));
      res.sendStatus(422);
      return;
   }
}

export { validateObject };
