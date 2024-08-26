import axios from 'axios';

const updateRemarks = async (link, id, newRemarks) => {
    try {
        const response = await axios.patch(link, {
            remarks: newRemarks
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error('failed to update remarks');
        }

        return response.data;
    } catch (error) {
        console.error('error updating remarks:', error.message);
        throw error;
    }
};

export default updateRemarks;