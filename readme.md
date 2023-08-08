## 背景

发现在项目中，错误处理往往被忽视，大家更多关注的是程序在完美的场景下的执行结果，却容易忽视了异常情况下程序应该何去何从，这样就会导致在服务异常，网络异常，数据异常的时候白屏，崩溃，一直 loading 之类甚至是出现其他诡异现象。为了保证程序在异常情况下也能正常运行，错误处理是不可缺失的一部分。


错误处理的方式有很多，比如 try-catch-finally，抛出一个异常错误，或者通过返回的异常码判断，这里介绍的方式就是通过第三方 API 去捕捉异常码做判断并处理

## 使用场景

供业务项目使用的错误处理工具，可注册自定义的错误 condition 和 handler, 初始化的时候可传入异常上下文 比如 error


## 职责

该工具和业务无关, 所以可以在不同项目中使用。只负责校验错误和处理错误，需要业务方主动调用。

该功能能提供：

1. 错误断言和错误处理
2. 兜底错误处理
2. requestError: `GrpcError`, `EdamError`, `RestfulError` 错误自定义类
3. errorCodes: `grpc`， `edam`， `restful` 部分错误码（可以继续完善）


## API 
```ts
registerHandlers: 注册自定义的错误处理  
registerFinalHandler: 注册兜底错误处理  

unregisterHandlers: 注销错误处理  
unregisterFinalHandler: 注销兜底错误处理  

getConfigHandlers: 获取所有错误处理  
getFinalHandler: 获取兜底错误处理  

assert: 断言错误  
handler: 错误处理  
```

### 安装

```
yarn 
```
### 本地
```
yarn dev
```
### 测试
```
yarn test  
yarn test:run  
yarn test:ui
```

### 代码示例

```ts
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

errorHandler.handler(error)
errorHandler.asset('isNetworkError', error)

```


