import { checkState } from '../helper/forMocking.js';
import { jest } from '@jest/globals';

describe('check state', () => {
  // given
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  test('should call onSuccess if predicate is true', () => {
    checkState(() => true, onSuccess, onFail);

    // expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess).toBeCalledTimes(1);
    // expect(onSuccess.mock.calls[0][0]).toBe('yes');
    expect(onSuccess).toBeCalledWith('yes');

    // expect(onFail.mock.calls.length).toBe(0);
    expect(onFail).toHaveBeenCalledTimes(0); // 동일
  });

  test('should call onFail if predicate is false', () => {
    // when
    checkState(() => false, onSuccess, onFail);

    // then
    expect(onFail).toBeCalledTimes(1);
    expect(onFail).toBeCalledWith('no');

    expect(onSuccess).toBeCalledTimes(0);
  });
});
