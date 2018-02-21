import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};

    if(!Validator.isInt(data.EnergyBodyWeight,{ min: 20, max: 300 })) {
    	errors.EnergyBodyWeight="Nieporawidłowa masa ciała";
    }

    if(!Validator.isInt(data.EnergyBodyHight,{min: 100, max:240} )) {
    	errors.EnergyBodyHight="Nieporawidłowy wzrost";
    }	

     if(!Validator.isInt(data.EnergyAge,{min: 0, max:100} )) {
    	errors.EnergyAge="Nieporawidłowy wiek";
    }	
    if(Validator.isEmpty(data.EnergyBodyWeight)){
		errors.EnergyBodyWeight="Wpisz masę ciała";
	}

	if(Validator.isEmpty(data.EnergyBodyHight)){
		errors.EnergyBodyHight="Wpisz wzrost";
	}

	if(Validator.isEmpty(data.EnergyAge)){
		errors.EnergyAge="Wpisz wiek";
	}
	
	return{
		errors,
		isValid:isEmpty(errors)
	};
}
