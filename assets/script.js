// Initialize Firebase
var config = {
    apiKey: "AIzaSyBPssffqK84uGPAMvake998Dx8CWaZtNBc",
    authDomain: "urbanvoiceproject-3c91e.firebaseapp.com",
    databaseURL: "https://urbanvoiceproject-3c91e.firebaseio.com",
    projectId: "urbanvoiceproject-3c91e",
    storageBucket: "",
    messagingSenderId: "458019784325"
};

firebase.initializeApp(config);
var database = firebase.database();
var word;
var speakButtons;
var deleteButtons;

//urban dictionary API query 
$("#addword").on("click", function(event) {
    event.preventDefault();
    //assign the users input to a variable
    word = $("#word-input").val().trim();
    $.ajax({
        url: "http://api.urbandictionary.com/v0/define?term=" + word,
        dataType: "json",
        success: function(data) {
            console.log(data);
            addrow(data, word);
            var definition = data.list[0].definition;
            setWordTable(word, definition);
        }
    });
});

//set up the new word table, push to database
function setWordTable(word, definition) {
    word = {
        wordVal: word,
        definition: definition
    };
    database.ref().child("wordbank").push(word);
}

//call the voice api- pass the definition variable as the paramater
function voiceAPI(definition) {
    console.log(definition);
    let synth = window.speechSynthesis;

    let utterance = new SpeechSynthesisUtterance(definition);
    synth.speak(utterance);
}

//append a new row with the returned word info to the DOM library table
function addrow(data, word){
    var button;
    button = $('<button>').text('Listen!').addClass(word);
    $("#library").append(`
    <tr id="${word}">
        <td class="td--speak"><button class="button--speak" data-listen=${word}>Listen!</button></td>
        <td class="td--word ${word}">${word}</td>
        <td class="td--definition">${data.list[0].definition}</td>
        <td class="td--delete"><button class="delete-button" data-word=${word}>Delete Word</button></td>
    </tr>
    `);
    
    // clear the user input field out
    $("#word-input").val(" ");

}

$(document).on('click', '.delete-button', function() {
    console.log('Called delete');
    var row = $(this).attr('data-word');
    console.log("Row: ", row);
    $(`#${row}`).remove();
});

$(document).on('click', '.button--speak', function() {
    console.log('Called speak')
    var listenrow = $(this).attr('data-listen');
    var definition = $(`#${listenrow}`).children('.td--definition').text();
    voiceAPI(definition);
});
