// src/utils/overallAnalysis.js

export const calculateOverallQuality = (data) => {

    const totalPatients = data.length;


    const relevantKeys = Object.keys(data[0]).filter(key => {
        return data.every(entry => entry[key] !== undefined);
    });

    const totalItems = relevantKeys.length;


    let validPatientCount = 0;
    data.forEach(entry => {
        let isValid = true;
        relevantKeys.forEach(key => {
            if (entry[key] === "" || entry[key] === null) {
                isValid = false;
            }
        });
        if (isValid) {
            validPatientCount++;
        }
    });

    let validItemCount = 0;

    relevantKeys.forEach(key => {
        let isItemValid = true;
        data.forEach(entry => {
            if (entry[key] === "" || entry[key] === null) {
                isItemValid = false;
            }
        });
        if (isItemValid) {
            validItemCount++;
        }
    });


    const patientQualityRate = (validPatientCount / totalPatients) * 100;
    const itemQualityRate = (validItemCount / totalItems) * 100;

    return {
        totalPatients,
        totalItems,
        validPatientCount,
        patientQualityRate,
        validItemCount,
        itemQualityRate
    };
};
