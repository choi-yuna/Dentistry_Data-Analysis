import React, { useState, useEffect,useContext  } from 'react';
import styled from 'styled-components';
import { IconButton, Chip, Tabs, Tab, Collapse, MenuItem, Select, TextField, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import chartIcon from '../assets/images/chart-button-black.svg';
import { diseaseSpecificData } from '../utils/diseaseData';
import { DataSelectionContext } from '../context/DataSelectionContext';

const Container = styled.div`
  width: ${(props) => (props.collapsed ? '95%' : '95%')};
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
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 0 0 8px 8px;
  padding: 8px;
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
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const StyledButtonItem = styled.button`
  padding: 6px 8px;
  background-color: ${({ selected }) => (selected ? '#DD7610' : '#f0f0f0')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  border: 1px solid ${({ selected }) => (selected ? '#DD7610' : '#ccc')};
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 13px;
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
  gap: 8px;
  margin-top: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
`;

const SelectField = styled(Select)`
  min-width: 100px;  // 너비 조정
  font-size: 0.8rem;
  height: 30px;      // 높이 조정
  margin-right: 8px;
  margin-bottom: 8px;

  .MuiSelect-select {
    padding: 7px;    // 내부 여백 조정
    font-size: 0.8rem;
    height: 36px;
    display: flex;
    align-items: center;
  }

  .MuiOutlinedInput-input {
    padding: 8px;    // 입력 필드 패딩
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

const ButtonStyled = styled.button`
  padding: 8px 16px;
  background-color: #ffffff;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  height: 36px;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const SelectedItemsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
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

const DataSelection = ({ collapsed, onAnalyze, disease }) => {
    const diseaseData = diseaseSpecificData[disease] || diseaseSpecificData.default;

    // Context에서 상태와 setter 함수를 가져옴
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

    const [open, setOpen] = useState(true);

    // 질환이 변경될 때 해당 질환의 저장된 선택 항목을 불러옴
    useEffect(() => {
        // 첫 로딩 시에만 로컬 스토리지에서 데이터를 불러옴
        const savedTab1 = localStorage.getItem(`${disease}_selectedItemsTab1`);
        const savedTab2 = localStorage.getItem(`${disease}_selectedItemsTab2`);
      
        // 탭1 (데이터 구성 항목) 불러오기
        if (savedTab1) {
          const parsedTab1 = JSON.parse(savedTab1);
          setSelectedItemsTab1(parsedTab1);
        } else {
          setSelectedItemsTab1(diseaseData.selectedItemsTab1);
        }
      
        // 탭2 (리포트 항목) 불러오기
        if (savedTab2) {
          const parsedTab2 = JSON.parse(savedTab2);
          setSelectedItemsTab2(parsedTab2);
        } else {
          setSelectedItemsTab2(diseaseData.selectedItemsTab2);
        }
      }, [disease, diseaseData, setSelectedItemsTab1, setSelectedItemsTab2]);
      
    
      // 탭 변경 시 로컬 스토리지에서 항목 불러오기
      const handleTabChange = (event, newValue) => {
        setTabValue(newValue);  // 탭을 변경할 때 상태만 변경
        setSelectedCategory(''); // 카테고리 초기화
      };
      
    
      const handleToggle = () => {
        setOpen((open) => !open);
      };
    
      const handleCategorySelect = (category) => {
        setSelectedCategory(category);
      };
    
      const handleItemClick = (selected, category) => {
        const selectedItems = tabValue === 0 ? selectedItemsTab1 : selectedItemsTab2;
        const setSelectedItems = tabValue === 0 ? setSelectedItemsTab1 : setSelectedItemsTab2;
      
        const categoryItems = Array.isArray(selectedItems[category]) ? selectedItems[category] : [];
      
        // 항목이 이미 선택되어 있는지 확인
        const existingItemIndex = categoryItems.findIndex(item =>
          typeof item === 'object' ? item.label === selected.label : item === selected
        );
      
        if (existingItemIndex !== -1) {
          // 항목이 이미 선택되어 있으면 제거 (토글 방식)
          const updatedItems = [...categoryItems];
          updatedItems.splice(existingItemIndex, 1);
          setSelectedItems({
            ...selectedItems,
            [category]: updatedItems,
          });
        } else {
          // 항목이 선택되지 않은 경우에만 추가
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
              categories: diseaseData.categoriesTab1,
              selectedItems: selectedItemsTab1,
            }
          : {
              categories: diseaseData.categoriesTab2,
              selectedItems: selectedItemsTab2,
            };
      };
    
      const { categories, selectedItems } = getSelectableItems();
      const subItems = selectedCategory && categories[selectedCategory] ? categories[selectedCategory] : [];
    
      const handleReset = () => {
        setSelectedItemsTab1(diseaseData.selectedItemsTab1);
        setSelectedItemsTab2(diseaseData.selectedItemsTab2);
      };
    
      const handleTabResult = (e) => {
        e.preventDefault();

 console.log('데이터 구성 항목:', selectedItemsTab1);
  console.log('리포트 항목:', selectedItemsTab2);

        onAnalyze();
      };
    
  return (
    <Container collapsed={collapsed}>
      <FlexBox>
        <StyledTabs value={tabValue} onChange={handleTabChange}>
          <StyledTab label="데이터 구성 항목" />
          <StyledTab label="리포트 항목" />
        </StyledTabs>
        <ButtonStyled type="button" onClick={handleTabResult}>
          데이터 분석
          <img src={chartIcon} alt="아이콘" />
        </ButtonStyled>
        <IconButton onClick={handleToggle} size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
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
            value={selectedItems[selectedCategory]?.find(item => item.label === subItem.label)?.value || ''} // 선택된 값
            onChange={(event) => handleItemClick({ label: subItem.label, value: event.target.value }, selectedCategory)} // 값 변경 시 반영
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
            onClick={() => handleItemClick(subItem)}
          >
            <span
              style={{
                color: isSelected ? '#DD7610' : 'black',
                fontSize: '12px',
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
    .filter(([category, items]) => category && items.length > 0)  // category가 유효한지 확인
    .flatMap(([category, items]) => {
      if (tabValue === 0) {
        return Array.isArray(items) ? items.map((item, index) => (
          <Chip
            key={`${category}-${item.label || item}-${index}`}  // index 추가
            label={`${item.label ? `${item.label}: ${item.value || ''}` : item}`}
            onDelete={() => handleDelete(item, category)}
          />
        )) : [];
      } else if (tabValue === 1) {
        return Array.isArray(items) ? items.map((item, index) => (
          <Chip
            key={`${category}-${item}-${index}`}  // index 추가
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
  >
    초기화
  </Button>
</SelectedItemsBox>
    </Container>
  );
};

export default DataSelection;
