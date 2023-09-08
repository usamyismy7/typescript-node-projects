export default class WordCounter {
  countWords(text: string): number {
    const words = text.split(/\s+/).filter((word) => word !== "");
    return words.length;
  }

  countCharacters(text: string): number {
    return text.replace(/\s+/g, "").length;
  }
}
