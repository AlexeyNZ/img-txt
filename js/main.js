var instruction = $("#instruction")[0];
var imgSelector = $("#my-file-selector")[0];
var text = $("#recognizedText")[0];
var showText = $("#showText")[0];




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
            var res = "";
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
