import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import { setCurrentPath } from '../../actions/userActions';
import { addBookmark, removeBookmark } from '../../actions/curriculumActions';
import { completeLesson } from './LessonActions';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, PreviewCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';

const Lesson = ({ match, dispatch, curriculum }) => {
  const pathId = match.params.pid;
  const courseId = match.params.cid;
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subjects = lesson.subjects.map(subjectId => curriculum.subjects[subjectId]);
  const linkTo = `/paths/${pathId}/${courseId}/${lessonId}`;

  return (
    <div>
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" title={lesson.name}>
        <BreadCrumbs
          curriculum={curriculum}
          pathId={match.params.pid}
          courseId={match.params.cid}
          lessonId={match.params.id}
        />
        <i className="fa fa-graduation-cap c-white h0 abs-top-right" />
        {lesson.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      <PageDivider>
        <button className="button--primary hidden">Bookmark Lesson</button>
        <div className="flex width-100 justify-center">
          <a className="button button--secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => dispatch(setCurrentPath(match.params.pid, match.params.cid, match.params.id))}>START LESSON</a>
          <button className="button--primary margin-left-small" onClick={() => dispatch(completeLesson(lessonId, lesson.url))}>COMPLETE LESSON</button>
        </div>
        {!lesson.bookmarked ?
          <button className="button--primary" onClick={() => dispatch(addBookmark(lessonId, 'lessons', lesson.url))}>Bookmark Lesson</button> :
          <button className="button--secondary" onClick={() => dispatch(removeBookmark(lessonId, 'lessons', lesson.url))}>Remove Bookmark</button>}
      </PageDivider>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={lesson} bgColorClass="bg-primary">
              {subjects.map(
                subject => <div key={subject.name}>
                  <p>{subject.name}</p>
                  <p>{subject.description}</p>
                </div>)}
            </InfoCard>
          </div>
          <div className="grid-half">
            <PreviewCard bgColorClass="bg-secondary">
              <img className="preview-img" src={lesson.externalSource !== '' ? `/screenshots/${lessonId}.jpeg` : ''} alt={lesson.name} />
            </PreviewCard>
          </div>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/lesson-${lessonId}`}
          title={lesson.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
      </div>
    </div>
  );
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Lesson;
