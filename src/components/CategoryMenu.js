import React from 'react'
import { Menu } from 'semantic-ui-react';

class CategoryMenu extends React.Component {

  	constructor(props) {
	    super(props);
	    this.state = {
	      activeItem: this.props.selectedCategory,
	      searchText: ''
	    };
	    this.handleItemClick = this.handleItemClick.bind(this);
	    this.onSearchTextChange = this.onSearchTextChange.bind(this);
	    this.onKeyPress = this.onKeyPress.bind(this);
	    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  	};

  	componentDidUpdate(prevProps, prevState) {
  		if (prevProps.selectedCategory !== this.props.selectedCategory) {
  			this.setState({
	  			activeItem: this.props.selectedCategory,
	  			searchText: ''
	  		});
  		}  		
  	};

  	handleItemClick(event, {name}) {
	    this.setState({
	      activeItem: name,
	      searchText: ''
	    });
	    this.props.updateSelectedCategory(name);
  	};

  	handleSearchButtonClick(event) {
  		this.setState({
	      activeItem: ''
	    });
	    this.props.updateSelectedCategory('');
	    this.props.updateSearchText(this.state.searchText);
  	};

  	onSearchTextChange(event) {
  		this.setState({
	      searchText: event.target.value
	    });
  	};

  	onKeyPress(event) {
  		var enterKeyCode = 13;
  		var keyCodeEntered = event.keyCode || event.which; 		

	    if (keyCodeEntered === enterKeyCode) {
  			this.handleSearchButtonClick();
  		}
  	};

  	render() {
    	const { activeItem } = this.state;

    	return (
	      	<div className='ui container' data-testid='category-menu'>
		        <Menu pointing>
		          <Menu.Item
		            name='general'
		            active={activeItem === 'general'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Item
		            name='health'
		            active={activeItem === 'health'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Item
		            name='business'
		            active={activeItem === 'business'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Item
		            name='technology'
		            active={activeItem === 'technology'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Item
		            name='sports'
		            active={activeItem === 'sports'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Item
		            name='entertainment'
		            active={activeItem === 'entertainment'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Item
		            name='science'
		            active={activeItem === 'science'}
		            onClick={this.handleItemClick}
		          />
		          <Menu.Menu position='right'>
		            <Menu.Item>		              
		            	<input type='text' 
		            		data-testid='search-input'
		            		placeholder={window.defaultAppSettings.searchInputPlaceholder} 
		            		value={this.state.searchText} 
		            		onKeyPress={this.onKeyPress} 
		            		onChange={this.onSearchTextChange}
		            	/>
		            	<button onClick={this.handleSearchButtonClick}
		            		data-testid='search-button'>
		            		{window.defaultAppSettings.searchButtonText}
		            	</button>
		            </Menu.Item>
		          </Menu.Menu>
		        </Menu>
	      	</div>
	    );
  	};
  
}

export default CategoryMenu