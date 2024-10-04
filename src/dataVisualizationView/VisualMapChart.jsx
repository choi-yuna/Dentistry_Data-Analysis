import React, { useState, useEffect } from 'react';
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";

const VisualMapChart = ({ chart }) => {
  const [mapData, setMapData] = useState([]);
  console.log(chart);

  useEffect(() => {
    if (chart && chart.labels && chart.data) {
      // chart.labels와 chart.data를 mapData 형식으로 변환
      const mappedData = chart.labels.map((label, index) => ({
        locale: label,
        count: chart.data[index],
      }));
      setMapData(mappedData);
    }
  }, [chart]);

  // 색상을 설정하는 함수
  const setColorByCount = (count) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#79D3C4";
    if (count > 3000) return "#43cdb6";
    if (count > 1000) return "#61CDBB";
    if (count > 200) return "#91D9CD";
    if (count > 100) return "#A9DFD6";
    if (count > 50) return "#C1E5DF";
    if (count > 5) return "#D9EBE8";
    else return "#ebfffd";
  };

  // 범례 데이터
  const legendItems = [
    { color: "#79D3C4", label: "> 5000명" },
    { color: "#43cdb6", label: "3000 - 5000명" },
    { color: "#61CDBB", label: "1000 - 3000명" },
    { color: "#91D9CD", label: "200 - 1000명" },
    { color: "#A9DFD6", label: "100 - 200명" },
    { color: "#C1E5DF", label: "50 - 100명" },
    { color: "#D9EBE8", label: "5 - 50명" },
    { color: "#F1F1F1", label: "0명" },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '70%'}}>
      {/* 차트 */}
      <div style={{ width: '30%', height: '430%', margin: '-250px 50px'}}>
        {mapData.length > 0 ? (
          <SimpleSouthKoreaMapChart
            setColorByCount={setColorByCount}
            data={mapData}
            unit="명"
          />
        ) : (
          <div>데이터를 불러오는 중입니다...</div>
        )}
      </div>

      {/* 범례 */}
      <div style={{ marginLeft: '10px' }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {legendItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', fontSize: '12px' }}> {/* Flex 레이아웃 추가 */}
              <span
                style={{
                  display: 'inline-block',
                  width: '15px',
                  height: '10px',
                  backgroundColor: item.color,
                  marginRight: '10px',
                  borderRadius: '4px',
                }}
              ></span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VisualMapChart;
