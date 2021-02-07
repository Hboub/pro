import React from 'react';

import { FooterWrapper, FooterBottom, FooInfo, Register, Title, Subtitle } from './Footer.styles';

import NavLink from '../../NavLink/NavLink';

const Footer = () => (
  <FooterWrapper>
    <Register>
      <Title>Register your offer</Title>
      <Subtitle>Create a special account to add your own offers. You will get access to the information panel that allows you to manage your offers in a simple way.</Subtitle>
      <NavLink to="/signup" linkType="light">Sign up</NavLink>
    </Register>
    <FooterBottom>
      <FooInfo>Comfy</FooInfo>
      <FooInfo>Made by Hboub</FooInfo>
    </FooterBottom>
  </FooterWrapper>
);

export default Footer;