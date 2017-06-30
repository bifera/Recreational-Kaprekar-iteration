$(function(){

    /*
    DOM functions
    */

    var resultBox = $('#result');
    var submitBtn = $('#submit');
    var inputs = $('input[name="digit"]');

    var resultText = $('<p>');
    var iterationsListTitle = $('<h2>').attr('id', 'listTitle');
    var iterationsList = $('<ul>');
    var iterationsListItem = $('<li>');

    /*

    input with buttons function

    */

    var inputButtons = $('.numButton');
    var counter = 0;
    var inputArray = [];
    inputButtons.each(function(){
        $(this).on('click', function(){
            counter++;
            var number = $(this).data('value');
            inputArray.push(number);
            $('#userNumber').text(createNumberFromArray(inputArray));
            if (counter == 4){
                inputButtons.off();
                inputArray.sort(function(a, b){return b-a});
                return inputArray;
            }
        });
    });

    var submitButton = $('#userNumbersSubmit');
    submitButton.on('click', function(e){
        e.preventDefault();
        /*
        validation code here ...
        */
        iterationsListTitle.text("Given number: " + createNumberFromArray(inputArray));
        iterationsListTitle.prependTo(resultBox);
        kaprekarGo(inputArray);
    });

    /*

    form function

    */

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

    /*
    *** KAPREKAR ITERATION ***
      Step 1. Take any four-digit number, using at least two different digits. (Leading zeros are allowed.)
      Step 2. Arrange the digits in descending and then in ascending order to get two four-digit numbers, adding leading zeros if necessary.
      Step 3. Subtract the smaller number from the bigger number.
      Step 4. Go back to step 2. 
    */


    var iterationNumber = 0;

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

        // display results after each iteration
        listItemClone.text("iteration no. " + iterationNumber + ": " + zeroForNum1 + num1 + " - " + zeroForNum2 + num2 + " = " + zeroForResult + result);
        listItemClone.appendTo(iterationsList).attr('id', 'iterNum-0'+iterationNumber);
        /* 
        condition: Kaprekar's constant is 6174 
        */
        if (result !== 6174) {
            // step 2
            result = String(result);
            var newArray = [];
            for (var i = 0; i < result.length; i++) {
                newArray.push(result[i]);
            }
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
            iterationsList.appendTo(resultBox);
        }
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
        var numString = "";
        var result = 0;
        for (var i = 0; i < inputArray.length; i++) {
            numString += inputArray[i];
        }
        result = Number(numString);
        return result;
    }

});