import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};

    if(!Validator.isFloat(data.bodyWeight,{ min: 20, max: 300 })) {
    	errors.bodyWeight="Nieporawidłowa masa ciała";
    }

	 if(!Validator.isFloat(data.bodyHight,{min: 100, max:240} )) {
    	errors.bodyHight="Nieporawidłowy wzrost";
    }	

    if(Validator.isEmpty(data.bodyWeight)){
		errors.bodyWeight="Wpisz masę ciała";
	}

	if(Validator.isEmpty(data.bodyHight)){
		errors.bodyHight="Wpisz wzrost";
	}
	
	return{
		errors,
		isValid:isEmpty(errors)
	};
}

