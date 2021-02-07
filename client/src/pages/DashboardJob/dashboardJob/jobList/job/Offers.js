import React from 'react';
import PropTypes from 'prop-types';
import { Table, DeleteBtn, Warning } from './Offers.styles.js';

const Offers = ({ offers, handleRemoveOffer }) => {
  if (offers.length === 0) return <Warning>No offers have been added yet.</Warning>
  return (
    <Table>
      <thead>
        <tr>
          <th>Offer ID</th>
          <th>Price</th>
          <th>Adults</th>
          <th>Children</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {offers.map(({ _id, price, adults, children }) => (
          <tr key={_id}>
            <td>{_id}</td>
            <td>$ {price}</td>
            <td>{adults}</td>
            <td>{children}</td>
            <td><DeleteBtn onClick={() => handleRemoveOffer(_id)}>Delete</DeleteBtn></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};

Offers.propTypes = {
  offers: PropTypes.array.isRequired,
  handleRemoveOffer: PropTypes.func.isRequired
};

export default Offers;