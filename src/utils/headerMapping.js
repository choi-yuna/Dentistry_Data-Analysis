export const headerMapping = {
    "DISEASE_CLASS": "질병 분류",
    "INSTITUTION_ID": "기관 ID",
    "PATIENT_NO": "환자 번호",
    "IMAGE_NO": "이미지 번호",
    "IMAGE_SRC": "촬영 종류",
    "CAPTURE_TIME": "촬영 일자",
    "IMAGE_ID": "이미지 ID",
    "Identifier" : "이미지 ID",
    "P_AGE": "환자 나이",
    "P_WEIGHT": "환자 체중",
    "P_HEIGHT": "환자 키",
    "P_GENDER": "성별",
    "LS_SMOKE": "흡연력",
    "LS_ALCHOLE": "음주",
    "MH_DIABETES": "당뇨",
    "MH_HIGHBLOOD": "고혈압",
    "MH_OSTEOPROSIS": "골다공증",
    "CARDIOVASCULAR_DISEASE": "심혈관 질환",
    "DIA_PERIO": "치주질환 여부",
    "DIA_NOTE": "진단 소견",
    "DIA_MISSTEETH_A": "결손치 수",
    "DIA_MISSTEETH_B": "치주질환 원인이 아닌 결손치 수",
    "DIA_MISSTEETH_C": "치주염으로 인한 결손치 수",
    "DIS_LOC": "발생 부위",
    "DIS_CLASS": "골수염 종류",
    "MR_STAGE": "Stage",
    "MR_HOWTOTAKE": "약물 복용 방법",
    "MR_HOWLONG": "약물 복용 기간",
    "DI_DISEASE": "두개안면 기형 여부",
    "DI_TIME": "데이터 획득 시기",
    "DI_DETAIL": "세부 진단",
    "DI_NAME": "진단명",
    "DI_LOC": "병소 부위",
    "PT_TNM": "TNM stage",
    "MAKER_INFO": "촬영 장비",
    "P_RES_AREA": "주거 지역",
    "CAN_NUM": "구강암 개수",
    "LYM_NUM": "임파절 전이 개수",
    "OST_NUM": "골수염 개수"
};

// 질병별 헤더 매핑
export const diseaseHeaderMapping = {
    'A': [ 
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_INFO","H_RESOLUTION","V_RESOLUTION",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT", "P_HEIGHT", "P_RES_AREA", "MH_DIABETES","MH_HIGHBLOOD", "MH_OSTEOPROSIS", "MH_NOTE", "LS_SMOKE", "LS_ALCHOLE",
        //필수
        "DIA_PERIO",
        //선택
        "DIA_NOTE", "DIA_MISSTEETH_A", "DIA_MISSTEETH_B"],

    'B': [
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_INFO", "H_RESOLUTION","V_RESOLUTION","TOTAL_SLICE_NO",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT","P_HEIGHT","P_RES_AREA",
        //필수
        "DIS_LOC","DIS_CLASS",
        //선택
        "HTN","HLD","DIA","TAC","HD","TD","LD","KD","RA","CANCER","DEM","SMOK","STER","CHEMO","IMM_D",
        //필수
        "EXTRACTION", "TRAUMA", "IMPLANT", "BONE_SUR", "ORIGIN_INF",
        //선택항목
        "VAS_INSUF","LF_NOTE",
        //필수
        "FIRST_TREAT", "RECUR"],

    'C': [
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_INFO", "H_RESOLUTION","V_RESOLUTION","TOTAL_SLICE_NO",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT","P_HEIGHT","P_RES_AREA","DH_SMOKE","DH_ALCHO","DH_DIAB","DH_CARDIO",
        //필수
        "DI_NAME","DI_LOC",
        //선택
        "DI_SUR","DI_RAD","DI_CAN","BT_WBC","BT_HB","BT_HCT","BT_OTPT","BT_GFR",
        //필수
        "PT_TNM",
        //선택항목
        "PT_DOI","PT_SIZE", "PT_NODE",	"PT_EI","PT_VI", "PT_BI","PT_LI"],

    'D': [ 
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_INFO","H_RESOLUTION","V_RESOLUTION","V_RESOLUTION","TOTAL_SLICE_NO",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT","P_HEIGHT","P_RES_AREA",
        //필수
        "DI_DISEASE","DI_TIME","MAKER_INFO",
        //선택항목
       "DI_NOTE","CI_SURGERY"],

    'E': ['DISEASE_CLASS', 'INSTITUTION_ID', 'PATIENT_NO', 'IMAGE_NO', 'IMAGE_SRC', 'CAPTURE_TIME',
          'IMAGE_ID', 'P_GENDER', 'P_AGE']
};

