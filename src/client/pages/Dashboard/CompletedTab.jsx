import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ItemList from './ItemList';

const getCompletedItems = (allItems) => {
  const items = Object.keys(allItems).filter(itemId => allItems[itemId].completed).map(
    itemId => (allItems[itemId]),
  );
  return items;
};

const CompletedTab = ({ curriculum }) => {
  const completedPaths = getCompletedItems(curriculum.paths);
  const completedLessons = getCompletedItems(curriculum.lessons);

  return (
    <div className="bookmarked-tab margin-bottom-huge">
      <span>RESOURCES</span>
      <h2>Completed</h2>
      { completedPaths.length !== 0 ?
        <ItemList items={completedPaths} curriculum={curriculum} category="paths" /> : null }
      {
        completedLessons.length !== 0 ?
          <ItemList items={completedLessons} curriculum={curriculum} category="lessons" /> : null }
      { completedLessons.length + completedPaths.length <= 0 ?
        <div className="center margin-top-huge">
          <h3>You haven&apos;t completed anything yet.</h3>
          <Link className="button button--primary uppercase" to="/library">Browse Library</Link>
        </div> : null }
    </div>
  );
};

CompletedTab.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default CompletedTab;
