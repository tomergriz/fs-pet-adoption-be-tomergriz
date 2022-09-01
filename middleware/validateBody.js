const Ajv = require("ajv");
const ajv = new Ajv();

function validateBody(schema) {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send((ajv.errors[0]?.instancePath) || "Some 400 error occurred in validateBody")
            console.log(ajv.errors[0]);
            return;
        }
        next();
    };
}

module.exports = { validateBody };
