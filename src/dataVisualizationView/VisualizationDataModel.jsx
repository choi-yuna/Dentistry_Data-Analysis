const tablesData = [
    {
      title: "리포트 결과 1",
      subTitle: "● 기관별 환자수/비율",
      data: {
        headers: ["기관명", "환자수(명)"],
        rows: [
          ["고려대병원", ""],
          ["단국대병원", ""],
          ["보라매병원", ""],
          ["서울대병원", ""],
          ["원광대병원", ""]
        ],
        total: "50,0000"
      },
      onDownload: () => alert('Download 1'),
      onPrint: () => alert('Print 1'),
    },
    {
      title: "리포트 결과 2",
      subTitle: "● 성별 환자수/비율",
      data: {
        headers: ["성별", "환자수(명)"],
        rows: [
          ["남", "1000"],
          ["여", "2000"]
        ],
        total: "50000"
      },
      onDownload: () => alert('Download 2'),
      onPrint: () => alert('Print 2'),
    }
  ];
  
  export default tablesData;
  