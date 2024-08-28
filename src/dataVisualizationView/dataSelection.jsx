import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, ListItemText, Chip, Tabs, Tab, Collapse, Button, MenuItem, Select, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Styled Components
const Container = styled.div`
  width: 100%;
  margin-top: 20px; /* 여백을 약간 줄입니다 */
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTabs = styled(Tabs)`
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StyledTab = styled(Tab)`
  flex-grow: 1;
  min-width: 0;
  &.Mui-selected {
    color: #000000;
    font-weight: bold;
    border: 1px solid #000;
    z-index: 1;
    border-bottom: none;
  }
`;

const ListContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px; /* 패딩을 줄여서 전체 크기를 줄입니다 */
  background-color: #fff;
`;

const StyledList = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  padding-right: 8px; /* 패딩을 줄여서 더 컴팩트하게 만듭니다 */
  max-height: 180px; /* 높이도 조금 줄였습니다 */
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바를 더 작게 */
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const SubList = styled.div`
  width: 80%;
  display: flex;
  
  gap: 8px; /* 요소 사이의 간격을 줄입니다 */
`;

const StyledListItem = styled.div`
  padding: 4px; /* 패딩을 줄여서 더 작은 크기로 만듭니다 */
  background-color: ${({ selected }) => (selected ? '#f0f0f0' : 'inherit')};
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubListItem = styled(StyledListItem)`
  background-color: inherit; /* 배경색 변경을 해제 */
  color: ${({ selected }) => (selected ? 'blue' : 'black')}; /* 선택된 경우 글자 색상만 변경 */
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  min-width: 60px; /* 레이블의 최소 너비를 설정하여 정렬을 개선 */
`;

const SelectField = styled(Select)`
  min-width: 120px; /* 셀렉트 박스의 최소 너비를 설정하여 더 작게 조정 */
`;

const TextFieldStyled = styled(TextField)`
  min-width: 120px; /* 텍스트 필드의 최소 너비를 설정하여 더 작게 조정 */
`;

const SelectedItemsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px; /* 패딩을 줄입니다 */
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DataSelection = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedItemsTab1, setSelectedItemsTab1] = useState({
    '기본 정보(info)': [],
    '환자정보': [],
    '진단정보별 환자 수': [],
    '환자 수': [],
    '환자 수2': [],
    '추가 정보1': [],
    '추가 정보2': [],
  });
  const [selectedItemsTab2, setSelectedItemsTab2] = useState({
    '리포트 정보 1': [],
    '리포트 정보 2': [],
    '리포트 정보 3': [],
  });
  const [open, setOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedCategory('');
    setSelectedInstitution('');
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

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (subItem) => {
    const selectedItems = tabValue === 0 ? selectedItemsTab1 : selectedItemsTab2;
    const setSelectedItems = tabValue === 0 ? setSelectedItemsTab1 : setSelectedItemsTab2;

    if (selectedItems[selectedCategory]?.includes(subItem)) {
      setSelectedItems({
        ...selectedItems,
        [selectedCategory]: selectedItems[selectedCategory].filter((item) => item !== subItem),
      });
    } else {
      setSelectedItems({
        ...selectedItems,
        [selectedCategory]: [...selectedItems[selectedCategory], subItem],
      });
    }
  };

  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
    handleItemClick(event.target.value);
  };

  const getSelectableItems = () => {
    if (tabValue === 0) {
      return {
        categories: {
          '기본 정보(info)': ['기관 선택', '촬영일자', '촬영장비'],
          '환자정보': ['환자명', '환자번호', '생년월일'],
          '진단정보별 환자 수': ['질환명', '진단코드', '진단일자'],
          '환자 수': ['질환명', '진단코드', '진단일자'],
          '환자 수2': ['질환명', '진단코드', '진단일자'],
          '추가 정보1': ['정보A', '정보B', '정보C'],
          '추가 정보2': ['정보D', '정보E', '정보F'],
        },
        institutions: ['기관1', '기관2', '기관3'],
        selectedItems: selectedItemsTab1,
      };
    } else {
      return {
        categories: {
          '리포트 정보 1': ['보고서 유형', '작성자', '생성일자','생성일자2','생성일자3','생성일자','fds'],
          '리포트 정보 2': ['검토자', '승인자', '발행일자'],
          '리포트 정보 3': ['프로젝트명', '클라이언트명', '프로젝트 기간'],
        },
        institutions: [],
        selectedItems: selectedItemsTab2,
      };
    }
  };

  const { categories, institutions, selectedItems } = getSelectableItems();
  const subItems = selectedCategory ? categories[selectedCategory] : [];

  const handleReset = () => {
    if (tabValue === 0) {
      const resetItems = Object.keys(selectedItemsTab1).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {});
      setSelectedItemsTab1(resetItems);
    } else {
      const resetItems = Object.keys(selectedItemsTab2).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {});
      setSelectedItemsTab2(resetItems);
    }
    setSelectedInstitution('');
  };

  return (
    <Container>
      <FlexBox>
        <StyledTabs value={tabValue} onChange={handleTabChange}>
          <StyledTab label="데이터 구성 항목" />
          <StyledTab label="리포트 항목" />
        </StyledTabs>
        <IconButton onClick={handleToggle} size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </FlexBox>

      <Collapse in={open}>
        <ListContainer>
          <StyledList>
            {Object.keys(categories).map((category) => (
              <StyledListItem
                key={category}
                selected={category === selectedCategory}
                onClick={() => handleCategorySelect(category)}
              >
                <ListItemText primary={category} />
              </StyledListItem>
            ))}
          </StyledList>
          <SubList>
            {tabValue === 0 && selectedCategory === '기본 정보(info)' ? (
              <>
                <SelectWrapper>
                  <Label>기관:</Label>
                  <SelectField
                    value={selectedInstitution}
                    onChange={handleInstitutionChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>ALL</em>
                    </MenuItem>
                    {institutions.map((institution) => (
                      <MenuItem key={institution} value={institution}>
                        {institution}
                      </MenuItem>
                    ))}
                  </SelectField>
                </SelectWrapper>
                <SelectWrapper>
                  <Label>촬영일자:</Label>
                  <TextFieldStyled
                    type="date"
                    defaultValue=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </SelectWrapper>
                <SelectWrapper>
                  <Label>촬영장비:</Label>
                  <SelectField displayEmpty>
                    <MenuItem value="">
                      <em>장비 선택</em>
                    </MenuItem>
                    {/* 장비 목록을 여기에 추가할 수 있습니다 */}
                  </SelectField>
                </SelectWrapper>
              </>
            ) : (
              subItems.map((subItem) => (
                <SubListItem
                  key={subItem}
                  selected={selectedItems[selectedCategory]?.includes(subItem)}
                  onClick={() => handleItemClick(subItem)}
                >
                  <ListItemText
                    primary={subItem}
                    style={{
                      color: selectedItems[selectedCategory]?.includes(subItem) ? 'blue' : 'black',
                    }}
                  />
                </SubListItem>
              ))
            )}
          </SubList>
        </ListContainer>
      </Collapse>

      <SelectedItemsBox>
        <ChipsContainer>
          {Object.entries(selectedItems)
            .flatMap(([category, items]) =>
              items.map((item) => (
                <Chip
                  key={`${category}-${item}`}
                  label={`${item}`}
                  onDelete={() => handleDelete(item, category)}
                />
              ))
            )}
        </ChipsContainer>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
        >
          초기화
        </Button>
      </SelectedItemsBox>
    </Container>
  );
};

export default DataSelection;
