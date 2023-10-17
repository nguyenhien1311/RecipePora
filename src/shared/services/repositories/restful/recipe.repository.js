import BaseRepository from './base.repository';

class RecipeRepository extends BaseRepository {
  constructor() {
    super('/recipes');
  }

  getAll() {
    return this.client.get('');
  }
}

export default new RecipeRepository();
