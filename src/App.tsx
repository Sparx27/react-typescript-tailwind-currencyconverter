import Conversor from './components/Conversor.tsx';

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
function App() {

  return (
    <main className="w-full h-screen relative bg-blue-950 flex-center flex-col px-2.5 lg:px-5 py-8">

      <h1 className="mb-2 font-semibold text-[33px] md:text-[45px] text-white z-10 text-center">
        Currency Converter
      </h1>

      <p className='mb-8 md:mb-14 text-[16px] md:text-[25px] text-[rgb(232_233_234)] z-10 text-center'>
        Check live foreign currency exchange rates
      </p>

      <Conversor />

      <div
        id="background"
        className="absolute bottom-0 left-0 h-[200px] md:h-1/3 md:h-max-[280px] w-full overflow-hidden">
      </div>
    </main>
  );
}



export default App;
