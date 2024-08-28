import React, { useState } from 'react';
import styled from 'styled-components';
import ClosedIcon from '../assets/images/menubarClose.svg';
import OpenIcon from '../assets/images/menubarOpen.svg';
import PeriodontalDisease from '../assets/images/periodontalDisease.svg';
import AllIcon from '../assets/images/ALL.svg';
import Cancer from '../assets/images/cancer.svg';
import Surface from '../assets/images/surface.svg';
import Osteomyelitis from '../assets/images/osteomyelitis.svg';
import Open from '../assets/images/open.svg';
import Close from '../assets/images/close.svg';
import {  useNavigate } from 'react-router-dom';


const MenuBarContainer = styled.div`
  width: ${(props) => (props.collapsed ? '1%' : '18%')};
  height: 100vh;
  background-color: #003250;
  padding: 7px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease, height 0.3s ease;
  position: relative;
`;

const InnerContainer = styled.div`
  width: 90%;
  height: 75%;
  background-color: white;
  border-radius: 5px;
  padding: ${(props) => (props.collapsed ? '5px 0' : '7px')};
  display: ${(props) => (props.collapsed ? 'none' : 'block')};
  transition: padding 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  width: 22px;
  height: 30px;
  background-color: #003250;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  transform: ${(props) =>
    props.collapsed ? 'translateX(0)' : 'translateX(calc(100% + 10px))'};
`;

const QualityMenuBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.active ? '#909090' : '#FFFFFF')};
  border: none;
  padding: 15px;
  margin: 5px 0;
  font-size: 18px;
  font-family: Inter;
  font-weight: 900; 
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #ececec;
  }
`;

const VisualizeMenuBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.active ? '#E4E4E4' : '#FFFFFF')};
  border: none;
  padding: 15px;
  margin: 5px 0;
  font-size: 18px;
  font-family: Inter;
  font-weight: 900; 
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, padding 0.3s ease, height 0.3s ease;
`;

const SubMenu = styled.div`
  width: 100%;
  background-color: #D9D9D9;
  padding: 10px;
  margin-top: 15px;
  border-radius: 5px;
  margin-left:10px;
  
`;

const SubMenuItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.active ? '#b0b0b0' : 'transparent')};
  padding: 10px;
  margin: 2px 0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0c0c0;
  }
`;

const SubMenuItemIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: width 0.3s ease, height 0.3s ease;
`;

const ToggleIcon = styled.img`
   width: 13px;
   height: 15px;
   margin-right: 2px;
`;




const MenuBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [qualityMenuActive, setQualityMenuActive] = useState(false);

  const navigate = useNavigate();
  
  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

 const handleQualityMenuClick = () => {
    setQualityMenuActive(true);
    setShowSubMenu(false);
    navigate('/');
  };

  const handleVisualizationMenuClick = () => {
    setQualityMenuActive(true);
    setShowSubMenu(!showSubMenu);
    if (!showSubMenu) {
      setShowSubMenu(true);
    }
    navigate('/dataVisualization');
  };
  
  const handleSubMenuItemClick = (item) => {
    setActiveSubMenuItem(item);
     setShowSubMenu(true);
  };

  return (
    <MenuBarContainer collapsed={collapsed}>
      <ToggleButton onClick={handleToggle} collapsed={collapsed}>
            <ToggleIcon src={collapsed ? Close : Open} alt="Toggle Icon" />
      </ToggleButton>
      <InnerContainer collapsed={collapsed}>
        <QualityMenuBtn>
          데이터 품질 평가
          <Icon src={ClosedIcon} alt="Close Icon" onClick={handleQualityMenuClick} />
        </QualityMenuBtn>
        <VisualizeMenuBtn active={showSubMenu} onClick={handleVisualizationMenuClick}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            데이터 분석 가시화
            <Icon 
              src={showSubMenu ? OpenIcon : ClosedIcon} 
              alt="Toggle Icon" 
              style={{ 
                width: showSubMenu ? '25px' : '30px', 
                height: showSubMenu ? '10px' : '30px',
                marginTop: showSubMenu ? 6 : 0,
              }}     
            />
          </div>
          {showSubMenu && (
            <SubMenu>
              <SubMenuItem 
                active={activeSubMenuItem === 'All'}
                onClick={() => handleSubMenuItemClick('All')}
              >
                <SubMenuItemIcon src={AllIcon} alt="All Icon" />
                All
              </SubMenuItem>
              <SubMenuItem 
                active={activeSubMenuItem === '치주질환'}
                onClick={() => handleSubMenuItemClick('치주질환')}
              >
                <SubMenuItemIcon src={PeriodontalDisease} alt="치주질환 Icon" />
                치주질환
              </SubMenuItem>
              <SubMenuItem 
                active={activeSubMenuItem === '악골골수염'}
                onClick={() => handleSubMenuItemClick('악골골수염')}
              >
                <SubMenuItemIcon src={Osteomyelitis} alt="악골골수염 Icon" />
                악골골수염
              </SubMenuItem>
              <SubMenuItem 
                active={activeSubMenuItem === '두개안면'}
                onClick={() => handleSubMenuItemClick('두개안면')}
              >
                <SubMenuItemIcon src={Surface} alt="두개안면 Icon" />
                두개안면
              </SubMenuItem>
              <SubMenuItem 
                active={activeSubMenuItem === '구강암'}
                onClick={() => handleSubMenuItemClick('구강암')}
              >
                <SubMenuItemIcon src={Cancer} alt="구강암 Icon" />
                구강암
              </SubMenuItem>
            </SubMenu>
          )}
        </VisualizeMenuBtn>
      </InnerContainer>
    </MenuBarContainer>
  );
};

export default MenuBar;
