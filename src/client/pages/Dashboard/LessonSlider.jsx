import React from 'react';
import PropTypes from 'prop-types';

import SliderCard from '../shared/SliderCard';

class LessonSlider extends React.Component {
  constructor(props) {
    super(props);
    const currentPath = props.curriculum.paths[props.user.curPathId];
    const currentCourse = props.curriculum.courses[currentPath.courseIds[0]];
    this.lessonIds = currentCourse.lessonIds;
    const lessons = props.curriculum.lessons;
    this.lastOffset = 0;
    this.offset = 0;
    this.current = 0;
    this.last = 0;
    this.slideRefs = [];
    this.slides = this.lessonIds.map(
      lessonId => (
        <SliderCard
          item={lessons[lessonId]}
          linkTo={lessons[lessonId].url}
          bgColorClass="bg-primary"
          iconClass="fa-graduation-cap margin-left-small"
          history={props.history}
          refCallback={(domElem) => { this.slideRefs[lessonId] = domElem; }}
          key={lessonId}
        />
      ));
  }

  componentDidMount() {
    this.slideRefs[this.lessonIds[this.current]].style.opacity = '1';
    this.slideRefs[this.lessonIds[this.current]].style.transition = 'opacity 0.5s';
  }

  componentDidUpdate() {
    requestAnimationFrame(() => {
      this.sliderRef.style.transform = `translateX(${-this.lastOffset}px)`;
      this.sliderRef.style.transition = 'transform 0s';
      this.slideRefs[this.lessonIds[this.last]].style.opacity = '0.5';
      this.slideRefs[this.lessonIds[this.last]].style.transition = 'opacity 0.5s';
      requestAnimationFrame(() => {
        this.sliderRef.style.transform = `translateX(${-this.offset}px)`;
        this.sliderRef.style.transition = 'transform 0.5s';
        this.slideRefs[this.lessonIds[this.current]].style.opacity = '1';
        this.slideRefs[this.lessonIds[this.current]].style.transition = 'opacity 0.5s';
      });
    });
  }

  handlePrevClick() {
    if (this.current - 1 >= 0) {
      this.last = this.current;
      this.current -= 1;
      this.lastOffset = this.offset;
      this.offset = this.slideRefs[this.lessonIds[this.current]] ?
                    this.slideRefs[this.lessonIds[this.current]].offsetLeft : 0;
      this.forceUpdate();
    }
  }

  handleNextClick() {
    if (this.current + 1 < this.lessonIds.length) {
      this.last = this.current;
      this.current += 1;
      this.lastOffset = this.offset;
      this.offset = this.slideRefs[this.lessonIds[this.current]] ?
                    this.slideRefs[this.lessonIds[this.current]].offsetLeft : 0;
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="slider overflow-hidden">
        <div className="slider__content flex" ref={(domElem) => { this.sliderRef = domElem; }}>
          {this.slides}
        </div>
        <div className="slider__buttons-container flex justify-space-between width-100 margin-top-huge">
          <button className="button--default" onClick={() => this.handlePrevClick()} style={this.current - 1 >= 0 ? {} : { visibility: 'hidden' }}>&larr;</button>
          <button className="button--default" onClick={() => this.handleNextClick()} style={this.current + 1 < this.lessonIds.length ? {} : { visibility: 'hidden' }}>&rarr;</button>
        </div>
      </div>
    );
  }
}

LessonSlider.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default LessonSlider;
