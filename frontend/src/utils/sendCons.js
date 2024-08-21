import axios from 'axios';

const sendCons = async (link ,consData) => {
  try {
    // console.log('Sending data:', consData); 
    const response = await axios.post(link, consData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (e) {
    console.error('error sending consultation data:', e);
    throw e;
  }
};

export default sendCons;
