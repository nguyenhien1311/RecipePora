/* eslint-disable class-methods-use-this */
import RecipeRepository from 'services/repositories/restful/recipe.repository';

class RepositoryFactory {
  getRepository(serviceName) {
    switch (serviceName) {
      case 'recipe':
        return RecipeRepository;
      default:
        throw Error('Invalid param');
    }
  }
}

export default new RepositoryFactory();
