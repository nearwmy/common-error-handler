import { defaultCodes as errorCodes } from "../src/main";

const handlers = {
    isNetworkError: {
        condition: code => code === errorCodes.NETWORK_ERROR,
        handler: error => {
          throw new Error('网络错误，请稍后重试')
        }
    },
    isTimeout: {
        condition: code => code === errorCodes.TIMEOUT_ABORTED,
        handler:error => {
          throw new Error('请求已超时，请重新尝试')
        }
    },
    isInvalidToken: {
        condition: code =>
            code === errorCodes.INVALID_TOKEN ||
            code === errorCodes.AUTH_EXPIRED ||
            code === errorCodes.INVALID_AUTH ||
            code === errorCodes.INVALID_TOKEN_CODE,
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
        condition: code => Object.values(errorCodes).indexOf(code) === -1,
        handler: error => {
            throw new Error('未知错误')
        }
    }
};

export default handlers