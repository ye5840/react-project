import {GET_CHAPTER_LIST,GET_ALL_COURSE,GET_LESSON_LIST} from './constants'
const initChapter = {
  allCourseList:[],
  chapterList:[]
}
export default function subjectList(prevState = initChapter, action) {
  // console.log(action.data)
  switch (action.type) {
    case GET_CHAPTER_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return{
        ...prevState,
        chapterList:action.data.items
      }
    case GET_ALL_COURSE:
      return{
        ...prevState,
        allCourseList:action.data
      }
    case GET_LESSON_LIST:
      const newChapterList = [...prevState.chapterList]
      newChapterList.forEach(item => {
        if(item._id === action.data.chapterId){
          item.children = action.data.res
        }
      })
      return{
        ...prevState,
        chapterList:newChapterList
      }
    default:
      return prevState
  }
}
