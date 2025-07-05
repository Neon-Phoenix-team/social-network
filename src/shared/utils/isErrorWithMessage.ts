// export function isErrorWithMessage(
//   error: unknown
// ): error is { message: string } {
//   return (
//     typeof error === 'object' && // Проверяем, что error – это объект
//     error != null && // Убеждаемся, что это не null
//     'message' in error && // Проверяем, что у объекта есть свойство 'message'
//     typeof (error as any).message === 'string' // // eslint-disable-line @typescript-eslint/no-explicit-any
//   )
// }
type ErrorWithMessage = {
  message: string
}

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorWithMessage).message === 'string'
  )
}
