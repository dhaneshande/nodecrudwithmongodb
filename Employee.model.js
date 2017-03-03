//Requiring Mongoose
var mongoose = require('mongoose');

//Defining schema
var employeeSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    eid:{
        type:String,
        required:true
        },
    ename:{
        type:String,
        required:true
        },
	designation:{
        type:String,
		required:true
        },
	email:{
	    type:String,
		required:true
	}
});

//Exporting the file
var Employee = module.exports = mongoose.model('Employee', employeeSchema); //Binding schema to Employee

//Get Employee details
module.exports.getEmployees = function(callback, limit){
Employee.find(callback).limit(limit);
}

//Get Employee details by Id
module.exports.getEmployeeById = function(id, callback){
Employee.findById(id, callback);
}

//Inserting Employee Details
module.exports.addEmployee = function(employee, callback){
Employee.create(employee, callback);
}

//Updating Employee Details
module.exports.updateEmployee = function(id, employee, options, callback){
var query = {
    _id: id
};
var update={
ename: employee.ename,
designation: employee.designation,
email: employee.email
}
Employee.findOneAndUpdate(query, update, options, callback);
}

//Deleting Employee Details
module.exports.removeEmployee = function(id, callback){
var query = {_id: id};
Employee.remove(query, callback);
}