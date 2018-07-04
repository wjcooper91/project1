var word; 

$("#addword").on("click", function (event) {
    event.preventDefault();
    word = $("#word-input").val().trim();

    $.ajax({
        url: "http://api.urbandictionary.com/v0/define?term=" + word,
        dataType: "json",
        success: function (data) {
            console.log(data);
            addrow(data)
        }
    });
});


function addrow(data) {
    $("#library").append
    ("<tr>" + 
    "<td class='word'>" + "button" + "</td>" +
    "<td class='word'>" + word + "</td>" +
    "<td class='definition'>" + data.list[0].definition + "</td>" +
    "<td class='definition'>" + "delete icon" + "</td>"
    + "</tr>");
}