
import { ApiCodesResponse, ApiErrorData, ApiPairConversionResponse, ApiResponse, ApiResponseError } from '../types/apiResponse_types';
import { CurrencyOption } from '../types/currency_types';

const apiKey = import.meta.env.VITE_APIKEY as string;
const isDev = import.meta.env.DEV;

const BASE_URL = isDev
  ? `/api/v6/${apiKey}`
  : `https://v6.exchangerate-api.com/v6/${apiKey}`;

export const getPairConversion = async (from: string, to: string, amount: string): Promise<ApiPairConversionResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/pair/${from}/${to}/${amount}`);
    const data = await res.json() as ApiResponse;

    if (!res.ok) {
      const errorData = data as ApiErrorData;
      throw new ApiResponseError(errorData.result, errorData['error-type'], res.status);
    }

    const successData = data as ApiPairConversionResponse;
    return successData;
  }
  catch (err) {
    if (err instanceof ApiResponseError) throw err;
    throw new Error('Something went wrong');
  }
};

export const getCodes = async (): Promise<CurrencyOption[]> => {
  console.warn('executed getcodes');
  console.log('executed getcodes');

  try {
    const res = await fetch(BASE_URL + '/codes');
    const data = (await res.json()) as ApiResponse;

    if (!res.ok) {
      const errorData = data as ApiErrorData;

      throw new ApiResponseError(
        errorData.result,
        errorData['error-type'],
        res.status
      );
    }

    const successData = data as ApiCodesResponse;
    return successData.supported_codes;
  }
  catch (err) {
    if (err instanceof ApiResponseError) throw err;
    throw new Error('Something went wrong');
  }
};