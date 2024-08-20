import React, { useContext } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
// import icare from '/images/icare.PNG';
// import { AuthContext } from '../context/AuthContext';

const Home = () => {
  // const { user } = useContext(AuthContext)

  const about = 'Formerly known as MRC (Math Resource Center) and ERC (English Resource Center), iCARE is a special unit of FEU Tech committed to provide resources and enrich the students’ learning skills in various courses to enhance their mathematics ability and communication skills. It has its own dedicated faculty members and scholars who readily provide on-demand academic services. It also provides access to materials and equipment aimed at developing overall academic proficiency in Computer Science, Engineering, Information Technology, and Multimedia Arts programs. Students may avail of the following services from iCARE:'
  const cons = 'provides a venue for faculty consultations. Faculty consultations give the students the convenience of clarifying and inquiring from their teachers about their academic standings; consulting about difficulties in their lessons, missed examinations, and other concerns. Faculty assigned in different departments will plot their consultation hours on iCARE such that when a student inquires for their course adviser, the receptionist can guide them with the schedule and let them know the schedule of their course adviser.'
  const tut1 = 'Students from all year levels can avail or ask for a one-on-one or group tutorial session facilitated by a peer tutor or a faculty member with mastery about the concerned course/topic.'
  const tut2 = 'are provided to create an atmosphere that iS friendly and non-intimidating. Students, especially scholars, who excel in Mathematics are encouraged to become peer tutors. While the tutees learn from tutorial services, the tutors gain mastery of the mathematical concepts and acquire not only mathematical skills but also self-confidence, leadership, and self-esteem.'
  const tut3 = 'are where a faculty member guides student/s by providing supplementary lectures or by entertaining students’ queries about a certain topic. This service helps the students who have hesitations to consult their course advisers.'

  return (
    <main  className='pt-20 font-prompt bg-customWhite flex justify-center flex-wrap gap-10 pb-10'>
      <Header />
      <section>
        <figure className='max-w-[1800px] w-full h-auto'>
          <img className='rounded-xl border-4 border-customGray' src="/images/banner.png" alt="banner" />
        </figure>
      </section>
      <section className='flex flex-col items-center'>
        <aside>
        <p className='font-semibold px-7 text-xl'>Welcome to</p>
        <figure className='max-w-96 md:max-w-[600px] w-full'>
          <img src='/images/icare.PNG' alt="icare logo" className='w-full'/>
        </figure>
        </aside>
        <aside className='px-8 max-w-[600px] w-full text-justify'>
          <p className='tracking-tight'>{about}</p>
        </aside>
      </section>
      <section className='flex flex-wrap gap-2 justify-center mx-3'>
        <aside className='max-w-[400px] flex flex-col text-center items-center border-4 border-customGray p-3 rounded-xl space-y-3'>
          <p className='text-xl font-semibold'>Consultation</p>
          <p className='text-justify tracking-tight'><strong>iCARE </strong>{cons}</p>
          <a className='bg-customGreen p-2 px-8 font-semibold text-customWhite rounded-xl cursor-pointer'>Proceed</a>
        </aside>
        <aside className='max-w-[400px] flex flex-col text-center items-center border-4 border-customGray p-3 rounded-xl space-y-3'>
          <p className='text-xl font-semibold'>Tutorials</p>
          <section className='text-justify tracking-tight'>
            <p>{tut1}</p>
            <p><strong>Peer tutorials </strong>{tut2}</p>
            <p><strong>Faculty tutorials </strong>{tut3}</p>
          </section>
          <a className='bg-customGreen p-2 px-8 font-semibold text-customWhite rounded-xl cursor-pointer'>Proceed</a>
        </aside>
      </section>
      <Footer />
    </main>
  )
}

export default Home