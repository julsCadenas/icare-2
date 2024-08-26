import axios from 'axios';

const setStatus = async (userData, status) => {
    if (userData && userData.role !== "Student" && userData.student_name) {
        const deptName = userData.role;
        const profName = userData.student_name;

        try {
            await axios.put(`http://192.168.1.5:5555/professors/${deptName}/${profName}`, { status });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }
};

export default setStatus;
