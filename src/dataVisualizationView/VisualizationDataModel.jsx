
const tablesData = [
    {
      subTitle: "● 기관별 환자수/비율",
      data: {
        headers: ["기관명", "환자수(명)"],
        rows: [
          ["고려대병원", "5000"],
          ["단국대병원", "2000"],
          ["보라매병원", "1000"],
          ["서울대병원", "8000"],
          ["원광대병원", "4000"]
        ],
        total: "50,0000"
      },
      onDownload: () => alert('Download 1'),
      onPrint: () => alert('Print 1'),
    },
    {
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
  