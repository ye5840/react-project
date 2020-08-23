import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'

export function reqGetLessonList(chapterId){
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}
//获取token
export function reqGetUploadToken(){
  return request({
    url:'/uploadtoken',
    method: "GET",
  })
}
//新增课时的方法
export function addLesson({chapterId,title,free,video}){
  return request({
    url:`${BASE_URL}/save`,
    method: "POST",
    data:{
      chapterId,title,free,video
    }
  })
}

export function reqBatchRemoveLessonList(lessonIdList){
  return request({
    url:`${BASE_URL}/batchRemove`,
    method:"DELETE",
    data: {
      idList: lessonIdList
    }
  })
}