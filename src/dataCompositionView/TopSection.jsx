import React, { useState } from 'react';
import styled from 'styled-components';
import { useDiseaseData } from '../context/DiseaseDataContext';
import errorList from '../assets/images/errorLIst.svg';

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
  const errorData = data?.data.errorData || [];
  console.log('TopSection에서 받은 errorData 데이터:', { errorData });
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
          <GroupedHeader>
            <Column>
              <GroupedHeaderTitle>업로드데이터</GroupedHeaderTitle>
              <HeaderRowUnder>
                <HeaderCell>영상</HeaderCell>
                <HeaderCell>임상 (CRF)</HeaderCell>
                <HeaderCell>라벨링-Json</HeaderCell>
                <HeaderCell>라벨링-Drawing</HeaderCell>
              </HeaderRowUnder>
            </Column>
          </GroupedHeader>
          <GroupedHeader style={{ flex: 2 }}>
            <Column>
              <GroupedHeaderTitle>둥록데이터</GroupedHeaderTitle>
              <HeaderRowUnder>
                <HeaderCell>Pass 건수</HeaderCell>
                <HeaderCell>구축율 (%)</HeaderCell>
              </HeaderRowUnder>
            </Column>
          </GroupedHeader>
          <HeaderCell>2차 검수</HeaderCell>
          <HeaderCell>최종 구축율 (%)</HeaderCell>
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
          errorData={errorData}
        />
      ))}

    </TopSectionContainer>
  );
};

