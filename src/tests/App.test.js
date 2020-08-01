import React from 'react';
import ReactDOM from 'react-dom';
import CommonUtils from './../utils/CommonUtils';
import App from './../components/App.js';

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
	ReactDOM.render(<App />, div);
});

it('renders with the Header component', () => {
  const component = renderer.create(<App />);
  const testInstance = component.root;
  const { getByTestId } = render(
      <App />
  );
  expect(getByTestId("header-menu")).toBeInTheDocument();
});

it('renders with the CountryList component', () => {
  const component = renderer.create(<App />);
  const testInstance = component.root;
  const { getByTestId } = render(
      <App />
  );
  expect(getByTestId("country-list")).toBeInTheDocument();
});

it('renders with the PageTitle component', () => {
  const component = renderer.create(<App />);
  const testInstance = component.root;
  const { getByTestId } = render(
      <App />
  );
  expect(getByTestId("page-title")).toBeInTheDocument();
});

it('renders with the CategoryMenu component', () => {
  const component = renderer.create(<App />);
  const testInstance = component.root;
  const { getByTestId } = render(
      <App />
  );
  expect(getByTestId("category-menu")).toBeInTheDocument();
});

it('renders with the TopStories component', () => {
  const component = renderer.create(<App />);
  const testInstance = component.root;
  const { getByTestId } = render(
      <App />
  );
  expect(getByTestId("top-stories")).toBeInTheDocument();
});


