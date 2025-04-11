import { ObjectId } from 'mongodb';

export function createObjectId(
  id?: string,
): ObjectId | null {
  return id === null ?
    null
    :
    new ObjectId(
      id,
    );
}
export function createObjectUserId(
  userId?: string,
): ObjectId | null {
  return userId ? new ObjectId(userId) : null;
}

export function createObjectIds(
  ids: string[] = [],
): ObjectId[] {
  return ids
    .map(
      id =>
        createObjectId(
          id,
        ),
    )
}

export function createObjectIdAsString(
  id?: string,
): string {
  
  return id === null ?
    fromObjectId(
      createObjectId(),
    )
    :
    id;
}

export function fromObjectId(
  id?: ObjectId,
): string | null {
  return id === null ?
    null
    :
    id.toHexString();
}

export function fromObjectIds(
  ids: ObjectId[] = [],
): string[] {
  return ids
    .map(
      id => id.toHexString(),
    );
}