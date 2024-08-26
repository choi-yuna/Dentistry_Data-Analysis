import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const MenuBarContainer = styled.div`
  width: ${(props) => (props.collapsed ? '0px' : '210px')};
  height: 650px;
  background-color: #003250;
  padding: 10px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
`;

const InnerContainer = styled.div`
  width: 90%;
  height: 80%;
  background-color: white;
  border-radius: 5px;
  padding: ${(props) => (props.collapsed ? '10px 0' : '10px')};
  display: ${(props) => (props.collapsed ? 'none' : 'block')};
  transition: padding 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 70px;
  left: ${(props) => (props.collapsed ? '10px' : '230px')};
  width: 22px;
  height: 30px;
  background-color: #003250;
  border: none;
  cursor: pointer;
  transition: left 0.3s ease;
`;


const MenuButton = styled.button`
  width: 100%;
  background-color: ${(props) => (props.active ? '#d3d3d3' : '#f5f5f5')};
  border: none;
  padding: 15px;
  margin: 5px 0;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ececec;
  }
`;

const SubMenu = styled.div`
  margin-top: 10px;
  background-color: #d3d3d3;
  padding: 10px;
  border-radius: 5px;
`;

const SubMenuButton = styled.button`
  width: 100%;
  background-color: white;
  border: none;
  padding: 8px;
  margin: 3px 0;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #ececec;
  }
`;

const MenuBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <ToggleButton onClick={handleToggle} collapsed={collapsed}>
        {collapsed ? '>' : '<'}
      </ToggleButton>
      <MenuBarContainer collapsed={collapsed}>
        <InnerContainer collapsed={collapsed}>
          <MenuButton>데이터 품질 평가</MenuButton>
          <MenuButton active={showSubMenu} onClick={() => setShowSubMenu(!showSubMenu)}>
            데이터 분석 가시화
          </MenuButton>
          {showSubMenu && (
            <SubMenu>
              <SubMenuButton>All</SubMenuButton>
              <SubMenuButton>치주질환</SubMenuButton>
              <SubMenuButton>악골골수염</SubMenuButton>
              <SubMenuButton>두개안면</SubMenuButton>
              <SubMenuButton>구강암</SubMenuButton>
            </SubMenu>
          )}
        </InnerContainer>
      </MenuBarContainer>
    </>
  );
};

export default MenuBar;
