export interface LanguageStats {
  name: string;
  percentage: number;
  bytes: number;
}

/**
 * Calculate language percentages from GitHub languages object
 * @param languages - Object mapping language names to byte counts
 * @returns Array of languages with calculated percentages
 */
export function calculateLanguagePercentages(
  languages: { [key: string]: number }
): LanguageStats[] {
  if (!languages || Object.keys(languages).length === 0) {
    return [];
  }

  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  const languagesWithPercentages = Object.entries(languages).map(([name, bytes]) => ({
    name,
    bytes,
    percentage: (bytes / totalBytes) * 100,
  }));

  // Sort by bytes (descending)
  return languagesWithPercentages.sort((a, b) => b.bytes - a.bytes);
}

/**
 * Get top N languages by usage
 * @param languages - Object mapping language names to byte counts
 * @param count - Number of top languages to return (default: 5)
 * @returns Array of top N languages with percentages
 */
export function getTopLanguages(
  languages: { [key: string]: number },
  count: number = 5
): LanguageStats[] {
  const allLanguages = calculateLanguagePercentages(languages);
  return allLanguages.slice(0, count);
}
