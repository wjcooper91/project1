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
    $('#error').hide();
    //assign the users input to a variable
    word = $("#word-input").val().trim();
    $.ajax({
        url: "http://api.urbandictionary.com/v0/define?term=" + word,
        dataType: "json",
        success: function(data) {
            if( data.result_type == "no_results"){
                console.log('fail');
                $('#error').show();
                $("#word-input").val(" ");
            }
            else{
                console.log(data);
                addrow(data, word);
                var definition = data.list[0].definition;
                setWordTable(word, definition);
            }
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
        <td class="td--word ${word}">${word}</td>
        <td class="td--definition">${data.list[0].definition}</td>
        <td class="td--speak"><button class="button--icon button--speak" data-listen=${word}><i class="fas fa-volume-up"></i></button></td>
        <td class="td--delete"><button class="button--icon button--delete" data-word=${word}><i class="fas fa-trash-alt"></i></button></td>
    </tr>
    `);
    
    $("#word-input").val(" ");

}
//listen for clicks on the wordbank buttons
function listenForClicks(buttonClass){
    $(buttonClass).on('click', function(){
        var wordbankReference = $(this).attr('class');
        console.log('Clicked ' + wordbankReference);
        //set the wordbankLoookup variable equal to the button's id
    
    })
}

$(document).on('click', '.button--delete', function() {
    console.log('Called delete');
    var row = $(this).attr('data-word');
    console.log("Row: ", row);
    $(`#${row}`).remove();
});

$(document).on('click', '.button--speak', function() {
    console.log('Called speak')
    var listenrow = $(this).attr('data-listen');
    var definition = $(`#${listenrow}`).children('.td--definition').text();
    voiceAPI(listenrow);
    voiceAPI(definition);
});

function wordOfTheDAy() {
    // event.preventDefault();
   
    var dailyWord;
    var dailyWordDfn;
    var dailyWordExample;
    var randomID;
    
    randomID = Math.floor((Math.random() * 12000) + 1000);
    console.log(randomID);
    // randomID = '1' + randomID;
    
    // console.log(rand2);
    console.log(randomID);

    $.ajax({
        url: "http://api.urbandictionary.com/v0/define?defid=" + randomID,
        dataType: "json",
        success: function(data) {
            if( data.result_type == "no_results"){
                console.log('fail');
                $('#error').show();
                // $("#dailyword").val(" ");
            }
            else{
                console.log(data);
                // addrow(data, word);
                dailyWord = data.list[0].word;
                console.log(dailyWord);
                dailyWordDfn = data.list[0].definition;     
                console.log(dailyWordDfn);          
                dailyWordExample = data.list[0].example; 
                console.log(dailyWordExample);
                $("#dailyword").text(dailyWord);
                $("#dailydfn").text(dailyWordDfn);
                $("#dailyex").text(dailyWordExample);
                // setWordTable(word, definition);
            }
        }
    });

}

wordOfTheDAy();