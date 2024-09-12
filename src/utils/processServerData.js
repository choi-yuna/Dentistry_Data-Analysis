export const processServerData = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error('데이터가 없거나 올바르지 않습니다.', data);
        return [];
    }

    return data.map(table => {
        const rows = table.rows.map(row => [row.value, row.count]);  
        const totalCount = table.rows.reduce((sum, row) => sum + row.count, 0);  
        
        return {
            id: table.id,
            title: table.title,
            headers: table.headers,
            rows: rows,
            total: totalCount.toString() 
        };
    });
};
