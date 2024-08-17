import React from 'react'

const Login = () => {
  return (
    <main className='font-prompt h-screen w-screen flex justify-center items-center bg-customWhite'>
      <div className='flex justify-center items-center flex-col w-full h-full max-h-[450px]  md:max-h-[570px] md:max-w-[750px] space-y-5 m-5 md:space-y-8 px-10 md:px-5 border-4 rounded-xl border-customGray'>
        <section className='flex flex-col items-center justify-center'>
          <div>
            <p className='text-xl md:text-3xl font-medium md:font-bold transition-all'>Welcome to</p>
            <p className='text-customGreen font-extrabold font-inter text-[100px] md:text-[180px] leading-[1] transition-all'>iCARE</p>
          </div>
          <p className='text-center text-lg md:text-xl font-semibold'>iTamaraw Center for Academic Resources and Enrichment</p>
        </section>
        <section className='flex flex-col space-y-3 w-full max-w-[300px] md:max-w-[500px] text-base'>
          <div>
            <input type='email' placeholder='FIT Email' className=' focus:outline-none pl-5 focus:ring-4 focus:ring-customGray bg-white2 rounded-lg md:rounded-xl h-8 md:h-10 w-full'></input>
          </div>
          <div>
            <input type='password' placeholder='Password' className='focus:outline-none pl-5 focus:ring-4 focus:ring-customGray bg-white2 rounded-lg md:rounded-xl h-8 md:h-10 w-full'></input>
          </div>
        </section>
        <section className='max-w-40 max-h-10 w-full h-full'>
          <button className='focus:outline-none bg-customGreen hover:bg-green2 focus:ring-4 focus:ring-green2 transition-all text-customWhite font-bold text-2xl rounded-lg w-full h-full'>Login</button>
        </section>
      </div>
    </main>
  ) 
}

export default Login
