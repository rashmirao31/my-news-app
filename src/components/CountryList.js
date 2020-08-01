import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class CountryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: window.defaultAppSettings.countryKey
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event, data) {
    let selectedCountry = data.value;
    this.setState({
      selectedCountry: selectedCountry
    });
    this.props.updateSelectedCountry(event, selectedCountry);
    this.props.updateSearchText('');
  };

  render() {

    return (
      <div>
        {window.defaultAppSettings.countryMenuTitle}
        <Dropdown 
          data-testid='country-list'
          placeholder={window.defaultAppSettings.countryMenuPlaceholder}
          search
          selection
          value={this.state.selectedCountry}
          options={window.defaultAppSettings.countryOptions}
          onChange={this.handleChange}
        />
      </div>
    );
  };
  
}

export default CountryList