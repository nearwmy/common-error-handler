import errorCodes from './codes';
import RequestError from './error'
import { ErrorHandlerConfig, Handlers, Handler, Condition } from "./types";

const symbolId = Symbol()
let errorHandlerIns:ErrorHandler | null = null;

const defaultFinalHandler: Handler = (error: Error) => {
  if (error instanceof Error) {
    throw Error;
  }
  return error;
};
class ErrorHandler {
  private configHandlers: Map<string, ErrorHandlerConfig>;
  private finalHandler: Handler = defaultFinalHandler;

  constructor(id: Symbol) {
    if (id !== symbolId) {
      throw new Error("can not create a ErrorHandler instance");
    }
    this.configHandlers = new Map();
  }

  static getInstance() {
    if (errorHandlerIns === null) {
      errorHandlerIns = new ErrorHandler(symbolId);
    }
    return errorHandlerIns;
  }

  // 注册错误处理
  registerHandlers(handlers: Handlers) {
    const keys = Object.keys(handlers);
    for (let i = 0; i < keys.length; i++) {
      this.configHandlers.set(keys[i], handlers[keys[i]]);
    }
  }

  // 注册兜底错误处理
  registerFinalHandler(handler: Handler): void {
    this.finalHandler = handler;
  }

  // 卸载错误处理
  unregisterHandlers(handlerKeys: string[]) {
    for (let i = 0; i++; i < handlerKeys.length) {
      this.configHandlers.delete(handlerKeys[i]);
    }
  }

  // 卸载兜底错误处理
  unregisterFinalHandler() {
    this.finalHandler = defaultFinalHandler;
  }

  getConfigHandlers() {
    return this.configHandlers;
  }

  getFinalHandler() {
    return this.finalHandler;
  }

  // 处理错误
  handler(error: Error) {
    if (error !== undefined && error !== null) {
      const finalHandler = (error: Error) => {
        try {
          if (this.finalHandler instanceof Function) {
            this.finalHandler(error);
          }
        } catch (anotherError) {
          console.warn(
            "occur an error in finalHandler handler\n",
            anotherError
          );
        }
      };

      // 如果未被处理则进入兜底处理
      let handled = false;
      const configHandlersArr = Array.from(this.configHandlers);
      configHandlersArr.forEach((item: any) => {
        const config = item[1];
        try {
          if (config.condition(error)) {
            config.handler(error);
          }
        } catch (anotherError: any) {
          finalHandler(anotherError);
        }

        handled = true;
      });

      if (!handled) {
        finalHandler(error);
      }
    }
  }
}

export { errorCodes, RequestError };
export default ErrorHandler;
