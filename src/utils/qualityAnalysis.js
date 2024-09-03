// src/utils/qualityAnalysis.js

export const calculateQualityRate = (data) => {
    // 1. 총 환자 수 계산
    const totalPatients = data.length;

    // 2. 총 항목 개수 계산
    const keys = Object.keys(data[0]);
    const totalItems = keys.length;

    // 3. 환자 수 기준 품질율 계산
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

    // 4. 항목 수 기준 품질율 계산
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
