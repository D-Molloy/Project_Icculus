const Validator = require("validator");
const isEmpty = require("./is_empty");

//data is an object of things to validate
module.exports = function validateExperienceInput(data) {
  let errors = {};

  //isEmpty needs to check a string
  // these two lines check if the data is set to null or undefined, if they are, set them two an empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required.";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
