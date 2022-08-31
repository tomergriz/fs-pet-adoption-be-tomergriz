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

const addPetSchema = {
    type: "object",
    properties: {
        type: { type: "string", minLength: 2 },
        name: { type: "string", minLength: 2 },
        adoptionStatus: { type: "string" },
        picture: { type: "string" },
        height: { type: "string" },
        weight: { type: "string" },
        color: { type: "string" },
        bio: { type: "string" },
        hypoallergnic: { type: "string" },
        dietery: { type: "string" },
        breed: { type: "string" },
    },
    required: ["type", "name"],
    additionalProperties: false,
};

module.exports = { signUpSchema, loginSchema, addPetSchema };