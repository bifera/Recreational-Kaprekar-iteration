$(function(){

    var givenArray = [5, 2, 0, 0];
    kaprekarGo(givenArray);


    /*
    *** KAPREKAR ITERATION ***
      Step 1. Take any four-digit number, using at least two different digits. (Leading zeros are allowed.)
      Step 2. Arrange the digits in descending and then in ascending order to get two four-digit numbers, adding leading zeros if necessary.
      Step 3. Subtract the smaller number from the bigger number.
      Step 4. Go back to step 2. 
    */

    function kaprekarGo(array) {
        var result = 0;
        var array1 = array; // will be needed for step 2
        var array2 = createMirrorArray(array1); // will be needed for step 2
        var num1 = createNumberFromArray(array1);
        var num2 = createNumberFromArray(array2);
        result = num1 - num2; // step 3
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
            newArray.sort(function(a, b){return b-a});
            // step 4
            kaprekarGo(newArray);
        } else {
            console.log(result);
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