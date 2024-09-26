export const analyzeItems = (data) => {
    if (data.length === 0) {
        return { totalItems: 0, missingItemCount: 0, invalidItemCount: 0, completenessRatio: 0, validityRatio: 0, qualityRatio: 0 };
    }

    // 데이터의 헤더 수 (첫 번째 데이터 항목의 키 수)
    const headerCount = Object.keys(data[0]).length;

    // 전체 항목 수 = 헤더의 수 * 행의 갯수
    const totalItems = headerCount * data.length;

    let missingItemCount = 0;
    let invalidItemCount = 0;

    // 각 데이터 항목 검사
    data.forEach((entry, rowIndex) => {
        // 각 항목에 대해 누락 데이터 및 유효성 검사
        Object.entries(entry).forEach(([key, value]) => {
            // 누락된 항목 검사
            if (value === "" || value === null) {
                missingItemCount++;
            } else {
                // 유효성 검사 (누락된 값은 제외하고 진행)
                if (key === "P_GENDER" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid P_GENDER at row ${rowIndex + 1}:`, value);
                }
                if (key === "P_AGE" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    invalidItemCount++;
                    console.log(`Invalid P_AGE at row ${rowIndex + 1}:`, value);
                }
                if (key === "INSTITUTION_ID" && value !== "1" && value !== "2" && value !== "3" && value !== "4" && value !== "5" && value !== "6" && value !== "7") {
                    invalidItemCount++;
                    console.log(`Invalid INSTITUTION_ID at row ${rowIndex + 1}:`, value);
                }
                if (key === "PATIENT_NO") {
                    const patientNo = Number(value.trim());
                    if (isNaN(patientNo) || patientNo < 1 || patientNo > Number.MAX_SAFE_INTEGER) {
                        invalidItemCount++;
                        console.log(`Invalid PATIENT_NO at row ${rowIndex + 1}:`, value);
                    }
                }
                if (key === "IMAGE_NO") {
                    const imageNo = Number(value.trim());
                    if (isNaN(imageNo) || imageNo < 1 || imageNo > Number.MAX_SAFE_INTEGER) {
                        invalidItemCount++;
                        console.log(`Invalid IMAGE_NO at row ${rowIndex + 1}:`, value);
                    }
                }
                
                if (key === "IMAGE_SRC" && value !== "1" && value !== "2" && value !== "3") {
                    invalidItemCount++;
                    console.log(`Invalid IMAGE_SRC at row ${rowIndex + 1}:`, value);
                }
                if (key === "CAPTURE_TIME" && (value.length !== 4 || isNaN(Number(value)))) {
                    invalidItemCount++;
                    console.log(`Invalid CAPTURE_TIME at row ${rowIndex + 1}:`, value);
                }
                if (key === "DIA_PERIO" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid DIA_PERIO at row ${rowIndex + 1}:`, value);
                }

                if (key.startsWith("Tooth_") && value !== "1" && value !== "2" && value !== "3" && value !== "4" && value !== "5" && value !== "6") {
                    invalidItemCount++;
                    console.log(`Invalid ${key} at row ${rowIndex + 1}:`, value);
                }

                if (key === "DIS_LOC" && value !== "1" && value !== "2" && value !== "3") {
                    invalidItemCount++;
                    console.log(`Invalid DIS_LOC at row ${rowIndex + 1}:`, value);
                }
                if (key === "DIS_CLASS" && value !== "1" && value !== "2" && value !== "3" && value !== "4" && value !== "5") {
                    invalidItemCount++;
                    console.log(`Invalid DIS_CLASS at row ${rowIndex + 1}:`, value);
                }
                if (key === "EXTRACTION" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid EXTRACTION at row ${rowIndex + 1}:`, value);
                }
                if (key === "TRAUMA" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid TRAUMA at row ${rowIndex + 1}:`, value);
                }
                if (key === "IMPLANT" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid IMPLANT at row ${rowIndex + 1}:`, value);
                }

                if (key === "DI_NAME" && value !== "1" && value !== "2" && value !== "3") {
                    invalidItemCount++;
                    console.log(`Invalid DI_NAME at row ${rowIndex + 1}:`, value);
                }
                if (key === "DI_LOC" && entry.DI_LOC && entry.DI_LOC !== "") {
                    const diLocValues = entry.DI_LOC.split(",").map(value => value.trim());
                    const validDiLocValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
                    diLocValues.forEach(value => {
                        if (!validDiLocValues.includes(value)) {
                            invalidItemCount++;
                        }
                    });
                }
                if (key === "CAN_NUM" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 3)) {
                    invalidItemCount++;
                    console.log(`Invalid CAN_NUM at row ${rowIndex + 1}:`, value);
                }
                if (key === "LYM_NUM" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 3)) {
                    invalidItemCount++;
                    console.log(`Invalid LYM_NUM at row ${rowIndex + 1}:`, value);
                }

                if (key === "DI_DISEASE" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid DI_DISEASE at row ${rowIndex + 1}:`, value);
                }
                if (key === "DI_TIME" && value !== "1" && value !== "2") {
                    invalidItemCount++;
                    console.log(`Invalid DI_TIME at row ${rowIndex + 1}:`, value);
                }

                if (key === "DI_DETAIL" && entry.DI_DETAIL !== "") {
                    const diDetailValues = entry.DI_DETAIL.split(",").map(value => value.trim());
                    const validDiDetailValues = ["1", "2", "3", "4", "5", "6", "7"];
                    diDetailValues.forEach(value => {
                        if (!validDiDetailValues.includes(value)) {
                            invalidItemCount++;
                        }
                    });
                }
            }
        });
    });

    // 비율 계산
    const completenessRatio = ((totalItems - missingItemCount) / totalItems) * 100;
    const validityRatio = ((totalItems - invalidItemCount) / totalItems) * 100;
    const qualityRatio = ((totalItems - (invalidItemCount+missingItemCount)) / totalItems) *100;

    return { totalItems, missingItemCount, invalidItemCount, completenessRatio, validityRatio,qualityRatio };
};
