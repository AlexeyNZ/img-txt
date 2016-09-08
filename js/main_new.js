var instruction = $("#instruction")[0];
var imgSelector = $("#my-file-selector");
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
            alert("success");
            var jsonVar = data;
            var jsonStr = JSON.stringify(jsonVar);
            text.innerHTML = jsonStr;
            var textHtml = jsonStr.language;
            $.each(data, function () {
                $.each(this, function (name, value) {
                console.log(name + '=' + value);
            });
            });
           // showText.innerHTML = data.regions[0].lines[0].words[0].text;
        })
        .fail(function() {
            alert("error");
        });
});




// https://www.w3.org/WAI/images/easychecks/resize-wrap.png