// 질병별 헤더 매핑
export const jsonHeaderMapping = {
    'A': [ 
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_IF","H_RESOLUTION","V_RESOLUTION",
        //필수
        "Identifier", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT", "P_HEIGHT", "P_RES_AREA", "MH_DIABETES","MH_HIGHBLOOD", "MH_OSTEOPROSIS", "MH_NOTE", "LS_SMOKE", "LS_ALCHOLE",
        //필수
        "DIA_PERIO",
        //선택
        "DIA_NOTE", "DIA_MISSTEETH_A", "DIA_MISSTEETH_B",
        "11","12","13","14","15","16","17","18","21","22","23","24","25","26","27","28",
        "31","32","33","34","35","36","37","38","41","42","43","44","45","46","47","48"
        
    ],

    'B': [
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_IF", "H_RESOLUTION","V_RESOLUTION","TOTAL_SLICE_NO",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT","P_HEIGHT","P_RES_AREA",
        //필수
        "DIS_LOC","DIS_CLASS",
        //선택
        "HTN","HLD","DIA","TAC","HD","TD","LD","KD","RA","CANCER","DEM","SMOK","STER","CHEMO","IMM_D",
        //필수
        "EXTRACTION", "TRAUMA", "IMPLANT", "BONE_SUR", "ORIGIN_INF",
        //선택항목
        "VAS_INSUF","LF_NOTE",
        //필수
        "FIRST_TREAT", "RECUR","OST_NUM"],

    'C': [
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_INFO", "H_RESOLUTION","V_RESOLUTION","TOTAL_SLICE_NO",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT","P_HEIGHT","P_RES_AREA","DH_SMOKE","DH_ALCHO","DH_DIAB","DH_CARDIO",
        //필수
        "DI_NAME","DI_LOC",
        //선택
        "DI_SUR","DI_RAD","DI_CAN","BT_WBC","BT_HB","BT_HCT","BT_OTPT","BT_GFR",
        //필수
        "PT_TNM",
        //선택항목
        "PT_DOI","PT_SIZE", "PT_NODE",	"PT_EI","PT_VI", "PT_BI","PT_LI","CHEMO", "IMM_D"],

    'D': [ 
        //필수
        "DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
        //선택
        "MAKER_INFO","H_RESOLUTION","V_RESOLUTION","V_RESOLUTION","TOTAL_SLICE_NO",
        //필수
        "IMAGE_ID", "P_GENDER", "P_AGE",
        //선택
        "P_WEIGHT","P_HEIGHT","P_RES_AREA",
        //필수
        "DI_DISEASE","DI_TIME","MAKER_INFO",
        //선택항목
       "DI_NOTE","CI_SURGERY"],

    'E': ['DISEASE_CLASS', 'INSTITUTION_ID', 'PATIENT_NO', 'IMAGE_NO', 'IMAGE_SRC', 'CAPTURE_TIME',
          'IMAGE_ID', 'P_GENDER', 'P_AGE']
};


// 질병 이름 매핑
export const diseaseNameMapping = {
    'A': '치주질환',
    'B': '골수염 (질환군)',
    'E': '골수염 (대조군)',
    'C': '구강암',
    'D': '두개안면',
};
