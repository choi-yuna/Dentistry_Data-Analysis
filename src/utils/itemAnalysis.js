export const analyzeItems = (data) => {
    if (data.length === 0) {
        return {
            items: 0,
            totalMissingItemCount: 0,
            totalInvalidItemCount: 0,
            totalItems: 0,
            missingItemCount: 0,
            invalidItemCount: 0,
            completenessRatio: 0,
            validityRatio: 0,
            qualityRatio: 0,
            totalItemCompletenessRatio: 0,
            totalItemValidityRatio:0,
            totalQualityRatio: 0,
            invalidItems: [] // 유효성 검사 실패 항목 목록 추가
        };
    }


  // `required` 항목만 추출
  const requiredData = data.map((entry) => entry.required || {});

  const optionalData = data.map((entry) => entry.optional || {});

  // 필수 헤더 수 (첫 번째 데이터 항목의 키 수)
  const requirdHeaderCount = Object.keys(requiredData[0]).length;
  const optionalHeaderCount = Object.keys(optionalData[0]).length;

    // 전체 항목 수 = 헤더의 수 * 행의 갯수
    const totalItems = requirdHeaderCount * data.length;

    const items =  optionalHeaderCount * data.length;
    
    let totalMissingItemCount = 0;
    let totalInvalidItemCount = 0;
    let missingItemCount = 0;
    let invalidItemCount = 0;
    const invalidItems = []; // 유효성 검사에서 실패한 항목을 기록할 배열

    optionalData.forEach((entry, rowIndex) => {
        Object.entries(entry).forEach(([key, value]) => {

            const invalidReason = {};
            if (value.trim() === "" || value === null) {
                totalMissingItemCount++;
            } else{
                if (key === "P_WEIGHT" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "P_HEIGHT" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "LF_NOTE" && !["1", "2"].includes(value)) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }

                if (key === "TOTAL_SLICE_NO" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "H_RESOLUTION" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "V_RESOLUTION" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "MH_DIABETES" && value.trim() !== "1" && value.trim() !== "2"  && value.trim() !== "3" && value.trim() !== "4" ) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "MH_HIGHBLOOD" && value.trim() !== "1" && value.trim() !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "MH_OSTEOPROSIS" && value.trim() !== "1" && value.trim() !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "LS_SMOKE" && value.trim() !== "1" && value.trim() !== "2"  && value.trim() !== "3" ) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "LS_ALCHOLE" && value.trim() !== "1" && value.trim() !== "2" ) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DIA_MISSTEETH_A" && (isNaN(Number(value.trim())) || Number(value.trim()) < 0) ) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DIA_MISSTEETH_B" && (isNaN(Number(value.trim())) || Number(value.trim()) < 0) ) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "HTN" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "HLD" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DIA" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "TAC" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "HD" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DIA" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "TD" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "LD" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "KD" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "RA" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "CANCER" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DEM" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "SMOK" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "STER" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "CHEMO" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "IMM_D" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "VAS_INSUF" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DH_DIAB" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DH_CARDIO" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DI_RAD" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "DI_CAN" && value !== "1" && value !== "2") {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "TOTAL_SLICE_NO" && (isNaN(Number(value.trim())))) {
                    totalInvalidItemCount++;
                    invalidReason[key] = value;
                    invalidItems.push({ row: rowIndex + 1, column: key, value });
                }
                if (key === "CI_SURGERY" && (isNaN(Number(value.trim())))) {
                    totalInvalidItemCount++;
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
                
                if (key === "DI_NAME" && entry.DI_NAME && entry.DI_NAME !== "") {
                    const diLocValues = entry.DI_NAME.split(",").map(value => value.trim());
                    const validDiLocValues = ["1", "2", "3"];
                    diLocValues.forEach(value => {
                        if (!validDiLocValues.includes(value)) {
                            invalidItemCount++;
                            invalidItems.push({ row: rowIndex + 1, column: key, value });
                        }
                    });
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
    const totalItemCompletenessRatio = ((totalItems - totalMissingItemCount) / items) * 100;
    const totalItemValidityRatio = ((totalItems - totalInvalidItemCount) / items) * 100;
    const totalQualityRatio = ((totalItems - (totalMissingItemCount + totalInvalidItemCount)) / items) * 100;

    return {
        totalItems,
        items,
        totalInvalidItemCount,
        totalMissingItemCount,
        missingItemCount,
        invalidItemCount,
        completenessRatio,
        validityRatio,
        totalItemCompletenessRatio,
        totalItemValidityRatio,
        totalQualityRatio,
        qualityRatio,
        invalidItems // 유효성 검사 실패 항목 반환
    };
};
