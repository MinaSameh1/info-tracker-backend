export function normalizeArabicSpaces(str: string) {
  // Replace all occurrences of Unicode code point 160 (Arabic space) with Unicode code point 32 (regular space)
  return str.replace(/\u00A0/g, ' ')
}
