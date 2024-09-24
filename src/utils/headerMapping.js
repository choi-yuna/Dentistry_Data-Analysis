export const headerMapping = {
    "DISEASE_CLASS": "질병 분류",
    "INSTITUTION_ID": "기관 ID",
    "PATIENT_NO": "환자 번호",
    "IMAGE_NO": "이미지 번호",
    "IMAGE_SRC": "이미지 경로",
    "CAPTURE_TIME": "촬영 시간",
    "IMAGE_ID": "이미지 ID",
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
    'A': ["DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME", "IMAGE_ID",
                "P_GENDER", "P_AGE", "DIA_PERIO",
                "Tooth_11", "Tooth_12", "Tooth_13", "Tooth_14", "Tooth_15", "Tooth_16", "Tooth_17", "Tooth_18",
                "Tooth_21", "Tooth_22", "Tooth_23", "Tooth_24", "Tooth_25", "Tooth_26", "Tooth_27", "Tooth_28",
                "Tooth_31", "Tooth_32", "Tooth_33", "Tooth_34", "Tooth_35", "Tooth_36", "Tooth_37", "Tooth_38",
                "Tooth_41", "Tooth_42", "Tooth_43", "Tooth_44", "Tooth_45", "Tooth_46", "Tooth_47", "Tooth_48"],

    'B': ['DISEASE_CLASS', 'INSTITUTION_ID', 'PATIENT_NO', 'IMAGE_NO', 'IMAGE_SRC', 'CAPTURE_TIME',
          'IMAGE_ID', 'P_GENDER', 'P_AGE',
          'DIS_LOC', 'DIS_CLASS', 'EXTRACTION', 'TRAUMA', 'IMPLANT', 'BONE_SUR', 'ORIGIN_INF', 'FIRST_TREAT',
          'RECUR', 'OST_NUM'],

    'C': ["DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
                "IMAGE_ID", "P_GENDER", "P_AGE","DI_NAME","DI_LOC","PT_TNM","CAN_NUM","LYM_NUM"],

    'D': ["DISEASE_CLASS", "INSTITUTION_ID", "PATIENT_NO", "IMAGE_NO", "IMAGE_SRC", "CAPTURE_TIME",
                "IMAGE_ID", "P_GENDER", "P_AGE","DI_DISEASE","DI_TIME","DI_DETAIL"]
};

// 질병 이름 매핑
export const diseaseNameMapping = {
    'A': '치주질환',
    'B': '골수염',
    'C': '구강암',
    'D': '두개안면'
};
