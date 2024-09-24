export const analyzeData = (data) => {
    let nullCount = 0;  // 누락된 항목이 있는 행을 카운트
    let invalidCount = 0;  // 유효성 검사를 통과하지 못한 항목이 있는 행을 카운트

    data.forEach((entry, rowIndex) => {
        let hasMissingData = false;
        let hasInvalidData = false;

        // 누락 데이터 검사
        Object.entries(entry).forEach(([key, value]) => {
            if (value === "" || value === null) {
                hasMissingData = true;
                hasInvalidData = true;
            } else {
                // 유효성 검사 (누락된 값은 제외하고 진행)
                if (key === "P_GENDER" && value !== "1" && value !== "2") {
                    hasInvalidData = true;
                }
                if (key === "P_AGE" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    hasInvalidData = true;
                }
                if (key === "INSTITUTION_ID" && value !== "1" && value !== "2" && value !== "3" && value !== "4" && value !== "5" && value !== "6" && value !== "7") {
                    hasInvalidData = true;
                }
                if (key === "PATIENT_NO") {
                    const patientNo = Number(value.trim());
                    if (isNaN(patientNo) || patientNo < 1 || patientNo > Number.MAX_SAFE_INTEGER) {
                        hasInvalidData = true;                    }
                }
                if (key === "IMAGE_NO") {
                    const imageNo = Number(value.trim());
                    if (isNaN(imageNo) || imageNo < 1 || imageNo > Number.MAX_SAFE_INTEGER) {
                        hasInvalidData = true;
                    }
                }
                if (key === "IMAGE_SRC" && value !== "1" && value !== "2" && value !== "3") {
                    hasInvalidData = true;
                }
                if (key === "CAPTURE_TIME" && (value.length !== 4 || isNaN(Number(value)))) {
                    hasInvalidData = true;
                }

                // 질환별 유효성 검사
                if (key === "DISEASE_CLASS") {
                    switch (value) {
                        case 'A': // 치주질환
                            if (entry.DIA_PERIO !== "1" && entry.DIA_PERIO !== "2") {
                                hasInvalidData = true;
                            }
                            Object.keys(entry).forEach(key => {
                                if (key.startsWith("Tooth_")) {
                                    const toothValue = entry[key];
                                    if (toothValue !== "" && toothValue !== "1" && toothValue !== "2" && toothValue !== "3" && toothValue !== "4" && toothValue !== "5" && toothValue !== "6") {
                                        hasInvalidData = true;
                                    }
                                }
                            });
                            break;

                        case 'B': // 골수염
                            if (key === "DIS_LOC" && value !== "1" && value !== "2" && value !== "3") {
                                hasInvalidData = true;
                            }
                            if (key === "DIS_CLASS" && value !== "1" && value !== "2" && value !== "3" && value !== "4" && value !== "5") {
                                hasInvalidData = true;
                            }
                            if (key === "EXTRACTION" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                            }
                            if (key === "TRAUMA" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                            }
                            if (key === "IMPLANT" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                            }
                            break;

                        case 'C': // 구강암
                            if (key === "DI_NAME" && value !== "1" && value !== "2" && value !== "3") {
                                hasInvalidData = true;
                            }
                            if (key === "DI_LOC" && entry.DI_LOC && entry.DI_LOC !== "") {
                                const diLocValues = entry.DI_LOC.split(",").map(value => value.trim());
                                const validDiLocValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
                                diLocValues.forEach(value => {
                                    if (!validDiLocValues.includes(value)) {
                                        hasInvalidData = true;
                                    }
                                });
                            }
                            if (key === "CAN_NUM" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 3)) {
                                hasInvalidData = true;
                            }
                            if (key === "LYM_NUM" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 3)) {
                                hasInvalidData = true;
                            }
                            break;

                        case 'D': // 두개안면
                            if (key === "DI_DISEASE" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                            }
                            if (key === "DI_TIME" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                            }
                            if (key === "DI_DETAIL" && entry.DI_DETAIL !== "") {
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
            }
        });

        // 누락된 항목이 있으면 nullCount 증가
        if (hasMissingData) {
            nullCount++;
        }

        // 유효성 검사 실패 항목이 있으면 invalidCount 증가
        if (hasInvalidData) {
            invalidCount++;
        }
    });

    // 비율 계산
    const completenessRatio = ((data.length - nullCount) / data.length) * 100;
    const validityRatio = ((data.length - invalidCount) / data.length) * 100;

    return { nullCount, invalidCount, completenessRatio, validityRatio };
};
