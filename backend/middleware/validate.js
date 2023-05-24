const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).send({
        error: errors.array()
    })
  }
  next()
};

// ----------------------------Old--------------------------------------------------------

// const validate = (validateSchema) => {
//     const schema = validateSchema.body;
//     return (req, res, next) => {
//         const validation = schema.validate(req.body)
//         if(validation.error) {
//             return res.status(StatusCodes.BAD_REQUEST).json({ error: validation.error.details[0].message })
//         }
//         next()
//     }
// }

// const validateParam = (validate_params) => {
//     const params = validate_params.params.id;

//     return (req, res, next) => {
//         const id = parseInt(req.params.id)
//         const validation = params.validate(id);
//         if(validation.error) {
//             return res.status(StatusCodes.BAD_REQUEST).json({ error: validation.error.details[0].message })
//         }
//         next()
//     }
// }

module.exports = validate

