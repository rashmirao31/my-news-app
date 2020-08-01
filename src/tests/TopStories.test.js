import React from 'react';
import ReactDOM from 'react-dom';
import CommonUtils from './../utils/CommonUtils';
import TopStories from './../components/TopStories.js';

import { render, cleanup, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

beforeAll(() => jest.spyOn(window, 'fetch'));

beforeEach(() => {
  window.defaultAppSettings = CommonUtils.getConfigList(); 
  jest.clearAllMocks();
  return;
});

afterEach(cleanup);

it('renders without crashing', () => {
 	const div = document.createElement('div');
	ReactDOM.render(<TopStories />, div);
});

it('matches snapshot', () => {
 	const tree = renderer.create(
    	<TopStories/>
	).toJSON();
 	expect(tree).toMatchSnapshot();
});

it('renders with the loading text label when it is still loading', () => {
 	const { getByText } = render(
    	<TopStories />
	);
	const loadingText = window.defaultAppSettings.loadingText;
	expect(getByText(loadingText)).toBeVisible();
});

it("renders with no data text when response returns no data", async () => {
    window.fetch.mockResolvedValueOnce({
	    ok: true,
	    json: async () => ({"status":"ok","totalResults":0,"articles":[]}),
	});
	render(<TopStories />);
    await wait(() => expect(screen.getByText(window.defaultAppSettings.noDataText)).toBeInTheDocument());
 });

it("renders with valid data when response returns data", async () => {
    window.fetch.mockResolvedValueOnce({
	    ok: true,
	    json: async () => ({"status":"ok","totalResults":1,"articles":[{"source":{"id":"politico","name":"Politico"},"author":null,"title":"New Trump financial disclosure gives glimpse into pre-pandemic business income - POLITICO","description":"The 78-page report provides a glimpse into the president’s debts and how his properties are performing.","url":"https://www.politico.com/news/2020/07/31/trump-2019-financial-disclosure-report-389953","urlToImage":"https://static.politico.com/1d/40/5a15bf9a4efb97960f703164693d/200731-maralago-ap-773.jpg","publishedAt":"2020-08-01T03:45:00Z","content":"The Trump International Hotel in Washington, which has become a prime meeting spot for administration officials and a source of controversy since opening in 2016, reported $40.5 million in revenue co… [+1753 chars]"}]}),
	});
	render(<TopStories />);
	await wait(() => expect(screen.getByText(window.defaultAppSettings.readMoreText)).toBeInTheDocument());
 });

it('renders with the selected category', async () => {
 	window.fetch.mockResolvedValueOnce({
	    ok: true,
	    json: async () => ({"status":"ok","totalResults":0,"articles":[]}),
	});
 	const { getByText } = render(
    	<TopStories
        	selectedCategory={window.defaultAppSettings.category}
        	selectedCountry={window.defaultAppSettings.countryKey}
        	searchText={''}
        />
	);
	const topStoriesHeader = window.defaultAppSettings.topStoriesText + ": " + window.defaultAppSettings.category;	
	await wait(() => expect(screen.getByText(topStoriesHeader)).toBeInTheDocument());
});

it('renders with the search text in the title', async () => {
 	const searchText = "Thank You";
 	const topStoriesHeader = window.defaultAppSettings.searchResultHeaderText + ": " + searchText;
 	window.fetch.mockResolvedValueOnce({
	    ok: true,
	    json: async () => ({"status":"ok","totalResults":0,"articles":[]}),
	});

	const { getByText, rerender  } = render(
    	<TopStories
        	selectedCategory={window.defaultAppSettings.category}
        	selectedCountry={window.defaultAppSettings.countryKey}
        	searchText=''
        />
	);

	await wait(() => expect(screen.queryByText(topStoriesHeader)).not.toBeInTheDocument());

 	jest.clearAllMocks();

 	window.fetch.mockResolvedValueOnce({
	    ok: true,
	    json: async () => ({"status":"ok","totalResults":0,"articles":[]}),
	});

 	rerender(
    	<TopStories
        	selectedCategory=''
        	selectedCountry=''
        	searchText={searchText}
        />
	);
		
	await wait(() => expect(screen.getByText(topStoriesHeader)).toBeInTheDocument());
});


it('renders with the error scneario text when api call returns an error', async () => {
 	window.fetch.mockResolvedValueOnce({
	    ok: false,
	    json: async () => ({"status":"error"}),
	});
 	const { getByText } = render(
    	<TopStories />
	);
	
	await wait(() => expect(screen.getByText(window.defaultAppSettings.errorScenarioText)).toBeInTheDocument());
});

