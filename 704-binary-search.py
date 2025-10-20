import math
from typing import List

# Interpoliation Search
class Solution1:
    def search(self, nums: List[int], target: int) -> int:
        
        if len(nums) == 1 and nums[0] == target:
            return 0

        low = 0
        high = len(nums) - 1

        while target >= nums[low] and target <= nums[high] and low <= high:

            probe = math.floor(low + (high - low) * (target - nums[low]) / (nums[high] - nums[low]))
            if nums[probe] == target:
                return probe
            elif nums[probe] < target:
                low = probe + 1
            else:
                high = probe - 1

        return -1
            
# Binary Search
class Solution2:
    def search(self, nums: List[int], target: int) -> int:

        low = 0
        high = len(nums) - 1

        while low <= high:
            middle = low + (high - low) // 2

            if nums[middle] == target:
                return middle
            elif nums[middle] < target:
                low = middle + 1
            else:
                high = middle - 1
        
        return -1