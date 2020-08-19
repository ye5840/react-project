import {reqGetSubject,reqGetSecSubject,reqUpdateSubject,reqDelSubject} from "@api/edu/subject";

import {GET_SUBJECT_LIST,GET_SEC_SUBJECT_LIST,UPDATE_SUBJECT,DELETE_SUBJECT} from "./constants";
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubject( page, limit ).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.total;
    });
  };
};

const getSecSubjectListSync = list => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = parentId => {
  return dispatch => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response.total;
    });
  };
};

const updateSubjectListSync = data => ({
  type: UPDATE_SUBJECT,
  data
});

export const updateSubjectList = (id,title) => {
  return dispatch => {
    return reqUpdateSubject(id,title).then(response => {
      dispatch(updateSubjectListSync({id,title}));
      return 123;
    });
  };
};
//删除课程分类
const delSubjectListSync = data => ({
  type: DELETE_SUBJECT,
  data
});

export const delSubjectList = id => {
  return dispatch => {
    return reqDelSubject(id).then(response => {
      dispatch(delSubjectListSync(id));
      return 123;
    });
  };
};



