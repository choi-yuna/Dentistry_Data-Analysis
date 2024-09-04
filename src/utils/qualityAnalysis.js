export const calculateQualityRate = (data) => {
    const totalPatients = data.length;
    const keys = Object.keys(data[0]);
    const totalItems = keys.length;

    let validPatientCount = 0;
    data.forEach(entry => {
        let isValid = true;
        Object.values(entry).forEach(value => {
            if (value === "" || value === null) {
                isValid = false;
            }
        });
        if (isValid) {
            validPatientCount++;
        }
    });

    const patientQualityRate = (validPatientCount / totalPatients) * 100;

    let validItemCount = 0;
    keys.forEach(key => {
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
