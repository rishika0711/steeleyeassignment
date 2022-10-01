// import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import {itemList} from './list';

// Answers 
/**
 *  1. We are trying to wrap wrappedListComponent with memo in order to memoise the component
 *     The purpose of the List function is bascially to render the list items
 *  2. There were few code issues such as 
 *      - Key was not passed for the items component. (Warning)
 *      - We were using useState in the wrong way, state and set function were interchanged.
 *      - We were calling the function (handleClick) in the SingleListItem in onClick props component instead of just passing it as a prop.
 *      - Proptype was giving error when we were trying to use shape of function with array so I modified it with the correct props type
 */


// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      // we just need to pass the the value as prop we don't need to execute it
      onClick={onClickHandler} 
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          //to handle the color of the selected item
          isSelected={selectedIndex === index}
          // to avoid the warning of unique key 
           key={index.toString()} 
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

/**
 * We are trying to wrap wrappedListComponent with memo in order to memoise the component
 * The purpose of the List function is bascially to render the list items
 */
const List = memo(WrappedListComponent);

  

function App() {
  return (
    <div className="App">
    <List items={itemList} />
    </div>
  );
}





export default App;
