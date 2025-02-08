export default class AppError extends Error {

    private _status: number;
    private _data: Object | [];
  
    constructor(message: string, statusCode: number = 500, data: Object | [] = {}) {
      super(message);
      this._status = statusCode;
      this._data = data;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
    get statusCode(): number {
      return this._status;
    }
    set statusCode(code: number) {
      this._status = code;
    }
    get data(): Object | [] {
      return this._data;
    }
    set data(errorData: Object | []) {
      this._data = errorData;
    }
  }