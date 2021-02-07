import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOffer } from '../../modules/offers/offersActions';
import { DetailsContainer } from './OfferDetails.styles';

import Header from './offerDetails/Header';
import Slider from './offerDetails/Slider';
import CommentList from './offerDetails/CommentList';
import Description from './offerDetails/Description';
import Spinner from '../../components/Spinner/Spinner';
import Map from '../../components/Map/Map';
import Order from './offerDetails/Order';
import ScrollToTopOnMount from '../../utils/ScrollToTopOnMount';

class OfferDetails extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.props.getOffer(this.props.match.params.id);
  };

  onClickOpen = () => this.setState({ open: true });

  onClickClose = () => this.setState({ open: false });

  render() {
    const { offer, loading } = this.props.offers;
    return (
      <>
        <ScrollToTopOnMount />
        <DetailsContainer>
          {loading && <Spinner />}
          {offer &&
            <>
            {console.log(offer)}
              <Order
                open={this.state.open}
                handleClickClose={this.onClickClose}
                orderInfo={{
                  job: offer.name,
                  address: offer.address,
                  city: offer.city,
                  jobId: offer._id
                }}
              />
              <Header
                name={offer.name}
                city={offer.city}
                address={offer.address}
                price={offer.price}
                rating={Math.round(offer.rating * 10) / 10}
                votes={offer.opinions.length}
                services={offer.services}
                handleOpenModal={this.onClickOpen}
              />
              <Slider
                images={offer.images}
              />
              <Description
                services={offer.services}
                description={offer.description}
              />
              <Map
                mapStyle="dark"
                height="400px"
                pin={offer.pin}
                initViwport={{
                  latitude: offer.pin.latitude,
                  longitude: offer.pin.longitude,
                  zoom: 13
                }}
              />
              <CommentList
                opinions={offer.opinions}
              />
            </>
          }
        </DetailsContainer>
      </>
    );
  }
};

OfferDetails.propTypes = {
  offers: PropTypes.object.isRequired,
  getOffer: PropTypes.func.isRequired
};

const mapStateToProps = ({ offers }) => ({ offers });

export default connect(mapStateToProps, { getOffer })(OfferDetails);