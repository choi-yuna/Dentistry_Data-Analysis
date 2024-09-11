export const processFetchedDataForTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        headers: [],
        rows: [],
        total: 0,
      };
    }
  
    const headers = Object.keys(data[0]);
    const rows = data.map((item) => Object.values(item));
    const total = rows.length;
  
    return {
      headers,
      rows,
      total,
    };
  };
  
  export const processFetchedDataForChart = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        rows: [],
        subTitle: '유효한 데이터가 없습니다',
      };
    }
  
    const chartRows = [];
    const fieldToGroupBy = 'MH_OSTEOPROSIS';
  
    const groupedData = data.reduce((acc, item) => {
      const fieldValue = item[fieldToGroupBy] || 'N/A';
      acc[fieldValue] = (acc[fieldValue] || 0) + 1;
      return acc;
    }, {});
  
    Object.keys(groupedData).forEach((key) => {
      chartRows.push([key, groupedData[key]]);
    });
  
    return {
      rows: chartRows,
      subTitle: `${fieldToGroupBy}에 따른 데이터 분포`,
    };
  };
  