import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { price } from "../../utils/categories";
import { filterOffers } from "../../modules/offers/offersActions";

import { ExploreContainer } from "./Explore.styles";

import SearchForm from "../../components/SearchForm/SearchForm";
import OfferList from "./explore/OfferList";
import Filters from "./explore/Filters";
import Spinner from "../../components/Spinner/Spinner";
import ScrollToTopOnMount from "../../utils/ScrollToTopOnMount";
// import Map from "../../components/Map/Map";

const initFilters = {
  services: [],
  days: [],
};

const initRestrictions = {
  limit: 8,
  skip: 0,
};

const Explore = ({ filterOffers, order, offers: { offers, loading } }) => {
  const [filters, setFilters] = useState(initFilters);
  const [restrictions, setRestrictions] = useState(initRestrictions);

  useEffect(() => {
    if (offers.length === 0) {
      const { city } = order;
      const searchData = { city };
      filterOffers(filters, restrictions.limit, 0, searchData);
    }
  }, [order, filters, restrictions, filterOffers, offers.length]);

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const onFilter = (filtersArray, category) => {
    const newFilters = { ...filters };
    newFilters[category] = filtersArray;

    // handle price filter
    if (category === "price") {
      let priceValues = handlePrice(filtersArray);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);

    setFilters(newFilters);
  };

  const showFilteredResults = (filtersArray) => {
    const { city } = order;
    const searchData = { city };

    filterOffers(filtersArray, restrictions.limit, 0, searchData);
    setRestrictions({ ...restrictions, skip: 0 });
  };

  const loadMoreResults = () => {
    let skip = restrictions.skip + restrictions.limit;
    const { city } = order;
    const searchData = { city };

    filterOffers(
      filters,
      restrictions.limit,
      skip,
      searchData,
      offers // prev offers state (to merge old with new offers)
    );
    console.log(searchData);
    setRestrictions({ ...restrictions, skip });
  };

  return (
    <>
      <ScrollToTopOnMount />
      <SearchForm />
      <ExploreContainer>
        <Filters handleFilters={onFilter} />
        {loading ? (
          <Spinner />
        ) : (
          <OfferList
            loadMoreResults={loadMoreResults}
            limit={restrictions.limit}
            skip={restrictions.skip}
          />
        )}
      </ExploreContainer>
    </>
  );
};

Explore.propTypes = {
  filterOffers: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  offers: PropTypes.object.isRequired,
};

const mapStateToProps = ({ order, offers }) => ({ order, offers });

export default connect(mapStateToProps, { filterOffers })(Explore);
