export const prepareHeaders = (headers: Headers) => {
  headers.set("Accept", "application/json")
  return headers
}
