// src/data/diseaseData.js

export const diseaseSpecificData = {
    치주질환: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자 정보': [],
        '치주질환 정보': [],
        '치료 단계': [],
      },
      selectedItemsTab2: {
        '기본 정보': [],
        '환자 정보': [],
        '치주질환 데이터': [],
        '치료 상태': [],
      },
      categoriesTab1: {
        '기본 정보(info)': [
          { 
            label: '기관 선택', 
            value: 'INSTITUTION_ID', 
            options: [
              { display: '원광대학교', send: '1' },
              { display: '고려대학교', send: '2' },
              { display: '서울대학교', send: '3' },
              { display: '국립암센터', send: '4' },
              { display: '단국대학교', send: '5' },
              { display: '조선대학교', send: '6' },
              { display: '보라매병원', send: '7' },
            ] 
          },

          { label: '촬영장비', 
            value: 'MAKER_INFO',
            options: [
                { display: 'Carestream CS9000', send: 'Carestream CS9000' },
            ]
        },
        ],
        '환자정보': [
          { label: '성별', 
            value: 'P_GENDER' ,
            options: [
                { display: '남', send: '1' },
                { display: '여', send: '2' },
            ]
          },
          { label: '나이', 
            value: 'P_AGE',
            options: [
                { display: '10 - 20', send: '1' },
                { display: '20 - 30', send: '2' },
            ] },
        ],
      },
      categoriesTab2: {
        '기본 정보': [
          { label: '기관', value: 'institution' },
          { label: '촬영일자', value: 'capture_date' },
          { label: '촬영장비', value: 'capture_device' },
        ],
        '환자 정보': [
          { label: '성별', value: 'gender' },
          { label: '나이', value: 'age' },
          { label: '치료 상태', value: 'treatment_status' },
        ],
        '치주질환 데이터': [
          { label: '치주질환 단계', value: 'periodontal_stage' },
          { label: '포켓 깊이', value: 'pocket_depth' },
        ],
      },
    },
  
    구강암: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자 정보': [],
        '암 정보': [],
        '치료 상태': [],
      },
      selectedItemsTab2: {
        '기본 정보': [],
        '환자 정보': [],
        '암 데이터': [],
        '치료 상태': [],
      },
      categoriesTab1: {
        '기본 정보(info)': [
          { label: '기관 선택', value: 'institution_selection' },
          { label: '진단일자', value: 'diagnosis_date' },
          { label: '치료 장비', value: 'treatment_device' },
        ],
        '환자정보': [
          { label: '환자 나이', value: 'patient_age' },
          { label: '암 단계', value: 'cancer_stage' },
          { label: '치료 방법', value: 'treatment_method' },
        ],
      },
      categoriesTab2: {
        '기본 정보': [
          { label: '기관', value: 'institution' },
          { label: '촬영일자', value: 'capture_date' },
          { label: '촬영장비', value: 'capture_device' },
        ],
        '암 데이터': [
          { label: '암 크기', value: 'tumor_size' },
          { label: '전이 여부', value: 'metastasis' },
        ],
        '치료 상태': [
          { label: '치료 진행 단계', value: 'treatment_progress' },
          { label: '회복 상태', value: 'recovery_status' },
        ],
      },
    },
  
    악골골수염: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자 정보': [],
        '골수염 정보': [],
        '치료 상태': [],
      },
      selectedItemsTab2: {
        '기본 정보': [],
        '환자 정보': [],
        '골수염 데이터': [],
        '치료 상태': [],
      },
      categoriesTab1: {
        '기본 정보(info)': [
          { label: '기관 선택', value: 'institution_selection' },
          { label: '수술일자', value: 'surgery_date' },
          { label: '수술 장비', value: 'surgery_device' },
        ],
        '환자정보': [
          { label: '수술 기간', value: 'surgery_duration' },
          { label: '환자 상태', value: 'patient_condition' },
          { label: '치료 방법', value: 'treatment_method' },
        ],
      },
      categoriesTab2: {
        '기본 정보': [
          { label: '기관', value: 'institution' },
          { label: '촬영일자', value: 'capture_date' },
          { label: '촬영장비', value: 'capture_device' },
        ],
        '골수염 데이터': [
          { label: '골수염 크기', value: 'osteomyelitis_size' },
          { label: '염증 상태', value: 'inflammation_status' },
        ],
        '치료 상태': [
          { label: '치료 진행 상태', value: 'treatment_progress' },
          { label: '회복 여부', value: 'recovery_status' },
        ],
      },
    },
  
    default: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자 정보': [],
        '진단정보별 환자 수': [],
        '환자 수': [],
        '추가 정보1': [],
        '추가 정보2': [],
      },
      selectedItemsTab2: {
        '기본 정보': [],
        '환자 정보': [],
        '질병력': [],
        '진단정보별 환자 수': [],
        '환자 수': [],
        '추가 정보1': [],
        '추가 정보2': [],
      },
      categoriesTab1: {
        '기본 정보(info)': [
          { 
            label: '기관 선택', 
            value: 'INSTITUTION_ID', 
            options: [
              { display: '원광대학교', send: '1' },
              { display: '고려대학교', send: '2' },
              { display: '서울대학교', send: '3' },
              { display: '국립암센터', send: '4' },
              { display: '단국대학교', send: '5' },
              { display: '조선대학교', send: '6' },
              { display: '보라매병원', send: '7' },
            ] 
          },

          { label: '촬영장비', 
            value: 'MAKER_INFO',
            options: [
                { display: 'Carestream CS9000', send: 'Carestream CS9000' },
            ]
        },
        ],
        '환자정보': [
          { label: '성별', 
            value: 'P_GENDER' ,
            options: [
                { display: '남', send: '1' },
                { display: '여', send: '2' },
            ]
          },
          { label: '나이', 
            value: 'P_AGE',
            options: [
                { display: '10 - 20', send: '1' },
                { display: '20 - 30', send: '2' },
            ] },
        ],
      },
      categoriesTab2: {
        '기본 정보': [
          { label: '기관', value: 'institution' },
          { label: '촬영일자', value: 'capture_date' },
          { label: '촬영장비', value: 'capture_device' },
        ],
        '질병력': [
          { label: '당뇨', value: 'diabetes' },
          { label: '고혈압', value: 'hypertension' },
          { label: '골다공증', value: 'osteoporosis' },
        ],
      },
    },
  };
  