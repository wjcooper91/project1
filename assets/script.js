let $wordInput = $('#word-input');
let $returnWord = $('#return--word');
let $returnDefinition = $('#return--definition');
//delete this when done testing
let $testButton = $('#button--test');
let definition = "";


/*
 ************************* VOICE API *****************************
 */

function voiceAPI(definition) {
    console.log(definition);
    let synth = window.speechSynthesis;

    let utterance = new SpeechSynthesisUtterance(definition);
    synth.speak(utterance);
}

$testButton.click(function() {
    voiceAPI('this is a test holla holla holla');
});