const Section = ({ title, totalData, subData, controlData, type, expandedRow, toggleRow, errorData }) => {

  const [expanded, setExpanded] = useState(false);
  const [detailData, setDetailData] = useState([]); // 오류 상세 데이터 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [noDataError, setNoDataError] = useState(false); // 오류 데이터가 없는 경우 상태

  const shouldShowButton = (row) =>
    (type === '질환별' && title === '골수염' && row[0] === '단국대학교') ||
    (type === '기관별' && title === '단국대학교' && row[0] === '골수염');

  const isAll = title === '질환 ALL' || title === '기관 ALL';






  const handleErrorDetails = (currentTitle, currentRow) => {
    setNoDataError(false); // 초기화

    let filteredData;
    if (type === '질환별') {  //질환별 조건으로 필터링
      filteredData = errorData.find(
        (item) => item.disease === currentTitle && item.hospital === currentRow
      );
    } else if (type === '기관별') {  // 기관별 조건으로 필터링
      filteredData = errorData.find(
        (item) => item.hospital === currentTitle && item.disease === currentRow
      );
    }

    if (filteredData) {
      console.log('필터링된 데이터:', filteredData);
      setDetailData(filteredData.fileDetails); // 파일 상세 데이터를 상태에 저장
      setShowModal(true); // 모달 표시
    } else {
      console.error('해당 질환 또는 병원에 대한 오류 데이터가 없습니다.');
      setNoDataError(true); // 오류 데이터 없음 상태 설정
      setShowModal(true); // 모달 표시
    }
  };




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
      return [5, 6, 8].includes(cellIndex); // 헤더에
    }
    if (type === 'sub') {
      return [6, 7, 9].includes(cellIndex); // 서브 데이터
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

  const fontSizeByCell = (cellIndex, type) => {
    if (type === 'header') {
      return [0, 5].includes(cellIndex) ? '15px' : '12px';
    }
    if (type === 'sub') {
      return [1, 6].includes(cellIndex) ? '14px' : '11px';
    }
    return '11px'; // 기본 크기
  };

  const fontColorByCell = (cellIndex, type) => {
    if (type === 'header') {
      return [0, 5].includes(cellIndex) ? '#2496f3' : '#000000'; // 헤더 색상
    }
    if (type === 'sub') {
      return [1, 6].includes(cellIndex) ? '#2196f3' : '#000000'; // 서브 데이터 색상
    }
    return '#000';
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
            const adjustedIndex = index + 1;
            const cellValue =
              (title === "두개안면" && adjustedIndex === 5) ? '' : item;
            const styles = {
              ...(isHighlightedCell(index, 'header') ? getHighlightStyle(true) : {}),
              fontSize: fontSizeByCell(index, 'header') || '12px', // 기본값 추가
              color: fontColorByCell(index, 'header') || '#000',
              ...getStylesByRate(cellValue, index, [6], includeBackground),
            };

            return (
              <ContentCell key={index} isAll={isAll} style={styles}>
                {index === 7 && Number(cellValue) >= 500
                  ? null // 100 이상일 때 버튼 숨김
                  : formatNumber(Number(cellValue), [6, 8].includes(index))} {/* 명확히 숫자로 변환 */}
              </ContentCell>

            );
          })}
        </ContentContainer>
      </TitleRow>





      {/* SubRow */}
      <SubRowContainer expanded={expanded} isAll={isAll} isadditional={false}>
        {subData.map((row, rowIndex) => {
          const rowKey = `${title}-${rowIndex}`;
          return (
            <React.Fragment key={rowKey}>
              <SubRow>
                {row.map((cell, cellIndex) => {
                  const cellValue =
                    (title === "두개안면" && cellIndex === 5) ||
                      (row[0]?.includes("두개안면") && cellIndex === 5)
                      ? '' // 빈값으로 설정
                      : cell;


                  return (
                    <SubCell
                      key={cellIndex}
                      isAll={isAll}
                      fontSize={fontSizeByCell(cellIndex, 'sub')}
                      style={{
                        ...(getHighlightStyle(isHighlightedCell(cellIndex, 'sub')) || {}),
                        fontSize: fontSizeByCell(cellIndex, 'sub') || '12px',
                        color: fontColorByCell(cellIndex, 'sub') || '#000',
                        ...(getStylesByRate(Number(cellValue), cellIndex, [7, 9]) || {}),
                      }}
                    >


                      {cellIndex === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '30px' }}>
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
                      ) : cellIndex === 7 && title !== '질환 ALL' && title !== '기관 ALL' ? (
                        Number(cell) < 500 ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '33%' }}>
                            {formatNumber(cell, true)}
                            <ErrorButtonCtn>
                              <ErrorButton onClick={() => handleErrorDetails(title, row[0])}>
                                <img src={errorList} />
                              </ErrorButton>
                            </ErrorButtonCtn>
                          </div>
                        ) : (
                          formatNumber(cellValue, true) // 버튼 없이 값만 표시
                        )
                      ) : (
                        formatNumber(cellValue, [7, 9].includes(cellIndex))
                      )}

                    </SubCell>
                  );
                })}
              </SubRow>

              {/* 추가 행 */}
              {expandedRow[rowKey] && Array.isArray(controlData) && controlData.length > 0 && (
                <SubRowContainer expanded isAll={isAll} isadditional={true} >
                  {controlData.map((controlRow, controlIndex) => (
                    <SubRow key={`control-${controlIndex}`} >
                      {controlRow.map((controlCell, controlCellIndex) => {
                        const includeBackground = controlCellIndex !== 3;


                        const styles = controlCell !== null
                          ? {
                            ...getStylesByRate(Number(controlCell), controlCellIndex, [6], includeBackground),
                            ...getHighlightStyle(isHighlightedCell(controlCellIndex, 'sub')),
                          }
                          : {};

                        return (
                          <SubCell key={`control-cell-${controlCellIndex}`} style={styles} fontSize={fontSizeByCell(controlCellIndex, 'sub')}>
                            {controlCell !== null ? formatNumber(controlCell) : ''}
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


      {/* 모달 */}
      {showModal && (
        <Modal>
          <ModalContent>
            {noDataError ? (
              <>
                <CloseButtonNoData onClick={() => setShowModal(false)}>×</CloseButtonNoData>
                <ModalHeaderText>해당 질환 또는 병원에 대한 오류 데이터가 없습니다.</ModalHeaderText>
              </>
            ) : (
              <>
                <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
                <ModalHeader>오류 상세보기</ModalHeader>
                <Table>
                  <thead>
                    <tr>
                      <th>파일 ID</th>
                      {detailData[0]?.files.map((file, index) => (
                        <th key={index}>{file.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detailData.map((fileDetail, index) => (
                      <tr key={index}>
                        <FileIdCell>{fileDetail.fileId}</FileIdCell>
                        {fileDetail.files.map((file, fileIndex) => (
                          <TableCell
                            key={fileIndex}
                            isExist={file.exists !== null ? file.exists : null}
                          >
                            {file.exists === null ? '' : file.exists ? 'O' : 'X'}
                          </TableCell>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </ModalContent>
        </Modal>
      )}


    </SectionContainer>
  );
};


export default TopSection;




const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden; /* 배경 스크롤 고정 */
`;

const ModalHeaderText = styled.h3`
  font-size: 16px;
  font-weight: bold;
  max-width: 80%; /* 최대 너비 제한 */
  text-align: center; /* 중앙 정렬 */
  margin: 10px auto; /* 상하 간격 설정 */
  color: #333; /* 기본 텍스트 색상 */
`;

const CloseButtonNoData = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f86363;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2000;

  &:hover {
    background: #d9534f;
  }
`;



const ModalContent = styled.div`
  position: relative; /* 기준을 모달 컨텐츠로 설정 */
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 50%;
  max-height: 90vh;
  overflow-y: auto; /* 모달 내부 스크롤 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 610px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th {
    background: #deebf3;
    font-weight: bold;
    font-size: 11.5px;
    padding: 6px 8px;
    border: 1px solid #e9c6c6;
  }
`;


const FileIdCell = styled.td`
  border: 1px solid #e9c6c6;
  padding: 2px 4px; /* 패딩 최소화 */
  text-align: center;
  font-size: 11px; /* 글자 크기 감소 */
  font-weight: bold;
  background-color: #ffffff; /* 배경 흰색 */
  color: #000000; /* 텍스트 검정 */
  line-height: 1; /* 줄 간격 최소화 */
`;

const TableCell = styled.td.attrs((props) => ({
  isExist: props.isExist,
}))`
  border: 1px solid #e9c6c6;
  padding: 2px 4px;
  text-align: center;
  font-size: 11px;
  font-weight: bold;
  background-color: ${(props) =>
    props.isExist === null
      ? '#ffffff' // exists가 null일 경우 흰색
      : props.isExist
        ? '#e4ffe496' // exists가 true일 경우
        : '#f8d4d49e'}; // exists가 false일 경우
  color: ${(props) =>
    props.isExist === null
      ? '#000000' // exists가 null일 경우 검정
      : props.isExist
        ? '#2f442fbd' // exists가 true일 경우
        : '#df0808'}; // exists가 false일 경우 빨강
  line-height: 1;
`;

const ModalHeader = styled.h3`
  font-size: 16px; 
  font-weight: bold; 
  max-width: 80%; 
  text-align: center; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  margin: 5px auto; 
`;


const CloseButton = styled.button`
  position: absolute; /* 모달 컨텐츠 상단에 고정 */
  top: 10px; /* 모달 컨텐츠 내부 상단에서의 위치 */
  right: 10px; /* 모달 컨텐츠 내부 오른쪽에서의 위치 */
  background: #f86363;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px; /* '×' 크기 */
  font-weight: bold;
  cursor: pointer;
  z-index: 2000; /* 다른 요소보다 위에 표시 */
  &:hover {
    background: #d9534f;
  }
`;
const ErrorButtonCtn = styled.div`
  display: inline-block;
  position: relative;   
  padding: 4px;         
  background-color: rgba(218, 113, 113, 0.082); 
  border-radius: 10px;   
`;

const ErrorButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 16x; 
  height: 13px; 
  &:hover {
    transform: scale(1.2); 
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TopSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
  width: 100%;
`;

const TopCtn = styled.div`
display: flex;
flex-direction: row;
position: fixed; 
position: sticky;
z-index: 100;  top: 0; 
align-items: start;
background-color: #f7f7f7;
 width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 7px;
  margin-top: 5px;
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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  padding: 3px 0;
  border-bottom: 1px solid #959595;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderCell = styled.div`
  flex: 1; /* 각 항목의 동일한 비율 */
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.fontSize || (props.isAll ? '12px' : '11px')};
  color: #000;
  position: relative;
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
    background-color: #d3d3d3;
  }
  overflow-x: hidden;

`;


const GroupedHeader = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
  flex: 4;
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
  flex: 1;
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
  flex: 2;
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
  font-size: ${(props) => props.fontSize || (props.isAll ? '12px' : '11px')};
  color: ${(props) => (props.isAll ? '#0f0b1f' : '#000')};
  font-weight: ${(props) => (props.isAll ? '700' : '600')};
  border-right: 1px solid #D9D8D8;
  &:last-child {
    border-right: none;
  }
  background-color: ${(props) => props.bgColor || 'transparent'};
  padding: 2px 8px; 
  border-radius: 8px; 
  margin: 0px; 
`;

const SubCell = styled.div`
  flex: 0.7;
  text-align: center;
  font-size: ${(props) => props.fontSize || (props.isAll ? '12px' : '11px')};
  color: ${(props) => (props.isAll ? '#0f0b1f' : '#000')};
  font-weight: ${(props) => (props.isAll ? '700' : '600')};
  border-right: 1px solid #D9D8D8;
  &:last-child {
    border-right: none;
  }
  align-items: center;
  justify-content: center;
`;
const SubRowContainer = styled.div`
  display: ${(props) => (props.expanded ? 'block' : 'none')};
  background-color: ${(props) =>
    props.isadditional ? '#e4f0f15a' : props.isAll ? '#dee7f053' : '#ffffff'};
     flex-grow: 1; /* 남은 공간을 채우도록 설정 */
  overflow-y: auto; /* 콘텐츠 스크롤 허용 */
  height: 100;
`;

const SubRow = styled.div`
  display: flex;
  flex: 0.7;
  padding: 5px 0;
  margin-left: 11%;
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