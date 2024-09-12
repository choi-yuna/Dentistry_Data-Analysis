export const processChartData = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error('유효하지 않은 차트 데이터입니다.', data);
        return [];
    }

    // 차트 데이터 배열 내 각 객체를 처리
    return data.map(chart => {
        // chart.rows가 배열인지, 그리고 각 row가 객체인지 확인하는 방어적 코딩
        if (!chart.rows || !Array.isArray(chart.rows)) {
            console.error(`'rows'가 유효하지 않음: ${chart.id}`, chart.rows);
            return null; // 유효하지 않은 데이터는 null로 반환하여 처리할 수 있게 함
        }

        return {
            id: chart.id,
            title: chart.title,
            labels: chart.rows.map(row => row.value || "알 수 없음"),  // 'value'가 없을 경우 기본값
            data: chart.rows.map(row => {
                const count = parseInt(row.count, 10);
                return isNaN(count) ? 0 : count;  // 'count'가 숫자가 아닐 경우 0으로 대체
            }),
        };
    }).filter(chart => chart !== null); // 유효하지 않은 데이터를 제거
};
