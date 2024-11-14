import React, { useState } from 'react';
import styled from 'styled-components';

const Section = ({ title, totalData, subData }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <SectionContainer>
      <TitleRow onClick={() => setExpanded(!expanded)}>
        {title} {expanded ? '▲' : '▼'}
      </TitleRow>
      
      {/* 합계 행 */}
      <TotalRow>
        <Cell>합계</Cell>
        {totalData.map((item, index) => (
          <Cell key={index}>{item}</Cell>
        ))}
      </TotalRow>

      {/* 하위 병원 데이터 */}
      <SubRowContainer expanded={expanded}>
        {subData.map((row, rowIndex) => (
          <SubRow key={rowIndex}>
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
          subData: [],
        },
        {
          title: '약골 골수염',
          totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
          subData: [],
        },
        {
          title: '두개만',
          totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
          subData: [],
        },
        {
          title: '구강암',
          totalData: ['6,500', '6,500', '6,500', '6,500', '6,500', '43%'],
          subData: [],
        },
      ]
    : [
        {
          title: '기관 A',
          totalData: ['7,000', '7,000', '7,000', '7,000', '7,000', '50%'],
          subData: [],
        },
        {
          title: '기관 B',
          totalData: ['5,000', '5,000', '5,000', '5,000', '5,000', '40%'],
          subData: [],
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

export default TopSection;


const TopSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
   margin-top: 20px;
  padding: 0 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #F7F7F7;
  padding: 10px;
  border-bottom: 1px solid #959595;
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
  font-family: 'Roboto', sans-serif;
  color: #333;
  box-shadow: ${(props) => (props.active ? 'none' : '0 4px 4px rgba(0, 0, 0, 0.25)')};

  &:hover {
    background-color: #B5B5B5;
  }
`;

const HeaderCell = styled.div`
  flex: 1;
  min-width: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  color: #000;
`;

const SectionContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #E7E7E9;
  padding: 15px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  font-size: 13px;
  color: #333;
  background-color: #F7F7F7;
`;

const Cell = styled.div`
  flex: 1;
  min-width: 100px;
  text-align: center;
  font-size: 13px;
  color: #333;
`;

const SubRowContainer = styled.div`
  display: ${(props) => (props.expanded ? 'block' : 'none')};
  background-color: #FFFFFF;
`;

const SubRow = styled.div`
  display: flex;
  padding: 5px 0;
  border-top: 1px solid #E0E0E0;
`;

const SubCell = styled.div`
  flex: 1;
  min-width: 100px;
  text-align: center;
  font-size: 12px;
  color: #666;
`;