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
             addrow(data, word);
             var definition = data.list[0].definition;
             setWordTable(word, definition);
         }
     });
 });


 //this function pushes data to the database
 function setWordTable(word, definition) {
     word = {
         wordVal: word,
         definition: definition
     };

     database.ref().child("wordbank").push(word);

 }



 function voiceAPI(definition) {
     console.log(definition);
     let synth = window.speechSynthesis;

     let utterance = new SpeechSynthesisUtterance(definition);
     synth.speak(utterance);
 }


 var button;

 function addrow(data, word) {
     button = $('<button>').text('hello').addClass(word);
     $("#library").append(`
        <tr>
            <td class="button"><button class="${word}">Listen!</button></td>
            <td class="${word}">${word}</td>
            <td class="definition">${data.list[0].definition}</td>
            <td class="delete">delete icon</td>
        </tr>
     `);
 }

 function createButton(word) {

 }