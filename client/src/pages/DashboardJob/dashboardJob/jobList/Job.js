import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { JobCard, Title, Info, Description, ToggleBtn } from './Job.styles';
import useToggle from '../../../../hooks/useToggle';
import axios from 'axios';

import Offers from './job/Offers';
// import AddOffer from './job/AddOffer';
import Spinner from '../../../../components/Spinner/Spinner';

const Job = ({
  address,
  city,
  contact,
  emailTitle,
  emailSubject,
  emailBody,
  name,
  rating,
  stars,
  type,
  _id
}) => {
  const [toggle, setToggle] = useToggle();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitFetchOffers = () => { // Show offers panel and fetch offers
    onToggle();
    fetchOffers();
  };

  const fetchOffers = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:7000/api/offers/offers/${_id}`);
    setLoading(false);
    setOffers(res.data);
  };

  const removeOffer = async id => {
    await axios.delete(`http://localhost:7000/api/offers/offer/${id}`);
    fetchOffers();
  };

  const onToggle = () => setToggle();

  return (
    <JobCard>
      <Title>{name}</Title>
      <ToggleBtn onClick={submitFetchOffers}>{toggle ? 'Close' : 'Manage'}</ToggleBtn>
      {toggle && loading && <Spinner />}
      {toggle && !loading &&
        <>
          <Description>
            <Info>Type: <span>{type}</span></Info>
            <Info>Stars: <span>{stars}</span></Info>
            <Info>Rating: <span>{rating}</span></Info>
            <Info>City: <span>{city}</span></Info>
            <Info>Address: <span>{address}</span></Info>
            <Info>Contact: <span>{contact}</span></Info>
            <Info>Email title: <span>{emailTitle}</span></Info>
            <Info>Email subject: <span>{emailSubject}</span></Info>
            <Info>Email body: <span>{emailBody}</span></Info>
          </Description>
          <Offers
            id={_id}
            offers={offers}
            handleRemoveOffer={removeOffer}
          />
          <AddOffer
            jobId={_id}
            city={city}
            type={type}
            stars={stars}
            fetchOffers={fetchOffers}
          />
        </>
      }
    </JobCard>
  );
};

Job.propTypes = {
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  contact: PropTypes.number.isRequired,
  emailTitle: PropTypes.string.isRequired,
  emailSubject: PropTypes.string.isRequired,
  emailBody: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default Job;