import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [depts, setDepts] = useState([]);
  const [profs, setProfs] = useState([]);
  const [cons, setCons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5555/departments')
      .then((response) => {
        setDepts(response.data.data);
      })
      .catch((e) => {
        console.log(e)
      });
      
  },[]);

  useEffect(() => {
    axios
      .get('http://localhost:5555/professors')
      .then((response) => {
        setProfs(response.data.data);
      })
      .catch((e) => {
        console.log(e)
      });
      
  },[]);

  useEffect(() => {
    axios
      .get('http://localhost:5555/consultation')
      .then((response) => {
        setCons(response.data.data);
      })
      .catch((e) => {
        console.log(e)
      });
      
  },[]);

  return (
    <main className='text-black'>

      {/* depts */}
      <p>deparments</p>
      <ul>
      { depts.map((dept, index) => (
        <li key={index}>
          <p>{dept.dept_name}</p>
          <ul>
          { dept.subjects.map((subj, index) => (
            <li key={index}>
              <p>{subj.subj_name}</p>
              <ul>
              { subj.professors.map((prof, index) => (
                <li key={index}>
                  <p>{prof.prof_name}</p>
                </li>
              ))}
              </ul>
            </li>
          ))} 
          </ul>
        </li>
      ))}
      </ul>

      {/* profs */}
      <p>profs</p>
      <ul>
        {profs.map((prof, index) => (
          <li key={index}>
            <p>{prof.dept_name}</p>
            <ul>
              {prof.professors.map((pr, index) => (
                <li key={index}>
                  <p>{pr.prof_name}</p>
                  <p>{pr.email}</p>
                  <ul>
                    {pr.schedule.map((sched, index) => (
                      <li key={index}>
                        <p>{sched.day} {sched.time}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

    {/* consultations */}
    <p>consultations</p>
    <ul>
    { cons.map((con, index) => (
      <li key={index}>
        <p>{con.student_number}</p>
        <p>{con.student_email}</p>
        <p>{con.student_name}</p>
        <p>{con.dept_name}</p>
        <p>{con.concern}</p>
        <p>{con.prof_name}</p>
        <p>{con.subj_name}</p>
        <p>{con.remarks}</p>
      </li>
    ))}
    </ul>

    </main>
  )
}

export default App
