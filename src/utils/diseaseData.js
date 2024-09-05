// src/data/diseaseData.js

export const diseaseSpecificData = {
    치주질환: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자정보': {
          '흡연': '',
          '음주': '',
          '성별': '',
        },
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
            value: 'institution_selection', 
            options: [
              { display: '기관1', send: 'A' },
              { display: '기관2', send: 'B' },
              { display: '기관3', send: 'C' },
              { display: '기관4', send: 'D' }
            ] 
          },
          { label: '치료일자', value: 'treatment_date' },
          { label: '치료 장비', value: 'treatment_device' },
        ],
        '환자정보': [
          { label: '치료 기간', value: 'treatment_duration' },
          { label: '환자 나이', value: 'patient_age' },
          { label: '치료 방법', value: 'treatment_method' },
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
        '환자정보': {
          '흡연': '',
          '음주': '',
          '성별': '',
        },
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
        '환자정보': {
          '흡연': '',
          '음주': '',
          '성별': '',
        },
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
        '환자정보': {
          '흡연': '',
          '음주': '',
          '성별': '',
        },
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
          { label: '기관 선택', value: 'institution_selection' },
          { label: '촬영일자', value: 'capture_date' },
          { label: '촬영장비', value: 'capture_device' },
        ],
        '환자정보': [
          { label: '흡연', value: 'smoking' },
          { label: '음주', value: 'drinking' },
          { label: '성별', value: 'gender' },
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
  