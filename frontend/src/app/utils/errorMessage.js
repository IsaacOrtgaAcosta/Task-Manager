export function manageErrors(status) {
  if (status !== 200) {
    return true;
  } else {
    return false;
  }
}
