import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import { OfferCard, ImageWrapper, Image, Content, WrapperLeft, WrapperRight, Info, Location, Name } from './Offer.styles';



const Offer = ({
  _id, address, name, images, rating, opinions, city, services, price
}) => {


  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));
  const classes = useStyles();
  
  const listItems = services.map((service,i) => <Chip className={classes.chip} key={i} label={service} color="primary"/>);

  return (
    <OfferCard>
      <ImageWrapper>
        <Link to={`/offer/${_id}`}>
          <Image src={images.length > 0 ? images[0].url : '/images/Showcase.jpg'} />
        </Link>
      </ImageWrapper>
      <Content>
        <WrapperLeft>
        <div>
            {listItems}
          </div>
          <Name>{name}</Name>
          <Location>{`${city}, ${address}`}</Location>
        </WrapperLeft>
        <WrapperRight>
          {rating === 0
            ? <Info>No ratings</Info>
            : <Info><span>{Math.round(rating * 10) / 10}.0</span> ({opinions.length} votes)</Info>
          }
          <Info><span>{price} Dt</span> / Day</Info>
        </WrapperRight>
      </Content>
    </OfferCard>
  );
};

Offer.propTypes = {

  name: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  opinions: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Offer;