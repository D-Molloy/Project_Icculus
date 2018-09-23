const Validator = require("validator");
const isEmpty = require("./is_empty");

//data is an object of things to validate
module.exports = function validateEducationInput(data) {
  let errors = {};

  //isEmpty needs to check a string
  // these two lines check if the data is set to null or undefined, if they are, set them two an empty string
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required.";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required.";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Degree/Certificate field is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
