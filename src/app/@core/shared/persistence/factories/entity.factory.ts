export interface EntityFactory<TEntity> {
  save(
    ...args: any
  ): TEntity | Promise<TEntity>;
}