var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const COMMON_CODES = {
  NETWORK_ERROR: "Network Error",
  TIMEOUT_ABORTED: "ECONNABORTED",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_TOKEN_CODE: 413
};
const EDAM_CODES = {
  PERMISSION_DENIED: 3,
  INVALID_AUTH: 8,
  AUTH_EXPIRED: 9
};
const GRPC_CODES = {
  CONTENT_lOADED_FAILED: 11003,
  PERMISSION_DENIED: 11004,
  INTERNAL_ERROR: 11009,
  ACCOUNT_DEACTIVATION: 11010,
  AUTH_EXPIRED: 11005,
  SENSITIVE_CONTENT: 11008,
  TRAFFIC_EXCEEDED: 22005,
  SERVER_ERROR: 22006,
  TOO_FREQUENT: 11006,
  REACHED_LIMIT: 11007,
  FORMAT_ERROR: 22222
};
var codes = {
  COMMON_CODES,
  EDAM_CODES,
  GRPC_CODES
};
class EdamError extends Error {
  constructor(obj) {
    super();
    __publicField(this, "code", "");
    __publicField(this, "message", "");
    this.code = obj.code;
    this.message = obj.message;
  }
}
__publicField(EdamError, "type", "edam");
class GrpcError extends Error {
  constructor(obj) {
    super();
    __publicField(this, "code", "");
    __publicField(this, "message", "");
    this.code = obj.code;
    this.message = obj.message;
  }
}
__publicField(GrpcError, "type", "grpc");
class RestfulError extends Error {
  constructor(obj) {
    super();
    __publicField(this, "code", "");
    __publicField(this, "message", "");
    this.code = obj.code;
    this.message = obj.message;
  }
}
__publicField(RestfulError, "type", "restful");
var index = {
  EdamError,
  GrpcError,
  RestfulError
};
const symbolId = Symbol();
let errorHandlerIns = null;
const defaultFinalHandler = (error) => {
  if (error instanceof Error) {
    throw Error;
  }
  return error;
};
class ErrorHandler {
  constructor(id) {
    __publicField(this, "configHandlers");
    __publicField(this, "finalHandler", defaultFinalHandler);
    if (id !== symbolId) {
      throw new Error("ERROR_HANDLER: can not create a ErrorHandler instance");
    }
    this.configHandlers = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    if (errorHandlerIns === null) {
      errorHandlerIns = new ErrorHandler(symbolId);
    }
    return errorHandlerIns;
  }
  registerHandlers(handlers) {
    const keys = Object.keys(handlers);
    for (let i = 0; i < keys.length; i++) {
      this.configHandlers.set(keys[i], handlers[keys[i]]);
    }
  }
  registerFinalHandler(handler) {
    if (typeof handler === "function") {
      this.finalHandler = handler;
    } else {
      throw new Error("ERROR_HANDLER: final handler must be function");
    }
  }
  unregisterHandlers(handlerKeys) {
    for (let i = 0; i++; i < handlerKeys.length) {
      this.configHandlers.delete(handlerKeys[i]);
    }
  }
  unregisterFinalHandler() {
    this.finalHandler = defaultFinalHandler;
  }
  getConfigHandlers() {
    return this.configHandlers;
  }
  getFinalHandler() {
    return this.finalHandler;
  }
  assert(key, error) {
    const config = this.configHandlers.get(key);
    if (config) {
      const {
        condition
      } = config;
      return condition(error);
    } else {
      console.warn(`ERROR_HANDLER: ${key} is not found in configHandlers`);
      return false;
    }
  }
  handler(error) {
    if (error !== void 0 && error !== null) {
      const finalHandler = (error2) => {
        try {
          if (typeof this.finalHandler === "function") {
            this.finalHandler(error2);
          }
        } catch (anotherError) {
          console.warn("occur an error in finalHandler handler\n", anotherError);
        }
      };
      let handled = false;
      let needBubble = 0;
      const configHandlersArr = Array.from(this.configHandlers);
      configHandlersArr.forEach((item) => {
        const config = item[1];
        if (config.condition(error)) {
          let bubble = true;
          const event = {
            stopPropagation() {
              bubble = false;
            }
          };
          try {
            config.handler(error, event);
          } catch (anotherError) {
            finalHandler(anotherError);
          }
          handled = true;
          if (bubble) {
            needBubble++;
          }
        }
      });
      console.log("needBubble====", needBubble);
      console.log("handled=====", handled);
      if (!handled || needBubble > 0) {
        finalHandler(error);
      }
    }
  }
}
export { index as RequestError, ErrorHandler as default, codes as errorCodes };
