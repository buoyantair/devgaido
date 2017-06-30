/* eslint-disable import/prefer-default-export */

export function setCurrentPath(pathId, courseId, lessonId) {
  return {
    type: 'SET_CURRENT_PATH',
    pathId,
    courseId,
    lessonId,
  };
}

export function addBookmark(pathId) {
  return {
    type: 'ADD_BOOKMARK',
    pathId,
  };
}

export function removeBookmark(pathId) {
  return {
    type: 'REMOVE_BOOKMARK',
    pathId,
  };
}
