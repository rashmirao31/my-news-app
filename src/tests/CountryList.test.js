import React from 'react';
import ReactDOM from 'react-dom';
import CommonUtils from './../utils/CommonUtils';
import { Dropdown } from 'semantic-ui-react';
import CountryList from './../components/CountryList.js';

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

beforeEach(() => {
  window.defaultAppSettings = CommonUtils.getConfigList();
  return;
});

afterEach(cleanup);

it('renders without crashing', () => {
 	const div = document.createElement('div');
	ReactDOM.render(<CountryList />, div);
});

it('matches snapshot', () => {
 	const tree = renderer.create(
    	<CountryList/>
	).toJSON();
 	expect(tree).toMatchSnapshot();
});

it('renders with the default country selected', () => {
  const component = renderer.create(<CountryList />);
  const instance = component.getInstance();
  expect(instance.state.selectedCountry).toBe(window.defaultAppSettings.countryKey);
});

it('re-renders with country selected and clears the search text', () => {
  const updateSelectedCountryMock = jest.fn();
  const updateSearchTextMock = jest.fn();
  const { getByText, findByText } = render(<CountryList 
  	updateSelectedCountry={updateSelectedCountryMock}  
    updateSearchText = {updateSearchTextMock}
  />);

  fireEvent.click(getByText('India'));
  expect(updateSelectedCountryMock).toHaveBeenCalled();
  expect(updateSearchTextMock).toHaveBeenCalledWith('');
});

