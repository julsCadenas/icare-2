import React, { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import Loading from './loading';
import updateRemarks from '../utils/updateRemarks';

const ConsAdmin = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null); // track which consultation is being edited
    const [newRemarks, setNewRemarks] = useState(''); // new remarks value

    useEffect(() => {
        const myConsLink = `http://192.168.1.5:5555/consultation`;
        fetchData(myConsLink, (data) => {
            setConsultations(data);
            setLoading(false);
        });
    }, []);

    // handle remarks update
    const handleRemarksChange = (e) => {
        setNewRemarks(e.target.value);
    };

    const handleEditClick = (id, currentRemarks) => {
        setEditId(id);
        setNewRemarks(currentRemarks || ''); // set current remarks if available
    };

    const handleUpdateRemarks = async (id) => {
        const updateRemarksLink = `http://192.168.1.5:5555/consultation/${id}/remarks`;
        try {
            const updatedCons = await updateRemarks(updateRemarksLink, id, newRemarks);

            setConsultations((prevCons) =>
                prevCons.map((cons) =>
                    cons._id === id ? { ...cons, remarks: updatedCons.remarks } : cons
                )
            );
            setEditId(null); // clear edit mode
            setNewRemarks(''); // clear new remarks field
        } catch (error) {
            console.error('Error updating remarks:', error.message);
        }
    };

    return (
        <main className='font-prompt font-medium min-h-screen space-y-5 flex flex-col items-center bg-customWhite w-full max-w-screen'>
            {loading ? (<Loading />) : (
                <section className='w-full overflow-x-auto flex justify-center text-sm md:text-base m-5'>
                    <div className='w-full lg:w-3/4 overflow-auto rounded-xl border-2 border-gray-400 m-1'>
                        {/* CHECKS IF TABLE IS EMPTY */}
                        {consultations.length > 0 ? (
                            <table className='w-full border-collapse'>
                                {/* COLUMN NAMES */}
                                <thead className='bg-customGray'>
                                    <tr>
                                        <th className='p-2 sm:p-4 text-left rounded-tl-xl'>Student Name</th>
                                        <th className='p-2 sm:p-4 text-left'>Student Number</th>
                                        <th className='p-2 sm:p-4 text-left'>Student Email</th>
                                        <th className='p-2 sm:p-4 text-left'>Department</th>
                                        <th className='p-2 sm:p-4 text-left'>Professor Name</th>
                                        <th className='p-2 sm:p-4 text-left'>Subject Name</th>
                                        <th className='p-2 sm:p-4 text-left'>Concern</th>
                                        <th className='p-2 sm:p-4 text-left'>Comments</th>
                                        <th className='p-2 sm:p-4 text-left rounded-tr-xl'>Remarks</th>
                                        <th className='p-2 sm:p-4 text-left rounded-tr-xl'>Actions</th>
                                    </tr>
                                </thead>

                                {/* TABLE CONTENT */}
                                <tbody>
                                    {consultations.map((cons, index) => (
                                        <tr key={index} className='odd:bg-customWhite even:bg-customGray'>
                                            <td className='p-2 sm:p-4'>{cons.student_name}</td>
                                            <td className='p-2 sm:p-4'>{cons.student_number}</td>
                                            <td className='p-2 sm:p-4'>{cons.student_email}</td>
                                            <td className='p-2 sm:p-4'>{cons.dept_name}</td>
                                            <td className='p-2 sm:p-4'>{cons.prof_name}</td>
                                            <td className='p-2 sm:p-4'>{cons.subj_name}</td>
                                            <td className='p-2 sm:p-4'>{cons.concern}</td>
                                            <td className='p-2 sm:p-4'>{cons.comments.length > 0 ? cons.comments : "None"}</td>
                                            <td className='p-2 sm:p-4'>{editId === cons._id ? (
                                                <input
                                                    type='text'
                                                    value={newRemarks}
                                                    onChange={handleRemarksChange}
                                                    className='border border-gray-300 rounded-md p-1'
                                                />
                                            ) : (
                                                cons.remarks
                                            )}</td>
                                            <td className='p-2 sm:p-4'>
                                                {editId === cons._id ? (
                                                    <button
                                                        onClick={() => handleUpdateRemarks(cons._id)}
                                                        className='bg-blue-500 text-white px-2 py-1 rounded'
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditClick(cons._id, cons.remarks)}
                                                        className='bg-yellow-500 text-white px-2 py-1 rounded'
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                            // SHOW THIS IF TABLE IS EMPTY
                        ) : (<p className='p-5 flex items-center justify-center font-semibold'>No consultations found</p>)}
                    </div>
                </section>
            )}
        </main>
    );
};

export default ConsAdmin;
