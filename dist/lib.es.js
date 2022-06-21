var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var codes = __spreadValues(__spreadValues(__spreadValues({}, COMMON_CODES), EDAM_CODES), GRPC_CODES);
class EdamError extends Error {
}
__publicField(EdamError, "type", "edam");
__publicField(EdamError, "code", "");
class GrpcError extends Error {
}
__publicField(GrpcError, "type", "grpc");
class RestfulError extends Error {
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
      throw new Error("can not create a ErrorHandler instance");
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
      throw new Error("final handler must be function");
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
        let bubble = true;
        const event = {
          stopPropagation() {
            bubble = false;
          }
        };
        try {
          if (config.condition(error)) {
            config.handler(error, event);
          }
        } catch (anotherError) {
          finalHandler(anotherError);
        }
        handled = true;
        if (bubble) {
          needBubble++;
        }
      });
      if (!handled || needBubble > 0) {
        finalHandler(error);
      }
    }
  }
}
export { index as RequestError, ErrorHandler as default, codes as errorCodes };
