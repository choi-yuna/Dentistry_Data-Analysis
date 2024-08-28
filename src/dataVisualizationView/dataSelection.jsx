import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, ListItemText, Chip, Tabs, Tab, Collapse, MenuItem, Select, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandLessIcon from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import chartIcon from '../assets/images/chart-botton-black.svg'; // 아이콘 이미지 임포트

// Styled Components
const Container = styled.div`
  width: 100%;
  margin-top: 20px; 
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center; /* Center align items vertically */
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
  padding: 8px; 
  background-color: #fff;
`;

const StyledList = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  padding-right: 8px; 
  max-height: 180px; 
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px; 
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
  flex-wrap: wrap; /* 컨텐츠가 화면을 넘을 경우 줄바꿈을 하도록 설정 */
  gap: 8px; 
`;

const StyledListItem = styled.div`
  padding: 4px;
  background-color: ${({ selected }) => (selected ? '#f0f0f0' : 'inherit')};
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubListItem = styled(StyledListItem)`
  background-color: inherit; 
  color: ${({ selected }) => (selected ? 'blue' : 'black')}; 
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px; /* 간격을 조금 줄였습니다 */
  margin-top : 4px;
`;

const Label = styled.label`
  min-width: 40px; 
  font-size: 16px; /* 폰트 크기를 더 줄였습니다 */
  margin-left : 10px;
`;

const SelectField = styled(Select)`
  min-width: 70px;
  font-size: 0.8rem;

  .MuiSelect-select {
    padding: 0px 4px;
    font-size: 0.8rem;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .MuiOutlinedInput-input {
    padding: 4px;
    font-size: 0.8rem;
    height: 30px;
    line-height: 1.2;
  }

  .MuiInputBase-root {
    font-size: 0.8rem;
    height: 30px;
  }
`;

const TextFieldStyled = styled(TextField)`
  min-width: 80px;
  font-size: 0.8rem;
  height: 30px;

  .MuiInputBase-root {
    font-size: 0.8rem;
    height: 30px;
  }

  .MuiOutlinedInput-input {
    padding: 4px;
    font-size: 0.8rem;
    height: 30px;
    box-sizing: border-box;
  }

  .MuiOutlinedInput-root {
    & fieldset {
      border-color: rgba(0, 0, 0, 0.23);
    }
    &:hover fieldset {
      border-color: rgba(0, 0, 0, 0.5);
    }
    &.Mui-focused fieldset {
      border-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const ButtonStyled = styled.button`
    padding: 8px 16px;
    background-color: #ffffff;
    color: black;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    height: 36px;
    box-sizing: border-box;
    min-width: 100px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px; /* Adds space between tabs and the button */

    @media (max-width: 768px) {
        width: 100%;
    }

    img {
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }
`;

const SelectedItemsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px; 
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
    '환자정보': {
      '흡연': '',
      '음주': '',
      '성별': '',
    },
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
      if (category === '환자정보') {
        setSelectedItemsTab1({
          ...selectedItemsTab1,
          [category]: {
            ...selectedItemsTab1[category],
            [itemToDelete.split(': ')[0]]: '',
          },
        });
      } else {
        setSelectedItemsTab1({
          ...selectedItemsTab1,
          [category]: selectedItemsTab1[category].filter((item) => item !== itemToDelete),
        });
      }
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

  const handleItemClick = (subItem, type = 'general') => {
    const selectedItems = tabValue === 0 ? selectedItemsTab1 : selectedItemsTab2;
    const setSelectedItems = tabValue === 0 ? setSelectedItemsTab1 : setSelectedItemsTab2;

    if (type === '환자정보') {
      setSelectedItems({
        ...selectedItems,
        [type]: {
          ...selectedItems[type],
          [subItem.label]: subItem.value,
        },
      });
    } else {
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
    }
  };

  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
    handleItemClick(event.target.value);
  };

  const handleSelectChange = (category, value) => {
    handleItemClick({ label: category, value }, '환자정보');
  };

  const getSelectableItems = () => {
    if (tabValue === 0) {
      return {
        categories: {
          '기본 정보(info)': ['기관 선택', '촬영일자', '촬영장비'],
          '환자정보': ['흡연', '음주', '성별'],
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
        if (key === '환자정보') {
          acc[key] = { '흡연': '', '음주': '', '성별': '' };
        } else {
          acc[key] = [];
        }
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
        <ButtonStyled type="submit"> {/* AnalyzeButton 삭제 후 직접 스타일링 적용 */}
          데이터 분석
          <img src={chartIcon} alt="아이콘" />
        </ButtonStyled>
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
                  </SelectField>
                </SelectWrapper>
              </>
            ) : (
              tabValue === 0 && selectedCategory === '환자정보' ? (
                <>
                  <SelectWrapper>
                    <Label>흡연:</Label>
                    <SelectField
                      value={selectedItemsTab1['환자정보']['흡연']}
                      onChange={(e) => handleSelectChange('흡연', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </SelectField>
                  </SelectWrapper>
                  <SelectWrapper>
                    <Label>음주:</Label>
                    <SelectField
                      value={selectedItemsTab1['환자정보']['음주']}
                      onChange={(e) => handleSelectChange('음주', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </SelectField>
                  </SelectWrapper>
                  <SelectWrapper>
                    <Label>성별:</Label>
                    <SelectField
                      value={selectedItemsTab1['환자정보']['성별']}
                      onChange={(e) => handleSelectChange('성별', e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
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
              )
            )}
          </SubList>
        </ListContainer>
      </Collapse>

      <SelectedItemsBox>
        <ChipsContainer>
          {Object.entries(selectedItems).flatMap(([category, items]) => {
            if (category === '환자정보') {
              return Object.entries(items)
                .filter(([key, value]) => value !== '')
                .map(([key, value]) => (
                  <Chip
                    key={`${category}-${key}`}
                    label={`${key}: ${value}`}
                    onDelete={() => handleDelete(`${key}: ${value}`, category)}
                  />
                ));
            } else {
              return items.map((item) => (
                <Chip
                  key={`${category}-${item}`}
                  label={`${item}`}
                  onDelete={() => handleDelete(item, category)}
                />
              ));
            }
          })}
        </ChipsContainer>
        <ButtonStyled
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
        >
          초기화
        </ButtonStyled>
      </SelectedItemsBox>
    </Container>
  );
};

export default DataSelection;