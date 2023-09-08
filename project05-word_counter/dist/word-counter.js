export default class WordCounter {
    countWords(text) {
        const words = text.split(/\s+/).filter((word) => word !== "");
        return words.length;
    }
    countCharacters(text) {
        return text.replace(/\s+/g, "").length;
    }
}
