import React, { useState } from 'react';
import styled from 'styled-components';
import { useDiseaseData } from '../context/DiseaseDataContext';

const TopSection = () => {
  const [activeTab, setActiveTab] = useState('질환별 보기'); // 기본 탭 설정
  const { data, loading, error } = useDiseaseData(); // Context에서 데이터 가져오기

  console.log('TopSection에서 받은 Context 데이터:', { data, loading, error }); 
  
  if (loading) return <LoadingContainer>로딩 중...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;
  if (!data || !data['질환별'] || data['질환별'].length === 0) {
    return <ErrorContainer>데이터가 없습니다.</ErrorContainer>;
  }

  // 현재 탭에 따라 데이터를 필터링
  const sections = activeTab === '질환별 보기' ? data['질환별'] : [];

  return (
    <TopSectionContainer>
      <HeaderRow>
        <TabsContainer>
          <TabButton active={activeTab === '질환별 보기'} onClick={() => setActiveTab('질환별 보기')}>
            질환별 보기
          </TabButton>
          <TabButton active={activeTab === '기관별 보기'} onClick={() => setActiveTab('기관별 보기')}>
            기관별 보기
          </TabButton>
        </TabsContainer>
        <HeaderCell>수집처</HeaderCell>
        <HeaderCell>목표 건수</HeaderCell>
        <HeaderCell>라벨링 건수</HeaderCell>
        <HeaderCell>1차검수</HeaderCell>
        <HeaderCell>데이터 구성 검수</HeaderCell>
        <HeaderCell>2차검수</HeaderCell>
        <HeaderCell>구축율(%)</HeaderCell>
      </HeaderRow>

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

// Section 컴포넌트
const Section = ({ title, totalData, subData }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionContainer>
      <TitleRow onClick={() => setExpanded(!expanded)}>
        <MergedCell>{title} {expanded ? '▲' : '▼'}</MergedCell>
        <ContentContainer>
          <ContentCell style={{ fontWeight: 'bold' }}>합계</ContentCell>
          {totalData.map((item, index) => (
            <ContentCell key={index}>{item}</ContentCell>
          ))}
        </ContentContainer>
      </TitleRow>

      <SubRowContainer expanded={expanded}>
        {subData.map((row, rowIndex) => (
          <SubRow key={rowIndex}>
            <EmptyCell />
            <SubCell>{row[0]}</SubCell>
            {row.slice(1).map((cell, cellIndex) => (
              <SubCell key={cellIndex}>{cell}</SubCell>
            ))}
          </SubRow>
        ))}
      </SubRowContainer>
    </SectionContainer>
  );
};

<<<<<<< Updated upstream
const TopSection = () => {
  const [activeTab, setActiveTab] = useState('질환별 보기');

  const sections = activeTab === '질환별 보기' 
    ? [
        {
          title: '질환 ALL',
          totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
          subData: [
            ['조선대학교병원', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
            ['고려대학교병원', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
            ['보라매병원', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
          ],
        },
        {
            title: '치주',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['조선대학교병원', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['고려대학교병원', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['보라매병원', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
          {
            title: '골수염',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['조선대학교병원', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['고려대학교병원', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['보라매병원', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
          {
            title: '구강암',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['조선대학교병원', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['고려대학교병원', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['보라매병원', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
          {
            title: '두개안면',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['조선대학교병원', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['고려대학교병원', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['보라매병원', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
      ]
    : [
        {
            title: '조선대학교',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['치주질환', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['골수염', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['구강암', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
              ['두개안면', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
          {
            title: '원광대학교',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['치주질환', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['골수염', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['구강암', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
              ['두개안면', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
          {
            title: '고려대학교',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['치주질환', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['골수염', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['구강암', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
              ['두개안면', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
          {
            title: '보라매병원',
            totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
            subData: [
              ['치주질환', '1,000', '1,000', '1,000', '1,000', '1,000', '43%'],
              ['골수염', '1,500', '1,500', '1,500', '1,500', '1,500', '43%'],
              ['구강암', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
              ['두개안면', '2,000', '2,000', '2,000', '2,000', '2,000', '43%'],
            ],
          },
      ];

  return (
    <TopSectionContainer>
      <HeaderRow>
        <TabsContainer>
          <TabButton active={activeTab === '질환별 보기'} onClick={() => setActiveTab('질환별 보기')}>
            질환별 보기
          </TabButton>
          <TabButton active={activeTab === '기관별 보기'} onClick={() => setActiveTab('기관별 보기')}>
            기관별 보기
          </TabButton>
        </TabsContainer>
        <HeaderCell>수집처</HeaderCell>
        <HeaderCell>목표 건수</HeaderCell>
        <HeaderCell>라벨링 건수</HeaderCell>
        <HeaderCell>1차검수</HeaderCell>
        <HeaderCell>데이터 구성 검수</HeaderCell>
        <HeaderCell>2차검수</HeaderCell>
        <HeaderCell>구축율(%)</HeaderCell>
      </HeaderRow>

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

=======
>>>>>>> Stashed changes
export default TopSection;


// 스타일 정의
const TopSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 20px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 10px 0;
  border-bottom: 1px solid #959595;
  width: 95%;
<<<<<<< Updated upstream
=======
  position: sticky;
  top: 0;
  z-index: 100;
>>>>>>> Stashed changes
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#B5B5B5' : '#E7E7E9')};
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  box-shadow: ${(props) => (props.active ? 'none' : '0 4px 4px rgba(0, 0, 0, 0.25)')};

  &:hover {
    background-color: #b5b5b5;
  }
`;

const HeaderCell = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #000;
  border-right: 1px solid #d9d8d8;

  &:last-child {
    border-right: none;
  }
`;

const SectionContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 95%;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  border-top: none; 
  cursor: pointer;
  margin-top: 0px; 
`;

const MergedCell = styled.div`
  flex: 1.5;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  padding-left: 15px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #EFEFEF;
  border-radius: 10px;
  flex: 8;
  padding: 10px 0;
`;

const ContentCell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #000;
  font-weight: bold;
  border-right: 1px solid #D9D8D8;

  &:last-child {
    border-right: none;
  }
`;

const SubRowContainer = styled.div`
  display: ${(props) => (props.expanded ? 'block' : 'none')};
  background-color: #FFFFFF;
`;

const SubRow = styled.div`
  display: flex;
  padding: 5px 0;
`;

const EmptyCell = styled.div`
  flex: 1.5;
  background-color: #FFFFFF;
`;

const SubCell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #000;
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
