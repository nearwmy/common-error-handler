import { EDAM_ERROR_CODES } from './types';
declare const _default: {
    COMMON_CODES: {
        NETWORK_ERROR: string;
        TIMEOUT_ABORTED: string;
        INVALID_TOKEN: string;
        INVALID_TOKEN_CODE: number;
    };
    EDAM_CODES: EDAM_ERROR_CODES;
    GRPC_CODES: {
        CONTENT_lOADED_FAILED: number;
        PERMISSION_DENIED: number;
        INTERNAL_ERROR: number;
        ACCOUNT_DEACTIVATION: number;
        AUTH_EXPIRED: number;
        SENSITIVE_CONTENT: number;
        TRAFFIC_EXCEEDED: number;
        SERVER_ERROR: number;
        TOO_FREQUENT: number;
        REACHED_LIMIT: number;
        FORMAT_ERROR: number;
    };
};
export default _default;
