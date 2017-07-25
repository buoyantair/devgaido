import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import MilestoneCard from './MilestoneCard';
import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { LinkCard } from '../shared/Cards';
import DisqusThread from '../shared/DisqusThread';

import actions from '../../actions';

const { addBookmark, removeBookmark } = actions;

const typeIcons = {
  Reading: 'fa-book',
  'Supplemental Course': 'fa-university',
  Project: 'fa-cogs',
};

const PathMarker = ({ text, dotClass, iconClass }) => (
  <div className={`path-marker relative ${dotClass} flex align-items-center bg-grey border-round margin-top-big`}>
    <h2 className="path-marker__text flex-1 uppercase no-margin c-white bold">{text}</h2>
    {iconClass ? <i className={`fa ${iconClass} absolute c-white h1 `} /> : null}
  </div>);

const Path = ({ match, curriculum, user }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];
  let milestones = null;

  if (path.courseIds.length > 1) {
    milestones = path.courseIds.map((courseId, index) => {
      const course = curriculum.courses[courseId];
      const lessons = course.lessonIds.map((lessonId) => {
        const lesson = curriculum.lessons[lessonId];
        return (
          <LinkCard
            item={lesson}
            linkTo={lesson.url}
            bgColorClass={`relative dot ${lesson.complete ? '' : 'dot--empty'} dot--displace bg-secondary`}
            iconClass={typeIcons[lesson.type]}
            key={lessonId}
            connectionClass="connected--secondary"
            imgSrc={`/screenshots/${lessonId}.jpg`}
          />);
      });

      return <MilestoneCard index={index} course={course} lessons={lessons} key={courseId} />;
    });
  } else {
    const course = curriculum.courses[path.courseIds[0]];
    const lessons = course.lessonIds.map((lessonId) => {
      const lesson = curriculum.lessons[lessonId];
      return (
        <LinkCard
          item={lesson}
          linkTo={lesson.url}
          bgColorClass={`relative no-milestone dot ${lesson.completed ? '' : 'dot--empty'} dot--displace bg-secondary`}
          iconClass={typeIcons[lesson.type]}
          key={lessonId}
          connectionClass="connected--secondary"
          imgSrc={`/screenshots/${lessonId}.jpg`}
        />);
    });
    milestones = lessons;
  }

  const ratingStars = [];
  for (let i = 0; i < path.rating; i += 1) {
    ratingStars.push(<i className="fa fa-star c-secondary h4 margin-left-tiny" />);
  }
  console.log(path.estimatedTime);
  return (
    <div>
      <Helmet
        title={`Path: ${path.name}`}
        meta={[
          { name: 'description', content: path.description },
        ]}
      />
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" bgUrl={`/paths/${pathId}.jpg`} title={path.name}>
        {pathId === user.curPathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path]} /> :
          <BreadCrumbs rootNode={{ name: 'Paths', url: '/library' }} nodes={[path]} />}
        <i className="fa fa-road c-white h0 abs-top-right" />
        {path.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      <div className="">
        <div className="container flex bg-white padding-horizontal-big border-round margin-top-small">
          <div className="padding-vertical-big">
            <h2>About This Path</h2>
            <p className="h5">{path.description}</p>
            <h3 className="margin-top-big">GOAL</h3>
            <p className="h5">Becoming a confident web developer ready to apply for junior positions.</p>
          </div>
          <div className="padding-vertical-big margin-left-huge">
            { user.authenticated ?
              <div className="right margin-bottom-big">
                {!path.bookmarked ?
                  <button className="button--default uppercase" onClick={() => addBookmark(pathId, 'paths', path.version)}>Bookmark</button> :
                  <button className="button--default uppercase" onClick={() => removeBookmark(pathId, 'paths', path.version)}>Remove Bookmark</button>}
              </div> :
              <div className="right margin-bottom-big">
                <button className="button--default uppercase hidden">Bookmark</button>
              </div> }
            <div className="flex justify-space-between">
              <h5 className="normal">Rating</h5>
              <div>
                {ratingStars}
              </div>
            </div>
            <div className="flex justify-space-between">
              <h5 className="normal">Estimated Length</h5>
              <div>
                <h4 className="c-primary uppercase right no-margin">Very Long</h4>
                <h5 className="c-primary uppercase right">(> 100 hours)</h5>
              </div>
            </div>
            <div className="flex justify-space-between">
              <h5 className="normal">Tags</h5>
              <div className="width-50 right">
                {path.subjectNames.map(
                  subjectName => <h6 className="tag center c-primary border-pill border-1px border-primary display-inline-block">{subjectName}</h6>,
                )}
              </div>
            </div>
            <div className="flex justify-space-between margin-top-big">
              <h5 className="normal">Estimated Entry Salary</h5>
              <div className="right">
                <h2 className="c-primary right no-margin margin-left-big">~ $35,000 / year</h2>
                <a href="/">(Source: Monster.com)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex">
        <div className="path-node flex-column align-items-center">
          <div className="path-node__connection flex-1">
            <p className="hidden">content</p>
          </div>
        </div>
        <div className="container flex-column">
          <PathMarker
            text={`Path Start: ${path.name}`}
            iconClass="path-marker__start-icon fa-map-marker"
            dotClass="dot--big"
          />
          <div className="margin-top-small">
            {milestones}
          </div>
          <PathMarker
            text={'Path Completion'}
            dotClass="dot--big dot--empty"
          />
        </div>
      </div>
      <div className="container">
        {user.authenticated ? <hr /> : null}
        {user.authenticated ?
          <DisqusThread
            id={`/path-${pathId}`}
            title={path.name}
            path={path.url}
          /> : null}
      </div>
    </div>
  );
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;
