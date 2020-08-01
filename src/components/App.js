import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './../index.css'
import Header from './Header.js';
import PageTitle from './PageTitle.js';
import CategoryMenu from './CategoryMenu.js';
import TopStories from './TopStories.js';

class App extends React.Component {
	constructor(props) {
	    super(props);	    
	    this.state = {
	      currentSelectedCountryKey: window.defaultAppSettings.countryKey,
	      currentSelectedCountryName: window.defaultAppSettings.countryName,
	      currentSelectedCategory: window.defaultAppSettings.category,
	      searchText: ''
	    };
	    this.updateSelectedCountry = this.updateSelectedCountry.bind(this);
	    this.updateSelectedCategory = this.updateSelectedCategory.bind(this);
	    this.updateSearchText = this.updateSearchText.bind(this);
	};

	updateSelectedCountry(event, selectedCountryKey) {
	    this.setState({
	      currentSelectedCountryKey: selectedCountryKey,
	      currentSelectedCountryName: event.target.textContent,
	      currentSelectedCategory: window.defaultAppSettings.category,
	      searchText: ''
	    });
	};

	updateSelectedCategory(selectedCategory) {
		this.setState({
			currentSelectedCategory: selectedCategory
		});
	};

	updateSearchText(searchText) {
		this.setState({
			searchText: searchText
		});
	};

	render() {
		const updatedTime = Math.round((new Date()).getTime() / 1000);

		return (		
			<div>
				<div className='sticky'>
					<Header
						updatedTime={updatedTime} 
						updateSelectedCountry={this.updateSelectedCountry}
						updateSearchText={this.updateSearchText}						
					/>
					<PageTitle selectedCountry={this.state.currentSelectedCountryName}/>
	        		<CategoryMenu 
	        			selectedCountry={this.state.currentSelectedCountryName}
	        			selectedCategory={this.state.currentSelectedCategory}
	        			updateSelectedCategory={this.updateSelectedCategory}
	        			updateSearchText={this.updateSearchText}
	        		/>
        		</div>
        		<TopStories
		        	selectedCategory={this.state.currentSelectedCategory}
		        	selectedCountry={this.state.currentSelectedCountryKey}
		        	searchText={this.state.searchText}
		        />
			</div>
		);
	};
};

export default App