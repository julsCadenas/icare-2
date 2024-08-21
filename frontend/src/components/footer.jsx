import React from 'react'

const Footer = () => {
    
    const room = 'Room F1402/F1403 14th Floor, FIT Building'
    const email = 'icare@feutech.edu.ph'

    return (
        <footer className='flex flex-wrap font-prompt space-x-10 lg:space-x-36 items-center px-0 lg:px-96 border-t-customGray border-4'>

            {/* icare logo */}
            <section className='px-10 lg:px-0 pt-5'>
                <p className='font-inter text-customGreen font-extrabold text-8xl md:text-9xl'>iCARE</p>
                <p>iTamaraw Center for Academic Resources and Enrichment</p>
            </section>

            {/* details */}
            <aside className='space-y-5 pt-5 lg:pt-0 text-lg'>
                <section>
                    <p className='font-semibold'>Contact Details:</p>
                    <p>{room}</p>
                </section>
                <section>
                    <p><strong>Email: </strong>{email}</p>
                </section>
            </aside>

        </footer>
    )
};

export default Footer