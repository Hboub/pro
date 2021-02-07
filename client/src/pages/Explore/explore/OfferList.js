import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Offers, Results, Warning } from './OfferList.styles';
import Offer from './offerList/Offer';
import Button from '../../../components/Button/Button';

const OfferList = ({
  offers: { offers },
  order: { city },
  loadMoreResults,
  limit,
  skip
}) => {
  const isNoCriteria = () => {
    if (city === '') return true;
    return false;
  };

  return (
    <Offers>
      {isNoCriteria()
        ? null
        : <Results>Results for: <span>
          {city !== '' && `${city}, `}
        </span></Results>
      }
      {offers.map(offer => (
        <Offer key={offer._id} {...offer} />
      ))}
      {offers.length === 0 && <Warning>No results</Warning>}
      {offers.length > 0 && offers.length >= limit + skip
        ? <Button onClick={loadMoreResults}>Load more</Button>
        : null
      }
    </Offers>
  );
};

OfferList.propTypes = {
  order: PropTypes.object.isRequired,
  offers: PropTypes.object.isRequired,
  loadMoreResults: PropTypes.func.isRequired
};

const mapStateToProps = ({ offers, order }) => ({ offers, order });

export default connect(mapStateToProps)(OfferList);