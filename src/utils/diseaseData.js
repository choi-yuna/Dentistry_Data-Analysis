// src/data/diseaseData.js

export const diseaseSpecificData = {

    All: {
        selectedItemsTab1: {
         '기본 정보(info)': [],
          '환자정보': [],
          '질병력': [],
          '생활습관': [],
        },
        selectedItemsTab2: {
          '기본 정보': [],
            '환자 정보': [],
            '질병력(Medical History)': [],
            '생활습관(Lifestyle_Info)': [],
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
            { label: '촬영일자', 
                value: 'CAPTURE_TIME',
                options: [
                    { display: '14년', send: 14 },
                    { display: '15년', send: 15 },
                    { display: '16년', send: 16 },
                    { display: '17년', send: 17 },
                    { display: '18년', send: 18 },
                    { display: '19년', send: 19 },
                    { display: '20년', send: 20 },
                    { display: '21년', send: 12 },
                    { display: '22년', send: 22 },
                    { display: '23년', send: 23 },
                    { display: '24년', send: 24 },
                ]
            },
            { label: '촬영장비', 
              value: 'MAKER_INFO',
              options: [
                  { display: 'Carestream CS9000', send: 'Carestream CS9000' },
                  { display: 'Tusuula OP-100', send: 'Tusuula OP-100' },
                  { display: 'Ray Rayscan alpha', send: 'Ray Rayscan alpha' },
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
                { display: '40 미만', send: '0' },
                { display: '40 ~ 50', send: '1' },
                { display: '51 ~ 60', send: '2' },
                { display: '61 ~ 70', send: '3' },
                { display: '71 ~ 80', send: '4' },
                { display: '81 ~ 90', send: '5' },
                { display: '91 이상', send: '6' },
              ] },
              { label: '체중', 
                value: 'P_WEIGHT',
                options: [
                    { display: '10 미만', send: '0' },
                    { display: '10 ~ 20', send: '1' },
                    { display: '21 ~ 30', send: '2' },
                    { display: '31 ~ 40', send: '3' },
                    { display: '41 ~ 50', send: '4' },
                    { display: '51 ~ 60', send: '5' },
                    { display: '61 ~ 70', send: '6' },
                    { display: '71 ~ 80', send: '7' },
                    { display: '81 ~ 90', send: '8' },
                    { display: '91 이상', send: '9' },
                ] },
                { label: '키', 
                    value: 'P_HEIGHT',
                    options: [
                        { display: '140 미만', send: '0' },
                        { display: '141 ~ 150', send: '1' },
                        { display: '151 ~ 160', send: '2' },
                        { display: '161 ~ 170', send: '3' },
                        { display: '171 ~ 180', send: '4' },
                        { display: '181 ~ 190', send: '5' },
                        { display: '191 ~ 이상', send: '6' },
                    ] },
          ],

          '질병력': [
            { label: '당뇨', 
              value: 'MH_DIABETES' ,
              options: [
                  { display: '없음', send: '1' },
                  { display: 'HbA1c 7이상', send: '2' },
                  { display: 'HbA1c 7미만', send: '3' },
                  { display: 'HbA1c 정보 없음', send: '4' },
              ]
            },
            { label: '고혈압', 
              value: 'MH_HIGHBLOOD',
              options: [
                  { display: 'O', send: '1' },
                  { display: 'X', send: '2' },
              ] },
              { label: '골다공증', 
                value: 'MH_OSTEOPROSIS',
                options: [
                    { display: 'O', send: '1' },
                    { display: 'X', send: '2' },
                ] },
                { label: '기타', 
                    value: 'MH_NOTE',
                    options: [
                    ] },
          ],

          '생활습관': [
            { label: '흡연력', 
              value: 'LS_SMOKE' ,
              options: [
                  { display: '10개피/일 이상', send: '1' },
                  { display: '10개피/일 미만', send: '2' },
                  { display: '금연', send: '3' },
              ]
            },
            { label: '음주', 
              value: 'LS_ALCHOLE',
              options: [
                  { display: 'O', send: '1' },
                  { display: 'X', send: '2' },
              ] },
          ],

          '추가항목': [
            { label: '항목(A)', 
              value: 'LS_SMOKE' ,
              options: [
              ]
            },
            { label: '항목(B)', 
              value: 'LS_ALCHOLE',
              options: [
              ] },
          ],

        },
        categoriesTab2: {
          '기본 정보': [
            { label: '기관', value: 'INSTITUTION_ID' },
            { label: '촬영일자', value: 'CAPTURE_TIME' },
            { label: '촬영장비', value: 'MAKER_INFO' },
          ],
          '환자 정보': [
            { label: '성별', value: 'P_GENDER' },
            { label: '나이', value: 'P_AGE' },
            { label: '체중', value: 'P_WEIGHT' },
            { label: '키', value: 'P_HEIGHT' },
            { label: '주거지역', value: 'P_RES_AREA' },
          ],
          '질병력(Medical History)': [
            { label: '당뇨', value: 'MH_DIABETES' },
            { label: '고혈압', value: 'MH_HIGHBLOOD' },
            { label: '골다공증', value: 'MH_OSTEOPROSIS' },
            { label: '기타', value: 'MH_NOTE' },
          ],
          '생활습관(Lifestyle_Info)': [
            { label: '흡연력', value: 'LS_SMOKE' },
            { label: '음주', value: 'LS_ALCHOLE' },
          ],
        },
      },





    A: {
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
          { label: '기관', value: 'INSTITUTION_ID' },
          { label: '촬영일자', value: 'CAPTURE_TIME' },
          { label: '촬영장비', value: 'MAKER_INFO' },
        ],
        '환자 정보': [
          { label: '성별', value: 'P_GENDER' },
          { label: '나이', value: 'P_AGE' },
          { label: '체중', value: 'P_WEIGHT' },
          { label: '키', value: 'P_HEIGHT' },
          { label: '주거지역', value: 'P_RES_AREA' },
        ],
        '질병력': [
          { label: '당뇨', value: 'MH_DIABETES' },
          { label: '고혈압', value: 'MH_HIGHBLOOD' },
          { label: '골다공증', value: 'MH_OSTEOPROSIS' },
          { label: '기타', value: 'MH_NOTE' },
        ],
        '생활 습관': [
          { label: '흡연력', value: 'LS_SMOKE' },
          { label: '음주', value: 'LS_ALCHOLE' },
        ],
        '진단정보별 환자수': [
            { label: '치주질환여부', value: 'DIA_PERIO' },
          { label: '진단소견', value: 'DIA_NOTE' },
          { label: '결손치 개수', value: 'DIA_MISSTEETH_A' },
          { label: '치주질환이 원인이 아닌 결손치 개수', value: 'DIA_MISSTEETH_B' },
          { label: '치주염으로 인한 결손치 개수', value: 'DIA_MISSTEETH_C' },
        ],
      },
    },
  
    D: {
        selectedItemsTab1: {
          '기본 정보(info)': [],
          '환자 정보': [],
          '골수염 정보': [],
          '치료 상태': [],
        },
        selectedItemsTab2: {
          '기본 정보': [],
          '환자 정보': [],
          '진단 정보': [],
          'MRONJ': [],
          'Medical History' : [],
          'Local Factors': [],
          '추가사항': [],
        },
        categoriesTab1: {
          '기본 정보(info)': [
            { label: '기관 선택', value: 'INSTITUTION_ID' },
            { label: '수술일자', value: 'SURGERY_DATE' },
            { label: '수술 장비', value: 'SURGERY_DEVICE' },
          ],
          '환자정보': [
            { label: '수술 기간', value: 'SURGERY_DURATION' },
            { label: '환자 상태', value: 'PATIENT_CONDITION' },
            { label: '치료 방법', value: 'TREATMENT_METHOD' },
          ],
        },
        categoriesTab2: {
          '기본 정보': [
            { label: '기관', value: 'INSTITUTION_ID' },
            { label: '촬영일자', value: 'CAPTURE_TIME' },
            { label: '촬영장비', value: 'MAKER_INFO' },
          ],
          '환자 정보': [
            { label: '성별', value: 'P_GENDER' },
            { label: '나이', value: 'P_AGE' },
            { label: '체중', value: 'P_WEIGHT' },
            { label: '키', value: 'P_HEIGHT' },
            { label: '주거지역', value: 'P_RES_AREA' },
          ],
          '전신질환 유무': [
            { label: '흡연', value: 'DH_SMOKE' },
            { label: '음주', value: 'DH_ALCHO' },
            { label: '당뇨', value: 'DH_DIAB' },
          ],
          '진단정보별 환자수': [
            { label: '진단명', value: 'DI_NAME' },
            { label: '병소부위', value: 'DI_LOC' },
            { label: '수술명', value: 'DI_SUR' },
            { label: '방사선 치료 유무', value: 'DI_RAD' },
            { label: '항암치료 유무', value: 'DI_CAN' },
          ],
        },      
      },


    B: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자 정보': [],
        '골수염 정보': [],
        '치료 상태': [],
      },
      selectedItemsTab2: {
        '기본 정보': [],
        '환자 정보': [],
        '진단 정보': [],
        'MRONJ': [],
        'Medical History' : [],
        'Local Factors': [],
        '추가사항': [],
      },
      categoriesTab1: {
        '기본 정보(info)': [
          { label: '기관 선택', value: 'INSTITUTION_ID' },
          { label: '수술일자', value: 'SURGERY_DATE' },
          { label: '수술 장비', value: 'SURGERY_DEVICE' },
        ],
        '환자정보': [
          { label: '수술 기간', value: 'SURGERY_DURATION' },
          { label: '환자 상태', value: 'PATIENT_CONDITION' },
          { label: '치료 방법', value: 'TREATMENT_METHOD' },
        ],
      },
      categoriesTab2: {
        '기본 정보': [
          { label: '기관', value: 'INSTITUTION_ID' },
          { label: '촬영일자', value: 'CAPTURE_TIME' },
          { label: '촬영장비', value: 'MAKER_INFO' },
        ],
        '환자 정보': [
          { label: '성별', value: 'P_GENDER' },
          { label: '나이', value: 'P_AGE' },
          { label: '체중', value: 'P_WEIGHT' },
          { label: '키', value: 'P_HEIGHT' },
          { label: '주거지역', value: 'P_RES_AREA' },
        ],
        '진단 정보': [
          { label: '발생 부위', value: 'DIS_LOC' },
          { label: '골수염 종류', value: 'DIS_CLASS' },
        ],
        'MRONJ': [
          { label: 'Stage', value: 'MR_STAGE' },
          { label: '약물복용방법', value: 'MR_HOWTOTAKE' },
          { label: '약물복용기간', value: 'MR_HOWLONG' },
        ],
        'Medical History': [
          { label: 'Hypertension', value: 'HTN' },
          { label: 'Hyperlipidemia', value: 'HLD' },
          { label: 'Diabetes mellitus', value: 'DIA' },
          { label: 'Taking anticoagulants', value: 'TAC' },
          { label: 'Heart disease', value: 'HD' },
          { label: 'Thyroid disease', value: 'TD' },
          { label: 'Liver disease', value: 'LD' },
          { label: 'Kidney disease', value: 'KD' },
          { label: 'Rheumatoid arthritis', value: 'RA' },
          { label: 'Cancer', value: 'CANCER' },
          { label: 'Dementia', value: 'DEM' },
          { label: 'Smoking', value: 'SMOK' },
          { label: 'Steroids', value: 'STER' },
          { label: 'Chemotherapy', value: 'CHEMO' },
          { label: '그 이외의 면역관련질환', value: 'IMM_D' },
        ],
        'Local Factors': [
          { label: 'Extraction', value: 'EXTRACTION' },
          { label: 'Trauma', value: 'TRAUMA' },
          { label: 'Implant', value: 'IMPLANT' },
          { label: 'Bone surgery', value: 'BONE_SUR' },
          { label: 'Dental origin infection', value: 'ORIGIN_INF' },
          { label: 'Vascular insufficiency', value: 'VAS_INSUF' },
          { label: '기타소견', value: 'LF_NOTE' },
        ],
        '추가사항': [
          { label: '처음 처치법', value: 'FIRST_TREAT' },
          { label: 'Recurrence', value: 'RECUR' },
        ],
      },      
    },

    C: {
        selectedItemsTab1: {
          '기본 정보(info)': [],
          '환자 정보': [],
          '골수염 정보': [],
          '치료 상태': [],
        },
        selectedItemsTab2: {
          '기본 정보': [],
          '환자 정보': [],
          '진단 정보': [],
          'MRONJ': [],
          'Medical History' : [],
          'Local Factors': [],
          '추가사항': [],
        },
        categoriesTab1: {
          '기본 정보(info)': [
            { label: '기관 선택', value: 'INSTITUTION_ID' },
            { label: '수술일자', value: 'SURGERY_DATE' },
            { label: '수술 장비', value: 'SURGERY_DEVICE' },
          ],
          '환자정보': [
            { label: '수술 기간', value: 'SURGERY_DURATION' },
            { label: '환자 상태', value: 'PATIENT_CONDITION' },
            { label: '치료 방법', value: 'TREATMENT_METHOD' },
          ],
        },
        categoriesTab2: {
          '기본 정보': [
            { label: '기관', value: 'INSTITUTION_ID' },
            { label: '촬영종류', value: 'IMAGE_SRC' },
            { label: '촬영일자', value: 'CAPTURE_TIME' },
            { label: '촬영장비', value: 'MAKER_INFO' },
          ],
          '환자 정보': [
            { label: '성별', value: 'P_GENDER' },
            { label: '나이', value: 'P_AGE' },
            { label: '체중', value: 'P_WEIGHT' },
            { label: '키', value: 'P_HEIGHT' },
            { label: '주거지역', value: 'P_RES_AREA' },
          ],
          '진단정보별 환자수': [
            { label: '데이터 획득시기', value: 'DI_NAME' },
            { label: '세부진단', value: 'DI_LOC' },
          ],
        },      
      },
  };
  