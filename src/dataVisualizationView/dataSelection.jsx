import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton, Chip, Tabs, Tab, Collapse, MenuItem, Select, TextField, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import chartIcon from '../assets/images/chart-button-black.svg';
import { diseaseSpecificData } from '../utils/diseaseData';

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
  min-width: 70px;
  font-size: 0.8rem;
  margin-right: 8px;
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

  const [tabValue, setTabValue] = useState(0);
  const [selectedItemsTab1, setSelectedItemsTab1] = useState(diseaseData.selectedItemsTab1);
  const [selectedItemsTab2, setSelectedItemsTab2] = useState(diseaseData.selectedItemsTab2);
  const [open, setOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');

  useEffect(() => {
    setSelectedItemsTab1(diseaseData.selectedItemsTab1);
    setSelectedItemsTab2(diseaseData.selectedItemsTab2);
  }, [disease, diseaseData.selectedItemsTab1, diseaseData.selectedItemsTab2]);

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

    const itemLabel = typeof subItem === 'object' ? subItem.label : subItem;

    if (type === '환자정보') {
      setSelectedItems({
        ...selectedItems,
        [type]: {
          ...selectedItems[type],
          [subItem.label]: subItem.value,
        },
      });
    } else {
      if (selectedItems[selectedCategory]?.includes(itemLabel)) {
        setSelectedItems({
          ...selectedItems,
          [selectedCategory]: selectedItems[selectedCategory].filter((item) => item !== itemLabel),
        });
      } else {
        setSelectedItems({
          ...selectedItems,
          [selectedCategory]: [...selectedItems[selectedCategory], itemLabel],
        });
      }
    }
  };

  const handleInstitutionChange = (event) => {
    setSelectedInstitution(event.target.value);
    handleItemClick(event.target.value);
  };

  const getSelectableItems = () => {
    return tabValue === 0
      ? {
          categories: diseaseData.categoriesTab1,
          institutions: diseaseData.institutions,
          genders: diseaseData.genders,
          selectedItems: selectedItemsTab1,
        }
      : {
          categories: diseaseData.categoriesTab2,
          selectedItems: selectedItemsTab2,
        };
  };

  const { categories, institutions, selectedItems } = getSelectableItems();
  const subItems = selectedCategory && categories[selectedCategory] ? categories[selectedCategory] : [];

  const handleReset = () => {
    setSelectedItemsTab1(diseaseData.selectedItemsTab1);
    setSelectedItemsTab2(diseaseData.selectedItemsTab2);
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
                        <MenuItem key={institution.value} value={institution.value}>
                          {institution.label}
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
                subItems.map((subItem) => {
                    const isSelected = selectedItems[selectedCategory]?.some(
                      (item) => (item.label ? item.label === subItem.label : item === subItem)
                    );

                    return (
                      <SubListItem
                        key={subItem.label || subItem}
                        selected={isSelected}
                        >
                        <span
                          onClick={() => handleItemClick(subItem)}
                          style={{
                            color: isSelected ? '#DD7610' : 'black',
                            fontSize: '12px',
                          }}
                        >
                          {subItem.label || subItem}
                        </span>
                      </SubListItem>
                    );
                  })
                )}
              </SubList>
          </Section>
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
                  key={`${category}-${item.label || item}`}
                  label={typeof item === 'object' ? item.label : item}
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
          onClick={handleReset}
        >
          초기화
        </Button>
      </SelectedItemsBox>
    </Container>
  );
};

export default DataSelection;
