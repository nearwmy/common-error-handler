import { RequestError } from '../types';

class GrpcError extends Error {
  static type = 'grpc';
  code: string|number
  message: string = ''

  constructor(obj: RequestError) {
    super()
    this.code = obj.code;
    this.message = obj.message;
  }
}

export default GrpcError;