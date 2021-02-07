const { isEmpty } = require('validator');
const empty = require('../utils/isEmpty');

module.exports = signinValidation = ({ name, city, contact, description }) => {
  let errors = {};

  // services = !empty(services) ? services : [];
  name = !empty(name) ? name : '';
  city = !empty(city) ? city : '';
  contact = !empty(contact) ? contact : '';
  description = !empty(description) ? description : '';

  // if (isEmpty(services)) errors.services = 'Services field is required';
  if (isEmpty(name)) errors.name = 'Name field is required';
  if (isEmpty(city)) errors.city = 'City field is required';
  if (isEmpty(contact)) errors.contact = 'Contact field is required';
  if (isEmpty(description)) errors.description = 'Description field is required';
console.log(errors)
  return {
    errors,
    isValid: empty(errors)
  };
};
