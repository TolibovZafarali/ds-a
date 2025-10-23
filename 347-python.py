from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:

        # creating empty map
        count = {}

        # iterating through list nums and adding the entries to the map, if the key exists: increment its value by 1
        for num in nums:
            if num in count:
                count[num] += 1
            else:
                count[num] = 1
        
        # sorting the map in descending order by entries' values and assigning it to a variable
        sorted_items = sorted(count.items(), key=lambda x: x[1], reverse=True)

        # getting the first k of sorted_items and getting their keys only and wrapping them in a list
        top_k = [num for num, freq in sorted_items[:k]]
        
        return top_k