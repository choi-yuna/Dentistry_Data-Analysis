export const analyzeData = (data) => {
    let nullCount = 0;
    let invalidCount = 0;

    data.forEach((entry, rowIndex) => {
        let hasMissingData = false;
        let hasInvalidData = false;

        // 누락 데이터 검사
        Object.entries(entry).forEach(([key, value]) => {
            if (value === "" || value === null) {
                hasMissingData = true;
            }
        });

        // 유효성 검사 (누락된 값은 제외하고 유효성 검사 진행)
        if (!hasMissingData) {
            // 공통 유효성 검사
            if (entry.P_GENDER !== "1" && entry.P_GENDER !== "2") {
                hasInvalidData = true;
            }
            if (isNaN(Number(entry.P_AGE)) || entry.P_AGE === "" || Number(entry.P_AGE) <= 0) {
                hasInvalidData = true;
            }
            if (!["1", "2", "3", "4", "5", "6", "7"].includes(entry.INSTITUTION_ID)) {
                hasInvalidData = true;
            }
            if (isNaN(Number(entry.PATIENT_NO)) || Number(entry.PATIENT_NO) < 1 || Number(entry.PATIENT_NO) > 9999) {
                hasInvalidData = true;
            }
            if (isNaN(Number(entry.IMAGE_NO)) || Number(entry.IMAGE_NO) < 1 || Number(entry.IMAGE_NO) > 99) {
                hasInvalidData = true;
            }
            if (!["1", "2", "3"].includes(entry.IMAGE_SRC)) {
                hasInvalidData = true;
            }
            if (entry.CAPTURE_TIME.length !== 4 || isNaN(Number(entry.CAPTURE_TIME))) {
                hasInvalidData = true;
            }

            // 질환별 유효성 검사
            switch (entry.DISEASE_CLASS) {
                case 'A': // 치주질환
                    if (entry.DIA_PERIO !== "1" && entry.DIA_PERIO !== "2") {
                        hasInvalidData = true;
                    }

                    Object.keys(entry).forEach(key => {
                        if (key.startsWith("Tooth_")) {
                            const toothValue = entry[key];
                            if (!["1", "2", "3", "4", "5", "6"].includes(toothValue)) {
                                hasInvalidData = true; // 유효하지 않은 치아 데이터
                            }
                        }
                    });
                    break;

                case 'B': // 골수염
                    if (!["1", "2", "3"].includes(entry.DIS_LOC)) {
                        hasInvalidData = true;
                    }
                    if (!["1", "2", "3", "4", "5"].includes(entry.DIS_CLASS)) {
                        hasInvalidData = true;
                    }
                    if (!["1", "2"].includes(entry.EXTRACTION)) {
                        hasInvalidData = true;
                    }
                    if (!["1", "2"].includes(entry.TRAUMA)) {
                        hasInvalidData = true;
                    }
                    if (!["1", "2"].includes(entry.IMPLANT)) {
                        hasInvalidData = true;
                    }
                    break;

                case 'C': // 구강암
                    if (!["1", "2", "3"].includes(entry.DI_NAME)) {
                        hasInvalidData = true;
                    }
                    if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].includes(entry.DI_LOC)) {
                        hasInvalidData = true;
                    }
                    if (isNaN(Number(entry.CAN_NUM)) || Number(entry.CAN_NUM) < 0 || Number(entry.CAN_NUM) > 3) {
                        hasInvalidData = true;
                    }
                    if (isNaN(Number(entry.LYM_NUM)) || Number(entry.LYM_NUM) < 0 || Number(entry.LYM_NUM) > 3) {
                        hasInvalidData = true;
                    }
                    break;

                case 'D': // 두개안면
                    if (entry.DI_DISEASE !== "1" && entry.DI_DISEASE !== "2") {
                        hasInvalidData = true;
                    }
                    if (entry.DI_TIME !== "1" && entry.DI_TIME !== "2") {
                        hasInvalidData = true;
                    }

                    if (entry.DI_DETAIL && entry.DI_DETAIL !== "") {
                        const diDetailValues = entry.DI_DETAIL.split(",").map(value => value.trim());
                        const validDiDetailValues = ["1", "2", "3", "4", "5", "6", "7"];

                        diDetailValues.forEach(value => {
                            if (!validDiDetailValues.includes(value)) {
                                hasInvalidData = true;
                            }
                        });
                    }
                    break;
            }
        }

        // 유효성 검사 실패 필드가 있으면 기록
        if (hasInvalidData) {
            invalidCount++;
        }

        if (hasMissingData) {
            nullCount++;
        }
    });

    const completenessRatio = ((data.length - nullCount) / data.length) * 100;
    const validityRatio = ((data.length - invalidCount) / data.length) * 100;

    return { nullCount, invalidCount, completenessRatio, validityRatio };
};
