import React from 'react';
import { Container, Header } from 'semantic-ui-react';

class TopStories extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	error: null,
			isLoaded: false,
			items: [],
			totalResults: 0,
			headerText: window.defaultAppSettings.topStoriesText
		};
		this.fetchNews = this.fetchNews.bind(this);
		this.shouldFetchNews = this.shouldFetchNews.bind(this);
		this.formUrlForSelectedCategory = this.formUrlForSelectedCategory.bind(this);
		this.formUrlForSearchText = this.formUrlForSearchText.bind(this);
		this.getUrlAndHeaderText = this.getUrlAndHeaderText.bind(this);
	 };  

  	componentDidMount() {
  		let url = window.defaultAppSettings.newsApiTopHeadlinesUrl + "?country=" + this.props.selectedCountry +
		"&category=" + this.props.selectedCategory + "&apiKey=" + window.defaultAppSettings.apiKey;
		let headerText = window.defaultAppSettings.topStoriesText + ": " + this.props.selectedCategory;	
		this.setState({
			headerText: headerText
		});
  		this.fetchNews(url);
  	};

  	componentDidUpdate(prevProps, prevState) {
		if (this.shouldFetchNews(prevProps)) {
		    let urlAndHeaderText = this.getUrlAndHeaderText();
		    this.setState({
				isLoaded: false,
				error: null,
				items: [],
				headerText: urlAndHeaderText.headerText
			});
		    this.fetchNews(urlAndHeaderText.url);
	  	}
	};

	shouldFetchNews(prevProps) {
		for( var prop in prevProps) { 
			if (prevProps[prop] !== this.props[prop]) {
				return true;
			}
		}

		return false;
	};

	getUrlAndHeaderText() {
		let urlAndHeaderText = {};
		if (this.props.selectedCategory) {
			urlAndHeaderText.headerText = window.defaultAppSettings.topStoriesText + ": " + this.props.selectedCategory;
			urlAndHeaderText.url = this.formUrlForSelectedCategory();	
		} else {
			urlAndHeaderText.headerText =  window.defaultAppSettings.searchResultHeaderText + ": " + this.props.searchText;
			urlAndHeaderText.url = this.formUrlForSearchText();	
		}

		return urlAndHeaderText;
	};

	formUrlForSelectedCategory() {
		return window.defaultAppSettings.newsApiTopHeadlinesUrl + "?country=" + this.props.selectedCountry +
			"&category=" + this.props.selectedCategory + "&apiKey=" + window.defaultAppSettings.apiKey;
	};

	formUrlForSearchText() {
		return window.defaultAppSettings.newsApiEverythingUrl + "?q=" + 
			this.props.searchText + "&apiKey=" + window.defaultAppSettings.apiKey;
	};

	fetchNews(url) {		
  		fetch(url)
		.then(response => response.json())
		.then(
			(result) => {
			  this.setState({
			    isLoaded: true,
			    items: result.articles,
			    totalResults: result.totalResults
			  });
			},
			(error) => {
			  this.setState({
			    isLoaded: true,
			    error: error
			  });
			}
		)
  	};

  	render() {
		const { error, isLoaded, items, totalResults, headerText } = this.state;
		if (error) {
		  	return (
			  	<Container data-testid='top-stories'>
					<Header as='h2'>Error: {error.message}</Header>
					<Header as='h3' className='errorScenarioStyle'>{window.defaultAppSettings.errorScenarioText}</Header>
				</Container>
			);
		} else if (!isLoaded) {
		  	return (
		  		<div className='loadingIndicator' data-testid='top-stories'>
		  			{window.defaultAppSettings.loadingText}
		  		</div>
		  	);
		} else if (isLoaded && (totalResults===0)) {
			return (
			    <Container data-testid='top-stories'>
				    <Header as='h2'>{headerText}</Header>
				    <Header as='h5'>{window.defaultAppSettings.noDataText}</Header>
				</Container>
		  	);
		} else if (isLoaded && (totalResults>100)) {
			return (
			    <Container data-testid='top-stories'>
				    <Header as='h2'>{headerText}</Header>
				    <ul>
				      	{items.map((item, index) => (
						        <li key={index} className='thumbNailsStyle'>
						          <img src={item.urlToImage} className='compactImgStyle' alt={item.title}/>
						          <div>
								    <Header as='h5' floated='left'>{item.title}</Header>
								    <a href={item.url} target='blank'>{window.defaultAppSettings.readMoreText}</a>
								  </div>
								  <div className='clearFloat'></div>
						        </li>
				      		))
				      	}
				    </ul>
				</Container>
		  	);
		} else if (isLoaded && (totalResults>0)) {
		  	return (
			    <Container data-testid='top-stories'>
				    <Header as='h2'>{headerText}</Header>
				    <ul>
				      	{items.map((item, index) => (
						        <li key={index} className='topStoriesStyle'>
						          <Header as='h3'>{item.title}</Header>
						          <img src={item.urlToImage} className='imgStyle' alt={item.title}/>
						          <Header as='h4'>{item.description}</Header>
								  <div>  
								    <Header as='h5'>{item.content}</Header>
								    <a href={item.url} target='blank'>{window.defaultAppSettings.readMoreText}</a>
								   </div>
								  <div className='clearFloat'></div>
						        </li>
				      		))
				      	}
				    </ul>
				</Container>
		  	);
		}

		return (
			<Container data-testid='top-stories'>
				<Header as='h2'>{headerText}</Header>
				<Header as='h3' className='errorScenarioStyle'>{window.defaultAppSettings.errorScenarioText}</Header>
			</Container>
		);
	};
  
}

export default TopStories