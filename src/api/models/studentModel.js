const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    }
})
const StudentModel = mongoose.model("student",studentSchema)
function addNewStudent(params,next) {
    var studentModel = new StudentModel();
    studentModel.name = params.name,
    studentModel.address = params.address,
    studentModel.mobile = params.mobile,
    studentModel.age = params.age,

    studentModel.save((err,student)=>{
        let clientResp = {};
            if (err){
                clientResp.err = err;
                clientResp.result = null;
                next(clientResp,null);
                return;
            }
            clientResp.err = null;
            clientResp.result = [student];
           next(null,clientResp);
            
    }) 
}
function updateNewStudent(params,next ) {
   
    StudentModel.find({_id:params.id}, function (err,student) {
        let clientResp = {};
        if (err) {
            clientResp.err = err;
            clientResp.message = "An error occured while getting student info"
            clientResp.result = [];
            next(clientResp,null);
            return;
        }

        if (!student || !student.length) {
            clientResp.err = null;
            clientResp.message = "No existing record is found for this student."
            clientResp.result = [];
            next(clientResp,null);
            return;
        }
            let updateData = {};
            updateData.name = params.name || student[0].name;
            updateData.address = params.address || student[0].address;
            if(params.mobile){
                updateData.mobile = params.mobile;
            }
            updateData.age = params.age ? params.age : student[0].age;
        
        StudentModel.findOneAndUpdate({_id:params.id},updateData, {new: true} ,function (err, student) {
            let clientResp = {};
            if (err){
                console.log(err);
                clientResp.err = err;
                clientResp.message = "Error occurred while updating student info ";
                clientResp.result = null;
                next(clientResp);
                return;
            }
            clientResp.err = null;
            clientResp.message = "Success";
            clientResp.result = student;
           next(clientResp);
        });
        })   
}

function getStudent(params,next) {
    StudentModel.find({_id:params.id},function (err, student) {
        let clientResp = {};
        if (err){
            console.log(err);
            clientResp.err = err;
            clientResp.message = "Error occurred while getting student info ";
            clientResp.result = null;
            next(clientResp);
            return;
        }
    
        if (!student || !student.length){
            clientResp.err = null;
            clientResp.message = "No student info is found";
            clientResp.result = [];
            next(clientResp);
            return;
        }

        clientResp.err = null;
        clientResp.message = "Success";
        clientResp.result = student;
       next(clientResp);
    });
}


function getStudents(next) {
    StudentModel.find(function (err, student) {
        let clientResp = {};
        if (err){
            console.log(err);
            clientResp.err = {};
            clientResp.message = "Error occurred! ";
            clientResp.code = "404";
            clientResp.result = null;
            next(clientResp);
            return;
        }
        clientResp.err = null;
        clientResp.message = "Success";
        clientResp.result = student;
       next(clientResp);
    });
}

function deleteOldStudent(params,next) {
        let clientResp = {};
        StudentModel.deleteOne({_id:params.id},function (err, student) {
                if (err) {
                    clientResp.err = err;
                    clientResp.message = "Error occurred while deleting student info";
                    clientResp.result = null;
                    next(clientResp);
                    return;
                };
                clientResp.err = null;
                clientResp.message = "Successfully deleted";
                clientResp.result = student;
                next(clientResp);
                
            });
}

module.exports.addNewStudent = addNewStudent;
module.exports.updateNewStudent = updateNewStudent;
module.exports.getStudents = getStudents;
module.exports.getStudent = getStudent;
module.exports.deleteOldStudent = deleteOldStudent;
