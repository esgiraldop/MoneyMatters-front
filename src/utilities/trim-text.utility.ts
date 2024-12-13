export const trimText = (text: string, maxLength: number = 16): string =>
  text.length >= maxLength ? text.slice(0, 16) + "..." : text;
