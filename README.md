# project1

Project Goals:


User Stories:

1.

2.

3.



*DESIGN/LAYOUT*
    //pre: decide layout design/etc
    theming and functionality
    what elements should be available to user and how should they function
    do we want to have the trending words functionality
    FOR THE PURPSE OF THIS PROJECT WE ARE CONSIDERING ALL DATABASE RELATED FUNCTIONALITY TO BE BY SESSION ONLY

*DOM*
    User input
    User input storage
    //
    Output div
    Assign ids/attrbutes to output
    clickable values for recall
    //trending words section

*FIREBASE*
    output storage
    Associated ids: Words, definitions
    putting and pulling data from firebase

*LOCAL SCRIPT*
    store words in array? or can we compare 
    variables to hold user input
    variables to represent all DOM elements
    variable for urban dic call (= to user input)
    variable for urban dic response
    variable for speech function call 

*URBAN DICTIONARY API*
    //pre: research API documentation
    API key
    function that makes api calls, this function should have a variable that stores the user input (word to be searched)
    we need to account for white space and terms (IE it wont always be a single word)
    //if we do trending words, we need to have these retrieved and printed to DOM as the first function (before taking user input/making other calls)

*SPEECH API*
    //pre: research API documentation
    New Searches: Take the response fromt the Urban dictionary api and push through speech api
    Recalled Searches: Take data from firebase and run through speech api
