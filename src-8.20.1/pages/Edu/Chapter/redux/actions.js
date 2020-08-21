import {reqGetChapterList} from '@api/edu/chapter'
import {reqGetAllCourse} from '@api/edu/course'
import {reqGetLessonList} from '@api/edu/lesson'
import {GET_CHAPTER_LIST,GET_ALL_COURSE,GET_LESSON_LIST} from './constants'
/**
 * 获取章节分页列表
 */
function getChapterListSync(data){
  return {type:GET_CHAPTER_LIST,data}
}

export function getChapterList(courseId) {
  return dispatch => {
    return reqGetChapterList(courseId).then(res => {
      dispatch(getChapterListSync(res))
    })
  }
}

/**
 * 获取所有课程列表
 */
function getCourseListSync(data){
  return {type:GET_ALL_COURSE,data}
}

export function getCourseList() {
  return dispatch => {
     reqGetAllCourse().then(res => {
      dispatch(getCourseListSync(res))
    })
  }
}

function getLessonListSync(data){
  return {type:GET_LESSON_LIST,data}
}

export function getLessonList(chapterId) {
  return dispatch => {
    reqGetLessonList(chapterId).then(res => {
      dispatch(getLessonListSync({res,chapterId}))
    })
  }
}

