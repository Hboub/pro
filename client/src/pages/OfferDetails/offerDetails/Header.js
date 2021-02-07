import React from 'react';
import PropTypes from 'prop-types';
import { HeaderWrapper, Wrapper, Title, Icons, Location, Value, HeaderInfo, Divider } from './Header.styles';
import { Key } from '../OfferDetails.styles';

import Button from '../../../components/Button/Button';

const Header = ({
  name,
  city,
  address,
  rating,
  votes,
  price,
  services,
  handleOpenModal
}) => (
    <HeaderWrapper>
      <Wrapper>
        <Title>{name}</Title>
        <Location>{`${city}, ${address}`}</Location>
        {/* <Icons>
          {Array.from(Array(stars)).map((icon, i) => <i key={i} className="fas fa-star"></i>)}
        </Icons> */}
        <Divider />
        <Button onClick={handleOpenModal}>Order</Button>
      </Wrapper>
      <Wrapper>
        <HeaderInfo>
          <Key>Rating ({votes} votes):</Key>
          <Value>{rating}</Value>
        </HeaderInfo>
        <HeaderInfo>
          <Key>Price per day:</Key>
          <Value>{price} Dt</Value>
        </HeaderInfo>
        <HeaderInfo>
          <Key>For:</Key>
          <Icons>
            {services.map((service,i) => <Value key={i} >{service}</Value>)}
          </Icons>
        </HeaderInfo>
      </Wrapper>
    </HeaderWrapper>
  );

Header.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  handleOpenModal: PropTypes.func.isRequired
};

export default Header;