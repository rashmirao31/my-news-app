import React from 'react'
import Moment from 'react-moment';
import 'moment-timezone';
import CountryList from './CountryList.js';

class Header extends React.Component {

  render() {

    return (
      <div data-testid='header-menu'>
        <div className='editionDetails'>
          <div>
              <CountryList 
                updateSelectedCountry={this.props.updateSelectedCountry}
                updateSearchText={this.props.updateSearchText}
              />
          </div>
          <div>
          {window.defaultAppSettings.headerTimeLabel}
          <Moment unix tz={window.defaultAppSettings.timezoneKey} data-testid='time-label'>
                {this.props.updatedTime}
          </Moment>
          </div>
        </div>
      </div>
    );
  };
  
}

export default Header