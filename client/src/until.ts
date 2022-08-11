export function makeImageFormat(url: string, format?: string) {
  return `http://image.tmdb.org/t/p/${format ? format : "original"}/${url}`;
}
