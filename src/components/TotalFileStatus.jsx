import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RedIcon from '../assets/images/red-icon.svg';
import GreenIcon from '../assets/images/green-icon.svg';

const TotalFileStatus = ({ totalFiles, uploadDate, fileCount, totalFilesCount }) => {
  const showGraph = totalFiles === '구축율';
  const fillPercentage = totalFilesCount > 0 ? (fileCount / totalFilesCount) * 100 : 0;
  const iconSrc = fillPercentage >= 50 ? GreenIcon : RedIcon;

  console.log('[DEBUG] TotalFileStatus: Props Received:', { totalFiles, uploadDate, fileCount, totalFilesCount, showGraph });

  return (
    <TotalFileStatusContainer 
      fillPercentage={fillPercentage}
      showGraph={showGraph}
      totalFiles={totalFiles}
    >
      <ContentCtn>
        <Header>
          <TotalFiles>{totalFiles}</TotalFiles>
          <UploadDate>today - {uploadDate}</UploadDate>
        </Header>
        <Footer>
          <FileCount 
            fillPercentage={fillPercentage}
            showGraph={showGraph}
            totalFiles={totalFiles}
          >
            {showGraph ? fillPercentage.toFixed(0) : fileCount.toLocaleString()}
          </FileCount>
          <Unit>{showGraph ? '%' : ' 개'}</Unit>
          {showGraph && <GraphIcon src={iconSrc} alt="icon" />}
        </Footer>

        {showGraph && (
          <GraphContainer>
            <GraphBackground fillPercentage={fillPercentage}>
              <GraphFill fillPercentage={fillPercentage} />
            </GraphBackground>
          </GraphContainer>
        )}
      </ContentCtn>
    </TotalFileStatusContainer>
  );
};

TotalFileStatus.propTypes = {
  totalFiles: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
  fileCount: PropTypes.number.isRequired,
  totalFilesCount: PropTypes.number.isRequired,
};

export default TotalFileStatus;

// Styled Components
const TotalFileStatusContainer = styled.div`
  width: 238px;
  height: 92px;
  background: ${(props) => {
    if (props.totalFiles === '오류 파일 수') {
      return '#FFF3F3'; 
    } else if (props.totalFiles === '총파일 수') {
      return '#E0EFFF'; 
    } else if (props.totalFiles === '구축율') {
      return props.fillPercentage < 50 ? '#FFF3F3' : '#F2FFF8'; 
    }
    return '#FFF3F3'; // 기본 배경 색
  }};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 7px 7px 0px;
  gap: 10px;
  position: relative;
`;

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-left: 6%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #333;
`;

const TotalFiles = styled.span`
  font-size: 16px;
  color: black;
  text-align: center;
  font-weight: bolder;
  word-wrap: break-word;
`;

const UploadDate = styled.span`
  font-size: 11px;
  color: #999;
`;

const Footer = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: bold;
  color: #333;
`;

const FileCount = styled.span`
  font-size: 21px;
  color: ${(props) => {
    if (props.totalFiles === '오류 파일 수') {
      return '#FF1500';
    } else if (props.totalFiles === '총파일 수') {
      return '#051C91';
    } else if (props.totalFiles === '구축율') {
      return props.fillPercentage < 50 ? '#FF1500' : '#0F580F';
    }
    return '#333';
  }};
  margin-left: 7px;
`;

const Unit = styled.span`
  font-size: 14px;
  margin-left: 4px;
  color: #666;
`;

const GraphContainer = styled.div`
  width: 100%;
  position: relative;
`;

const GraphBackground = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${(props) => (props.fillPercentage >= 50 ? '#a2c2b6' : '#F8BABA')};
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const GraphFill = styled.div`
  width: ${(props) => props.fillPercentage}%;
  height: 100%;
  background-color: ${(props) => (props.fillPercentage >= 50 ? '#0ACF83' : '#EC3134')};
  border-radius: 3px;
`;

const GraphIcon = styled.img`
  flex: 1;
  margin-left: 60%;
  margin-top: 5%;
  width: 20px;
  height: 20px;
  z-index: 1;
`;
