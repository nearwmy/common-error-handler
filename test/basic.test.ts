import { describe, assert, expect, test } from 'vitest'
import ErrorHandler, { errorHandler, defaultCodes } from '../src/main'
import handlers from './handler';

const errorHandlerIns = new ErrorHandler();

describe('module exports test', () => {

  test('errorhandler is defined', () => {
    expect(errorHandler).toBeDefined();
  })

  test('defaultCodes is defined', () => {
    expect(defaultCodes).toBeDefined();
  })

  test('errorHandlerIns are instanceof ErrorHandler', () => {
    expect(errorHandlerIns).toBeInstanceOf(ErrorHandler);
  })

})

describe('errorHandler register test', () => {
  
  test('registerHandler', () => {
    errorHandler.registerHandlers(handlers);
    expect(errorHandler.assert).toBeInstanceOf(Map)
    expect(errorHandler.handlers).toBeInstanceOf(Map)
  })

  test('assert callback is boolean', () => {
    const res = errorHandler.assert.get('isNetworkError')(defaultCodes.NETWORK_ERROR);
    expect(res).toEqual(true)
  })

  test('handler throw error', () => {
    const handler = errorHandler.handlers.get('isNetworkError');
    expect(() => handler(defaultCodes.NETWORK_ERROR)).toThrowError();
  })

})
