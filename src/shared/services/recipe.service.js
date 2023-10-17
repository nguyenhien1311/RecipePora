import BaseService from 'src/shared/services/base.service';
import { STATUS_CODE } from 'src/helpers/enum';

class RecipeService extends BaseService {
  async getAll() {
    const result = await this.dao.getAll();
    const { code, body } = result;
    if (code === STATUS_CODE.SUCCESS) {
      return body;
    }
    return null;
  }
}

export default new RecipeService('recipe');
