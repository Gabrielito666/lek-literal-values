const str = "hola que hace";
const num = 27;
const bool = false;
const func = (a, b) => {
    return (a + b)
};
const obj = {
	prop1 : "hola que hace",
	prop2 : 27,
	prop3 : false,
	prop4 : (a, b) => {
    	return (a + b)
	},
	prop5 : {
		prop6 : true,
		prop7 : [
			"hola",
			"que",
			"hace"
		]
	}
};
const my_boolean = false;
const my_function = (a, b) => {
    return (a + b)
};
const my_number = 27;
const my_object = {
	prop1 : "hola que hace",
	prop2 : 27,
	prop3 : false,
	prop4 : (a, b) => {
    	return (a + b)
	},
	prop5 : {
		prop6 : true,
		prop7 : [
			"hola",
			"que",
			"hace"
		]
	}
};
const my_string = "hola que hace";
const my_array = [
	"hola",
	"como",
	"estas",
	true,
	{
		hola : {
			wena : [
				1,
				2,
				3
			],
			mala : false
		}
	}
];

module.exports = {
	str,
	num,
	bool,
	func,
	obj,
	my_boolean,
	my_function,
	my_number,
	my_object,
	my_string,
	my_array
}