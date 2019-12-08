import React from 'react';
import {Header as NBHeader, Body, Title} from 'native-base';
import {skyblue, whiteSmoke} from '../utils/colors';

const Header = ({title}) => {
  return (
    <NBHeader style={{backgroundColor: skyblue}}>
      <Body>
        <Title style={{color: whiteSmoke}}>{title}</Title>
      </Body>
    </NBHeader>
  );
};

export default Header;
