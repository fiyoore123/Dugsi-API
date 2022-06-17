let express = require('express');
const { json } = require('express/lib/response');
let router = express.Router();
let studentCtrl = require('../controllers/studentController');
const utils = require('../shared/utilities');


//insert student
router.post('/studentmanagement/action*',(req,res)=>{
   var actionName = utils.getHttpAction(req);
   studentCtrl.processRequest(actionName,req.body,function (err,result) {
       if (err) {
           res.end(JSON.stringify(err));
           return;
       }
       res.end(JSON.stringify(result));
   })
    
});
//GET STUDENT
router.get('/studentmanagement/action*',(req,res)=>{
    var actionName = utils.getHttpAction(req);
    studentCtrl.processRequest(actionName,req.body,function (err,result) {
        if (err) {
            res.end(JSON.stringify(err));
            return;
        }
        res.end(JSON.stringify(result));
    })
 });
module.exports = router;