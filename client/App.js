import React, { Component, Fragment } from 'react';
import Radio from '@govuk-react/radio';
import { YELLOW } from 'govuk-colours';
import styled, { css } from 'react-emotion';
import ErrorSummary from '@govuk-react/error-summary';
import InputField from '@govuk-react/input-field';
import MultiChoice from '@govuk-react/multi-choice';
import {H2} from '@govuk-react/header';
import Select from '@govuk-react/select';
import fs, { read } from 'fs';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {speciesData} = this.props;
    return (
      <div>
        {/* <H2>Foooooooo</H2>
        {renderErrorSummary()}
        {renderRadio()} */}
        {/* {renderMassiveDropDown()} */}
        {
          (() => {
            return renderMassiveDataList(speciesData)
          })()
        }
        {/* {renderLotsOfRadioButtons()} */}
      </div>
      
    );
  }
}

const renderMassiveDropDown = () => {
  const numItems = Array.from(Array(5000), (_, x) => x);
  const data = SPECIES_DATA.split('\n');
  return <Select>
    {
      // numItems.map(i => {
      //   return <option key={i} value={i}>Nemo-{i}</option>
      // })
      
      data.map((i, idx) => {
        return <option key={idx} value={idx}>{i}</option>;
      })
    }
  </Select>
  
}

const renderMassiveDataList = speciesData => {
  // const numItems = Array.from(Array(5000), (_, x) => x);
  try {
    // const speciesData = await readData('/home/opensourcegeek/projects/transformuk/mmo-ecc-reference-data-svc/src/main/resources/db/data/species.csv');
    const data = speciesData.split('\n');
    console.log('Got data', data.length);
    return <React.Fragment>
      <input list='species'></input>
      <datalist id='species'>
        {
          // numItems.map(i => {
          //   return <option key={i} value={i}>Nemo-{i}</option>
          // })
          
          data.map((i, idx) => {
            return <option key={idx} value={i} />;
          })
        }
      </datalist>
    </React.Fragment>;
  } catch(e) {
    console.error(e);
    return <h5>Error!!!!!!!!</h5>
  }
  
}

const renderLotsOfRadioButtons = () => {
  // const numItems = Array.from(Array(5000), (_, x) => x);
  const data = SPECIES_DATA.split('\n');
  return data.map((i, idx) => {
    return <Radio key={idx} name='allRadios' value={idx}>{i}</Radio>
  });
    
}

const renderErrorSummary = () => {
  const description = "Some description";
  const errors = [
    {
      targetName: 'nah-nah',
      text: <a href='#nah'>Booy</a>,
    }
  ];
  return (
    <div>  
      <ErrorSummary 
        heading={'Some header'}
        description={description}
        errors={errors}
      />
      <InputField
        name="national-insurance-number"
        hint="It’s on your National Insurance card, benefit letter, payslip or P60."
      >
      National Insurance number
      </InputField>
    </div>
  );
}

const renderRadio = () => {
  // const radioStyle = css({
  //   '& input:checked ~ span::after': {
  //     opacity: 1
  //   },
  //   '& input:focus ~ span::before': {
  //     boxShadow: `0 0 0 4px ${YELLOW}`     
  //   },
  //   '& input:disabled ~ span': {
  //     opacity: '.4',
  //     pointerEvents: 'none'     
  //   }
  // });

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
    <div>
      <H2>Select:</H2>
      {/* <Radio name='sample' value='1' className={radioStyle} disabled>Boo</Radio>
      <Radio name='sample' value='2' className={radioStyle}>Foo</Radio> */}
      {/* <StyledRadio name='sample' value='1' disabled>Boooo</StyledRadio>
      <StyledRadio name='sample' value='2'>Foooo</StyledRadio>
      <StyledRadio name='sample' value='3'>Goooo</StyledRadio> */}
      <Radio name='sample' value='1' disabled>Boooo</Radio>
      <Radio name='sample' value='2'>Foooo</Radio>
      <Radio name='sample' value='3'>Goooo</Radio>
      <InputField name='nah-nah' id='nah'>Some Num</InputField>
    </div>
  );
}

export default App;

