import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const MOCK_URL = 'http://localhost:8888/admin/edu/subject'

// 获取讲师
export function reqGetSubject(page,limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}