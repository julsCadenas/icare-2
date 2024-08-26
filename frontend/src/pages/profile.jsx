import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/header';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/loading';
import fetchData from '../utils/fetchData';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [consultations, setConsultations] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    
    useEffect(() => {
        const myConsLink = `http://192.168.1.5:5555/consultation/search?student_number=${user?.student_number}`;
        fetchData(myConsLink, (data) => {
            if(user?.student_number){
                setConsultations(data);
                setLoading(false);
            } else {
                console.log("student number is not defined")
                setLoading(false);
            }
        });
      }, [user]);
    
    useEffect(() => {
        const myTutLink = `http://192.168.1.5:5555/tutorial/search?student_number=${user?.student_number}`;
        fetchData(myTutLink, (data) => {
            if(user?.student_number){
                setTutorials(data);
                setLoading(false);
            } else {
                console.log("student number is not defined")
                setLoading(false);
            }
        });
      }, [user]);

  return (
    <main className='font-prompt bg-customWhite min-h-screen flex justify-center items-center pt-20 flex-col'>
        <Header />
        <p className='font-bold text-2xl md:text-3xl text-customGreen'>Profile</p>

        {/* PERSONAL DETAILS */}
        <section className='w-5/6 md:w-3/4 mt-3 text-base md:text-xl'>
            <div className='flex space-x-2'>
                <p className='font-semibold'>Name: </p>
                <p>{user?.student_name}</p>
            </div>
            <div className='flex space-x-2'>
                <p className='font-semibold'>ID Number: </p>
                <p>{user?.student_number}</p>
            </div>
            <div className='flex space-x-2'>
                <p className='font-semibold'>FIT Email: </p>
                <p>{user?.student_email}</p>
            </div>
        </section>

        {/* LOADING SPINNER */}
        { loading ? (<Loading />) : ( <>

        {/* CONSULTATION HISTORY */}
        <p className='font-semibold text-lg md:text-xl pt-5'>Consultation History</p>
        <section className='w-full overflow-x-auto flex justify-center text-sm md:text-base m-5'>
            <div className='w-full lg:w-3/4 overflow-auto rounded-xl border-2 border-gray-400 m-1'>
                {/* CHECKS IF TABLE IS EMPTY */}
                { consultations.length > 0 ? (
                    <table className='w-full border-collapse'>

                        {/* COLUMN NAMES */}
                        <thead className='bg-customGray'>
                            <tr>
                                <th className='p-2 sm:p-4 text-left rounded-tl-xl'>Department Name</th>
                                <th className='p-2 sm:p-4 text-left'>Professor Name</th>
                                <th className='p-2 sm:p-4 text-left'>Subject Name</th>
                                <th className='p-2 sm:p-4 text-left'>Concern</th>
                                <th className='p-2 sm:p-4 text-left'>Comments</th>
                                <th className='p-2 sm:p-4 text-left rounded-tr-xl'>Remarks</th>
                            </tr>
                        </thead>

                        {/* TABLE CONTENT */}
                        <tbody>
                        { consultations.map((cons, index) => (
                            <tr key={index} className='odd:bg-customWhite even:bg-customGray'>
                                <td className='p-2 sm:p-4'>{cons.dept_name}</td>
                                <td className='p-2 sm:p-4'>{cons.prof_name}</td>
                                <td className='p-2 sm:p-4'>{cons.subj_name}</td>
                                <td className='p-2 sm:p-4'>{cons.concern}</td>
                                <td className='p-2 sm:p-4'>{ cons.comments.length > 0 ? cons.comments : "None" }</td>
                                <td className='p-2 sm:p-4'>{cons.remarks}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
                    
                    // SHOW THIS IF TABLE IS EMPTY
                ) : (<p className='p-5 flex items-center justify-center font-semibold'>No consultations found</p>) }
            </div>
        </section>

        </>)}

        {/* LOADING SPINNER */}
        { loading ? (<Loading />) : ( <>

        {/* TUTORIAL HISTORY */}
        <p className='font-semibold text-lg md:text-xl'>Tutorial History</p>
        <section className='w-full overflow-x-auto flex justify-center text-sm md:text-base m-5'>
            <div className='w-full lg:w-3/4 overflow-auto rounded-xl border-2 border-gray-400 m-1'>
                {/* CHECKS IF TABLE IS EMPTY */}
                { tutorials.length > 0 ? (
                    <table className='w-full border-collapse'>

                        {/* COLUMN NAMES */}
                        <thead className='bg-customGray'>
                            <tr>
                                <th className='p-2 sm:p-4 text-left rounded-tl-xl'>Department Name</th>
                                <th className='p-2 sm:p-4 text-left'>Professor Name</th>
                                <th className='p-2 sm:p-4 text-left'>Subject Name</th>
                                <th className='p-2 sm:p-4 text-left'>Request Date</th>
                                <th className='p-2 sm:p-4 text-left rounded-tr-xl'>Remarks</th>
                            </tr>
                        </thead>

                        {/* TABLE CONTENT */}
                        <tbody>
                        { tutorials.map((tuts, index) => (
                            <tr key={index} className='odd:bg-customWhite even:bg-customGray'>
                                <td className='p-2 sm:p-4'>{tuts.dept_name}</td>
                                <td className='p-2 sm:p-4'>{tuts.prof_name}</td>
                                <td className='p-2 sm:p-4'>{tuts.subj_name}</td>
                                <td className='p-2 sm:p-4'>{tuts.request_date}</td>
                                <td className='p-2 sm:p-4'>{tuts.remarks}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>

                    // SHOW THIS IF TABLE IS EMPTY
                ) : (<p className='p-5 flex items-center justify-center font-semibold'>No tutorial requests found</p>) }
            </div>
        </section>

        </>)}

    </main>
  )
}

export default Profile
