import React, { useState } from 'react';
import styled from 'styled-components';
import { useDiseaseData } from '../context/DiseaseDataContext';

const TopSection = () => {
  const [activeTab, setActiveTab] = useState('질환별 보기');
  const { data, loading, error } = useDiseaseData();
  const [expandedRow, setExpandedRow] = useState({});

  const toggleRow = (key) => {
    setExpandedRow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  console.log('TopSection에서 받은 Context 데이터:', { data, loading, error });

  if (loading) return <LoadingContainer>로딩 중...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;

  // 중첩된 data 처리
  const nestedData = data?.data || {};
  const sections = activeTab === '질환별 보기' ? nestedData['질환별'] || [] : nestedData['기관별'] || [];

  if (sections.length === 0) {
    return <ErrorContainer>데이터가 없습니다.</ErrorContainer>;
  }

  return (
    <TopSectionContainer>
      <TopCtn>
        <TabsContainer>
          <TabButton active={activeTab === '질환별 보기'} onClick={() => setActiveTab('질환별 보기')}>
            질환별 보기
          </TabButton>
          <TabButton active={activeTab === '기관별 보기'} onClick={() => setActiveTab('기관별 보기')}>
            기관별 보기
          </TabButton>
        </TabsContainer>
        <HeaderRow>
          <HeaderCell>데이터 가공처</HeaderCell>
          <HeaderCell>목표 건수</HeaderCell>
          <GroupedHeader style={{ flex: 5 }}>
            <Column>
              <GroupedHeaderTitle>서버 업로드 (라벨링 및 1차검수)</GroupedHeaderTitle>
              <HeaderRowUnder>
                <HeaderCell style={{ flex: 1.8, position: 'relative', height: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '12px' }}>
                    <div>
                      업로드 등록 건수 &nbsp;&nbsp;/&nbsp;&nbsp; 구축율 (%)
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#525252',
                      textAlign: 'center',
                      marginTop: 6,
                    }}
                  >
                    (영상/json 기준)
                  </div>
                </HeaderCell>
                <HeaderCell style={{ flex: 1.6, position: 'relative', height: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '12px' }}>
                    <div>
                      업로드 Pass 건수 &nbsp;&nbsp;/&nbsp;&nbsp; 구축율 (%)
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#525252',
                      textAlign: 'center',
                      marginTop: 6,
                    }}
                  >
                    (영상/CRF/라벨링/메타 데이터 모두 포함 여부)
                  </div>
                </HeaderCell>
              </HeaderRowUnder>
            </Column>
          </GroupedHeader>
          <GroupedHeader style={{ width: '30px', height: '65px' }}>
            <HeaderCell>2차 검수</HeaderCell>
            <HeaderCell>최종 구축율 (%)</HeaderCell>
          </GroupedHeader>
        </HeaderRow>
      </TopCtn>

      {/* 데이터 섹션 */}
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          totalData={section.totalData}
          subData={section.subData}
          controlData={section.controlData}
          type={activeTab === '질환별 보기' ? '질환별' : '기관별'}
          expandedRow={expandedRow}
          toggleRow={toggleRow}
        />
      ))}
    </TopSectionContainer>
  );
};

