export function checkState(predicate, onSuccess, onFail) {
  if (predicate()) {
    onSuccess('yes');
  } else {
    onFail('no');
  }
}
