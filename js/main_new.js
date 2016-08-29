var instruction = $("#instruction")[0];
var imgSelector = $("#my-file-selector")[0];

var file = $("#my-file-selector").val();

imgSelector.addEventListener("change", function () {
    instruction.innerHTML = "Just a sec while we analyse your text...";
     $(function() {
        var params = {
            // Request parameters
            "language": "unk",
            "detectOrientation ": "true",
        };
      
        $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/ocr?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{4f602b13d2794dbcb09cfd5a9a0f2148}");
            },
            type: "POST",
            // Request body
            data: file,
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });
});