const Section = ({ title, totalData, subData, controlData, type, expandedRow, toggleRow }) => {

  const [expanded, setExpanded] = useState(false);
  const shouldShowButton = (row) =>
    (type === '질환별' && title === '골수염' && row[0] === '단국대학교') ||
    (type === '기관별' && title === '단국대학교' && row[0] === '골수염');

  const isAll = title === '질환 ALL' || title === '기관 ALL';


  const formatNumber = (value, addPercent = false) => {
    const number = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(number)) return value;
    return addPercent ? `${number.toLocaleString('ko-KR')} %` : `${number.toLocaleString('ko-KR')} 건`;
  };


  const getStylesByRate = (rate, cellIndex, indicesToStyle, includeBackground = true) => {
    const isTargetIndex = indicesToStyle.includes(cellIndex);
    if (!isTargetIndex) {
      return {};
    }

    if (rate >= 100) {
      return includeBackground
        ? { color: '#018a13', backgroundColor: '#e0ffed' }
        : { color: '#018a13' };
    }
    if (rate >= 50) {
      return includeBackground
        ? { color: '#1f00cc', backgroundColor: '#ede4ff' }
        : { color: '#1f00cc' };
    }
    return includeBackground
      ? { color: '#fc0505', backgroundColor: '#ffe6e6' }
      : { color: '#fc0505' };
  };

  const isHighlightedCell = (cellIndex, type) => {
    if (type === 'header') {
      return [3, 4].includes(cellIndex); // 헤더에
    }
    if (type === 'sub') {
      return [4, 5].includes(cellIndex); // 서브 데이터
    }
    return false;
  };

  const getHighlightStyle = (isHighlighted) => {
    if (isHighlighted) {
      return {
        boxShadow: '0 0 8px #a8c6fa',
        border: '0.5px solid rgba(184, 234, 247, 0.363)',
        borderRadius: '15px',

      };
    }
    return null;
  };


  return (
    <SectionContainer>
      {/* Title Row */}
      <TitleRow isAll={isAll} onClick={() => setExpanded(!expanded)}>
        <MergedCell isAll={isAll}>
          {title} {expanded ? '▲' : '▼'}
        </MergedCell>
        <ContentContainer isAll={isAll}>
          <ContentCell style={{ fontWeight: 'bold' }}>합계</ContentCell>
          {totalData.map((item, index) => {
            const includeBackground = index !== 2;
            const styles = {
              ...getStylesByRate(item, index, [2, 4], includeBackground),
              ...getHighlightStyle(isHighlightedCell(index, 'header')),
            };
            return (
              <ContentCell key={index} isAll={isAll} style={styles}>
                {formatNumber(item, [2, 4].includes(index))}
              </ContentCell>
            );
          })}
        </ContentContainer>
      </TitleRow>

      {/* SubRow */}
      <SubRowContainer expanded={expanded} isAll={isAll} isAdditional={false}>
        {subData.map((row, rowIndex) => {
          const rowKey = `${title}-${rowIndex}`;
          return (
            <React.Fragment key={rowKey}>
              <SubRow>
                {row.map((cell, cellIndex) => {

                  const includeBackground = cellIndex !== 3;
                  const styles = {
                    ...getStylesByRate(Number(cell), cellIndex, [3, 5], includeBackground),
                    ...getHighlightStyle(isHighlightedCell(cellIndex, 'sub')),
                  };
                  return (
                    <SubCell key={cellIndex} isAll={isAll} style={{
                      ...styles,

                    }}>
                      {cellIndex === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '35px' }}>
                          <span>
                            {type === '질환별' && title === '골수염' && row[0] === '고려대학교'
                              ? '고려대학교 (대조군)'
                              : type === '기관별' && title === '고려대학교' && row[0] === '골수염'
                                ? '골수염 (대조군)'
                                : row[0]}
                          </span>
                          {shouldShowButton(row) && (
                            <span
                              onClick={() => toggleRow(rowKey)}
                              style={{
                                cursor: 'pointer',
                                fontSize: '12px',
                                marginLeft: '5px',
                              }}
                            >
                              {expandedRow[rowKey] ? '▲' : '▼'}
                            </span>
                          )}
                        </div>
                      ) : (
                        formatNumber(cell, [3, 5].includes(cellIndex))
                      )}
                    </SubCell>

                  );
                })}
              </SubRow>
              {/* 추가 행 */}
              {expandedRow[rowKey] && Array.isArray(controlData) && controlData.length > 0 && (
                <SubRowContainer expanded isAll={isAll} isAdditional={true}>
                  {controlData.map((controlRow, controlIndex) => (
                    <SubRow key={`control-${controlIndex}`}>
                      {controlRow.map((controlCell, controlCellIndex) => {
                        const includeBackground = controlCellIndex !== 3; // 배경 포함 여부
                        
                        // null일 경우 스타일 제거
                        const styles = controlCell !== null 
                          ? {
                              ...getStylesByRate(Number(controlCell), controlCellIndex, [3, 5], includeBackground),
                              ...getHighlightStyle(isHighlightedCell(controlCellIndex, 'sub')), // 강조 스타일
                            }
                          : {}; // null일 경우 빈 스타일 적용
                          
                        return (
                          <SubCell key={`control-cell-${controlCellIndex}`} style={styles}>
                            {/* null일 때는 빈 값 렌더링 */}
                            {controlCell !== null ? formatNumber(controlCell, controlCellIndex === 3 || controlCellIndex === 5) : ''}
                          </SubCell>
                        );
                      })}
                    </SubRow>
                  ))}
                </SubRowContainer>
              )}
            </React.Fragment>
          );
        })}
      </SubRowContainer>
    </SectionContainer>
  );
};


export default TopSection;
const AdditionalRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.isAll ? '#dee7f05e' : '#ffffff')}; /* 기존 SubRow와 동일 */
  padding: 5px 0; /* SubRow의 패딩 적용 */
  margin-left: 11%; /* SubRow와 동일한 위치 */
  border-top: 1px solid #D9D8D8; /* 구분선을 추가 */
