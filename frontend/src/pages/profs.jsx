import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import fetchData from '../utils/fetchData';

const Professors = () => {
  const [activeTab, setActiveTab] = useState('Computer Engineering');
  const [profs, setProfs] = useState([]);
  const [department, setDepartment] = useState(activeTab);
  const tabs = ['Computer Engineering', 'Computer Science', 'Civil Engineering', 'Math, Physics and Sciences', 'Information Technology']; // array of departments
  const acronymTabs = ['CPE', 'CS', 'CE', 'MPS', 'IT']; // array of departments acronyms for smaller screens
  const searchProfs = `http://192.168.1.3:5555/professors/search?dept_name=${department}`; // endpoint to filter the profs data by department

  // fetch the professor data
  useEffect(() => {
    fetchData(searchProfs, (data) => {
      if (data && data.length > 0) {
        setProfs(data[0].professors);
      }
    });
  }, [department]);

  // set the clicked department  as the active tab
  useEffect(() => {
    if (department) {
      setDepartment(activeTab);
    }
  }, [activeTab]);

  return (
    <main className='font-prompt min-h-screen w-screen flex flex-col items-center pt-14 md:pt-20 bg-customWhite space-y-2'>
      <Header />

      {/* NAVBAR TO SWITCH DEPARTMENT TABLES */}
      <nav className='border-2 border-gray-400 block text-sm font-medium text-center py-3 px-5 rounded-xl lg:w-3/4 w-full max-w-8xl'>

        {/* PRINT THE DIFFERENT DEPARTMENTS AS TABS */}
        <ul className='flex flex-wrap gap-5 items-center'>
          {tabs.map((tab, index) => (
            <li key={index} className='flex-1'>
              <button
                onClick={() => setActiveTab(tab)}
                className={`text-base transition-all ${activeTab === tab ? 'text-customGreen font-semibold' : 'font-medium text-gray-400 hover:text-customGreen hover:font-semibold'}`}
                >
                  <span className='hidden md:block'>{tab}</span>
                  <span className='block md:hidden'>{acronymTabs[index]}</span>
              </button>
            </li>
          ))}
        </ul>

      </nav>

      {/* TABLE OF PROFS RENDERED PER DEPT SELECTED */}
      <section className='w-full overflow-x-auto flex justify-center text-sm md:text-base'>
        <div className='w-full lg:w-3/4 overflow-auto rounded-xl border-2 border-gray-400 m-1'>

          <table className='w-full border-collapse'>

            {/* HEAD OF TABLE */}
            <thead className='bg-customGray'>
              <tr>
                <th className='p-2 sm:p-4 text-left rounded-tl-xl'>Professor</th>
                <th className='p-2 sm:p-4 text-left'>Email</th>
                <th className='p-2 sm:p-4 text-left rounded-tr-xl'>Schedule</th>
              </tr>
            </thead>

            {/* BODY OF TABLE */}
            <tbody>

              {/* PRINT THE NAME AND EMAIL FROM PROFS ARRAY */}
              {profs.map((prof, index) => (
                <tr key={index} className='odd:bg-customWhite even:bg-customGray'>
                  <td className='p-2 sm:p-4'>
                    {/* STATUS INDICATOR */}
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${prof.status == 'Online' ? 'bg-green-500' : 'bg-red-500'}`}/>
                    {/* PROF NAME */}
                    <span className='font-medium'>{prof.prof_name}</span>
                  </td>
                  <td className='p-2 sm:p-4'>{prof.email}</td>

                  {/* PRINT SCHEDULE FROM SCHEDULE ARRAY */}
                  <td className='p-2 sm:p-4'>
                    {prof.schedule.map((schedule, index) => (
                      <div className='flex gap-1 md:gap-2 flex-wrap' key={index}>
                        <p className='font-medium'>{schedule.day}</p>
                        <p>{schedule.time}</p>
                      </div>
                    ))}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </section>

    </main>
  )
};

export default Professors;
