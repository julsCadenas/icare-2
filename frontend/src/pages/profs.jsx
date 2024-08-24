import React, { useState } from 'react'
import Header from '../components/header'

const Professors = () => {
  const [activeTab, setActiveTab] = useState('Computer Engineering');
  const tabs = ['Computer Engineering', 'Computer Science', 'Civil Engineering', 'Math, Physics and Sciences', 'Information Technology'];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className='font-prompt h-screen w-screen flex items-center justify-center bg-customWhite'>
      <Header />
      <nav className='border-2 border-gray-400 block text-sm font-medium text-center py-1 px-5 rounded-xl'>
        <ul className='flex flex-wrap gap-5 items-center'>
          { tabs.map((tab) => (
            <li key={tab} className='flex-1'>
              <button 
                onClick={() => setActiveTab(tab)}
                className={`text-base transition-all ${ activeTab === tab ? 'text-customGreen font-semibold' : 'font-medium text-gray-400 hover:text-customGreen hover:font-semibold' }`}>
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
};

export default Professors