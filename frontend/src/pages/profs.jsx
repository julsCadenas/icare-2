import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import fetchData from '../utils/fetchData';

const Professors = () => {
  const [activeTab, setActiveTab] = useState('Computer Engineering');
  const [profs, setProfs] = useState([]);
  const [department, setDepartment] = useState(activeTab);
  const tabs = ['Computer Engineering', 'Computer Science', 'Civil Engineering', 'Math, Physics and Sciences', 'Information Technology']; // array of tabs
  // const profsLink = 'http://192.168.1.3:5555/professors'; 
  const searchProfs = `http://192.168.1.3:5555/professors/search?dept_name=${department}`; // search professors by department name endpoint
  
  
  // fetch professors data from search profs endpoint
  useEffect(() => {
    fetchData(searchProfs, (data) => {
      if (data && data.length > 0) {
        setProfs(data[0].professors); 
        // console.log(data[0]);
      }
    });
  }, [department]);
  
  // set the active tab as the selected department
  useEffect(() => {
    if(department){
      setDepartment(activeTab);
    };
  },[activeTab]);
  
  return (
    <main className='font-prompt h-screen w-screen flex flex-col items-center justify-center bg-customWhite'>
      <Header />

      {/* NAVBAR TO SWITCH DEPARTMENT TABLES */}
      <nav className='border-2 border-gray-400 block text-sm font-medium text-center py-1 px-5 rounded-xl'>

        {/* PRINT THE DIFFERENT DEPARTMENTS AS TABS */}
        <ul className='flex flex-wrap gap-5 items-center'>
          { tabs.map((tab) => (
            <li key={tab} className='flex-1'>
              <button 
                onClick={() => setActiveTab(tab)} // set clicked tab as the active tab
                className={`text-base transition-all ${ activeTab === tab ? 'text-customGreen font-semibold' : 'font-medium text-gray-400 hover:text-customGreen hover:font-semibold' }`}>
                {tab}
              </button>
            </li>
          ))}
        </ul>

      </nav>
          
      {/* TABLE OF PROFS RENDERED PER DEPT SELECTED */}
      <section>
        <table>

          {/* HEAD OF TABLE */}
          <thead>
            <tr>
              <th>Professor</th>
              <th>Email</th>
              <th>Schedule</th>
            </tr>
          </thead>

          {/* BODY OF TABLE */}
          <tbody>
          {/* PRINT THE NAME AND EMAIL FROM PROFS ARRAY */}
          {(profs).map((prof, index) => (
            <tr key={index}>
              <td>{prof.prof_name}</td>
              <td>{prof.email}</td>
              
              {/* PRINT SCHEDULE FROM SCHEDULE ARRAY */}
              <td>
                {prof.schedule.map((schedule, index) => (
                <div className='flex gap-3' key={index}>
                  <p>{schedule.day}</p>
                  <p>{schedule.time}</p>
                </div>
                ))}
              </td>
            
            </tr>
          ))}
          </tbody>
        
        </table>      
      </section>

    </main>
  )
};

export default Professors