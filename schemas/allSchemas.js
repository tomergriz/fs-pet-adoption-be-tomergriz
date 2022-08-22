const signUpSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string", minLength: 2 },
        rePassword: { type: "string", minLength: 2 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        phone: { type: "string" },
    },
    required: ["firstName", "email", "password", "rePassword"],
    additionalProperties: false,
};

const loginSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string", minLength: 2 },
    },
    required: ["email", "password"],
    additionalProperties: false,
};

module.exports = { signUpSchema, loginSchema };
