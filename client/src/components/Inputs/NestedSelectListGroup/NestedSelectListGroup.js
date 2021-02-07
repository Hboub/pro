import React from "react";
import PropTypes from "prop-types";
import {
  SelectWrapper,
  Label,
  Select,
  Option,
  Info,
  Error,
} from "./NestedSelectListGroup.styles";

const NestedSelectListGroup = ({
  name,
  value,
  error,
  onChange,
  options,
  id,
  label,
  info,
  narrow,
}) => {
  const selectOptions = options.map((option, i) =>
    option.delegations.map((delegation, j) => (
      <Option key={(i+j)} data-value={option}>
        {delegation}
      </Option>
    ))
  );

  return (
    <SelectWrapper narrow={narrow}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        placeholder="Select your area"
        error={error}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </Select>
      {info && <Info>{info}</Info>}
      {error && <Error>{error}</Error>}
    </SelectWrapper>
  );
};

NestedSelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  narrow: PropTypes.bool,
};

NestedSelectListGroup.defaultProps = {
  error: "",
};

export default NestedSelectListGroup;
