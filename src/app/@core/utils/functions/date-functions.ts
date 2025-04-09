export function nowUtc(): Date {
  const now = Date.now();

  const nowDate =
    new Date(
      now,
    );

  const nowDateUtcString =
    nowDate
      .toUTCString();

  const nowDateUtc =
    new Date(
      nowDateUtcString,
    );

  return nowDateUtc;
}