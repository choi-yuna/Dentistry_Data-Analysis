export const analyzeData = (data) => {
    let nullCount = 0;  // 누락된 항목이 있는 행을 카운트
    let invalidCount = 0;  // 유효성 검사를 통과하지 못한 항목이 있는 행을 카운트
    let totalNullCount=0;
    let totalInvalidCount=0;

    data.forEach((entry) => {

    
        let hasMissingData = false;
        let hasInvalidData = false;

        let totalhasMissingData = false;
        let totalhasInvalidData = false;
    

        const required = entry.required || {};
        const optional = entry.optional || {};


         // 누락 데이터 검사
         Object.entries(optional).forEach(([key, value]) => {
            if (value === "" || value === null) {
                totalhasMissingData = true;
                totalhasInvalidData = true;
            } else {
                // 유효성 검사 (누락된 값은 제외하고 진행)
                if (key === "H_RESOLUTION" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalhasInvalidData = true;
                }
                if (key === "V_RESOLUTION" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalhasInvalidData = true;
                }
                if (key === "P_WEIGHT" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalhasInvalidData = true;
                }
                if (key === "P_HEIGHT" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0)) {
                    totalhasInvalidData = true;
                }

                // 질환별 유효성 검사
                if (key === "DISEASE_CLASS") {
                    switch (value) {
                        case 'A': // 치주질환
                        if (key === "MH_DIABETES" && value.trim() !== "1" && value.trim() !== "2"  && value.trim() !== "3" && value.trim() !== "4" ) {
                            totalhasInvalidData = true;
                        }
                        if (key === "MH_HIGHBLOOD" && value.trim() !== "1" && value.trim() !== "2") {
                            totalhasInvalidData = true;
                        }
                        if (key === "MH_OSTEOPROSIS" && value.trim() !== "1" && value.trim() !== "2") {
                            totalhasInvalidData = true;
                        }
                        if (key === "LS_SMOKE" && value.trim() !== "1" && value.trim() !== "2"  && value.trim() !== "3" ) {
                            totalhasInvalidData = true;
                        }
                        if (key === "LS_ALCHOLE" && value.trim() !== "1" && value.trim() !== "2" ) {
                            totalhasInvalidData = true;
                        }
                        if (key === "DIA_MISSTEETH_A" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0) ) {
                            totalhasInvalidData = true;
                        }
                        if (key === "DIA_MISSTEETH_B" && (isNaN(Number(value.trim())) || Number(value.trim()) <= 0) ) {
                            totalhasInvalidData = true;
                        }
                            break;

                        case 'B': // 골수염
                            if (key === "TOTAL_SLICE_NO" && (isNaN(Number(value.trim())))) {
                                totalhasInvalidData = true;
                            }
                            if (key === "HTN" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "HLD" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DIA" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "TAC" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "HD" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DIA" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "TD" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "LD" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "KD" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "RA" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "CANCER" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DEM" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "SMOK" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "STER" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "CHEMO" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "IMM_D" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "VAS_INSUF" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            break;

                        case 'C': // 구강암
                            if (key === "TOTAL_SLICE_NO" && (isNaN(Number(value.trim())))) {
                                totalhasInvalidData = true;
                            }
                            if (key === "DH_SMOKE" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DH_ALCHO" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DH_DIAB" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DH_CARDIO" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DI_RAD" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            if (key === "DI_CAN" && value !== "1" && value !== "2") {
                                totalhasInvalidData = true;
                            }
                            break;

                        case 'D': // 두개안면
                            if (key === "TOTAL_SLICE_NO" && (isNaN(Number(value.trim())))) {
                                totalhasInvalidData = true;
                            }
                            if (key === "CI_SURGERY" && (isNaN(Number(value.trim())))) {
                                totalhasInvalidData = true;
                            }
                            break;
                    }
                }
            }
        
        // 누락 데이터 검사
        Object.entries(required).forEach(([key, value]) => {
            if (value === "" || value === null) {
                hasMissingData = true;
                hasInvalidData = true;
                totalhasMissingData = true;
                totalhasInvalidData = true;
            } else {
                // 유효성 검사 (누락된 값은 제외하고 진행)
                if (key === "P_GENDER" && value !== "1" && value !== "2") {
                    hasInvalidData = true;
                    totalhasInvalidData = true;
                }
                if (key === "P_AGE" && (isNaN(Number(value)) || Number(value) <= 0)) {
                    hasInvalidData = true;
                    totalhasInvalidData = true;
                }
                if (key === "INSTITUTION_ID" && value !== "1" && value !== "2" && value !== "3" && value !== "4" && value !== "5" && value !== "6" && value !== "7") {
                    hasInvalidData = true;
                    totalhasInvalidData = true;
                }
                if (key === "PATIENT_NO") {
                    const patientNo = Number(value.trim());
                    if (isNaN(patientNo) || patientNo < 1 || patientNo > Number.MAX_SAFE_INTEGER) {
                        hasInvalidData = true; 
                        totalhasInvalidData = true;                   }
                }
                if (key === "IMAGE_NO") {
                    const imageNo = Number(value.trim());
                    if (isNaN(imageNo) || imageNo < 1 || imageNo > Number.MAX_SAFE_INTEGER) {
                        hasInvalidData = true;
                        totalhasInvalidData = true;
                    }
                }
                if (key === "IMAGE_SRC" && value !== "1" && value !== "2" && value !== "3") {
                    hasInvalidData = true;
                    totalhasInvalidData = true;
                }
                if (key === "CAPTURE_TIME" && (value.length !== 4 || isNaN(Number(value)))) {
                    hasInvalidData = true;
                    totalhasInvalidData = true;
                }


                // 질환별 유효성 검사
                if (key === "DISEASE_CLASS") {
                    switch (value) {
                        case 'A': // 치주질환
                            
                            break;

                        case 'B': // 골수염
                            if (key === "EXTRACTION" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            if (key === "TRAUMA" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            if (key === "IMPLANT" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            if (key === "BONE_SUR" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            if (key === "ORIGIN_INF" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            break;

                        case 'C': // 구강암
                            if (key === "DI_NAME" && value !== "1" && value !== "2" && value !== "3") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            if (key === "DI_LOC" && entry.DI_LOC && entry.DI_LOC !== "") {
                                const diLocValues = entry.DI_LOC.split(",").map(value => value.trim());
                                const validDiLocValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
                                diLocValues.forEach(value => {
                                    if (!validDiLocValues.includes(value)) {
                                        hasInvalidData = true;
                                        totalhasInvalidData = true;
                                    }
                                });
                            }
                            break;

                        case 'D': // 두개안면
                            if (key === "DI_DISEASE" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            if (key === "DI_TIME" && value !== "1" && value !== "2") {
                                hasInvalidData = true;
                                totalhasInvalidData = true;
                            }
                            break;
                    }
                }
            }
        });

    });
    
            // 누락된 항목이 있으면 nullCount 증가
        if (hasMissingData) {
            nullCount++;
        }

        // 유효성 검사 실패 항목이 있으면 invalidCount 증가
        if (hasInvalidData) {
            invalidCount++;
        }
        // 누락된 항목이 있으면 nullCount 증가
        if (totalhasMissingData) {
            totalNullCount++;
        }

        // 유효성 검사 실패 항목이 있으면 invalidCount 증가
        if (totalhasInvalidData) {
            totalInvalidCount++;
        }
    });

    // 비율 계산
    const completenessRatio = ((data.length - nullCount) / data.length) * 100;
    const validityRatio = ((data.length - invalidCount) / data.length) * 100;
    const totalCompletenessRatio = ((data.length - totalNullCount) / data.length) * 100;
    const totalValidityRatio = ((data.length - totalInvalidCount) / data.length) * 100;

    return { nullCount, invalidCount, completenessRatio, validityRatio, totalNullCount, totalInvalidCount, totalCompletenessRatio, totalValidityRatio};
};


