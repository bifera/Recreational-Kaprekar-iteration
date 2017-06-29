$(function(){

    var arr1 = [6, 4, 2, 1];
    var arr2 = [];

    function createMirrorArray(inputArray, outputArray){
        for (var i = 0; i < inputArray.length; i++) {
            outputArray.push(inputArray[i]);
        }
        outputArray.reverse();
    }
    createMirrorArray(arr1, arr2);

    console.log(arr1);
    console.log(arr2);

    function createNumberFromArray(inputArray){
        var numString = "";
        var result = 0;
        for (var i = 0; i < inputArray.length; i++) {
            numString += inputArray[i];
        }
        result = Number(numString);
        console.log(result);
    }

    createNumberFromArray(arr1);
    createNumberFromArray(arr2);
});