const { isEmpty } = require('validator');
const empty = require('../utils/isEmpty');

module.exports = signinValidation = ({ price }) => {
  let errors = {};

  price = !empty(price) ? price : '';

  // if (isEmpty(price.toString())) errors.price = 'Price field is required';


  return {
    errors,
    isValid: empty(errors)
  };
};
