import React from 'react';
import { Header } from 'semantic-ui-react';

class PageTitle extends React.Component {

  render() {
    return (
      <div data-testid='page-title'>
        <Header as='h1'>{this.props.selectedCountry} {window.defaultAppSettings.pageTitleSuffixLabel}</Header>
      </div>
    );
  };
  
}

export default PageTitle