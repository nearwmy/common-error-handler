import { RequestError } from '../types';
declare class EdamError extends Error {
    static type: string;
    code: string;
    message: string;
    constructor(obj: RequestError);
}
export default EdamError;
