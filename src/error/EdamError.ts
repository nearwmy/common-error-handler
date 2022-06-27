import { RequestError } from '../types';
class EdamError extends Error {
  static type = 'edam';
  code: string|number;
  message: string = ''

  constructor(obj: RequestError) {
    super()
    this.code = obj.code;
    this.message = obj.message;
  }
} 

export default EdamError;