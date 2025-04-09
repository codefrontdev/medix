export function searchRegEx(
  search: string,
) {
  return new RegExp(
    search,
    'i',
  );
}