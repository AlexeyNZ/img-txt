var instruction = $("#instruction")[0];
var imgSelector : HTMLInputElement = <HTMLInputElement> $("#my-file-selector")[0]; 
var showText = $("#showText")[0];

function processImage(callback: any) : void {
    var file = imgSelector.files[0];  //get(0) is required as imgSelector is a jQuery object so to get the DOM object, its the first item in the object. files[0] refers to the location of the photo we just chose.
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file); //used to read the contents of the file
    } else {
        console.log("Invalid file");
    }
    reader.onloadend = function () { 
        //After loading the file it checks if extension is jpg or png and if it isnt it lets the user know.
        if (!file.name.match(/\.(jpg|jpeg|png)$/)){
            instruction.innerHTML = "Please upload an image file (jpg or png).";
        } else {
            //if file is photo it sends the file reference back up
            callback(file);
        }
    }
}

imgSelector.on("change", function () {
    instruction.innerHTML = "Just a sec while we analyse your text...";
    var file = imgSelector.get(0).files[0]; 
    var params = {
            // Request parameters
            "language": "unk",
            "detectOrientation": "true",
        };
        $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/ocr?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","4f602b13d2794dbcb09cfd5a9a0f2148");
            },
            type: "POST",
            // Request body
            data: file,
            processData: false
        })
        .done(function(data) {
            var res : string = "";
            $( data.regions[0].lines ).each(function(indl, line) {
            $( line.words ).each(function(indw, word) {
            res = res + word.text + ' ';
            });
            });
            showText.innerHTML = res;
        })
        .fail(function() {
            instruction.innerHTML = "Please, try again or choose correct format of file";
        });
});

   
