import { CurrencyOption } from './currency_types';

export interface ApiResponse {
  result: string;
}

export interface ApiErrorData extends ApiResponse {
  'error-type': string
}

export class ApiResponseError extends Error implements ApiErrorData {
  public 'error-type': string;

  constructor(
    public result: string,
    errorType: string,
    public code: number
  ) {
    super(`Error ${code}: ${errorType}`);
    this['error-type'] = errorType;
    Object.setPrototypeOf(this, ApiResponseError.prototype);
  }
}

export interface ApiCodesResponse extends ApiResponse {
  supported_codes: CurrencyOption[];
}

export interface ApiPairConversionResponse extends ApiResponse {
  amount: string;
  base_code: string;
  target_code: string;
  time_last_update_utc: string;
  conversion_rate: number;
  conversion_result: number;
}