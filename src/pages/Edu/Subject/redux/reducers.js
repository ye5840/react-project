import {GET_SUBJECT_LIST,GET_SEC_SUBJECT_LIST,UPDATE_SUBJECT,DELETE_SUBJECT} from "./constants";

const initUserList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList(prevState = initUserList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data;
    case GET_SEC_SUBJECT_LIST:
      const SecItems = action.data.items
      const FirItems = prevState.items
      SecItems.length && FirItems.forEach(item => {
        if(item._id === SecItems[0].parentId){
          item.children = SecItems
        }
      }) 
      
      return{
        ...prevState,
        items:FirItems
      }
    case UPDATE_SUBJECT:
      prevState.items.forEach(item => {
        if(item._id === action.data.id){
          item.title = action.data.title
          return
        }
        item.children.forEach(secItem => {
          if(secItem._id === action.data.id){
            secItem.title = action.data.title
            return 
          }
        })
      })
      return {
        ...prevState
      }
    case DELETE_SUBJECT:
      const FirstSubjects = [...prevState.items]
      FirstSubjects.forEach((item,index) => {
        if(item._id === action.data){
          FirstSubjects.splice(index,1)
          return
        }
        item.children.forEach((secItem,index) => {
          if(secItem._id === action.data){
            item.children.splice(index,1)
          }
        })
      })
    return{
      ...prevState,
      items:FirstSubjects
    }
    default:
      return prevState;
  }
}

