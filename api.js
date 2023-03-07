// git remote add origin https://github.com/Purushottam02/CRUD_Operations.git

var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var url = "mongodb://127.0.0.1/test";
const AutoIncrement = require("mongoose-auto-increment");
const convertWordToPdfWithPasscode = require("./converttopdf");
const Updateexcel = require("./Updateexcel");
mongoose.Promise = global.Promise;

const db = mongoose.createConnection(url, function (error) {
  if (error) {
    console.log("Error!" + error);
  }
});

AutoIncrement.initialize(db);
var StudentSchema = new mongoose.Schema({
  StudentId: Number,
  Name: String,
  Roll: Number,
  Birthday: String,
  Address: String,
});

const StudentModel = db.model("student", StudentSchema);

router.post("/save", function (req, res) {
  var newStudent = new StudentModel();
  newStudent.StudentId = req.body.StudentId;
  newStudent.Name = req.body.Name;
  newStudent.Roll = req.body.Roll;
  newStudent.Birthday = req.body.Birthday;
  newStudent.Address = req.body.Address;

  newStudent.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send("Data inserted");
    }
  });
});

router.get("/findall", function (req, res) {
  StudentModel.find({}, "Name -_id", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/students/name/:Name", function (req, res) {
  StudentModel.findOne({ Name: req.params.Name }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/rollNo", function (req, res) {
  StudentModel.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const result = data.map((item) => item.Roll);
      res.send(result);
    }
  });
});

router.get("/converttopdf", function (req, res) {
  convertWordToPdfWithPasscode("cent.docx", "xyz.pdf", "1234", () => {
    res.send("done");
  });
  res.send("done");
});

router.get("/updateexcel", function (req, res) {
  Updateexcel("abc.xlsx", () => {
    res.send("done");
  });
  res.send("done");
});

module.exports = router;
