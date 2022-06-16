## 概述

供业务项目使用的错误处理工具，可注册自定义的错误 condition 和 handler, 初始化的时候可传入 errorcodes


### 职责

该工具和业务无关，只提供工具供生成断言和错误处理，然后在业务需要的地方调用


### 安装

yarn 

### 本地

yarn dev

### 测试

yarn test 
yarn test:ui


### handlers 示例

```
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

```


