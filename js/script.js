$(function(){

    var arr1 = [5, 2, 0, 0];
    var arr2 = createMirrorArray(arr1);

    var num1 = createNumberFromArray(arr1);
    var num2 = createNumberFromArray(arr2);

    // functions on arrays
    function createMirrorArray(inputArray){
        var outputArray = [];
        for (var i = 0; i < inputArray.length; i++) {
            outputArray.push(inputArray[i]);
        }
        outputArray.reverse();
        return outputArray;
    }

    function createNumberFromArray(inputArray){
        var numString = "";
        var result = 0;
        for (var i = 0; i < inputArray.length; i++) {
            numString += inputArray[i];
        }
        result = Number(numString);
        return result;
    }

    function createArraysFromSubtraction(highNum, lowNum) {
        var result = 0;
        var array1 = [];
        var array2 = [];
        result = highNum - lowNum;
        if (result !== 6174) {
            result = String(result);
            for (var i = 0; i < result.length; i++) {
                array1.push(result[i]);
            }
            array1.sort(function(a, b){return b-a});
            array2 = createMirrorArray(array1);
            console.log(array1, array2);
            number1 = createNumberFromArray(array1);
            number2 = createNumberFromArray(array2);
            createArraysFromSubtraction(number1, number2);
        } else {
            console.log(result);
        }
    }
    
    createArraysFromSubtraction(num1, num2);

});