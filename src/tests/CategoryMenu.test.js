import React from 'react';
import ReactDOM from 'react-dom';
import CommonUtils from './../utils/CommonUtils';
import CategoryMenu from './../components/CategoryMenu.js';

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
	ReactDOM.render(<CategoryMenu />, div);
});

it('matches snapshot', () => {
 	const tree = renderer.create(
    	<CategoryMenu/>
	).toJSON();
 	expect(tree).toMatchSnapshot();
});

it('renders with the default category', () => {
 	const { getByText } = render(
    	<CategoryMenu />
	);
	let defaultCategory = window.defaultAppSettings.category;
	defaultCategory = defaultCategory.substring(0,1).toUpperCase() + defaultCategory.substring(1);
	expect(getByText(defaultCategory)).toBeVisible();	
});

it('renders with the search button', () => {
 	const { getByText } = render(
    	<CategoryMenu />
	);
	let searchButtonText = window.defaultAppSettings.searchButtonText;
	expect(getByText(searchButtonText)).toBeVisible();
});

it('renders with the input textbox', () => {
 	const { getByTestId } = render(
    	<CategoryMenu />
	);
	expect(getByTestId("search-input")).toBeVisible();
});

it('renders with the selected category', () => {
 	const selectedCategory = "entertainment";
 	const component = renderer.create(
    	<CategoryMenu selectedCategory={selectedCategory}/>
	);
	const instance = component.getInstance();
  	expect(instance.state.activeItem).toBe(selectedCategory);
});

it('re-renders with selected category', () => {
	const selectedCategory = "health";
	let selectedCategoryName = selectedCategory.substring(0,1).toUpperCase() + selectedCategory.substring(1);
	const updateSelectedCategoryMock = jest.fn();
	const updateSearchTextMock = jest.fn();
	const { getByText } = render(<CategoryMenu 
		selectedCategory={window.defaultAppSettings.category}  
		updateSelectedCategory = {updateSelectedCategoryMock}
	/>);

	fireEvent.click(getByText(selectedCategoryName));
	expect(updateSelectedCategoryMock).toHaveBeenCalledWith(selectedCategory);
});

it('re-renders by passing the text searched to its parent', () => {
 	const updateSelectedCategoryMock = jest.fn();
 	const updateSearchTextMock = jest.fn();
 	const searchText = "God";
 	const { getByTestId } = render(<CategoryMenu 
		selectedCategory={window.defaultAppSettings.category}
		updateSelectedCategory={updateSelectedCategoryMock}
		updateSearchText={updateSearchTextMock}
	/>);
	fireEvent.change(getByTestId("search-input"), { target : { value: searchText}});
	fireEvent.click(getByTestId("search-button"));
  	expect(updateSearchTextMock).toHaveBeenCalledWith(searchText);
});

it('removes category selection when anything is searched', () => {
 	const updateSelectedCategoryMock = jest.fn();
 	const updateSearchTextMock = jest.fn();
 	const { getByTestId } = render(<CategoryMenu 
		selectedCategory={window.defaultAppSettings.category}
		updateSelectedCategory={updateSelectedCategoryMock}
		updateSearchText={updateSearchTextMock}
	/>);
	fireEvent.click(getByTestId("search-button"));
  	expect(updateSelectedCategoryMock).toHaveBeenCalledWith('');
});