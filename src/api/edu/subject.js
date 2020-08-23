import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const MOCK_URL = "/admin/edu/subject/1/10"

// 获取一级课程分类列表 /admin/edu/subject/:page/:limit
export function reqGetSubject(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

//获取所有二级课程分类数据 /admin/edu/subject/get/:parentId
export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}
// 新增课程分类 /admin/edu/course/save
export function reqAddSubject(title,parentId){
  return request({
    url:`${BASE_URL}/save`,
    method:"POST",
    data:{
      title,
      parentId
    }
  })
}

// 更新课程分类 /admin/edu/subject/update
export function reqUpdateSubject(id,title){
  return request({
    url:`${BASE_URL}/update`,
    method:"PUT",
    data:{
      id,
      title
    }
  })
}

// 删除课程分类 /admin/edu/subject/remove/:id
export function reqDelSubject(id){
  return request({
    url:`${BASE_URL}/remove/${id}`,
    method:"DELETE"
  })
}

// 获取所有一级课程分类数据 /admin/edu/subject
export function reqAllSubjectList(){
  return request({
    url:BASE_URL,
    method:"GET"
  })
}