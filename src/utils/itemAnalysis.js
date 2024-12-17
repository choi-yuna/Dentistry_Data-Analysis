export const analyzeItems = (data) => {
    if (data.length === 0) {
        return {
            totalItems: 0,
            missingItemCount: 0,
            invalidItemCount: 0,
            completenessRatio: 0,
            validityRatio: 0,
            qualityRatio: 0,
            invalidItems: [] // 유효성 검사 실패 항목 목록 추가
        };
    }


  // `required` 항목만 추출
  const requiredData = data.map((entry) => entry.required || {});

  const optionalData = data.map((entry) => entry.optional || {});

  // 필수 헤더 수 (첫 번째 데이터 항목의 키 수)
  const headerCount = Object.keys(requiredData[0]).length;

    // 전체 항목 수 = 헤더의 수 * 행의 갯수
    const totalItems = headerCount * data.length;
    
    let optionalmissingItemCount = 0;
    let missingItemCount = 0;
    let invalidItemCount = 0;
    const invalidItems = []; // 유효성 검사에서 실패한 항목을 기록할 배열

    optionalData.forEach((entry, rowIndex) => {
        Object.entries(entry).forEach(([key, value]) => {

            const invalidReason = {};
            if (value === "" || value === null) {
                optionalmissingItemCount++;
            } else{
                if (key === "P_WEIGHT" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "P_HEIGHT" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "LF_NOTE" && !["1", "2"].includes(value)) {
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }

                if (key === "TOTAL_SLICE_NO" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
            }
        });
    });

    // 각 데이터 항목 검사
    requiredData.forEach((entry, rowIndex) => {
        // 각 항목에 대해 누락 데이터 및 유효성 검사
        Object.entries(entry).forEach(([key, value]) => {
            // 누락된 항목 검사
            if (value === "" || value === null) {
                missingItemCount++;
            } else {
                // 유효성 검사 (누락된 값은 제외하고 진행)
                const invalidReason = {};

                if (key === "P_GENDER" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "P_AGE" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "INSTITUTION_ID" && !["1", "2", "3", "4", "5", "6", "7"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "PATIENT_NO") {
                    const patientNo = Number(value.trim());
                    if (isNaN(patientNo) || patientNo < 1 || patientNo > Number.MAX_SAFE_INTEGER) {
                        invalidItemCount++;
                        invalidReason[key] = value;
                        invalidItems.push({ row: rowIndex + 1, column: key, value });
                    }
                }
                if (key === "IMAGE_NO") {
                    const imageNo = Number(value.trim());
                    if (isNaN(imageNo) || imageNo < 1 || imageNo > Number.MAX_SAFE_INTEGER) {
                        invalidItemCount++;
                        invalidReason[key] = value;
                        invalidItems.push({ row: rowIndex + 1, column: key, value });
                    }
                }
                
                if (key === "IMAGE_SRC" && !["1", "2", "3"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "CAPTURE_TIME" && (value.length !== 4 || isNaN(Number(value)))) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DIA_PERIO" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }

                if (key.startsWith("Tooth_") && !["1", "2", "3", "4", "5", "6"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }

                if (key === "DIS_LOC" && !["1", "2", "3"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DIS_CLASS" && !["1", "2", "3", "4", "5"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "EXTRACTION" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "TRAUMA" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "IMPLANT" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "BONE_SUR" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "ORIGIN_INF" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "FIRST_TREAT" && entry.FIRST_TREAT && entry.FIRST_TREAT !== "") {
                    const diLocValues = entry.FIRST_TREAT.split(",").map(value => value.trim());
                    const validDiLocValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
                    diLocValues.forEach(value => {
                        if (!validDiLocValues.includes(value)) {
                            invalidItemCount++;
                            invalidItems.push({ row: rowIndex + 1, column: key, value });
                        }
                    });
                }

                if (key === "RECUR" && entry.RECUR && entry.RECUR !== "") {
                    const diLocValues = entry.RECUR.split(",").map(value => value.trim());
                    const validDiLocValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
                    diLocValues.forEach(value => {
                        if (!validDiLocValues.includes(value)) {
                            invalidItemCount++;
                            invalidItems.push({ row: rowIndex + 1, column: key, value });
                        }
                    });
                }

                if (key === "DI_NAME" && !["1", "2", "3"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DI_LOC" && entry.DI_LOC && entry.DI_LOC !== "") {
                    const diLocValues = entry.DI_LOC.split(",").map(value => value.trim());
                    const validDiLocValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
                    diLocValues.forEach(value => {
                        if (!validDiLocValues.includes(value)) {
                            invalidItemCount++;
                            invalidItems.push({ row: rowIndex + 1, column: key, value });
                        }
                    });
                }
                if (key === "CAN_NUM" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 3)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "LYM_NUM" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 3)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }

                if (key === "DI_DISEASE" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DI_TIME" && !["1", "2"].includes(value)) {
                    invalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }

                if (key === "DI_DETAIL" && entry.DI_DETAIL !== "") {
                    const diDetailValues = entry.DI_DETAIL.split(",").map(value => value.trim());
                    const validDiDetailValues = ["1", "2", "3", "4", "5", "6", "7"];
                    diDetailValues.forEach(value => {
                        if (!validDiDetailValues.includes(value)) {
                            invalidItemCount++;
                            invalidItems.push({ row: rowIndex + 1, column: key, value });
                        }
                    });
                }
            }
        });
    });

    // 비율 계산
    const completenessRatio = ((totalItems - missingItemCount) / totalItems) * 100;
    const validityRatio = ((totalItems - invalidItemCount) / totalItems) * 100;
    const qualityRatio = ((totalItems - (invalidItemCount + missingItemCount)) / totalItems) * 100;

    return {
        totalItems,
        missingItemCount,
        invalidItemCount,
        completenessRatio,
        validityRatio,
        qualityRatio,
        invalidItems // 유효성 검사 실패 항목 반환
    };
};
