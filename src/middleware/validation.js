const Joi = require("joi");
const { pick } = require("../../halper/pick");

const validation = (schema) => (req, res, next) => {
    try {
        const objs = pick(req, Object.keys(schema))

        console.log(objs);

        const { error, value } = Joi.compile(schema)
            .prefs({
                abortEarly: false
            })
            .validate(objs);


        if (error) {
            const errMsg = error.details.map((v) => v.message).join(", ")

            return (next(new Error("validation error: " + errMsg)))

        }
        Object.assign(req, value)
        console.log(value);
        next();

    } catch (err) {
        console.log(error);

    }



}

module.exports = validation;




