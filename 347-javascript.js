/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
    
    // here I'm creating an empty Object
    let count = {};

    // iterating through nums and adding to the Object, value is inremented by 1 if key already exists
    for (let num of nums) {
        if (count[num]) {
            count[num]++;
        } else {
            count[num] = 1;
        }
    }

    // here, I'm assigning the entries in descending order to sorted_items
    let sorted_items = Object.entries(count).sort((a, b) => b[1] - a[1]);

    // created empty array for the answer
    let top_k = [];

    // iterating #k times and pushing the first k elements that are converted to an int
    for (let i = 0; i < k; i++) {
        top_k.push(Number(sorted_items[i][0]))
    }

    return top_k;
};