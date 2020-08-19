import request from '@utils/request'

const BASE_URL = '/admin/edu/chapter'

export function reqGetChapterList(courseId){
  return request({
    url: `${BASE_URL}/1/10`,
    method: "GET",
    params:{
      courseId
    }
  });
}