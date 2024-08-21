import React from 'react'
import Header from '../components/header'

const Consultation = () => {
    return (
      <main className='h-screen w-screen flex items-center justify-center bg-customWhite'>
        <Header />

        {/* personal details */}
        <section>
          <div>
            <p>Name</p>
            <input type="text" />
          </div>
          <aside className='flex gap-2'>
            <div>
              <p>Student Number:</p>
              <input type="number" />
            </div>
            <div>
              <p>Student Email:</p>
              <input type="email" />
            </div>
          </aside>
        </section>
        
        {/* department and professor details */}
        <section>

        </section>
      </main>
    )
}

export default Consultation