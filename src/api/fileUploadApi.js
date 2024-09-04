import axios from 'axios';

export const fetchPatientData = async (institutionId, diseaseClass) => {
    try {
        const response = await axios.post('/api/getPatientData', {
            INSTITUTION_ID: institutionId,
            DISEASE_CLASS: diseaseClass,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching patient data:', error);
        throw error;
    }
};
