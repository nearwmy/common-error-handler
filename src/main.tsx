import defaultCodes from './codes';
import RequestError from './error'

interface errorHandlerConfig {
  condition: (args: any) => boolean;
  handler: (args: any) => void;
}

interface handlersParmas {
  [index: string]: errorHandlerConfig;
}

class ErrorHandler {
  static defaultCodes = defaultCodes
  static errorCodes = {};

  static init(errorCodes: any) {
    ErrorHandler.errorCodes = errorCodes;
  }

  public handlers: Map<string, (args:any) => void> = new Map();

  public assert: Map<string, (args:any) => boolean> = new Map();

  public registerHandlers(handlers: handlersParmas) {
    const keys = Object.keys(handlers);
    for (let i = 0; i < keys.length; i++) {
      this.registerHandler(keys[i], handlers[keys[i]]);
    }
  }

  private registerHandler(key: string, config: errorHandlerConfig) {
    if (!config.condition || !config.handler)
      throw new Error(
        "[register errorHandler failed]: condition and handler are required parameters"
      );
    this.handlers.set(key, config.handler);
    this.addAssert(key, config.condition);
  }

  private addAssert(key: string, condition: any) {
    this.assert.set(key, condition);
  }
}

const errorHandler = new ErrorHandler();

const doAllHandlers = (code: string, ...args: any) => {
  const errors = Array.from(errorHandler.assert.keys());
  for (let i = 0; i < errors.length; i++) {
    const key = errors[i];
    const hasAssert= errorHandler.assert.has(key);
    const hasHandler = errorHandler.handlers.has(key);

    if (hasAssert && hasHandler && errorHandler.assert.get(key)) {
      const handler = errorHandler.handlers.get(key);
      if (handler) {
        handler([...args])
      }
    }
  }
};

export { defaultCodes, errorHandler, doAllHandlers, RequestError };
export default ErrorHandler;
