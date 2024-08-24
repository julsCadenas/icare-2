import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/header';
import fetchData from '../utils/fetchData';
import sendData from '../utils/sendData';
import { AuthContext } from '../context/AuthContext';

const Consultation = () => {
  const { user } = useContext(AuthContext); // fetch user data
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [selectedProfessorName, setSelectedProfessorName] = useState('');
  const [concern, setConcern] = useState('');
  const [comments, setComments] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [name, setName] = useState('');
  const deptsLink = 'http://192.168.1.3:5555/departments'; // departments endpoint
  const consLink = 'http://192.168.1.3:5555/consultation'; // consultations endpoint

  // initialize the name, student number and email with the user's data
  useEffect(() => {
    if (user) {
      setName(user.student_name || '');
      setStudentNumber(user.student_number || '');
      setStudentEmail(user.student_email || '');
    }
  }, [user]);

  // fetch department data
  useEffect(() => {
    fetchData(deptsLink, (data) => {
      setDepartments(data);
    });
  }, [deptsLink]);

  // handle department change
  const handleDepartmentChange = (e) => {
    const departmentName = e.target.value;
    setSelectedDepartmentName(departmentName);

    // find the selected department and update subjects and professors
    const selectedDept = departments.find(dept => dept.dept_name === departmentName);
    if (selectedDept) {
      setSubjects(selectedDept.subjects);
      setProfessors([]);
    }
  };

  // handle subject change
  const handleSubjectChange = (e) => {
    const subjectName = e.target.value;
    setSelectedSubjectName(subjectName);

    // find the selected subject and update professors
    const selectedDept = departments.find(dept => dept.dept_name === selectedDepartmentName);
    if (selectedDept) {
      const selectedSubject = selectedDept.subjects.find(subj => subj.subj_name === subjectName);
      if (selectedSubject) {
        setProfessors(selectedSubject.professors);
      }
    }
  };

  // handle professor change
  const handleProfessorChange = (e) => {
    setSelectedProfessorName(e.target.value);
  };

  // handle form submission
  const handleSubmit = async () => {
    const consultationData = {
      student_number: studentNumber,
      student_email: studentEmail,
      student_name: name,
      dept_name: selectedDepartmentName,
      concern,
      prof_name: selectedProfessorName,
      subj_name: selectedSubjectName,
      comments,
      remarks: 'Pending',
    };

    try {
      console.log('Submitting consultation data:', consultationData);

      const result = await sendData(consLink, consultationData);

      console.log('Consultation data sent successfully:', result);
      setSuccessMessage('Consultation booked successfully!');
      setErrorMessage(''); 
      
    } catch (e) {
      setSuccessMessage(''); 
      setErrorMessage('Failed to book consultation. Please try again.');
      console.error('Failed to send consultation data:', e);
    }
  };

  return (
    <main className='font-prompt font-medium min-h-screen space-y-5 flex flex-col items-center bg-customWhite w-full max-w-screen py-12 md:py-16'>
      <Header />

      {/* TITLE */}
      <p className='font-bold text-2xl md:text-3xl text-customGreen'>Consultation</p>

      {/* PERSONAL DETAILS */}
      <section className='space-y-3 max-w-[300px] md:max-w-[450px] w-full'>

        {/* NAME INPUT BOX */}
        <div className='flex flex-col'>
          <label htmlFor='studentname'>Name:</label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            id='studentname' 
            name='studentname' 
            type="text" 
            className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          />
        </div>

        {/* STUDENT NUMBER INPUT BOX */}
        <div className='flex flex-col'>
          <label htmlFor='studentnumber'>Student Number:</label>
          <input 
            value={studentNumber} 
            onChange={(e) => setStudentNumber(e.target.value)} 
            id='studentnumber' 
            name='studentnumber' 
            type="number" 
            className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          />
        </div>

        {/* STUDENT EMAIL INPUT BOX */}
        <div className='flex flex-col'>
          <label htmlFor='studentemail'>Student Email:</label>
          <input 
            value={studentEmail} 
            onChange={(e) => setStudentEmail(e.target.value)} 
            id='studentemail' 
            name='studentemail' 
            type="email" 
            className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          />
        </div>

      </section>

      {/* DEPARTMENT AND PROF DETAILS */}
      <p className='font-semibold text-lg pt-1'>Department and Professors:</p>

      <section className='max-w-[300px] md:max-w-[450px] w-full flex flex-col gap-3'>

        {/* DEPARTMENT DROPDOWN */}
        <section className='flex flex-col'>
          <label htmlFor="department">Department: </label>
          <select 
            id='department' 
            name="department" 
            value={selectedDepartmentName} 
            onChange={handleDepartmentChange} 
            className='bg-white w-full rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          >
            <option value="">Select a Department</option>
            {/* PRINT DEPARMTENTS */}
            {departments.map(dept => (
              <option key={dept._id} value={dept.dept_name}>{dept.dept_name}</option>
            ))}
          </select>
        </section>

        {/* SUBJECT DROPDOWN */}
        <section className='flex flex-col'>
          <label htmlFor="subject">Subject: </label>
          <select 
            id='subject' 
            name="subject" 
            value={selectedSubjectName} 
            onChange={handleSubjectChange} 
            className='w-full bg-white rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          >
            <option value="">Select a Subject</option>
            {/* PRINT SUBJECTS BASED ON SELECTED DEPARTMENT */}
            {subjects.map(subject => (
              <option key={subject._id} value={subject.subj_name}>{subject.subj_name}</option>
            ))}
          </select>
        </section>

        {/* PROFESSOR DROPDOWN */}
        <section className='flex flex-col'>
          <label htmlFor="professor">Professor: </label>
          <select 
            id='professor' 
            name="professor" 
            value={selectedProfessorName} 
            onChange={handleProfessorChange} 
            className='w-full bg-white rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          >
            <option value="">Select a Professor</option>
            {/* PRINT PROFESSORS BASED ON SELECTED SUBJECT */}
            {professors.map(prof => (
              <option key={prof._id} value={prof.prof_name}>{prof.prof_name}</option>
            ))}
          </select>
        </section>

      </section>

      {/* CONCERN INPUT */}
      <section className='flex flex-col gap-3 max-w-[300px] md:max-w-[450px] w-full pt-5'>

        {/* CONCERN DROPDOWN */}
        <aside>
          <label htmlFor="concern">Concern:</label>
          <select 
            id='concern' 
            name="concern" 
            value={concern} 
            onChange={(e) => setConcern(e.target.value)} 
            className='w-full bg-white rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-8 pl-2 text-sm font-normal'
          >
            <option value="">Select your concern</option>
            <option value="Consultation">Consultation</option>
            <option value="Special Assessment">Special Assessment</option>
          </select>
        </aside>

        {/* COMMENTS INPUT BOX */}
        <aside className='flex flex-col'>
          <label htmlFor="comments">Comments:</label>
          <textarea 
            id='comments' 
            name='comments' 
            value={comments} 
            onChange={(e) => setComments(e.target.value)} 
            className='rounded-md border-2 border-customGray focus:border-4 focus:outline-none h-20 p-2 text-sm font-normal '
          />
        </aside>

      </section>
      
      {/* SUCCESS OR ERROR MESSAGE */}
      {successMessage && <p className='text-customGreen font-medium'>{successMessage}</p>}
      {errorMessage && <p className='text-red-500 font-medium'>{errorMessage}</p>}

      {/* SUBMIT BUTTON */}
      <button 
        onClick={handleSubmit} 
        className='bg-customGreen text-customWhite p-1 px-3 focus:outline-none hover:bg-green2 focus:ring-4 focus:ring-green2 transition-all font-bold text-xl rounded-lg'>Submit</button>

    </main>
  );
};

export default Consultation;
