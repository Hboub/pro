import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { services, adults, children } from '../../../../../utils/categories';

import { AddBtn, Form, Divider, Limiter } from './AddOffer.styles';

import Modal from '../../../../../components/Modal/Modal';
import Button from '../../../../../components/Button/Button';
import TextFieldGroup from '../../../../../components/Inputs/TextFieldGroup/TextFieldGroup';
import SelectListGroup from '../../../../../components/Inputs/SelectListGroup/SelectListGroup';
import CollapseCheckbox from '../../../../../components/Inputs/CollapseCheckbox/CollapseCheckbox';

const initState = {
  services: [],
  price: '',
  adults: '1',
  children: '0'
};

const AddOffer = ({
  jobId,
  type,
  city,
  stars,
  fetchOffers
}) => {
  const [state, setState] = useState(initState);
  const [open, setOpen] = useState(false);

  const onClickOpen = () => setOpen(true);

  const onClickClose = () => setOpen(false);

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const onFilter = (services, category) => setState({ ...state, services });

  const onSubmit = async e => {
    e.preventDefault();

    const offerData = {
      jobId,
      type,
      city,
      stars,
      ...state
    };

    await axios.post('http://localhost:7000/api/offers/offer', offerData);
    onClickClose();
    fetchOffers(); // Refetch offers data
    setState(initState);
  };

  return (
    <>
      <AddBtn onClick={onClickOpen}>Add offer</AddBtn>
      <Modal
        open={open}
        onClose={onClickClose}
        title="Add offer"
      >
        <Form onSubmit={onSubmit}>
          <TextFieldGroup
            label="Price / night"
            placeholder="Enter price ..."
            id="price"
            name="price"
            type="number"
            value={state.price}
            onChange={onChange}
          />
          <SelectListGroup
            name="adults"
            id="adults"
            label="Adults"
            value={state.adults}
            onChange={onChange}
            options={adults}
          />
          <SelectListGroup
            name="children"
            id="children"
            label="Children"
            value={state.children}
            onChange={onChange}
            options={children}
          />
          <Limiter>
            <CollapseCheckbox
              open={false}
              title="Services"
              list={services}
              handleFilters={onFilter}
              category="services"
            />
          </Limiter>
          <Divider />
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    </>
  )
};

AddOffer.propTypes = {
  jobId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  fetchOffers: PropTypes.func.isRequired
};

export default AddOffer;