export const analyzeData = (data) => {
    let nullCount = 0;
    let invalidCount = 0;

    data.forEach(entry => {
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

        if (hasMissingData) {
            nullCount++;
        }
        if (hasInvalidData) {
            invalidCount++;
        }
    });

    const completenessRatio = ((data.length - nullCount) / data.length) * 100;
    const validityRatio = ((data.length - invalidCount) / data.length) * 100;

    return { nullCount, invalidCount, completenessRatio, validityRatio };
};
