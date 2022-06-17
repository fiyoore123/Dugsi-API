const studentModel = require('../models/studentModel');
const errors = require('../shared/errors');
const methods = require('../shared/methods');
const utils = require('../shared/utilities');


function processRequest(actionName,payload,next) {
    switch (actionName) {
        case methods.actions.registerStudent.name:
            registerStudent(payload,next);
            break;
        case methods.actions.updatestudent.name:
             updateStudent(payload,next);
                break;
         case methods.actions.deletestudent.name:
             deleteStudent(payload,next);
                break;
        case methods.actions.getstudent.name:
            getstudent(payload,next);
                break;
        case methods.actions.getstudents.name:
            getstudents(next);
                break;
                
        default:
            next(errors.actionNotFound,null);
            break;
    }
}
function registerStudent(payload,next) {
    let validationResult = utils.validatePayload(payload,['name','address','mobile','age']);
    if(!validationResult.isValid){
        next(validationResult.msg,null);
        return;
    }
   studentModel.addNewStudent(payload,next);

}
function updateStudent(payload,next) {
    let validationResult = utils.validatePayload(payload,['id']);
    if(!validationResult.isValid){
        next(validationResult.msg,null);
        return;
    }
   studentModel.updateNewStudent(payload,next);

}

function getstudent(payload,next) {
    let validationResult = utils.validatePayload(payload,['id']);
    if(!validationResult.isValid){
        next(validationResult.msg,null);
        return;
    }
   studentModel.getStudent(payload,next);

}

function getstudents(next) {
   studentModel.getStudents(next);

}

function deleteStudent(payload,next) {
    let validationResult = utils.validatePayload(payload,['id']);
    if(!validationResult.isValid){
        next(validationResult.msg,null);
        return;
    }
   studentModel.deleteOldStudent(payload,next);

}
module.exports.processRequest = processRequest;