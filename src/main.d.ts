import errorCodes from "./codes";
import RequestError from './error';
import { ErrorHandlerConfig, Handlers, Handler, ErrorHandlerInterface } from "./types";
declare class ErrorHandler implements ErrorHandlerInterface {
    private configHandlers;
    private finalHandler;
    constructor(id: Symbol);
    static getInstance(): ErrorHandler;
    registerHandlers(handlers: Handlers): void;
    registerFinalHandler(handler: Handler): void;
    unregisterHandlers(handlerKeys: string[]): void;
    unregisterFinalHandler(): void;
    getConfigHandlers(): Map<string, ErrorHandlerConfig>;
    getFinalHandler(): Handler;
    assert(key: string, error: any): boolean;
    handler(error: Error): void;
}
export { errorCodes, RequestError };
export default ErrorHandler;
