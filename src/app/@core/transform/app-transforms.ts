export default {
  stringTransform(
    {
      value,
    }
  ): string {
    return value === '' || value === null || value === undefined ? null : value;
  },

  booleanTransform(
    {
      value,
    }
  ): boolean {
    return value === 'true';
  },

  intTransform(
    {
      value,
    }
  ): number {
    return parseInt(
      value,
    );
  },

  stringCommasSeparatedTransform(
    {
      value,
    }
  ): string[] {
    return value === '' || value === null || value === undefined ?
      null
      :
      value
        .split(
          ',',
        )
        .map(
          id => id.trim(),
        );
  },
}