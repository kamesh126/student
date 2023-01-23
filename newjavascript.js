/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "Student";
var empRelationName = "Student-Rel";
var connToken = "90932340|-31949271436245131|90954225";
function resetForm() {
    $("#rollNO").val("");
    $("#fullName").val("");
    $("#stClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollMentDate").val("");
    $("#rollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollNO").focus();
}
function createPUTRequest(connToken, jsonObj, dbName, relName) {
    var putRequest = "{\n"
            + "\"token\" : \""
            + connToken
            + "\","
            + "\"dbName\": \""
            + dbName
            + "\",\n" + "\"cmd\" : \"PUT\",\n"
            + "\"rel\" : \""
            + relName + "\","
            + "\"jsonStr\": \n"
            + jsonObj
            + "\n"
            + "}";
    return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var url = dbBaseUrl + apiEndPointUrl;
    var jsonObj;
    $.post(url, reqString, function (result) {
        jsonObj = JSON.parse(result);
    }).fail(function (result) {
        var dataJsonObj = result.responseText;
        jsonObj = JSON.parse(dataJsonObj);
    });
    return jsonObj;
}
function saveData() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resultjsonObj = executeCommand(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollNo");
}
function
        validateAndGetFormData() {
    var rollNumberVar = $("#rollNO").val();
    if (rollNumberVar === "") {
        alert("Roll number required");
        $("#rollNO").focus();
        return "";
    }
    var fullNameVar = $("#fullName").val();
    if (fullNameVar === "") {
        alert("Full Name is Required Value");
        $("#fullName").focus();
        return "";
    }
    var stClassVar = $("#stClass").val();
    if (stClassVar === "") {
        alert("Class is Required Value");
        $("#stClass").focus();
        return "";
    }
    var birthDateVar = $("#birthDate").val();
    if (birthDateVar === "") {
        alert("Birth Date is Required Value");
        $("#birthDate").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Address is Required Value");
        $("#address").focus();
        return "";
    }
    var enrollMentDateVar = $("#enrollMentDate").val();
    if (enrollMentDateVar === "") {
        alert("Birth Date is Required Value");
        $("#enrollMentDate").focus();
        return "";
    }
    

    var jsonStrObj = {
        rollNUmber: rollNumberVar,
        fullName: fullNameVar,
        stClass: stClassVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollMeantDate: enrollMentDateVar,
    };
    return JSON.stringify(jsonStrObj);
}
function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = creatUPDATERecordRequest(connToken, jsonChg, empRelationName, localStorage.getItem("recno"));

    jQuery.ajaxSetup({async: false});
    var resultjsonObj = executeCommand(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    alert(JSON.stringify(resultjsonObj));
    resetForm();
    $("#rollNo").focus();
}
function getStudent() {
    var empIdJsonObj = getEmpIdASJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultjsonObj = executeCommand(getRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if (resultjsonObj.status === 400) {
        $("#save").prop("disable", false);
        $("#reset").prop("disable", false);
        $("#fullName").focus();
    } else if (resultjsonObj.status === 200) {
        fillData(resultjsonObj);
        $("#change").prop("disable", false);
        $("#reset").prop("disable", false);
        $("#fillName").focus();
    }

}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
      $("#fullName").val(data.Name);
    $("#stClass").val(data.Class);
    $("#birthDate").val(data.birthDate);
    $("#address").val(data.address);
    $("#enrollMentDate").val(data.enrollMentDate);
}
function saveRecNo2LS(jsonObj){
    var lvData=JSON.prase(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}



