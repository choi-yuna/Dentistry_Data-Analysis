export const analyzeItems = (data) => {
    if (data.length === 0) {
        return { totalItems: 0, missingItemCount: 0, invalidItemCount: 0, completenessRatio: 0, validityRatio: 0 };
    }

    // 전체 항목 수
    const totalItems = Object.keys(data[0]).length;

    // 누락된 항목 수를 카운트할 변수
    let missingItemCount = 0;
    let invalidItemCount = 0;

    // 항목별로 누락된 값이 있는지 확인
    Object.keys(data[0]).forEach(key => {
        let hasMissingValue = false;
        let hasInvalidValue = false;

        data.forEach(entry => {
            const value = entry[key];

            // 누락된 항목 검사
            if (value === "" || value === null) {
                hasMissingValue = true;
            }

            // 유효성 검사
            if (key === "P_GENDER" && value !== "1" && value !== "2") {
                hasInvalidValue = true;
            }
            if (key === "P_AGE" && (isNaN(value) || value === "" || value <= 0)) {
                hasInvalidValue = true;
            }
            if (key === "P_WEIGHT" && (isNaN(value) || value === "" || value <= 0)) {
                hasInvalidValue = true;
            }
            if (key === "P_HEIGHT" && (isNaN(value) || value === "" || value <= 0)) {
                hasInvalidValue = true;
            }
        });

        if (hasMissingValue) {
            missingItemCount++;
        }
        if (hasInvalidValue) {
            invalidItemCount++;
        }
    });

    const completenessRatio = ((totalItems - missingItemCount) / totalItems) * 100;
    const validityRatio = ((totalItems - invalidItemCount) / totalItems) * 100;

    return { totalItems, missingItemCount, invalidItemCount, completenessRatio, validityRatio };
};
