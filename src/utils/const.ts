export enum Errors {
  UserNotFound = 'User not found',
  oldPasswordIsWrong = 'Old password is wrong',
  ArtistNotFound = 'Artist not found',
  AlbumNotFound = 'Album not found',
  TrackNotFound = 'Track not found',

  RouteNotFound = 'Route not found',
  ServerError = 'Internal server error. Please try again',
  InvalidUserId = 'User id is invalid',
  MethodNotSupport = 'Server does not support entered request with such request method',
  NotValidateFields = 'Body does not contain required fields (username, age, hobbies) or order of fields is broken or properties do not match data types',
  ErrorJsonParse = 'Unexpected character of JSON data',
}
