import React from 'react';
import ReactDOM from 'react-dom';
import CommonUtils from './../utils/CommonUtils';
import Header from './../components/Header.js';

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
	ReactDOM.render(<Header />, div);
});

it('matches snapshot', () => {
 	const tree = renderer.create(
    	<Header/>
	).toJSON();
 	expect(tree).toMatchSnapshot();
});

it('renders with the updated time header label', () => {
 	const { getByText } = render(
    	<Header />
	);
	const updatedTimeLabel = window.defaultAppSettings.headerTimeLabel.trim();
	expect(getByText(updatedTimeLabel)).toBeVisible();
});

it('renders with the country menu title', () => {
 	const { getByText } = render(
    	<Header />
	);
	const countryMenuTitle = window.defaultAppSettings.countryMenuTitle;
	expect(getByText(countryMenuTitle)).toBeInTheDocument();
});

it('renders with the country list', () => {
 	const { getByTestId } = render(
    	<Header />
	);
	const element = getByTestId('country-list');
	expect(element).toBeInTheDocument();
});

it('renders with the updated time', () => {
 	const updatedTime = Math.round((new Date()).getTime() / 1000);
 	const { getByTestId } = render(
    	<Header updatedTime={updatedTime}/>
	);
	const element = getByTestId('time-label');
	expect(element).not.toHaveTextContent('Invalid date');
});