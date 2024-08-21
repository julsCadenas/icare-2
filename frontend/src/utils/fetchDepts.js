import axios from 'axios';

// fucntion to fetch data from departments endpoint
const fetchDepts = async (link, setDepts) => {
    try {        
        const response = await axios.get(link);
        setDepts(response.data.data);
    } catch (e) {
        console.error(e.message);
    };
};

export default fetchDepts;