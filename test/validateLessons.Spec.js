/* eslint-disable func-names no-console */
require('./registerBabel');

import { validateIdComposition, validateIdLength } from './commonValidations';
import coreLessons from '../src/server/models/corelessons.json';
import coreSubjects from '../src/server/models/coresubjects.json';

const assert = require('assert');

/**
 * Check the validity of the corecourses.json file
 */
describe('Validate corelessons.json', () => {
  describe('Validate lesson id length', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Lesson id ${id} > 16 characters`);
      });
      invalidLessonIds = [];
    });
    it('should verify that lesson ids are <= 16 characters', () => {
      invalidLessonIds = validateIdLength(coreLessons);
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate lesson id composition', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Lesson id ${id} contains invalid characters`);
      });
      invalidLessonIds = [];
    });
    it('should verify that lesson ids contain only lowercase letters and digits', () => {
      invalidLessonIds = validateIdComposition(coreLessons);
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate lesson ids in the course exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Lesson id ${id[0]} contains unknown subject id ${id[1]}`);
      });
      invalidIds = [];
    });
    it('should verify that subject ids exist', () => {
      Object.values(coreLessons).forEach((currentLesson) => {
        if (coreSubjects[currentLesson.subject] === undefined) {
          invalidIds.push([currentLesson.id, currentLesson.subject]);
        }
      });
      assert.equal(invalidIds.length, 0);
    });
  });
});