import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// 获取章节分页列表 /admin/edu/chapter/:page/:limit
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET"
  });
}