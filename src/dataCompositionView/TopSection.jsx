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
        <HeaderCell>라벨링 건수</HeaderCell>
        
        {/* 묶음 박스: 1차검수와 1차 구축율 */}
        <GroupedHeader>
          <HeaderCell>1차검수</HeaderCell>
          <HeaderCell>1차 구축율</HeaderCell>
        </GroupedHeader>

        {/* 묶음 박스: 데이터 구성 오류 건수와 데이터 구성 검수구축율 */}
        <GroupedHeader>
          <HeaderCell>데이터 구성 <br />오류 건수</HeaderCell>
          <HeaderCell>데이터 구성 <br />검수 구축율</HeaderCell>
        </GroupedHeader>

        {/* 묶음 박스: 2차검수와 최종 구축율 */}
        <GroupedHeader>
          <HeaderCell>2차검수</HeaderCell>
          <HeaderCell>최종 구축율</HeaderCell>
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
  const [expanded, setExpanded] = useState(false);
  const isAll = title === '질환 ALL' || title === '기관 ALL';
  return (
    <SectionContainer>
        <TitleRow isAll={isAll} onClick={() => setExpanded(!expanded)}>
        <MergedCell isAll={isAll}>{title} {expanded ? '▲' : '▼'}</MergedCell>
        <ContentContainer isAll={isAll}>
        <ContentCell style={{ fontWeight: 'bold' }}>합계</ContentCell>
          {totalData.map((item, index) => (
            <ContentCell key={index} isAll={isAll}>{item}</ContentCell>
          ))}
        </ContentContainer>
      </TitleRow>

      {/* 자식 데이터 렌더링 */}
      <SubRowContainer expanded={expanded} isAll={isAll}>
        {subData.map((row, rowIndex) => (
          <SubRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <SubCell key={cellIndex} isAll={isAll}>{cell}</SubCell>
            ))}
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
margin-bottom: 5px;
align-items: start;
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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px 0;
  border-bottom: 1px solid #959595;
  width: 88%;
  position: sticky;  /* 화면에 고정 */
  top: 0;            /* 상단 고정 */
  z-index: 100;      /* 스크롤할 때 다른 요소보다 위에 고정 */
  margin-right: 1%;
`;

const HeaderCell = styled.div`
  flex: 0.7;
  text-align: center;
  font-weight: bolder;
  font-size: 11px;
  color: #000;
  border-right: 1px solid #afafaf;
  &:last-child {
    border-right: none;
  }
`;

/* 묶음 헤더 스타일 */
const GroupedHeader = styled.div`
  display: flex;
  flex: 1.4; 
  justify-content: space-between;
  background-color: #e4e4e4;
  border-radius: 8px;
  padding: 5px;
  text-align: center;
  margin: 3px;
  height: 30px;
  align-items: center;
`;

const SectionContainer = styled.div`
  background-color: ${(props) => (props.isAll ? '#ebebff' : '#FFFFFF')};
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: ${(props) => (props.isAll ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : '0px 4px 8px rgba(0, 0, 0, 0.1)')};
  overflow: hidden;
  width: 99%;

`;


const TitleRow = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isAll ? '#ddddfa' : '#FFFFFF')};
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
  background-color: ${(props) => (props.isAll ? '#fafdff' : '#EFEFEF')};
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
`;

const SubRowContainer = styled.div`
  display: ${(props) => (props.expanded ? 'block' : 'none')};
  background-color: ${(props) => (props.isAll ? '#fafdffe1' : '#ffffff')};
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
