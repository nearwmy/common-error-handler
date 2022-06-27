export declare type Handler = (error: Error, event?: any) => void;
export declare type Condition = (error: Error) => boolean;
export interface ErrorHandlerConfig {
    condition: Condition;
    handler: Handler;
}
export interface Handlers {
    [index: string]: ErrorHandlerConfig;
}
export interface RequestError {
    code: string | number;
    message: string;
}
export interface ErrorHandlerInterface {
    registerHandlers: (handlers: Handlers) => void;
    registerFinalHandler: (handler: Handler) => void;
    unregisterHandlers: (keys: string[]) => void;
    unregisterFinalHandler: () => void;
    getConfigHandlers: () => Map<string, ErrorHandlerConfig>;
    getFinalHandler: () => Handler;
    assert: (key: string, error: any) => boolean;
    handler: (error: any) => void;
}
export declare type EDAM_ERROR_CODES = {
    PERMISSION_DENIED: 3;
    INVALID_AUTH: 8;
    AUTH_EXPIRED: 9;
};
