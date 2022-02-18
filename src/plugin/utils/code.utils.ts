export const unescapeCode = (code: string | undefined | null): string | undefined | null =>
  code
    ?.replace(/'&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
