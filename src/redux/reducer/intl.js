import { SET_INTL }from '../constants/intl'

const initIntl = window.navigator.language
export default function intl( preState = initIntl , action){
  switch(action.type){
    case SET_INTL:
      return action.data
    default:
      return preState
  }
}

