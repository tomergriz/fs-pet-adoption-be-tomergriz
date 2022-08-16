  const signUpSchema = {
    type: "object",
    properties: {
      email: {type: "string"},
      password: {type: "string", minLength: 2},
      rePassword: {type: "string", minLength: 2},
      firstName: {type: "string"},
      lastName: {type: "string"},
      phoneNumber: {type: "string"},

    },
    required: ["email", "password"],
    additionalProperties: false
  }


  module.exports = {signUpSchema}

