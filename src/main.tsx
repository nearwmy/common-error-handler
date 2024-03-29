import errorCodes from "./codes";
import RequestError from './error'
import {
  ErrorHandlerConfig,
  Handlers,
  Handler,
  Condition,
  ErrorHandlerInterface,
} from "./types";

const symbolId = Symbol()
let errorHandlerIns:ErrorHandler | null = null;

const defaultFinalHandler: Handler = (error: Error) => {
  if (error instanceof Error) {
    throw Error;
  }
  return error;
};
class ErrorHandler implements ErrorHandlerInterface {
  private configHandlers: Map<string, ErrorHandlerConfig>;
  private finalHandler: Handler = defaultFinalHandler;

  constructor(id: Symbol) {
    if (id !== symbolId) {
      throw new Error("ERROR_HANDLER: can not create a ErrorHandler instance");
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
  registerFinalHandler(handler: Handler) {
    if (typeof handler === 'function') {
      this.finalHandler = handler;
    } else {
      throw new Error("ERROR_HANDLER: final handler must be function");
    }
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

  // 断言 根据 error 判断错误
  assert(key: string, error: any): boolean {
    const config = this.configHandlers.get(key);
    if (config) {
      const { condition } = config;
      return condition(error);
    } else {
      console.warn(`ERROR_HANDLER: ${key} is not found in configHandlers`);
      return false;
    }
  }

  // 处理错误
  handler(error: Error) {
    if (error !== undefined && error !== null) {
      const finalHandler = (error: Error) => {
        try {
          if (typeof this.finalHandler === 'function') {
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
      let needBubble = 0;
      const configHandlersArr = Array.from(this.configHandlers);
      configHandlersArr.forEach((item: any) => {
        const config = item[1];
        if (config.condition(error)) {
          let bubble = true;
          const event = {
            stopPropagation() {
              bubble = false;
            },
          };
          try {
            config.handler(error, event);
          } catch (anotherError: any) {
            finalHandler(anotherError);
          }

          handled = true;
          if (bubble) {
            needBubble++;
          }
        }
      });
      if (!handled || needBubble > 0) {
        finalHandler(error);
      }
    }
  }
}

export { errorCodes, RequestError };
export default ErrorHandler;
