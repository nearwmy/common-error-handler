import { RequestError } from '../types';
class RestfulError extends Error {
  static type = 'restful';
  code: string|number
  message: string = ''

  constructor(obj: RequestError) {
    super()
    this.code = obj.code;
    this.message = obj.message;
  }
}

export default RestfulError;