import  Validator from "validator";
import isEmpty  from "lodash/isEmpty";


export default function validateInput(data){
	let errors={};

	if(Validator.isEmpty(data.recipe_name)){
		errors.recipe_name="Wpisz nazwę";
	}

	if(Validator.isEmpty(data.recipe_content)){
		errors.recipe_content="Napisz przepis";
	}

	if(Validator.isEmpty(data.image_name)){
		errors.image_name="Dodaj zdjęcie";
	}

	return{
		errors,
		isValid:isEmpty(errors)
	};
}