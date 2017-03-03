//Importing Express library
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//Importing Mongoose library
var mongoose = require('mongoose');

//Importing employee.js file residing in models
Employee = require('./Employee.model');

var PORT = (process.env.VCAP_APP_PORT || 8080);

var host=(process.env.VCAP_APP_HOST || 'localhost');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

// connecting to mongodb database "icedb" using mongoose
var db='mongodb://dande:miracle@ds161069.mlab.com:61069/iceteam';
// Database object
mongoose.connect(db);

//To handle get request and '/' represents homepage
app.get('/', function(req,res){
res.send('Hello!! Please use /employees for GET and POST (or) /employees/:eid for GetById (or) /employees/:eid for PUT and DELETE');
});

//Retrieving the data from MongoDB 'employees' Collection
app.get('/employees', function(req,res){
Employee.getEmployees(function(err, employees){
  if(err){
  throw err;
  }
  res.json(employees);
});
});

//Retrieving the data based on ID from MongoDB 'employees' Collection
app.get('/employees/:eid', function(req,res){
var _id = req.params.eid;
Employee.getEmployeeById(_id, function(err, employee){
  if(err){
  throw err;
  }
  res.json(employee);
});
});

//Inserting the data into MongoDB 'employees' Collection
app.post('/employees', function(req,res){
var employee = ({
    _id: req.body.eid,
    eid: req.body.eid,
    ename: req.body.ename,
    designation: req.body.designation,
    email: req.body.email
});
//Calls function in employee.js model
Employee.addEmployee(employee, function(err, employee){
  if (employee) {
           response = {
                "result": "Data inserted succesfully"
            }
            res.json(response);
        } else {
           error = {
                "error": "Sorry insertion failed"
            }
            res.json(error);
        }
});
});

//Updating the data in MongoDB 'employees' Collection
app.put('/employees/:eid', function(req, res) {
    var _id = req.params.eid;
    var employee = ({
        ename: req.body.ename,
        designation: req.body.designation,
		email: req.body.email
    });
    //Calls the function from employee.js model
    Employee.updateEmployee(_id, employee, {}, function(err, student) {
        if (employee) {
          response = {
                "result": "Employee Details have been updated!"
            }
            res.json(response);
        } else {
          error = {
                "error": "Sorry update failed"
            }
            res.json(error);
        }
    });
});

//Deleting the data in MongoDB 'employees' Collection
app.delete('/employees/:eid', function(req,res){
var _id = req.params.eid;
Employee.removeEmployee(_id, function(err, employee){
  if (employee) {
          response = {
                "result": "Employee record have been deleted!"
            }
            res.json(response);
        } else {
          error = {
                "error": "Sorry update failed"
            }
            res.json(error);
        }
});
});

//listens on port 8080
app.listen(8080,function () {
  console.log('Example app listening on port 8080!');
});