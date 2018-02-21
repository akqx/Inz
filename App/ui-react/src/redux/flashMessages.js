import * as myConst from './types.js';

export function addFlashMessage(message){
	return {
		type:myConst.ADD_FLASH_MESSAGE,
		message
	}
}
export function deleteFlashMessage(id){
	return {
		type:myConst.DELETE_FLASH_MESSAGE,
		id
	}
}