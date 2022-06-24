export type Handler = (error: Error, event?: any) => void
export type Condition = (error: Error) => boolean

export interface ErrorHandlerConfig {
  condition: Condition;
  handler: Handler;
}

export interface Handlers {
  [index: string]: ErrorHandlerConfig;
}


export interface RequestError {
  code: string;
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