import { errorCodes } from "../src/main";

const handlers = {
    isNetworkError: {
        condition: error => error.code === errorCodes.NETWORK_ERROR,
        handler: error => {
          throw new Error('网络错误，请稍后重试')
        }
    },
    isTimeout: {
        condition: error => error.code === errorCodes.TIMEOUT_ABORTED,
        handler:error => {
          throw new Error('请求已超时，请重新尝试')
        }
    },
    isInvalidToken: {
        condition: error =>
            error.code === errorCodes.INVALID_TOKEN ||
            error.code === errorCodes.AUTH_EXPIRED ||
            error.code === errorCodes.INVALID_AUTH ||
            error.code === errorCodes.INVALID_TOKEN_CODE,
        handler: error => {
          throw new Error('登录已过期，请重新登录')
        }
           
    },
    isOffLine: {
        condition: () => window.navigator.onLine === false,
        handler: () => {
            throw new Error('请检查网络设置')
        }
    },
    isUnknowError: {
        condition: error => Object.values(errorCodes).indexOf(error.code) === -1,
        handler: (error, event) => {
            event.stopPropagation();
            throw new Error('未知错误')
        }
    }
};

export default handlers