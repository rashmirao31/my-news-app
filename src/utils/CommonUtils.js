var CommonUtils = {

	getConfigList: function() {
		let newsApiUrl = "https://newsapi.org/v2/";
		return {
			"newsApiUrl": newsApiUrl,
			"newsApiTopHeadlinesUrl": newsApiUrl + "top-headlines",
			"newsApiEverythingUrl": newsApiUrl + "everything",
			"apiKey": "687cf8fdc1d7435eb10214b70c78788d",
			"countryKey": "gb",
			"countryName": "United Kingdom",
			"category": "general",
			"timezoneKey": "Europe/London",
			"countryOptions": [
			  { key: 'gb', value: 'gb', flag: 'gb', text: 'United Kingdom' },
			  { key: 'us', value: 'us', flag: 'us', text: 'USA' },
			  { key: 'in', value: 'in', flag: 'in', text: 'India' }
			],
			"countryMenuTitle": "Country:",
			"countryMenuPlaceholder": "Select Country",
			"headerTimeLabel": "Updated at: ",
			"pageTitleSuffixLabel": "News",
			"searchInputPlaceholder": "Search...",
			"searchButtonText": "Search",
			"topStoriesText": "Top Stories",
			"searchResultHeaderText": "Search Results For",
			"loadingText": "Please wait...",
			"noDataText": "No results found",
			"readMoreText": "Read more",
			"errorScenarioText": "Something went wrong. Please try again after sometime."
		};
	},


};

export default CommonUtils;