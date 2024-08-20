import React from 'react'
import Header from '../components/header'

const Home = () => {

  return (
    <main  className='flex justify-center items-center h-screen flex-col bg-customWhite'>
      <Header />
      <section>
        <p>Welcome to <strong>ICARE</strong></p>
      </section>
    </main>
  )
}

export default Home