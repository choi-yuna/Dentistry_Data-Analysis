import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { IconButton, Chip, Tabs, Tab, Collapse, MenuItem, Select, TextField, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import chartIcon from '../assets/images/chart-button-black.svg';
import { diseaseSpecificData } from '../utils/diseaseData';
import { DataSelectionContext } from '../context/DataSelectionContext';
import { useFileContext } from '../FileContext';
import { fetchFilteredPatientData } from '../api/analzeDataApi';
import { AnalysisContext } from '../context/AnalysisContext';
import { processServerData } from '../utils/processServerData';
import { processChartData } from '../utils/processChartData';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; 
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: #0d4a68;
  font-weight: bold;
`;

const Container = styled.div`
  width: ${(props) => (props.collapsed ? '95%' : '95%')};
  margin-top: 5px;
  transition: width 1s ease, height 0.3s ease;
`;


const StyledTabs = styled(Tabs)`
  border: 1px solid #ccc;
  border-radius: 8px 8px 0 0;
  min-height: 40px !important;  /* 전체 탭 높이 줄임 */
  font-size : 13px !important;
  height: 35px !important; 
  min-height: 35px !important; /* 전체 탭 높이 */
  font-size: 13px !important; /* 글자 크기 */
  height: 30px !important; /* 탭 높이 */
  font-weight: bold !important; /* 폰트를 진하게 설정 */
`;

const StyledTab = styled(Tab)`
  flex-grow: 1;
  min-width: 0;
  padding: 8px 10px !important;
  font-size: 11px !important;
  min-height: 35px !important;
  font-weight: bold !important;

  // 탭이 선택되었을 때 배경색 변경
  &.Mui-selected {
    color: #f0f0f0 !important; /* 선택된 탭의 글자 색 */
    font-weight: bold;
    background-color: #DD7610; /* 선택된 탭의 배경색 */
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    font-weight: 700 !important;
  }

  // 탭 인디케이터 스타일 (하단의 강조선)
  & .MuiTabs-indicator {
    background-color: transparent; /* 인디케이터 숨김 */
  }

  // 기본 상태
  &:not(.Mui-selected) {
    background-color: #f0f0f0; /* 선택되지 않은 탭의 배경색 */
    color: #505050; /* 선택되지 않은 탭의 글자 색 */
  }

  &:hover {
    background-color: #f58413; /* 마우스 오버 시 배경색 */
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0 0 8px 8px;
  padding: 8px;
  padding-bottom: 1px;
  background-color: #fff;
`;

const LabelContainer = styled.div`  
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #aaa;
  margin: 0 1px;
  border: 1px solid #ccc;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  border-bottom: 1px solid #ccc;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 8px;
  padding-left: 8px;
  margin-bottom: 4px;
`;

const SubList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding-left: 8px;
`;

const StyledButtonItem = styled.button`
  padding: 5px 8px;
  background-color: ${({ selected }) => (selected ? '#DD7610' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  border: 1px solid ${({ selected }) => (selected ? '#DD7610' : '#ccc')};
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 10px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#c05b00' : '#e0e0e0')};
    color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  }
`;

const SubListItem = styled(StyledButtonItem)`
  background-color: inherit;
  color: ${({ selected }) => (selected ? '#DD7610' : 'black')};
  margin-right: 8px;
  padding: 4px 8px;
  height: auto;
  margin-bottom: 4px;

  &:hover {
    background-color: inherit;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin-top: 4px;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: bold;
  margin-right: 8px;
`;

const SelectField = styled(Select)`
  min-width: 100px;
  font-size: 0.8rem;
  height: 20px;
  margin-right: 8px;
  margin-bottom: 5px;

  .MuiSelect-select {
    padding: 7px;
    font-size: 0.8rem;
    height: 36px;
    display: flex;
    align-items: center;
  }

  .MuiOutlinedInput-input {
    padding: 8px;
    font-size: 0.8rem;
    height: 36px;
    line-height: 1.2;
  }

  .MuiInputBase-root {
    font-size: 0.8rem;
    height: 36px;
  }
`;

const TextFieldStyled = styled(TextField)`
  min-width: 80px;
  font-size: 0.8rem;
  height: 30px;
`;




const SelectedItemsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const SmallChip = styled(Chip)`
  font-size: 0.7rem !important;          /* 텍스트 크기 */
  height: 22px !important;               /* 전체 높이 조정 */
  padding: 0px 4px !important;           /* 내부 패딩 조정 */
  border-radius: 12px !important;        /* 모서리 둥글기 */

  /* Chip의 텍스트 스타일 */
  .MuiChip-label {
    padding: 0px 8px !important;         /* 텍스트 패딩 조정 */
    font-size: 0.6rem !important;        /* 텍스트 크기 */
  }

  /* 삭제 아이콘 크기 조정 */
  .MuiChip-deleteIcon {
    width: 13px !important;              /* 삭제 아이콘 크기 축소 */
    height: 13px !important;
  }
`;
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Tabs와 버튼들 간 간격 생성 */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* 버튼들 간의 간격 설정 */
`;

const ButtonStyled = styled.button`
  padding: 12px 24px; /* 버튼 크기 조정 */
  background-color: #f5fbff;
  color: #203086;
  font-size: 10px;
  font-weight: bold;
  border: 1px solid #cccccc;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  width: 160px; /* 버튼 너비 고정 */
  height: 30px; /* 버튼 높이 고정 */

  &:hover {
    background-color: #dee2f9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;


const DataSelection = ({ collapsed, onAnalyze, disease }) => {
  const diseaseData = diseaseSpecificData[disease] || diseaseSpecificData.default;
  const { setChartData, setTableData } = useContext(AnalysisContext);
  const {
    tabValue,
    setTabValue,
    selectedItemsTab1,
    setSelectedItemsTab1,
    selectedItemsTab2,
    setSelectedItemsTab2,
    selectedCategory,
    setSelectedCategory,
  } = useContext(DataSelectionContext);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const { fileId } = useFileContext();

  useEffect(() => {
    const savedTab1 = sessionStorage.getItem(`${disease}_selectedItemsTab1`);
    const savedTab2 = sessionStorage.getItem(`${disease}_selectedItemsTab2`);

    if (savedTab1) {
      const parsedTab1 = JSON.parse(savedTab1);
      setSelectedItemsTab1(parsedTab1);
    } else {
      setSelectedItemsTab1(diseaseData.selectedItemsTab1 || {});
    }

    if (savedTab2) {
      const parsedTab2 = JSON.parse(savedTab2);
      setSelectedItemsTab2(parsedTab2);
    } else {
      setSelectedItemsTab2(diseaseData.selectedItemsTab2 || {});
    }


  }, [disease, diseaseData, setSelectedItemsTab1, setSelectedItemsTab2]);

  useEffect(() => {
    if (tabValue === 0 && !selectedCategory) {
      setSelectedCategory('기본 정보(info)');
    }
  }, [tabValue, selectedCategory, setSelectedCategory]);
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  
    if (newValue === 0 && selectedCategory !== '기본 정보(info)') {
      setSelectedCategory('기본 정보(info)');
    } else if (newValue === 1 && selectedCategory !== '기본 정보') {
      setSelectedCategory('기본 정보');
    }
  };
  

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (selected, category) => {
    if (!category) {
      console.warn("카테고리가 없습니다. 선택된 항목:", selected);
      return;
    }

    const selectedItems = tabValue === 0 ? selectedItemsTab1 : selectedItemsTab2;
    const setSelectedItems = tabValue === 0 ? setSelectedItemsTab1 : setSelectedItemsTab2;

    const categoryItems = Array.isArray(selectedItems[category]) ? selectedItems[category] : [];
    const existingItemIndex = categoryItems.findIndex(item =>
      typeof item === 'object' ? item.label === selected.label : item === selected
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...categoryItems];
      updatedItems.splice(existingItemIndex, 1);
      setSelectedItems({
        ...selectedItems,
        [category]: updatedItems,
      });
    } else {
      setSelectedItems({
        ...selectedItems,
        [category]: [...categoryItems, selected],
      });
    }
  };

  const handleDelete = (itemToDelete, category) => {
    if (tabValue === 0) {
      setSelectedItemsTab1({
        ...selectedItemsTab1,
        [category]: selectedItemsTab1[category].filter((item) => item !== itemToDelete),
      });
    } else {
      setSelectedItemsTab2({
        ...selectedItemsTab2,
        [category]: selectedItemsTab2[category].filter((item) => item !== itemToDelete),
      });
    }
  };

  const getSelectableItems = () => {
    return tabValue === 0
      ? {
        categories: diseaseData.categoriesTab1 || {},
        selectedItems: selectedItemsTab1 || {},
      }
      : {
        categories: diseaseData.categoriesTab2 || {},
        selectedItems: selectedItemsTab2 || {},
      };
  };

  const { categories = {}, selectedItems } = getSelectableItems();
  const subItems = selectedCategory && categories[selectedCategory] ? categories[selectedCategory] : [];

  const handleReset = () => {
    setSelectedItemsTab1({});
    setSelectedItemsTab2({});
    sessionStorage.setItem(`${disease}_selectedItemsTab1`, JSON.stringify({}));
    sessionStorage.setItem(`${disease}_selectedItemsTab2`, JSON.stringify({}));
  };


  const handleAnalyze = async (analysisType) => {

    setLoading(true); // 로딩 상태 활성화

    const resultToSendTab1 = {};
    const headersToSendTab2 = [];

    // selectedItemsTab1에서 데이터 추출
    Object.keys(selectedItemsTab1).forEach((category) => {
      const tab1Categories = diseaseSpecificData[disease]?.categoriesTab1 || {};
      if (tab1Categories[category]) {
        selectedItemsTab1[category].forEach((item) => {
          const foundOption = tab1Categories[category].find(opt => opt.label === item.label);
          if (foundOption && foundOption.options) {
            const selectedOption = foundOption.options.find(opt => opt.display === item.value);
            if (selectedOption) {
              resultToSendTab1[foundOption.value] = selectedOption.send !== undefined ? selectedOption.send : "";
            }
          } else {
            resultToSendTab1[item.label] = item.value !== undefined ? item.value : "";
          }
        });
      }
    });

    // selectedItemsTab2에서 데이터 추출
    Object.keys(selectedItemsTab2).forEach((category) => {
      const tab2Categories = diseaseSpecificData[disease]?.categoriesTab2 || {};
      const items = selectedItemsTab2[category] || [];

      if (tab2Categories[category]) {
        items.forEach((item) => {
          const foundOption = tab2Categories[category].find(opt => opt.label === item.label);
          if (foundOption && foundOption.options) {
            const selectedOption = foundOption.options.find(opt => opt.display === item.value);
            if (selectedOption) {
              headersToSendTab2.push(selectedOption.send !== undefined ? selectedOption.send : "");
            }
          } else if (foundOption) {
            headersToSendTab2.push(foundOption.value !== undefined ? foundOption.value : "");
          }
        });
      }
    });

    const finalData = {
      ...resultToSendTab1,
      DISEASE_CLASS: disease,
      fileIds: analysisType === 'json' ? ['json'] : analysisType === 'file' ? fileId : null,
      header: headersToSendTab2,
    };


    try {
      const response = await fetchFilteredPatientData(finalData);
      console.log('서버 응답:', response);

      // 서버 응답이 올바르게 들어오는지 확인
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.error('서버에서 데이터가 없습니다.');
        setLoading(false); // 로딩 상태 해제
        return;
      }

      // 서버에서 받은 데이터 처리
      const processedTableData = processServerData(response);  // 테이블 데이터 처리
      const processedChartData = processChartData(response);   // 차트 데이터 처리

      // 전역 상태에 테이블 데이터 설정 (기존 기능)
      if (typeof setTableData === 'function') {
        setTableData(processedTableData);
      } else {
        console.error('setTableData is not a function');
      }

      // 전역 상태에 차트 데이터 설정 (차트 데이터를 추가로 처리)
      if (typeof setChartData === 'function') {
        setChartData(processedChartData);
      } else {
        console.error('setChartData is not a function');
      }

      onAnalyze();  // 원래 기능 호출
    } catch (error) {
      alert('파일을 찾을 수 없습니다. 파일을 다시 업로드 해주세요.');
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <Container collapsed={collapsed}>
      <FlexBox>
        <StyledTabs value={tabValue} onChange={handleTabChange}>
          <StyledTab label="데이터 구성 항목" />
          <StyledTab label="리포트 항목" />
        </StyledTabs>
        <ButtonGroup>
          <ButtonStyled
            type="button"
            onClick={() => handleAnalyze(true)} // 업로드 데이터 분석
            disabled={!fileId}
            style={{ marginRight: '80px' }}
          >
            업로드 데이터 분석
            <img src={chartIcon} alt="아이콘" />
          </ButtonStyled>
          <ButtonStyled
            type="button"
            onClick={() => handleAnalyze(false)} // 서버 데이터 분석
          >
            CRF 데이터 분석
            <img src={chartIcon} alt="아이콘" />
          </ButtonStyled>

          <ButtonStyled
            type="button"
            onClick={() => handleAnalyze('json')} // JSON 분석
          >
            Json 데이터 분석
            <img src={chartIcon} alt="아이콘" />
          </ButtonStyled>

        </ButtonGroup>
      </FlexBox>



      <Collapse in={open}>
        <ListContainer>
          <Section>
            <LabelContainer>
              <Label>대분류</Label>
              <VerticalDivider />
            </LabelContainer>
            <StyledList>
              {Object.keys(categories).map((category) => (
                <StyledButtonItem
                  key={category}
                  selected={category === selectedCategory}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </StyledButtonItem>
              ))}
            </StyledList>
          </Section>

          <Section>
            <LabelContainer>
              <Label>중분류</Label>
              <VerticalDivider />
            </LabelContainer>

            {tabValue === 0 && selectedCategory ? (
              <SelectWrapper>
                {subItems.map((subItem) => (
                  <div key={subItem.label || subItem}>
                    <Label>{subItem.label || subItem}</Label>
                    {subItem.options ? (
                      <SelectField
                        value={selectedItems[selectedCategory]?.find(item => item.label === subItem.label)?.value || ''}
                        onChange={(event) => handleItemClick({ label: subItem.label, value: event.target.value }, selectedCategory)}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>ALL</em>
                        </MenuItem>
                        {subItem.options.map((option) => (
                          <MenuItem key={option.display} value={option.display}>
                            {option.display}
                          </MenuItem>
                        ))}
                      </SelectField>
                    ) : (
                      <TextFieldStyled
                        type="text"
                        value={subItem.value || ''}
                        disabled
                      />
                    )}
                  </div>
                ))}
              </SelectWrapper>
            ) : (
              <SubList>
                {subItems.map((subItem) => {
                  const isSelected =
                    Array.isArray(selectedItems[selectedCategory]) &&
                    selectedItems[selectedCategory].some(
                      (item) => (typeof item === 'object' ? item.label === subItem.label : item === subItem)
                    );

                  return (
                    <SubListItem
                      key={subItem.label || subItem}
                      selected={isSelected}
                      onClick={() => handleItemClick(subItem, selectedCategory)}
                    >
                      <span
                        style={{
                          color: isSelected ? '#DD7610' : 'black',
                          fontSize: '10px',
                        }}
                      >
                        {subItem.label || subItem}
                      </span>
                    </SubListItem>
                  );
                })}
              </SubList>
            )}
          </Section>
        </ListContainer>
      </Collapse>

      <SelectedItemsBox>
        <ChipsContainer>
          {Object.entries(selectedItems)
            .filter(([category, items]) => category && items.length > 0)
            .flatMap(([category, items]) => {
              if (tabValue === 0) {
                return Array.isArray(items) ? items.map((item, index) => (
                  <SmallChip
                    key={`${category}-${item.label || item}-${index}`}
                    label={`${item.label ? `${item.label}: ${item.value || ''}` : item}`}
                    onDelete={() => handleDelete(item, category)}
                  />
                )) : [];
              } else if (tabValue === 1) {
                return Array.isArray(items) ? items.map((item, index) => (
                  <SmallChip
                    key={`${category}-${item.label}-${index}`}
                    label={item.label ? `${item.label}` : item}
                    onDelete={() => handleDelete(item, category)}
                  />
                )) : [];
              }
              return [];
            })}
        </ChipsContainer>

        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
          sx={{
            padding: '2px 6px',  // 상하, 좌우 패딩 조절
            fontSize: '0.7rem',   // 글자 크기 조절
            minWidth: 'auto',     // 버튼의 최소 너비 설정
          }}
        >
          초기화
        </Button>
      </SelectedItemsBox>

      {loading && (
        <LoadingOverlay>
          <LoadingMessage>
            <Spinner />
            <p>로딩 중...</p>
          </LoadingMessage>
        </LoadingOverlay>
      )}
    </Container>
  );
};

export default DataSelection;
