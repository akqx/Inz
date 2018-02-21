import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};
	
	if(Validator.isEmpty(data.note_comment)){
		errors.note_comment="To pole nie może być puste. Napisz komenatarz";
	}

	return{
		errors,
		isValid:isEmpty(errors)
	};
}