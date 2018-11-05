import React, { Component, Fragment } from 'react';
import Radio from '@govuk-react/radio';
import ErrorSummary from '@govuk-react/error-summary';
import InputField from '@govuk-react/input-field';
import MultiChoice from '@govuk-react/multi-choice';
import {H2} from '@govuk-react/header';

class App extends Component {
  render() {
    return (
      <div>
        <H2>Foooooooo</H2>
        {renderErrorSummary()}
        {renderRadio()}
      </div>
      
    );
  }
}

const renderErrorSummary = () => {
  const description = "Some description";
  const errors = [
    {
      targetName: 'national-insurance-number',
      text: 'National Insurance number error',
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
  return (
    <div>
      <H2>Select:</H2>
      
      <Radio name='sample' value='1'>Boo</Radio>
      <br/>
      <Radio name='sample' value='2'>Foo</Radio>
   
    </div>
  );
}

export default App;
