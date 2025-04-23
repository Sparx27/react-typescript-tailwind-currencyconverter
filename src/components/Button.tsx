import { forwardRef, useImperativeHandle, useState } from 'react';
import spinner from '../assets/spinner.svg';

interface ButtonProps {
  text: string;
  handleClick: () => Promise<void>;
}

const Button = forwardRef((props: ButtonProps, ref) => {
  const { text, handleClick } = props;
  const [loading, setLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      setLoading
    })
  );

  return (
    <button className='btn-convert' onClick={() => { void handleClick(); }}>
      {
        loading
          ? <img src={spinner} alt='loading' className='inline m-0 p-0 h-[28px]' />
          : <p>{text}</p>
      }
    </button>
  );
});

export default Button;