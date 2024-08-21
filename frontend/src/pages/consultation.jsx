import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/header';
import fetchDepts from '../utils/fetchDepts';
import { AuthContext } from '../context/AuthContext';

const Consultation = () => {
  const { user } = useContext(AuthContext); // fetch user data
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const link = 'http://192.168.1.3:5555/departments'; // departmetns endpoint

  // fetch department data
  useEffect(() => {
    fetchDepts(link, (data) => {
      setDepartments(data);
    });
  }, []);

  // selects the appropriete subjects and prof per department
  
  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);

    // find the selected department and update subjects and professors
    const selectedDept = departments.find(dept => dept._id === departmentId);
    if (selectedDept) {
      setSubjects(selectedDept.subjects);
      setProfessors([]);
    }
  };

  // selects the appropriete subjects and prof per department
  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;

    // find the selected subject and update professors
    const selectedDept = departments.find(dept => dept._id === selectedDepartment);
    if (selectedDept) {
      const selectedSubject = selectedDept.subjects.find(subj => subj._id === subjectId);
      if (selectedSubject) {
        setProfessors(selectedSubject.professors);
      }
    }
  };

  return (
    <main className='font-prompt font-medium min-h-screen space-y-5 flex flex-col items-center bg-customWhite w-full max-w-screen py-12 md:py-16'>
      <Header />

      {/* TITLE */}
      <p className='font-bold text-2xl md:text-3xl text-customGreen'>Consultation</p>

      {/* PERSONAL DETAILS */}
      <section className='space-y-3 max-w-[300px]  md:max-w-[450px] w-full'>

        {/* NAME INPUT BOX */}
        <div className='flex flex-col'>
          <label htmlFor='studentname'>Name:</label>
          <input defaultValue={user?.student_name || ''} id='studentname' name='studentname' type="text" className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'/>
        </div>

        {/* STUDENT NUMBER INPUT BOX */}
        <div className='flex flex-col'>
          <label htmlFor='studentnumber'>Student Number:</label>
          <input defaultValue={user?.student_number || ''} id='studentnumber' name='studentnumber' type="number" className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'/>
        </div>

        {/* STUDENT EMAIL INPUT BOX */}
        <div className='flex flex-col'>
          <label htmlFor='studentemail'>Student Email:</label>
          <input defaultValue={user?.student_email || ''} id='studentemail' name='studentemail' type="email" className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'/>
        </div>

      </section>

      {/* DEPARTMENT AND PROF DETAILS */}
      <p className='font-semibold text-lg pt-1'>Department and Professors:</p>

      <section className='max-w-[300px] md:max-w-[450px] w-full flex flex-col gap-3'>

        {/* DEPARTMENT DROPDOWN */}
        <section className='flex flex-col'>
          <label htmlFor="department">Department: </label>
          <select id='department' name="department" value={selectedDepartment} onChange={handleDepartmentChange} className='bg-white w-full rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'>
            <option value="">Select a Department</option>
            {/* print the list of departments */}
            {departments.map(dept => (
              <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
            ))}
          </select>
        </section>

        {/* SUBJECT DROPDOWN */}
        <section className='flex flex-col'>
          <label htmlFor="subject">Subject: </label>
          <select id='subject' name="subject" onChange={handleSubjectChange} className='w-full bg-white rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'>
            <option value="">Select a Subject</option>
            {/* print the list of subjects per department */}
            {subjects.map(subject => (
              <option key={subject._id} value={subject._id}>{subject.subj_name}</option>
            ))}
          </select>
        </section>

        {/* PROFESSOR DROPDOWN */}
        <section className='flex flex-col'>
          <label htmlFor="professor">Professor: </label>
          <select id='professor' name="professor" className='w-full bg-white rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'>
            <option value="">Select a Professor</option>
            {/* print the list of subejcts per subject */}
            {professors.map(prof => (
              <option key={prof._id} value={prof._id}>{prof.prof_name}</option>
            ))}
          </select>
        </section>

      </section>

      {/* CONCERN INPUT */}
      <section className='flex flex-col gap-3 max-w-[300px] md:max-w-[450px] w-full pt-5'>

        {/* CONCERN DROPDOWN */}
        <aside>
          <label htmlFor="concern">Concern:</label>
          <select id='concern' name="concern" className='w-full bg-white rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'>
            <option value="Consultation">Consultation</option>
            <option value="Special Assessment">Special Assessment</option>
          </select>
        </aside>

        {/* COMMENTS INPUT BOX */}
        <aside className='flex flex-col'>
          <label htmlFor="comments">Comments:</label>
          <textarea id='comments' name='comments' className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-20 p-2 text-sm font-normal '/>
        </aside>

      </section>

    </main>
  )
};

export default Consultation;
