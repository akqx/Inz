import {SET_CURRENT_USER} from '../redux/types.js'
import isEmpty  from "lodash/isEmpty";

const initalState={
isAuthenticated:false,
user:{}
}

export default (state = initalState, action = {}) => {
  switch(action.type) {
  	case SET_CURRENT_USER:
  	return{
  		isAuthenticated:!isEmpty(action.user),
  		user:action.user
  	}
  	default: return state;
  }}