`;


const TopSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;
`;

const TopCtn = styled.div`
display: flex;
flex-direction: row;
position: sticky;
z-index: 100;
top: 0;
margin-bottom: 5px;
align-items: start;
background-color: #f7f7f7;

`;

const TabsContainer = styled.div`
  display: flex;
  gap: 7px;
  margin-top: 15px;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#c8d9ec' : '#E7E7E9')};
  border: none;
  border-radius: 20px;
  height: 35px;
  width: 80px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  color: #333;
  box-shadow: ${(props) => (props.active ? 'none' : '0 4px 4px rgba(0, 0, 0, 0.25)')};
  &:hover {
    background-color: #b5b5b5;
  }
  margin-top: 15%;
`;

// 추가 스타일
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px 0;
  border-bottom: 1px solid #959595; 
  width: 100%;
  position: sticky; /* 화면에 고정 */
  top: 0; /* 상단 고정 */
  z-index: 100; /* 스크롤할 때 다른 요소보다 위에 고정 */
`;

const HeaderCell = styled.div`
  flex: 1.3;
  text-align: center;
  font-weight: bolder;
  font-size: 12px;
  color: #000;
  position: relative; 
  &:not(:last-child)::after {
    content: ''; 
    position: absolute;
    top: -5px; 
    bottom: -5px; 
    right: 0; 
    width: 1px; 
    background-color: #afafaf; 
  }
  &:last-child {
    border-right: none; 
  }
`;


const GroupedHeader = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  flex: 2.4;
  background-color: #e2e9f0;
  border-radius: 8px;
  text-align: center;
  padding: 5px;
  margin: 0 5px;
`;


const GroupedHeaderTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
  width: calc(100% + 2px); 
  border-bottom: 1px solid #959595;
  margin: 0 -7px; 
`;
const HeaderRowUnder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center; 
  width: 100%;
  padding: 10px 0; 
  gap: 10px; 
`;


const SectionContainer = styled.div`
  background-color: ${(props) => (props.isAll ? '#ebebff' : '#FFFFFF')};
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: ${(props) => (props.isAll ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : '0px 4px 8px rgba(0, 0, 0, 0.1)')};
  overflow: hidden;
  width: 98%;
  margin-left: 2%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isAll ? '#dee7f0' : '#FFFFFF')};
  padding: 13px;
  font-weight: bold;
  font-size: ${(props) => (props.isAll ? '16px' : '14px')};
  color: ${(props) => (props.isAll ? '#3333AA' : '#333')};
  cursor: pointer;
`;

const MergedCell = styled.div`
  flex: 0.7;
  text-align: left;
  font-size: ${(props) => (props.isAll ? '14px' : '12px')};
  font-weight: bold;
  color: ${(props) => (props.isAll ? '#121264' : '#333')};
  padding-left: 15px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isAll ? '#fafdff' : '#f4f5f7')};
  border-radius: 10px;
  flex: 8;
  padding: 10px 0;
  margin-left: 2%;
`;

const ContentCell = styled.div`
  flex: 0.7;
  text-align: center;
  font-size: ${(props) => (props.isAll ? '12px' : '11px')};
  color: ${(props) => (props.isAll ? '#0f0b1f' : '#000')};
  font-weight: ${(props) => (props.isAll ? '700' : '600')};
  border-right: 1px solid #D9D8D8;
  &:last-child {
    border-right: none;
  }
  /* 배경색 적용 */
  background-color: ${(props) => props.bgColor || 'transparent'};
  padding: 2px 8px ; 
  border-radius: 8px; 
  margin: 0px; 
`;

const SubRowContainer = styled.div`
  display: ${(props) => (props.expanded ? 'block' : 'none')};
  background-color: ${(props) =>
    props.isAdditional ? '#e4f0f15a' : props.isAll ? '#dee7f053' : '#ffffff'};
`;

const SubRow = styled.div`
  display: flex;
  flex: 0.7;
  padding: 5px 0;
  margin-left: 11%;
`;

const SubCell = styled.div`
  flex: 0.7;
  text-align: center;
  font-size: ${(props) => (props.isAll ? '12px' : '11px')};
  color: ${(props) => (props.isAll ? '#0f0b1f' : '#000')};
  font-weight: ${(props) => (props.isAll ? '700' : '600')};
  border-right: 1px solid #D9D8D8;
  &:last-child {
    border-right: none;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
  color: #333;
`;

const ErrorContainer = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
  color: red;
`;