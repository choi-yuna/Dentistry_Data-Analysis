export const processServerData = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error('데이터가 없거나 올바르지 않습니다.', data);
        return [];
    }

    // 데이터 배열 내 각 객체를 처리
    return data.map(table => ({
        id: table.id,
        title: table.title,
        headers: table.headers,
        rows: table.rows.map(row => [row.value, row.count]),  // value와 count를 행으로 변환
        total: table.rows.length.toString() // 총 row 수 계산
    }));
};
