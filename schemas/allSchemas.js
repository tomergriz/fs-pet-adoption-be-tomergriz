  const signUpSchema = {
    type: "object",
    properties: {
      email: {type: "string"},
      firstName: {type: "string"},
      password: {type: "string", minLength: 2},
      rePassword: {type: "string", minLength: 2}

    },
    required: ["email"],
    additionalProperties: false
  }


  module.exports = {signUpSchema}