export function handleError(error: any): string {
  let message = "";
  if (error.response) {
    message = error.response.data
      ? error.response.data.data.message
      : "Unexpected Error";
  } else if (error.request) {
    message = "Connection Error";
  } else {
    message = "Unexpected Error";
  }

  return message;
}
