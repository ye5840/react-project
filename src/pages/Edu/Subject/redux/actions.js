import {reqGetSubject,reqGetSecSubject,reqUpdateSubject} from "@api/edu/subject";

import {GET_SUBJECT_LIST,GET_SEC_SUBJECT_LIST,UPDATE_SUBJECT} from "./constants";
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
      return response.total;
    });
  };
};



