import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};
	
	if(Validator.isEmpty(data.topic_name)){
		errors.topic_name="Wpisz nazwę";
	}

	if(Validator.isEmpty(data.topic_content)){
		errors.topic_content="Wpisz temat";
	}

	return{
		errors,
		isValid:isEmpty(errors)
	};
}