// Get elements from DOM
var instruction = $("#instruction")[0];
var imgSelector = $("#my-file-selector")[0];
function processImage(callback) {
    var file = imgSelector.files[0]; //get(0) is required as imgSelector is a jQuery object so to get the DOM object, its the first item in the object. files[0] refers to the location of the photo we just chose.
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file); //used to read the contents of the file
    }
    else {
        console.log("Invalid file");
    }
    reader.onloadend = function () {
        //After loading the file it checks if extension is jpg or png and if it isnt it lets the user know.
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            instruction.innerHTML = "Please upload an image file (jpg or png).";
        }
        else {
            //if file is photo it sends the file reference back up
            callback(file);
        }
    };
}
function sendImgRequest(file, callback) {
    $.ajax({
        url: "https://api.projectoxford.ai/vision/v1.0/ocr?language=en&detectOrientation =true",
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "{4f602b13d2794dbcb09cfd5a9a0f2148}");
        },
        type: "POST",
        // Request body
        data: "{body}",
    })
        .done(function (data) {
        alert("success");
    })
        .fail(function () {
        alert("error");
    });
};
imgSelector.addEventListener("change", function () {
    processImage(function (file) {
    });
});
