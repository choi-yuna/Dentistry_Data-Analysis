export const analyzeData = (data) => {
    let nullCount = 0;
    let invalidCount = 0;
    let invalidFields = [];

    data.forEach((entry, rowIndex) => {
        let hasMissingData = false;
        let hasInvalidData = false;
        let invalidFieldData = {
            rowIndex: rowIndex + 1, // 1-based index for rows
            invalidFields: []
        };

        // 누락 데이터 검사
        Object.entries(entry).forEach(([key, value]) => {
            if (value === "" || value === null) {
                hasMissingData = true;
                invalidFieldData.invalidFields.push({ field: key, value });
            }
        });

        // 공통 유효성 검사
        if (entry.P_GENDER !== "1" && entry.P_GENDER !== "2") {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'P_GENDER', value: entry.P_GENDER });
        }
        if (isNaN(Number(entry.P_AGE)) || entry.P_AGE === "" || Number(entry.P_AGE) <= 0) {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'P_AGE', value: entry.P_AGE });
        }
        if (!["1", "2", "3", "4", "5", "6", "7"].includes(entry.INSTITUTION_ID)) {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'INSTITUTION_ID', value: entry.INSTITUTION_ID });
        }
        if (isNaN(Number(entry.PATIENT_NO)) || Number(entry.PATIENT_NO) < 1 || Number(entry.PATIENT_NO) > 9999) {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'PATIENT_NO', value: entry.PATIENT_NO });
        }
        if (isNaN(Number(entry.IMAGE_NO)) || Number(entry.IMAGE_NO) < 1 || Number(entry.IMAGE_NO) > 99) {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'IMAGE_NO', value: entry.IMAGE_NO });
        }
        if (!["1", "2", "3"].includes(entry.IMAGE_SRC)) {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'IMAGE_SRC', value: entry.IMAGE_SRC });
        }
        if (entry.CAPTURE_TIME.length !== 4 || isNaN(Number(entry.CAPTURE_TIME))) {
            hasInvalidData = true;
            invalidFieldData.invalidFields.push({ field: 'CAPTURE_TIME', value: entry.CAPTURE_TIME });
        }

        // 질환별 유효성 검사
        switch (entry.DISEASE_CLASS) {
            case 'A': // 치주질환
                if (entry.DIA_PERIO !== "1" && entry.DIA_PERIO !== "2") {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DIA_PERIO', value: entry.DIA_PERIO });
                }

                Object.keys(entry).forEach(key => {
                    if (key.startsWith("Tooth_")) {
                        const toothValue = entry[key];
                        if (!["1", "2", "3", "4", "5", "6"].includes(toothValue)) {
                            hasInvalidData = true; // 유효하지 않은 치아 데이터
                            invalidFieldData.invalidFields.push({ field: key, value: toothValue });
                        }
                    }
                });
                break;

            case 'B': // 골수염
                if (!["1", "2", "3"].includes(entry.DIS_LOC)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DIS_LOC', value: entry.DIS_LOC });
                }
                if (!["1", "2", "3", "4", "5"].includes(entry.DIS_CLASS)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DIS_CLASS', value: entry.DIS_CLASS });
                }
                if (!["1", "2"].includes(entry.EXTRACTION)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'EXTRACTION', value: entry.EXTRACTION });
                }
                if (!["1", "2"].includes(entry.TRAUMA)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'TRAUMA', value: entry.TRAUMA });
                }
                if (!["1", "2"].includes(entry.IMPLANT)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'IMPLANT', value: entry.IMPLANT });
                }
                break;

            case 'C': // 구강암
                if (!["1", "2", "3"].includes(entry.DI_NAME)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DI_NAME', value: entry.DI_NAME });
                }
                if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].includes(entry.DI_LOC)) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DI_LOC', value: entry.DI_LOC });
                }
                if (isNaN(Number(entry.CAN_NUM)) || Number(entry.CAN_NUM) < 0 || Number(entry.CAN_NUM) > 3) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'CAN_NUM', value: entry.CAN_NUM });
                }
                if (isNaN(Number(entry.LYM_NUM)) || Number(entry.LYM_NUM) < 0 || Number(entry.LYM_NUM) > 3) {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'LYM_NUM', value: entry.LYM_NUM });
                }
                break;

            case 'D': // 두개안면
                if (entry.DI_DISEASE !== "1" && entry.DI_DISEASE !== "2") {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DI_DISEASE', value: entry.DI_DISEASE });
                }
                if (entry.DI_TIME !== "1" && entry.DI_TIME !== "2") {
                    hasInvalidData = true;
                    invalidFieldData.invalidFields.push({ field: 'DI_TIME', value: entry.DI_TIME });
                }

                if (entry.DI_DETAIL && entry.DI_DETAIL !== "") {
                    const diDetailValues = entry.DI_DETAIL.split(",").map(value => value.trim());
                    const validDiDetailValues = ["1", "2", "3", "4", "5", "6", "7"];

                    diDetailValues.forEach(value => {
                        if (!validDiDetailValues.includes(value)) {
                            hasInvalidData = true;
                            invalidFieldData.invalidFields.push({ field: 'DI_DETAIL', value: entry.DI_DETAIL });
                        }
                    });
                }
                break;

            // 추가 질환에 대한 검사도 여기에 추가
            default:
                console.log(`Unknown DISEASE_CLASS: ${entry.DISEASE_CLASS}`);
        }

        // 유효성 검사 실패 필드가 있으면 기록
        if (hasMissingData || hasInvalidData) {
            invalidCount++;
            invalidFields.push(invalidFieldData);
        }

        if (hasMissingData) {
            nullCount++;
        }
    });

    const completenessRatio = ((data.length - nullCount) / data.length) * 100;
    const validityRatio = ((data.length - invalidCount) / data.length) * 100;

    // 유효성 검사 실패 필드들을 콘솔에 출력
    console.log("Invalid Fields:", invalidFields);

    return { nullCount, invalidCount, completenessRatio, validityRatio, invalidFields };
};
