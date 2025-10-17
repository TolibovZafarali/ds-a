from typing import List

# The first solution basically works fine with lists that do not contain
# empty strings. But it has too many loops, which is time consuming, and space consuming as well
# because I've created too many variables and stored copied values.
class Solution1:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:

        wordSet = set()

        for i in strs:
            wordSet.add("".join(sorted(i)))

        new_list = []

        words = []
        result = []

        for i in wordSet:
            new_list.append(i)

        for i in range(len(new_list)):
            for j in range(len(strs)):
                if sorted(new_list[i]) == sorted(strs[j]):
                    words.append(strs[j])
                    for k in range(j + 1, len(strs)):
                        if sorted(strs[j]) == sorted(strs[k]):
                            words.append(strs[k])

            result.append(words[:])
            words.clear()

        new_result = []

        for single_list in result:
            new_result.append(list(set(single_list)))

        return new_result

# Second solution is more efficient, because I'm using dictionary (hashmap) to store
# sorted strings as keys and original strings as values wrapped in a list. At the end, I'm wrapping
# all the values from the hashmap in a list and returning it.
class Solution2:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = {}

        for word in strs:
            sorted_word = ''.join(sorted(word))
            if sorted_word not in groups:
                groups[sorted_word] = [word]
            else:
                groups[sorted_word].append(word)
        
        result = list(groups.values())

        return result
