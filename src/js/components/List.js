import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Item from './Item';
import Images from './Images';


export default class List extends Component {
  state = {
    itemActive: 0
  };
  
  setActive = (index, articles) => {
    this.setState({
      itemActive: index
    });
  }
  
  render() {
    const {articles} = this.props;
    
    const Items = articles.map((article, index) => <Item article = {article} key = {article.id} onClick = {this.setActive.bind(this, index, article)} active = {this.state.itemActive === index} />);
    
    const Imgs = articles.map((article, index) => <Images article = {article} key = {article.id} active = {this.state.itemActive === index} />);
        
    return (
      <div>
        <div className = 'images'>                    
          {Imgs}
        </div>
        <div className = 'list'>
          {Items}
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const listElem = document.querySelector('.list');
    const closedItem = document.querySelectorAll('.list__item');
    const closedImg = document.querySelectorAll('.images__item');
    
    for (let i = 0; i < closedItem.length; i++) {
      closedItem[i].classList.remove('closed');
      closedImg[i].classList.remove('closed');
    }
    
    if (!closedItem[prevState.itemActive].classList.contains('active')) {
      closedItem[prevState.itemActive].classList.add('closed');
      closedImg[prevState.itemActive].classList.add('closed');
    }
    
    if (this.state.itemActive <= prevState.itemActive) {
      listElem.classList.add('list_up');
    } else {
      listElem.classList.remove('list_up');
    }
  }
}

List.PropTypes = {
  articles: PropTypes.object.isRequired
};
