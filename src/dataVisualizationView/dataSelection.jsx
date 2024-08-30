import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, ListItemText, Chip, Tabs, Tab, Collapse, MenuItem, Select, TextField, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import chartIcon from '../assets/images/chart-button-black.svg';


const Container = styled.div`
  width:${(props) => (props.collapsed ? '90%' : '90%')};
  margin-top: 5px; 
  transition: width 1s ease, height 0.3s ease;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center; 
`;

const StyledTabs = styled(Tabs)`
  border: 1px solid #ccc;
  border-radius: 8px 8px 0 0;

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
  border-radius: 0 0 8px 8px;

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
  flex-direction: row; 
  flex-wrap: wrap;
  gap: 8px; 
`;

const StyledListItem = styled.div`
  padding: 4px;
  background-color: ${({ selected }) => (selected ? '#f0f0f0' : 'inherit')};
  border-radius: 4px;
  margin-bottom: 4px;
  cursor: ${({ isTextSelected }) => (isTextSelected ? 'copy' : 'pointer')};
  

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubListItem = styled(StyledListItem)`
  background-color: inherit; 
  color: ${({ selected }) => (selected ? '#DD7610' : 'black')}; 
  margin-left: 15px;
   &:hover {
    background-color: inherit; /* 호버할 때 배경색이 변경되지 않도록 설정 */
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px; /* 간격을 조금 줄였습니다 */
  margin-top : 4px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: flex-start;
border: 1px solid #ccc; /* 테두리 추가 */
  box-sizing: border-box; /* 테두리가 추가되었으므로 박스 크기를 포함하도록 설정 */
`;

const Label = styled.label`
  min-width: 40px; 
  font-size: 16px; /* 폰트 크기를 더 줄였습니다 */
  text-align: center; /* 텍스트를 중앙 정렬 */
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

const DataSelection = ({collapsed, onAnalyze}) => {
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
    '기본 정보': [],
    '환자 정보': [],
    '질병력': [],
    '진단정보별 환자 수': [],
    '환자 수': [],
    '환자 수2': [],
    '추가 정보1': [],
    '추가 정보2': [],
  });
  const [open, setOpen] = useState(false);
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
    setOpen((open) => !open);
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
        },
        institutions: ['기관1', '기관2', '기관3'],
        genders: ['남자', '여자'],
        selectedItems: selectedItemsTab1,
      };
    } else {
      return {
        categories: {
          '기본 정보': ['기관', '촬영일자', '촬영장비'],
          '환자 정보': ['성별', '나이', '체중','키'],
          '질병력': ['당뇨','고혈압','골다공증'],
          '진단정보별 환자 수': ['질환명', '진단코드', '진단일자'],
          '환자 수': ['질환명', '진단코드', '진단일자'],
          '환자 수2': ['질환명', '진단코드', '진단일자'],
          '추가 정보1': ['정보A', '정보B', '정보C'],
          '추가 정보2': ['정보D', '정보E', '정보F'],
        },
        institutions: [],
        selectedItems: selectedItemsTab2,
      };
    }
  };

  const { categories, institutions, genders, selectedItems } = getSelectableItems();
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

const handleTabResult = (e) => {
  e.preventDefault();
  onAnalyze();
};


  return (
    <Container collapsed={collapsed}>
      <FlexBox>
        <StyledTabs value={tabValue} onChange={handleTabChange}>
          <StyledTab label="데이터 구성 항목" />
          <StyledTab label="리포트 항목" />
        </StyledTabs>
        <ButtonStyled  type="button" onClick={handleTabResult}> 
          데이터 분석
          <img src={chartIcon} alt="아이콘" />
        </ButtonStyled>
            <IconButton onClick={handleToggle} size="small">
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}          
            </IconButton>
      </FlexBox>

      <Collapse in={open}>
        <LabelRow>
          <Label style={{ width: '21%' }}>대분류</Label>
          <Label style={{ width: '79%' }}>중분류</Label>
        </LabelRow>
        <ListContainer>
          <StyledList>
            {Object.keys(categories).map((category) => (
              <StyledListItem key={category} selected={category === selectedCategory}>
                <ListItemText primary={category} onClick={() => handleCategorySelect(category)} />
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
                            {genders.map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </SelectField>
                    </SelectWrapper>

                </>
              ) : (
                subItems.map((subItem) => (
                  <SubListItem
                    key={subItem}
                    selected={selectedItems[selectedCategory]?.includes(subItem)}
                  >
                    <ListItemText
                      primary={subItem}
                      onClick={() => handleItemClick(subItem)}
                      style={{
                        color: selectedItems[selectedCategory]?.includes(subItem) ? '#DD7610' : 'black',
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
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleReset}  // 전체 초기화 핸들러 호출
        >
          초기화
        </Button>
      </SelectedItemsBox>
    </Container>
  );
};

export default DataSelection;
