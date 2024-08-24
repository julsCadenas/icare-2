import axios from 'axios';

// fucntion to fetch data
const fetchData = async (link, setData) => {
    try {        
        const response = await axios.get(link);
        setData(response.data.data);
    } catch (e) {
        console.error(e.message);
    };
};

export default fetchData;