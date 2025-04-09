let currentSequence = 0;

export function generateUniqueItemNr(): number {
  currentSequence += 1;
  return currentSequence;
}