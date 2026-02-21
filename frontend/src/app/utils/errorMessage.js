export function manageErrors(status) {
  if (status !== 200) {
    console.log("Es error");
    return true;
  } else {
    console.log("TODO BIEN");
    return false;
  }
}
