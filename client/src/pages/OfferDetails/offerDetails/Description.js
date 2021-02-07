import React from 'react';
import PropTypes from 'prop-types';
import { Text, Services, Facility } from './Description.styles';
import { Section, Key, Warning } from '../OfferDetails.styles';

// const iconClasses = {
//   parking: 'fas fa-parking',
//   freewifi: 'fas fa-wifi',
//   swimmingpool: 'fas fa-swimming-pool',
//   gym: 'fas fa-dumbbell',
//   restaurant: 'fas fa-utensils',
//   airporttransfer: 'fas fa-plane-departure',
//   petsareallowed: 'fas fa-paw',
//   nonsmokingoffers: 'fas fa-smoking-ban',
//   terrace: 'fas fa-umbrella-beach',
//   airconditioning: 'fas fa-wind'
// };

const Description = ({ services, description }) => (
  <Section>
    <Key>Description</Key>
    <Text>{description}</Text>
    <Key>Services</Key>
    <Services>
      {services.length === 0
        ? <Warning>No services</Warning>
        : services.map(item => (
          <Facility key={item}>
            <p>{item}</p>
          </Facility>
        ))
      }
    </Services>
  </Section>
);

Description.propTypes = {
  services: PropTypes.array,
  description: PropTypes.string.isRequired
};

export default Description;