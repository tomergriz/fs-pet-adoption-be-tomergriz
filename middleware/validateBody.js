const Ajv = require("ajv");
const ajv = new Ajv();

function validateBody(schema) {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            console.log([ajv.errors[0].message]);
            res.status(400).send(ajv.errors[0].message);
            console.log([ajv.errors[0].message]);

            return;
        }
        next();
    };
}

module.exports = { validateBody };
