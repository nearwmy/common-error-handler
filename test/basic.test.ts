import { describe, assert, expect, test } from 'vitest'
import ErrorHandler, { errorCodes, RequestError } from '../src/main'
import handlers from './handler';

const errorHandlerIns = ErrorHandler.getInstance();
class BussinessError extends Error {
  code: string = ''
  
  constructor(code: string) {
    super();
    this.code = code;
  }
}

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


  test('handler throw error', () => {
    const networkError = new BussinessError(errorCodes.NETWORK_ERROR)
    const handler = errorHandlerIns.handler;
    expect(() => handler(networkError)).toThrowError();
  })

})
