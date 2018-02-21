import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};
	
	if(Validator.isEmpty(data.nick)){
		errors.nick="Wpisz nazwę użytkownika";
	}

	if(Validator.isEmpty(data.password)){
		errors.password="Wpisz hasło";
	}

	return{
		errors,
		isValid:isEmpty(errors)
	};
}

