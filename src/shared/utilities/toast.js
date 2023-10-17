import { Notify } from 'quasar';

class ToastUtil {
  success(message) {
    Notify.create({
      type: 'positive',
      message,
    });
  }

  warning(message) {
    Notify.create({
      type: 'warning',
      message,
    });
  }

  error(message) {
    Notify.create({
      type: 'negative',
      message,
      color: 'red',
    });
  }

  exception(error) {
    if (error instanceof Error) {
      if (error.code === 'ECONNABORTED') {
        // timeout
        this.error('Time out exception');
      } else if (error.code === 'API_ERROR') {
        // Api Error
        this.error('Api error exception');
      } else {
        // default
        this.error('Unknow exception');
      }
    } else {
      // ServiceErrorResponse
      this.error('Service error response exception');
    }
  }
}

export default new ToastUtil();
