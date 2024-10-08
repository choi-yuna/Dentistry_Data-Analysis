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
          { label: '촬영 종류', 
            value: 'IMAGE_SRC',
            options: [
                { display: '파노라마', send: '1' },
                { display: 'CBCT', send: '2' },
                { display: 'MDCT', send: '3' },
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
          { label: '체중', 
            value: 'P_WEIGHT',
            options: [
              { display: '40 미만', send: '0' },
              { display: '40 ~ 50', send: '1' },
              { display: '51 ~ 60', send: '2' },
              { display: '61 ~ 70', send: '3' },
              { display: '71 ~ 80', send: '4' },
              { display: '81 ~ 90', send: '5' },
              { display: '91 이상', send: '6' },
            ] },
            { label: '나이', 
              value: 'P_AGE',
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
          { label: '촬영종류', value: 'IMAGE_SRC' },
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




  //A - 치주질환
  A: {
    selectedItemsTab1: {
      '기본 정보(info)': [],
      '환자 정보': [],

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
        { label: '촬영 종류', 
          value: 'IMAGE_SRC',
          options: [
              { display: '파노라마', send: '1' },
              { display: 'CBCT', send: '2' },
              { display: 'MDCT', send: '3' },
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
        { label: '체중', 
          value: 'P_WEIGHT',
          options: [
            { display: '40 미만', send: '0' },
            { display: '40 ~ 50', send: '1' },
            { display: '51 ~ 60', send: '2' },
            { display: '61 ~ 70', send: '3' },
            { display: '71 ~ 80', send: '4' },
            { display: '81 ~ 90', send: '5' },
            { display: '91 이상', send: '6' },
          ] },
          { label: '나이', 
            value: 'P_AGE',
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
    },
    categoriesTab2: {
      '기본 정보': [
        { label: '기관', value: 'INSTITUTION_ID' },
        { label: '촬영일자', value: 'CAPTURE_TIME' },
        { label: '촬영장비', value: 'MAKER_INFO' },
        { label: '촬영종류', value: 'IMAGE_SRC' },
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
      'Annotation_Data (치아상태)': [
          { label: '치아상태', value: 'Tooth' },
      ],
    },
  },



//B - 악골 골수염
  B: {
    selectedItemsTab1: {
      '기본 정보(info)': [],
      '환자 정보': [],
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

        { label: '촬영 종류', 
          value: 'IMAGE_SRC',
          options: [
              { display: '파노라마', send: '1' },
              { display: 'CBCT', send: '2' },
              { display: 'MDCT', send: '3' },
          ]
      },

      { 
        label: '촬영일자',  
        value: 'CAPTURE_TIME',
        options: [
          { display: '14년', send: 14 },
          { display: '15년', send: 15 },
          { display: '16년', send: 16 },
          { display: '17년', send: 17 },
          { display: '18년', send: 18 },
          { display: '19년', send: 19 },
          { display: '20년', send: 20 },
          { display: '21년', send: 21 },
          { display: '22년', send: 22 },
          { display: '23년', send: 23 },
        ]
      },

      ],
      '환자정보': [
        { 
      label: '성별', 
      value: 'P_GENDER',
      options: [
        { display: '남', send: '1' },
        { display: '여', send: '2' },
      ]
    },
    { label: '체중', 
      value: 'P_WEIGHT',
      options: [
        { display: '40 미만', send: '0' },
        { display: '40 ~ 50', send: '1' },
        { display: '51 ~ 60', send: '2' },
        { display: '61 ~ 70', send: '3' },
        { display: '71 ~ 80', send: '4' },
        { display: '81 ~ 90', send: '5' },
        { display: '91 이상', send: '6' },
      ] },
      { label: '나이', 
        value: 'P_AGE',
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
    { 
      label: '주거지역',  
      value: 'P_RES_AREA',
      options: [
        { display: '서울', send: '1' },
        { display: '경기', send: '2' },
        { display: '충청', send: '3' },
        { display: '전라', send: '4' },
        { display: '경상', send: '5' },
        { display: '강원', send: '6' },
        { display: '제주', send: '7' },
      ]
    }
      ],
    },
    categoriesTab2: {
      '기본 정보': [
        { label: '기관', value: 'INSTITUTION_ID' },
        { label: '촬영일자', value: 'CAPTURE_TIME' },
        { label: '촬영 종류', value: 'IMAGE_SRC' },
        //TODO: -환자별, 사진 일련번호 포함?

      ],
      '환자 정보': [
        { label: '성별', value: 'P_GENDER' },
        { label: '나이', value: 'P_AGE' },
      ],
      '진단 정보': [
        { label: '발생 부위', value: 'DIS_LOC' },
        { label: '골수염 종류', value: 'DIS_CLASS' },
      ],
      'Annotation(골수염)' : [
        {label: '골수염 개수', value:'OST_NUM'}
      ],
      'MRONJ': [
        { label: 'Stage', value: 'MR_STAGE' },
        { label: '약물복용방법', value: 'MR_HOWTOTAKE' },
        { label: '약물복용기간', value: 'MR_HOWLONG' },
      ],
        
      'Local Factors': [
        { label: 'Extraction', value: 'EXTRACTION' },
        { label: 'Trauma', value: 'TRAUMA' },
        { label: 'Implant', value: 'IMPLANT' },
        { label: 'Bone surgery', value: 'BONE_SUR' },
        { label: 'Dental origin infection', value: 'ORIGIN_INF' },
      ],
      '추가사항': [
        { label: '처음 처치법', value: 'FIRST_TREAT' },
        { label: 'Recurrence', value: 'RECUR' },
      ],
    },      
  },

  //D - 두개안면
  D: {
    selectedItemsTab1: {
      '기본 정보(info)': [],
      '환자 정보': [],
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

        { 
          label: '촬영 종류',  
          value: 'IMAGE_SRC',
          options: [
            { display: '파노라마', send: '1' },
            { display: 'CBCT', send: '2' },
            { display: 'MDCT', send: '3' },
          ]
        },

        { label: '촬영 종류', 
          value: 'IMAGE_SRC',
          options: [
              { display: '파노라마', send: '1' },
              { display: 'CBCT', send: '2' },
              { display: 'MDCT', send: '3' },
          ]
      },
      { 
        label: '촬영일자',  
        value: 'CAPTURE_TIME',
        options: [
          { display: '14년', send: 14 },
          { display: '15년', send: 15 },
          { display: '16년', send: 16 },
          { display: '17년', send: 17 },
          { display: '18년', send: 18 },
          { display: '19년', send: 19 },
          { display: '20년', send: 20 },
          { display: '21년', send: 21 },
          { display: '22년', send: 22 },
          { display: '23년', send: 23 },
        ]
      },
      ],
      '환자정보': [
        { 
          label: '성별', 
          value: 'P_GENDER',
          options: [
            { display: '남', send: '1' },
            { display: '여', send: '2' },
          ]
        },
        { label: '체중', 
          value: 'P_WEIGHT',
          options: [
            { display: '40 미만', send: '0' },
            { display: '40 ~ 50', send: '1' },
            { display: '51 ~ 60', send: '2' },
            { display: '61 ~ 70', send: '3' },
            { display: '71 ~ 80', send: '4' },
            { display: '81 ~ 90', send: '5' },
            { display: '91 이상', send: '6' },
          ] },
          { label: '나이', 
            value: 'P_AGE',
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
        { 
          label: '주거지역',  
          value: 'P_RES_AREA',
          options: [
            { display: '서울', send: '1' },
            { display: '경기', send: '2' },
            { display: '충청', send: '3' },
            { display: '전라', send: '4' },
            { display: '경상', send: '5' },
            { display: '강원', send: '6' },
            { display: '제주', send: '7' },
          ]
        }
      ],
    },
    categoriesTab2: {
      '기본 정보': [
        { label: '기관', value: 'INSTITUTION_ID' },
        { label: '촬영일자', value: 'CAPTURE_TIME' },
        { label: '촬영 종류', value: 'IMAGE_SRC' },
        //TODO: -환자별, 사진 일련번호 포함?
      ],
      '환자 정보': [
        { label: '성별', value: 'P_GENDER' },
        { label: '나이', value: 'P_AGE' },
      ],
      '전신질환 유무': [
        { label: '두개안면 기형 여부', value: 'DI_DISEASE' },
        { label: '데이터 획득시기', value: 'DI_TIME' },
        { label: '세부진단', value: 'DI_DETAIL' },
      ],
    },      
  },
  //C : 구강암
  C: {
      selectedItemsTab1: {
        '기본 정보(info)': [],
        '환자 정보': [],
        '전신질환 유무' : [],
      },
      selectedItemsTab2: {
        '기본 정보': [],
        '환자 정보': [],
        '진단정보별 환자수': [],
        '병리 검사': [],
          
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

          { 
            label: '촬영 종류',  
            value: 'IMAGE_SRC',
            options: [
              { display: '파노라마', send: '1' },
              { display: 'CBCT', send: '2' },
              { display: 'MDCT', send: '3' },
            ]
          },

          { label: '촬영 종류', 
            value: 'IMAGE_SRC',
            options: [
                { display: '파노라마', send: '1' },
                { display: 'CBCT', send: '2' },
                { display: 'MDCT', send: '3' },
            ]
        },

        { 
          label: '촬영일자',  
          value: 'CAPTURE_TIME',
          options: [
            { display: '14년', send: 14 },
            { display: '15년', send: 15 },
            { display: '16년', send: 16 },
            { display: '17년', send: 17 },
            { display: '18년', send: 18 },
            { display: '19년', send: 19 },
            { display: '20년', send: 20 },
            { display: '21년', send: 21 },
            { display: '22년', send: 22 },
            { display: '23년', send: 23 },
          ]
        },
        ],
        '환자정보': [
          { 
            label: '성별', 
            value: 'P_GENDER',
            options: [
              { display: '남', send: '1' },
              { display: '여', send: '2' },
            ]
          },
          { 
            label: '나이',  
            value: 'P_AGE',
            options: [
              { display: '10 - 20', send: '1' },
              { display: '21 - 30', send: '2' },
              { display: '31 - 40', send: '3' },
              { display: '41 - 50', send: '4' },
              { display: '51 - 60', send: '5' },
              { display: '61 - 70', send: '6' },
              { display: '71 - 80', send: '7' },
              { display: '81 이상', send: '8' },
            ]
          },
          { 
            label: '체중', 
            value: 'P_WEIGHT',
            options: [
              { display: '40 이하', send: '1' },
              { display: '41 - 50', send: '2' },
              { display: '51 - 60', send: '3' },
              { display: '61 - 70', send: '4' },
              { display: '71 - 80', send: '5' },
              { display: '81 이상', send: '6' },
            ]
          },
          { 
            label: '키', 
            value: 'P_HEIGHT',
            options: [
              { display: '150 이하', send: '1' },
              { display: '151 - 160', send: '2' },
              { display: '161 - 170', send: '3' },
              { display: '171 - 180', send: '4' },
              { display: '181 - 190', send: '5' },
              { display: '191 이상', send: '6' },
            ]
          },
          { 
            label: '주거지역',  
            value: 'P_RES_AREA',
            options: [
              { display: '서울', send: '1' },
              { display: '경기', send: '2' },
              { display: '충청', send: '3' },
              { display: '전라', send: '4' },
              { display: '경상', send: '5' },
              { display: '강원', send: '6' },
              { display: '제주', send: '7' },
            ]
          }
        ],
        '전신질환 유무': [  
        { 
          label: '흡연력', 
          value: 'LS_SMOKE' ,
          options: [
              { display: '10개피/일 이상', send: '1' },
              { display: '10개피/일 미만', send: '2' },
              { display: '금연', send: '3' },
          ]
        },
        { 
          label: '음주', 
          value: 'LS_ALCHOLE', 
          options: [
            { display: '유', send: '1' },
            { display: '무', send: '2' },
          ]
        },
        { 
          label: '당뇨', 
          value: 'MH_DIABETES', 
          options: [
            { display: '유', send: '1' },
            { display: '무', send: '2' },
          ]
        },
        { 
          label: '심혈관 질환', 
          value: 'CARDIOVASCULAR_DISEASE', 
          options: [
            { display: '유', send: '1' },
            { display: '무', send: '2' },
          ]
        },
      ],
      },
      categoriesTab2: {
        '기본 정보': [
          { label: '기관', value: 'INSTITUTION_ID' },
          { label: '촬영종류', value: 'IMAGE_SRC' },
          { label: '촬영일자', value: 'CAPTURE_TIME' },
        ],
        '환자 정보': [
          { label: '성별', value: 'P_GENDER' },
          { label: '나이', value: 'P_AGE' },

        ],
        'Annotation(구강암, 임파절 전이)' : [
          {label: '구강암 개수', value:'CAN_NUM'},
          {label: '임파절 전이 개수', value:'LYM_NUM'},
        ],
        '진단정보별 환자수': [
          { label: '진단명', value: 'DI_NAME' },
          { label: '병소 부위', value: 'DI_LOC' },
        ],
        '병리 검사' : [
          { label: 'TNM stage', value: 'PT_TNM' },
        ],
      },      
    },
};
