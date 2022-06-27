import { RequestError } from '../types';
declare class RestfulError extends Error {
    static type: string;
    code: string;
    message: string;
    constructor(obj: RequestError);
}
export default RestfulError;
