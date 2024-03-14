export function countCharacters(text) {  
    const chineseRegex = /[\u4e00-\u9fa5]/g;  
    const englishRegex = /[a-zA-Z0-9\s,.?!;:'"-]/g;  
      
    const chineseCount = (text.match(chineseRegex) || []).length;  
    const englishCount = (text.match(englishRegex) || []).length;  
      
    return chineseCount + englishCount;
}  