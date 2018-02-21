import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};

if(Validator.isEmpty(data.username)){
	errors.username='Proszę wypełnić pole';
}

if(!Validator.isEmail(data.email)){
	errors.email='Niepoprawny email';
}

if(Validator.isEmpty(data.email)){
	errors.email='Proszę wypełnić pole';
}
if(Validator.isEmpty(data.passwordConfirmation)){
	errors.passwordConfirmation='Proszę wypełnić pole';
}

if(Validator.isEmpty(data.password)){
	errors.password='Proszę wypełnić pole';
}

if(!Validator.equals(data.password, data.passwordConfirmation)){
	errors.passwordConfirmation='Hasła muszą być takie same!';
}
	return{
		errors,
		isValid:isEmpty(errors)
	}
}