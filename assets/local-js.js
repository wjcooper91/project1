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

 $("#addword").on("click", function(event) {
     event.preventDefault();
     word = $("#word-input").val().trim();

     $.ajax({
         url: "http://api.urbandictionary.com/v0/define?term=" + word,
         dataType: "json",
         success: function(data) {
             console.log(data);
             addrow(data);
             var definition = data.list[0].definition;
             console.log(definition);

             setWordTable(word, definition);
         }
     });
 });

 function setWordTable(word, definition) {
     word = {
         wordkey: word,
         definition: definition
     };

     // Add player2 to the database
     database.ref().child("/wordbank/words").set(word);
 }

 var inputWord = $("#word-input").val().trim();



 function voiceAPI(definition) {
     console.log(definition);
     let synth = window.speechSynthesis;

     let utterance = new SpeechSynthesisUtterance(definition);
     synth.speak(utterance);
 }


 function clickForVoice() {
     /*if () {
         //if this is in the word bank buttons call the DB
     }*/


 }

 let $testButton = $('#button--test');

 $testButton.click(function() {
     voiceAPI("hello, this is a test");
 });

 function addrow(data) {
     $("#library").append("<tr>" +
         "<td class='button'>" + "<button id='button--test' class='btn voice_button'>test</button>" + "</td>" +
         "<td class='word'>" + word + "</td>" +
         "<td class='definition'>" + data.list[0].definition + "</td>" +
         "<td class='delete'>" + "delete icon" + "</td>" +
         "</tr>");
 }