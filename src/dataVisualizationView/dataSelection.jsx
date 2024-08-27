import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, ListItemText, Chip, Tabs, Tab, Collapse, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Styled Components
const Container = styled.div`
  width: 100%;
  padding: 16px;
  margin-top: 64px; /* 상단바에 가리지 않도록 여백 추가 */
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledTabs = styled(Tabs)`
  border: 1px solid #ccc; /* 탭 전체에 테두리 추가 */
  border-radius: 8px; /* 테두리를 둥글게 */
`;

const StyledTab = styled(Tab)`
  &.Mui-selected {
    color: #000; /* 선택된 탭의 텍스트 색상 */
    font-weight: bold; /* 선택된 탭의 글씨를 진하게 */
    border: 2px solid #000; /* 선택된 탭의 테두리를 검정색으로 */
    z-index: 1; /* 선택된 탭이 다른 탭보다 위에 보이도록 설정 */
    border-bottom: none; /* 선택된 탭의 하단 테두리 제거 */
  }
`;

const ListContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
`;

const StyledList = styled.div`
  width: 25%;
  border-right: 1px solid #ccc;
`;

const StyledListItem = styled.div`
  padding: 8px;
  background-color: ${({ selected }) => (selected ? '#f0f0f0' : 'inherit')};
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SelectedItemsBox = styled.div`

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
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
  });
  const [selectedItemsTab2, setSelectedItemsTab2] = useState({
    '리포트 정보 1': [],
    '리포트 정보 2': [],
    '리포트 정보 3': [],
  });
  const [open, setOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedCategory(''); // 탭 변경 시 카테고리 초기화
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
      // 이미 선택된 항목이면 선택 해제
      setSelectedItems({
        ...selectedItems,
        [selectedCategory]: selectedItems[selectedCategory].filter((item) => item !== subItem),
      });
    } else {
      // 선택되지 않은 항목이면 선택
      setSelectedItems({
        ...selectedItems,
        [selectedCategory]: [...selectedItems[selectedCategory], subItem],
      });
    }
  };

  // 탭에 따른 선택 항목 리스트를 정의
  const getSelectableItems = () => {
    if (tabValue === 0) {
      return {
        categories: {
          '기본 정보(info)': ['기관', '촬영일자', '성별'],
          '환자정보': ['환자명', '환자번호', '생년월일'],
          '진단정보별 환자 수': ['질환명', '진단코드', '진단일자'],
        },
        selectedItems: selectedItemsTab1,
      };
    } else {
      return {
        categories: {
          '리포트 정보 1': ['보고서 유형', '작성자', '생성일자'],
          '리포트 정보 2': ['검토자', '승인자', '발행일자'],
          '리포트 정보 3': ['프로젝트명', '클라이언트명', '프로젝트 기간'],
        },
        selectedItems: selectedItemsTab2,
      };
    }
  };

  const { categories, selectedItems } = getSelectableItems();
  const subItems = selectedCategory ? categories[selectedCategory] : [];

  const handleReset = () => {
    if (tabValue === 0) {
      setSelectedItemsTab1({
        '기본 정보(info)': [],
        '환자정보': [],
        '진단정보별 환자 수': [],
      });
    } else {
      setSelectedItemsTab2({
        '리포트 정보 1': [],
        '리포트 정보 2': [],
        '리포트 정보 3': [],
      });
    }
  };

  return (
    <Container>
      {/* 탭 및 접기/펼치기 버튼 */}
      <FlexBox>
        <StyledTabs value={tabValue} onChange={handleTabChange}>
          <StyledTab label="데이터 구성 항목" />
          <StyledTab label="리포트 항목" />
        </StyledTabs>
        <IconButton onClick={handleToggle} size="small">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </FlexBox>

      {/* 대분류 및 소분류 리스트 */}
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
          <StyledList style={{ width: '50%', paddingLeft: '16px' }}>
            {subItems.map((subItem) => (
              <StyledListItem
                key={subItem}
                onClick={() => handleItemClick(subItem)}
                style={{
                  backgroundColor: selectedItems[selectedCategory]?.includes(subItem)
                    ? 'rgba(0, 123, 255, 0.2)'
                    : 'inherit',
                }}
              >
                <ListItemText
                  primary={subItem}
                  style={{
                    color: selectedItems[selectedCategory]?.includes(subItem) ? 'blue' : 'black',
                  }}
                />
              </StyledListItem>
            ))}
          </StyledList>
        </ListContainer>
      </Collapse>

      {/* 선택된 항목 표시 및 초기화 버튼 */}
      <SelectedItemsBox>
        <ChipsContainer>
          {Object.keys(selectedItems).map((category) =>
            selectedItems[category]?.map((item) => (
              <Chip key={item} label={item} onDelete={() => handleDelete(item, category)} />
            ))
          )}
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
