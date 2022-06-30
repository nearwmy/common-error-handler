import { describe, assert, expect, test } from 'vitest'
import ErrorHandler, { errorCodes, RequestError } from '../src/main'
import handlers from './handler';

const errorHandlerIns = ErrorHandler.getInstance();

describe('module exports test', () => {

  test('errorCodes is defined', () => {
    expect(errorCodes).toBeDefined();
  })

  test('RequestError is defined', () => {
    expect(RequestError).toBeDefined();
  })

  test('errorHandlerIns are instanceof ErrorHandler', () => {
    expect(errorHandlerIns).toBeInstanceOf(ErrorHandler);
  })

})

describe('errorHandlerIns register test', () => {
  
  test('registerHandler', () => {
    errorHandlerIns.registerHandlers(handlers);
    expect(errorHandlerIns.getConfigHandlers()).toBeInstanceOf(Map)
  })

  test('registerFinalHandler must be function', () => {
    expect(() => errorHandlerIns.registerFinalHandler('1')).toThrowError()
  })


  test('handler throw error', () => {
    const networkError = new RequestError.RestfulError({code: errorCodes.COMMON_CODES.NETWORK_ERROR, message: '网络错误，请稍后重试'})
    const handler = errorHandlerIns.handler;
    expect(() => handler(networkError)).toThrowError();
  })

})
