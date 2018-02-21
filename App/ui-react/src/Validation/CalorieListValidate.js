import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};

	if(Validator.isEmpty(data.product_name)){
		errors.product_name="Wpisz nazwę produktu";
	}

	if(Validator.isEmpty(data.calorie_number)){
		errors.calorie_number="Napisz liczbę kalorii";
	}
    
	if(Validator.isEmpty(data.protein_number)){
		errors.protein_number="Napisz liczbę białka";
	}

	if(Validator.isEmpty(data.fat_number)){
		errors.fat_number="Napisz liczbę tłuszczu";
	}

	if(Validator.isEmpty(data.carb_number)){
		errors.carb_number="Napisz liczbę węglowodanów";
	}

	return{
		errors,
		isValid:isEmpty(errors)
	};
}

