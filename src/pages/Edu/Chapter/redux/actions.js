import {reqGetAllCourse} from '@api/edu/course'
import { reqGetChapterList,reqBatchRemoveChapterList } from '@api/edu/chapter'
import {reqGetLessonList,reqBatchRemoveLessonList} from '@api/edu/lesson'
import {GET_ALL_COURSE,GET_CHAPTER_LIST,GET_LESSON_LIST,REMOVE_LESSONS,REMOVE_CHAPTERS} from './constants'

//获取课程
function getCourseListSync(data){
  return {type:GET_ALL_COURSE,data}
}

export function getCourseList(){
  return dispatch => {
    reqGetAllCourse().then(res => {
      dispatch(getCourseListSync(res))
    })
  }
}
//获取章节列表
function getChapterListSync(data){
  return {type:GET_CHAPTER_LIST,data}
}

export function getChapterList(courseId){
  return dispatch => {
    return reqGetChapterList(courseId).then(res => {
      dispatch(getChapterListSync(res))
    })
  }
}

//获取课时列表
function getLessonListSync(data){
  return {type:GET_LESSON_LIST,data}
}

export function getLessonList(chapterId){
  return dispatch => {
    return reqGetLessonList(chapterId).then(res => {
      dispatch(getLessonListSync({res,chapterId}))
    })
  }
}

//批量删除课时
function delLessonListSync(data){
  return {type:REMOVE_LESSONS,data}
}

export function delLessonList(lessonIds){
  return dispatch => {
    return reqBatchRemoveLessonList(lessonIds).then(res => {
      dispatch(delLessonListSync(lessonIds))
    })
  }
}

// 批量删除章节
// 同步action
function delChapterListSync(data) {
  return { type: REMOVE_CHAPTERS, data }
}

export function delChapterList(chapterIds) {
  return dispatch => {
    return reqBatchRemoveChapterList(chapterIds).then(res => {
      dispatch(delChapterListSync(chapterIds))
    })
  }
}