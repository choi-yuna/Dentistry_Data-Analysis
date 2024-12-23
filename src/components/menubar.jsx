import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import ClosedIcon from '../assets/images/menubarClose.svg';
import OpenIcon from '../assets/images/menubarOpen.svg';
import PeriodontalDisease from '../assets/images/periodontalDisease.svg';
import AllIcon from '../assets/images/ALL.svg';
import Cancer from '../assets/images/cancer.svg';
import Surface from '../assets/images/surface.svg';
import Osteomyelitis from '../assets/images/osteomyelitis.svg';
import Open from '../assets/images/open.svg';
import Close from '../assets/images/close.svg';
import { fetchDiseaseData } from '../api/fileUploadApi'


const MenuBarContainer = styled.div`
  width: ${(props) => (props.collapsed ? '1%' : '18%')};
  height: 100vh;
  background-color: #003250;
  padding: 7px;
  margin-top: 57px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease, height 0.3s ease;
  position: fixed;
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
  background-color: ${(props) =>
    props.disabled ? '#E0E0E0' : props.active ? '#E4E4E4' : '#FFFFFF'};
  color: ${(props) => (props.disabled ? '#A0A0A0' : 'inherit')};
  border: none;
  padding: 15px;
  margin: 5px 0;
  font-size: 18px;
  font-family: Inter;
  font-weight: 900; 
  text-align: left;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${(props) => (props.disabled ? '#E0E0E0' : '#E4E4E4')};
  }
`;


const VisualizeMenuBtn = styled(QualityMenuBtn)`
  flex-direction: column;
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
  margin-right: 3px;
  margin-left: -3px;
`;

const MenuBar = ({ collapsed, setCollapsed, onDiseaseSelect }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeSubMenuItem, setActiveSubMenuItem] = useState('All');
  const [activeQuality, setActiveQuality] = useState(false);
  const [activeCompositon, setActiveComposition] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 상태 정의: 비활성화 여부
  const isQualityDisabled = true; // 데이터 품질 평가 비활성화
  const isVisualizationDisabled = true; // 데이터 분석 가시화 비활성화

  // 질환 선택 시 호출되는 함수
  const handleSubMenuItemClick = async (item) => {
    setActiveSubMenuItem(item);
    setShowSubMenu(false);
    onDiseaseSelect(item); // 부모 컴포넌트로 전달

    switch (item) {
      case 'All':
        navigate('/all');
        break;
      case 'A':
        navigate('/periodontalDisease');
        break;
      case 'B':
        navigate('/osteomyelitis');
        break;
      case 'C':
        navigate('/craniofacial');
        break;
      case 'D':
        navigate('/oralCancer');
        break;
      default:
        console.error('Unknown menu item:', item);
        break;
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveComposition(true);
      setActiveSubMenuItem(null);
    } else if (location.pathname === '/dataQuality') {
      setActiveQuality(true);
      setActiveSubMenuItem(null);
    } else if (location.pathname === '/dataVisualization') {
      setActiveQuality(false);
      setShowSubMenu(true);
    } else {
      setActiveQuality(false);
      setShowSubMenu(false);
    }
  }, [location]);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleDataCompositionViewMenuClick = () => {
    setActiveQuality(false); // 품질 평가 활성화 해제
    setShowSubMenu(false); // 서브 메뉴 닫기
    setActiveSubMenuItem(null); // 선택된 서브 메뉴 초기화
    navigate('/'); // 데이터 구축 현황 페이지로 이동
  };

  const handleQualityMenuClick = () => {
    setActiveQuality(false);
    setShowSubMenu(false);
    setActiveSubMenuItem(null);
    navigate('/dataQuality');
  };

  const handleVisualizationMenuClick = () => {
    if (isVisualizationDisabled) return; // 비활성화된 상태라면 아무 동작도 하지 않음
    setActiveQuality(false);
    setShowSubMenu((prevShowSubMenu) => !prevShowSubMenu);
    navigate('/dataVisualization');
  };

  return (
    <MenuBarContainer collapsed={collapsed}>
      <ToggleButton onClick={handleToggle} collapsed={collapsed}>
        <ToggleIcon src={collapsed ? Open : Close} alt="Toggle Icon" />
      </ToggleButton>
      <InnerContainer collapsed={collapsed}>
        <QualityMenuBtn
          active={activeCompositon}
          disabled={false} // 데이터 구축 현황 버튼 활성화
          onClick={handleDataCompositionViewMenuClick}
        >
          데이터 구축 현황
          <Icon src={ClosedIcon} alt="Close Icon" />
        </QualityMenuBtn>
        <QualityMenuBtn
          active={activeQuality}
          disabled={false} // 데이터 품질 평가 버튼 비활성화
          onClick={handleQualityMenuClick}
        >
          데이터 품질 평가
          <Icon src={ClosedIcon} alt="Close Icon" />
        </QualityMenuBtn>
        <VisualizeMenuBtn
          active={showSubMenu}
          disabled={isVisualizationDisabled} // 데이터 분석 가시화 버튼 비활성화
          onClick={handleVisualizationMenuClick}
        >
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
                active={activeSubMenuItem === 'A'}
                onClick={() => handleSubMenuItemClick('A')}
              >
                <SubMenuItemIcon src={PeriodontalDisease} alt="치주질환 Icon" />
                치주질환
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenuItem === 'B'}
                onClick={() => handleSubMenuItemClick('B')}
              >
                <SubMenuItemIcon src={Osteomyelitis} alt="악골골수염 Icon" />
                악골골수염
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenuItem === 'D'}
                onClick={() => handleSubMenuItemClick('D')}
              >
                <SubMenuItemIcon src={Surface} alt="두개안면 Icon" />
                두개안면
              </SubMenuItem>
              <SubMenuItem
                active={activeSubMenuItem === 'C'}
                onClick={() => handleSubMenuItemClick('C')}
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