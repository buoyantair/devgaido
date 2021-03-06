import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import PageHero from '../shared/PageHero';
import TabbedContent from './TabbedContent';
import Metrics from './Metrics';
import InProgressTab from './InProgressTab';
import BookmarkedTab from './BookmarkedTab';
import CompletedTab from './CompletedTab';

const Dashboard = ({ user, curriculum, uiState, history }) => (
  <div>
    <Helmet
      title="Dashboard"
    />
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__dashboard" title="Dashboard">
      <Metrics user={user} curriculum={curriculum} />
    </PageHero>
    <TabbedContent
      content={[{
        caption: 'In Progress',
        content: <InProgressTab curriculum={curriculum} user={user} history={history} />,
      }, {
        caption: 'Bookmarked',
        content: <BookmarkedTab curriculum={curriculum} />,
      }, {
        caption: 'Completed',
        content: <CompletedTab curriculum={curriculum} />,
      }]}
      uiState={uiState}
    />
  </div>
);

Dashboard.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Dashboard;
