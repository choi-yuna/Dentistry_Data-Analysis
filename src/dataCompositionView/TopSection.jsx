import React, { useState } from 'react';
import styled from 'styled-components';
import { useDiseaseData } from '../context/DiseaseDataContext';

const TopSection = () => {
  const [activeTab, setActiveTab] = useState('질환별 보기'); // 기본 탭 설정
  const { data, loading, error } = useDiseaseData(); // Context에서 데이터 가져오기

  console.log('TopSection에서 받은 Context 데이터:', { data, loading, error });

  if (loading) return <LoadingContainer>로딩 중...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;

  // 중첩된 data 처리
  const nestedData = data?.data || {}; // 중첩된 데이터 가져오기
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
          <HeaderCell>수집처</HeaderCell>
          <HeaderCell>목표 건수</HeaderCell>

          {/* 라벨링 관련 헤더 */}
          <GroupedHeader style={{ flex: 5 }}>
            <Column>
            <GroupedHeaderTitle>1차검수/ 라벨링</GroupedHeaderTitle>
            <HeaderRowUnder>
            <HeaderCell style={{ flex: 1.8, position: 'relative' , height: '28px'}}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '12px' }}>
                 <div>
                   라벨링 등록 건수 &nbsp;&nbsp;/&nbsp;&nbsp; 등록 구축율 (%)
                 </div>
               </div>
               <div
                 style={{
                   position: 'absolute',
                   bottom: -12,
                   right: 10,
                   top: 25,
                   fontSize: '10px',
                   color: '#525252',
                   textAlign: 'right',
                 }}
               >
                  (json 파일 기준)
               </div>
             </HeaderCell>
             <HeaderCell style={{ flex: 1.6, position: 'relative' , height: '28px'}}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '12px' }}>
                 <div>
                 라벨링 Pass 건수 &nbsp;&nbsp;/&nbsp;&nbsp; 1차 구축율 (%)
                 </div>
               </div>
               <div
                 style={{
                   position: 'absolute',
                   bottom: -12,
                   right: 10,
                   top: 25,
                   fontSize: '10px',
                   color: '#525252',
                   textAlign: 'right',
                 }}
               >
                  (CRF, json, ini, 원영상 파일 기준)
               </div>
             </HeaderCell>
            </HeaderRowUnder>
            </Column>
          </GroupedHeader>

          <GroupedHeader style={{width: '30px', height: '65px'}}>
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
        />
      ))}
    </TopSectionContainer>
  );
};

const Section = ({ title, totalData, subData }) => {
  // 숫자를 포맷팅하고 %나 '건'을 붙이는 함수
  const formatNumber = (value, addPercent = false) => {
    const number = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

    // 숫자가 아니면 그대로 반환
    if (isNaN(number)) return value;

    // 퍼센트 또는 '건' 추가
    return addPercent ? `${number.toLocaleString('ko-KR')} %` : `${number.toLocaleString('ko-KR')} 건`;
  };


  const getStylesByRate = (rate, includeBackground = true) => {
    if (rate >= 100) {
      return includeBackground
        ? { color: '#018a13', backgroundColor: '#d4f7dc' }
        : { color: '#018a13' }; 
    }
    if (rate >= 50) {
      return includeBackground
        ? { color: '#1f00cc', backgroundColor: '#d9d3f7b9' }
        : { color: '#1f00cc' }; 
    }
    return includeBackground
      ? { color: '#fc0505', backgroundColor: '#f7d4d4bc' }
      : { color: '#fc0505' }; 
  };

  const [expanded, setExpanded] = useState(false);
  const isAll = title === '질환 ALL' || title === '기관 ALL';

  return (
    <SectionContainer>
      <TitleRow isAll={isAll} onClick={() => setExpanded(!expanded)}>
        <MergedCell isAll={isAll}>
          {title} {expanded ? '▲' : '▼'}
        </MergedCell>
        <ContentContainer isAll={isAll}>
          <ContentCell style={{ fontWeight: 'bold' }}>합계</ContentCell>
          {totalData.map((item, index) => {
            const styles =
              (index === 2 || index === 4 || index === 6) && item !== 0 ? getStylesByRate(item, true) : {};
            return (
              <ContentCell key={index} isAll={isAll} style={styles}>
                {formatNumber(item, index === 2 || index === 4 || index === 6)}
              </ContentCell>
            );
          })}
        </ContentContainer>
      </TitleRow>

      {/* 자식 데이터 렌더링 */}
      <SubRowContainer expanded={expanded} isAll={isAll}>
        {subData.map((row, rowIndex) => (
          <SubRow key={rowIndex}>
            {row.map((cell, cellIndex) => {
              const styles =
                (cellIndex === 3 || cellIndex === 5 || cellIndex === 7) && Number(cell) !== 0
                  ? getStylesByRate(Number(cell), false) // 배경색 제외
                  : {};
              return (
                <SubCell key={cellIndex} isAll={isAll} style={styles}>
                  {formatNumber(cell, cellIndex === 3 || cellIndex === 5 || cellIndex === 7)}
                </SubCell>
              );
            })}
          </SubRow>
        ))}
      </SubRowContainer>
    </SectionContainer>
  );
};

export default TopSection;


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
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#B5B5B5' : '#E7E7E9')};
  border: none;
  border-radius: 20px;
  height: 35px;
  width: 80px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bolder;
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
  font-size: 11px;
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
  background-color: ${(props) => (props.isAll ? '#dee7f05e' : '#ffffff')};
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
