import React from 'react';
import ReactDOM from 'react-dom';
import CommonUtils from './../utils/CommonUtils';
import PageTitle from './../components/PageTitle.js';

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

beforeEach(() => {
  window.defaultAppSettings = CommonUtils.getConfigList();
  return;
});

afterEach(cleanup);

it('renders without crashing', () => {
 	const div = document.createElement('div');
	ReactDOM.render(<PageTitle />, div);
});

it('matches snapshot', () => {
 	const tree = renderer.create(
    	<PageTitle selectedCountry="India"/>
	).toJSON();
 	expect(tree).toMatchSnapshot();
});

it('renders the title for the country selected', () => {
 	const selectCountry = "India";
 	const { getByTestId } = render(
    	<PageTitle selectedCountry={selectCountry}/>
	);
	expect(getByTestId("page-title")).toHaveTextContent(selectCountry + " " + window.defaultAppSettings.pageTitleSuffixLabel);
});