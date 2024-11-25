import { useEffect } from 'react';

export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 const outsideTgError = error.message.includes('Unable to retrieve launch parameters from any known source.')

 if (outsideTgError) {
  return (
    <div className='text-white flex flex-col items-center justify-center h-screen w-screen'>
      <h2 className='text-3xl text-white m-2'>Uh oh!</h2>
      <p className='text-lg text-white font-thin text-white m-2 w-3/4'>This webpage is meant to be launched within a Telegram MiniApp. It will not load as a regular webpage!</p>
    </div>
  )
 }

  return (
    <div className='text-white'>
      <h2>An unhandled error occurred!</h2>
      <blockquote>
        <code>
          {error.message}
        </code>
      </blockquote>
      {reset && <button onClick={() => reset()}>Try again</button>}
    </div>
  );
}