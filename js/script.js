$(function(){

    /*
    DOM functions
    */

    var resultBox = $('#result');
    var resultText = $('<p>');
    var iterationsListTitle = $('<h2>').attr('id', 'listTitle');
    var iterationsList = $('<ul>');
    var iterationsListItem = $('<li>');
    var clearAllBtn = $('#clearAll');

    var iterationNumber = 0;

    /*
    input with buttons function
    */

    var inputButtons = $('.numButton');
    var counter = 0;
    var inputArray = [];
    var outputString = "";
    var userNumberOutput = $('#userNumber');
    var submitButton = $('#userNumbersSubmit');

    /* retrieving input array and displaying input */
    inputButtons.each(function(){
        $(this).on('click', function(){
            counter++;
            if (counter <= 4) {
                var number = $(this).data('value');
                inputArray.push(number); // required for counting
                outputString += String(number); // required for displaying
                userNumberOutput.text(outputString);
                console.log(counter);
                if (counter == 4) {
                    inputArray.sort(function(a, b){return b-a});
                    return inputArray;
                }
            } else {
                counter = 5;
            }
        });
    });

    /* submit button event function */
    submitButton.on('click', function(){
        if (inputArray.length === 4) { // simple yet sufficient validation
            userNumberOutput.text("");
            iterationsListTitle.text("Given number: " + createNumberFromArray(inputArray));
            iterationsListTitle.prependTo(resultBox);
            kaprekarGo(inputArray);
            inputArray = []; // to prevent repeating kaprekarGo function
        }
    });

    /* clear button event function */

    clearAllBtn.on('click', function(){
        inputArray = [];
        counter = 0;
        userNumberOutput.text("");
        resultBox.text("");
        iterationsList.text("");
        outputString = "";
        iterationNumber = 0;
    });

    /*
    *** KAPREKAR ITERATION ***
      Step 1. Take any four-digit number, using at least two different digits. (Leading zeros are allowed.)
      Step 2. Arrange the digits in descending and then in ascending order to get two four-digit numbers, adding leading zeros if necessary.
      Step 3. Subtract the smaller number from the bigger number.
      Step 4. Go back to step 2. 
    */

    function kaprekarGo(array) {
        iterationNumber++;
        var result = 0;
        var array1 = array; // will be needed for step 2
        var array2 = createMirrorArray(array1); // will be needed for step 2
        var num1 = createNumberFromArray(array1);
        var num2 = createNumberFromArray(array2);
        var listItemClone = iterationsListItem.clone(true);
        result = num1 - num2; // step 3

        // adding zeroes for numbers less than 1000 - just for visual neatness
        var zeroForNum1 = checkResult(num1);
        var zeroForNum2 = checkResult(num2);
        var zeroForResult = checkResult(result);

        // display results after each iteration
        listItemClone.text("iteration no. " + iterationNumber + ": " + zeroForNum1 + num1 + " - " + zeroForNum2 + num2 + " = " + zeroForResult + result);
        listItemClone.appendTo(iterationsList).attr('data-num', iterationNumber);
        /* 
        condition: Kaprekar's constant is 6174 
        */
        if (result !== 6174) {
            // step 2
            result = String(result);
            var newArray = result.split("");
            console.log(newArray);
            // if result < 1000, it has three digits, therefore 0 must be added to the array
            while (newArray.length < 4) {
                newArray.push(0);
            }
            newArray.sort(function(a, b){return b-a});
            // step 4: a happy return to step 2!
            kaprekarGo(newArray);
        } else {
            var finalResult = resultText.clone(true);
            finalResult.text("Kaprekar's constant " + result + " found after " + iterationNumber + " iterations!");
            finalResult.insertAfter($('#listTitle'));
            iterationsList.appendTo(resultBox).find('li').hide();
            displaySingleIterationInfo(iterationNumber, $('li'), 0);
        }
    }

    /*    
    ** Kaprekar functions
    */
    // animation for single iteration display
    function displaySingleIterationInfo(number, listElements, itemIndex){
        if (itemIndex < number) {
            $(listElements[itemIndex]).slideDown(2000, function(){
                $(listElements[itemIndex]).hide();
                itemIndex++;
                displaySingleIterationInfo(number, listElements, itemIndex);
            });
        }
    }
    
    // just for neatness: zeroes for numbers smaller than 1000
    function checkResult(givenNumber) {
        var string = "";
        if (givenNumber < 1000) {
            string = "0";
            if (givenNumber < 100) {
                string ="00";
            }
        }
        return string;
    }

    /*
    ** functions on arrays **
    */

    /*
    creating mirror array - needed for subtraction
    */
    function createMirrorArray(inputArray){
        var outputArray = [];
        for (var i = 0; i < inputArray.length; i++) {
            outputArray.push(inputArray[i]);
        }
        outputArray.reverse();
        return outputArray;
    }

    /*
    converting arrays into integers
    */

    function createNumberFromArray(inputArray){
        var numString = inputArray.join("");
        var result = Number(numString);
        return result;
    }

    /*
    * * * UNUSED * * *
    * * * form function * * *

    var submitBtn = $('#submit');
    var inputs = $('input[name="digit"]');

    submitBtn.on('click', function(e){
        e.preventDefault();
        var resultTextClone = resultText.clone(true);
        var userArray = [];
        var digit01 = $('#digit01').val();
        var digit02 = $('#digit02').val();
        var digit03 = $('#digit03').val();
        var digit04 = $('#digit04').val();
        if (digit01 == digit02 && digit02 == digit03 && digit03 == digit04) {
            resultTextClone.text("At least one digit must be different");
            resultTextClone.appendTo(resultBox);
        } else {
            inputs.each(function(){
                userArray.push($(this).val());
                $(this).val("");
            });
            userArray.sort(function(a, b){return b-a});
            iterationsListTitle.text("Given number: " + createNumberFromArray(userArray));
            iterationsListTitle.prependTo(resultBox);
            kaprekarGo(userArray);
        }
    });

    */

});