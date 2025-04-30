

function minimumAbsDifference(arr) {
    // Sort the array
    arr.sort((a, b)=> a - b);

    let minDiff = Infinity;
    let result = [];

    for(let i=1; i<arr.length; i++){
        const diff = arr[i] - arr[i-1];
        if(diff < minDiff){
            minDiff = diff;
        }
    }

    for(let i=1; i<arr.length; i++){
        const diff = arr[i] - arr[i-1];
        if(diff === minDiff){
            result.push([arr[i-1], arr[i]]);
        }
    }
    return result;
}


// Example usage:
const arr = [6, 2, 4, 10];
console.log(minimumAbsDifference(arr));