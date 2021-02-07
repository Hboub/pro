import React from 'react';
import PropTypes from 'prop-types';
import { price, service, week } from '../../../utils/categories';

import { FilterList, Title } from './Filters.styles';

import CollapseCheckbox from '../../../components/Inputs/CollapseCheckbox/CollapseCheckbox';
import CollapseRadio from '../../../components/Inputs/CollapseRadio/CollapseRadio';

const Filters = ({
  handleFilters
}) => (
  <FilterList>
    <Title>Filters</Title>
    <CollapseCheckbox
      open={false}
      title="Available"
      list={week}
      handleFilters={handleFilters}
      category="days"
    />
    <CollapseCheckbox
      open={false}
      title="service"
      list={service}
      handleFilters={handleFilters}
      category="services"
    />
    <CollapseRadio
      open={false}
      title="Price"
      list={price}
      handleFilters={handleFilters}
      category="price"
    />
  </FilterList>
);

Filters.propTypes = {
  handleFilters: PropTypes.func.isRequired
};

export default Filters;