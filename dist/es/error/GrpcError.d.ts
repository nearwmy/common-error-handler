import { RequestError } from '../types';
declare class GrpcError extends Error {
    static type: string;
    code: string;
    message: string;
    constructor(obj: RequestError);
}
export default GrpcError;
