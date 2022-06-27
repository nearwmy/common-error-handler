## 概述

供业务项目使用的错误处理工具，可注册自定义的错误 condition 和 handler, 初始化的时候可传入 errorcodes


### 职责

该工具和业务无关，只提供工具供生成断言和错误处理，然后在业务需要的地方调用


### 安装

yarn 

### 本地

yarn dev

### 测试

yarn test:run 
yarn test:ui


### 注册的 handlers 示例

```
import ErrorHandler from 'error-handler';
const { COMMON_CODES, EDAM_CODES, GRPC_CODES } = errorCodes;
const handlers = {
    isNetworkError: {
        condition: code => code === COMMON_CODES.NETWORK_ERROR,
        handler: error => {
          throw new Error('网络错误，请稍后重试')
        }
    },
    isTimeout: {
        condition: code => code === COMMON_CODES.TIMEOUT_ABORTED,
        handler:error => {
          throw new Error('请求已超时，请重新尝试')
        }
    },
    isOffLine: {
        condition: () => window.navigator.onLine === false,
        handler: () => {
            throw new Error('请检查网络设置')
        }
    }
};
// 初始化
const errorHandler = ErrorHandler.getInstance();
// 注册错误处理
errorHandler.registerHandlers(yxHandlers);
// 注册兜底错误处理
errorHandler.registerFinalHandler((error: any) => {
    console.log('unhandled error:', error);
});

```


