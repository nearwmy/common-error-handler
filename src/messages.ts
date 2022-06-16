import { COMMON_CODES, EDAM_CODES, GRPC_CODES } from './codes';

// console.log('messages=====', COMMON_CODES, EDAM_CODES, GRPC_CODES);
export default {
    [COMMON_CODES.NETWORK_ERROR]: '网络错误',
    [COMMON_CODES.INVALID_TOKEN]: 'token 不合法',
    [EDAM_CODES.AUTH_EXPIRED]: '登录态已过期，请重新登陆',
    [EDAM_CODES.INVALID_AUTH]: 'auth 不合法',
    [EDAM_CODES.PERMISSION_DENIED]: '无操作权限',
    [GRPC_CODES.ACCOUNT_DEACTIVATION]: '该账号已停用，无法邀请',
    [GRPC_CODES.AUTH_EXPIRED]: '登录过期，请重新登录',
    [GRPC_CODES.CONTENT_lOADED_FAILED]: '内容加载失败',
    [GRPC_CODES.PERMISSION_DENIED]: '权限不足，无法操作',
    [GRPC_CODES.SENSITIVE_CONTENT]: '内容敏感，无法提交',
    [GRPC_CODES.REACHED_LIMIT]: '空间已达上限，无法继续创建',
    [GRPC_CODES.INTERNAL_ERROR]: '系统错误，请重试',
    [GRPC_CODES.TOO_FREQUENT]: '操作频繁，请稍后重试',
    [GRPC_CODES.FORMAT_ERROR]: '格式错误，请校验后提交'
};
