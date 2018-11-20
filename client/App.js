import React, { Component, Fragment } from 'react';
import Radio from '@govuk-react/radio';
import { YELLOW } from 'govuk-colours';
import styled from 'react-emotion';
import {H5, H2} from '@govuk-react/header';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <H2>Radio buttons</H2>
        {renderRadio()}
        {renderStyledRadio()}
      </div>
    );
  }
}

const renderRadio = () => {
  return (
    <React.Fragment>
      <H5>First button issue:</H5>
      <Radio name='sample' value='1'>Boooo</Radio>
      <Radio name='sample' value='2'>Foooo</Radio>
      <Radio name='sample' value='3'>Goooo</Radio>
    </React.Fragment>
  );
}

const renderStyledRadio = () => {
  const StyledRadio = styled(Radio)({
    '& input:checked ~ span::after': {
      opacity: 1
    },
    '& input:focus ~ span::before': {
      boxShadow: `0 0 0 4px ${YELLOW}`     
    },
    '& input:disabled ~ span': {
      opacity: '.4',
      pointerEvents: 'none'     
    }
  });

  return (
    <React.Fragment>
      <H5>No first button issue:</H5>
      <StyledRadio name='sample' value='1'>Boooo</StyledRadio>
      <StyledRadio name='sample' value='2'>Foooo</StyledRadio>
      <StyledRadio name='sample' value='3'>Goooo</StyledRadio>
    </React.Fragment>
  );
}

export default App;

