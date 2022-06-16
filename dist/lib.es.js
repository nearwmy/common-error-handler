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
var defaultCodes = __spreadValues(__spreadValues(__spreadValues({}, COMMON_CODES), EDAM_CODES), GRPC_CODES);
const _ErrorHandler = class {
  constructor() {
    __publicField(this, "handlers", /* @__PURE__ */ new Map());
    __publicField(this, "assert", /* @__PURE__ */ new Map());
  }
  static init(errorCodes) {
    _ErrorHandler.errorCodes = errorCodes;
  }
  registerHandlers(handlers) {
    const keys = Object.keys(handlers);
    for (let i = 0; i < keys.length; i++) {
      this.registerHandler(keys[i], handlers[keys[i]]);
    }
  }
  registerHandler(key, config) {
    if (!config.condition || !config.handler)
      throw new Error("[register errorHandler failed]: condition and handler are required parameters");
    this.handlers.set(key, config.handler);
    this.addAssert(key, config.condition);
  }
  addAssert(key, condition) {
    this.assert.set(key, condition);
  }
};
let ErrorHandler = _ErrorHandler;
__publicField(ErrorHandler, "defaultCodes", defaultCodes);
__publicField(ErrorHandler, "errorCodes", {});
const errorHandler = new ErrorHandler();
const doAllHandlers = (code, ...args) => {
  const errors = Array.from(errorHandler.assert.keys());
  for (let i = 0; i < errors.length; i++) {
    const key = errors[i];
    const hasAssert = errorHandler.assert.has(key);
    const hasHandler = errorHandler.handlers.has(key);
    if (hasAssert && hasHandler && errorHandler.assert.get(key)) {
      const handler = errorHandler.handlers.get(key);
      if (handler) {
        handler([...args]);
      }
    }
  }
};
export { ErrorHandler as default, defaultCodes, doAllHandlers, errorHandler };
