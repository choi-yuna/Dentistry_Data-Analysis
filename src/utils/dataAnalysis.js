// src/utils/dataAnalysis.js
export const analyzeData = (data, institution, disease) => {
    // 병원과 질병에 맞는 데이터를 필터링
    const filteredData = data.filter(entry => 
        entry.INSTITUTION_ID === institution && entry.DISEASE_CLASS === disease
    );

    let nullCount = 0;
    let invalidCount = 0;

    filteredData.forEach(entry => {
        let hasMissingData = false;
        let hasInvalidData = false;

        // 누락 데이터 검사
        Object.values(entry).forEach(value => {
            if (value === "" || value === null) {
                hasMissingData = true;
            }
        });

        // 유효성 검사
        if (entry.P_GENDER !== "1" && entry.P_GENDER !== "2") {
            hasInvalidData = true;
        }
        if (isNaN(entry.P_AGE) || entry.P_AGE === "" || entry.P_AGE <= 0) {
            hasInvalidData = true;
        }
        if (isNaN(entry.P_WEIGHT) || entry.P_WEIGHT === "" || entry.P_WEIGHT <= 0) {
            hasInvalidData = true;
        }
        if (isNaN(entry.P_HEIGHT) || entry.P_HEIGHT === "" || entry.P_HEIGHT <= 0) {
            hasInvalidData = true;
        }
        // 추가적인 필드 검사 필요시 이곳에 추가

        if (hasMissingData) {
            nullCount++;
        }
        if (hasInvalidData) {
            invalidCount++;
        }
    });

    const completenessRatio = ((filteredData.length - nullCount) / filteredData.length) * 100;
    const validityRatio = ((filteredData.length - invalidCount) / filteredData.length) * 100;

    return { nullCount, invalidCount, completenessRatio, validityRatio };
};
