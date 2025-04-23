import { ApiPairConversionResponse } from '../types/apiResponse_types';
import { parseNumberToShow, parseNumberToShowMax2Decimals } from '../utils/currencyUtils';

interface ResultProps {
  data: ApiPairConversionResponse;
}

const Result = ({ data }: ResultProps) => {
  function parseToUTC(): string {
    const date = new Date(data.time_last_update_utc);

    const formatted = date.toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return `${formatted} UTC`;
  }

  return (
    <div>
      <p className='font-semibold text-[rgb(92_102_123)] mb-1 md:mb-2 ml-2 md:ml-0'>
        {parseNumberToShowMax2Decimals(Number(data.amount))} {data.base_code} =
        <span className='block text-2xl md:text-3xl text-black mt-1 md:mt-2 tracking-wide'>
          {parseNumberToShow(Number(data.conversion_result))} {data.target_code}
        </span>
      </p>

      <p className='text-[rgb(92_102_123)] ml-2 md:ml-0'>
        1 {data.base_code} = {data.conversion_rate} {data.target_code}
      </p>

      <p className='text-center md:text-start mt-1.5 mb-4 md:my-0'>Last updated {parseToUTC()}</p>
    </div>
  );
};

export default Result;