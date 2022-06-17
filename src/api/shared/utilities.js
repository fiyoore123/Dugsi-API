function validatePayload(payload,requiredFields){
    let response = {isValid:true,msg:''};
    let missingFeilds = [];
        for(var prop of requiredFields){
            if (!payload || !payload[prop]) {
                response.isValid = false;
                missingFeilds.push(prop);
              
            }   
        }
     if(missingFeilds.length > 0)
        response.msg = " missing fields [" + missingFeilds + "]";
    
return response;
}
function getHttpAction(req) {
    var urlSplitted = req.url.split("/");
    return urlSplitted[urlSplitted.length-1];
}

 module.exports.validatePayload = validatePayload;
 module.exports.getHttpAction = getHttpAction;