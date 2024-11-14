// TotalFileStatus.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TotalFileStatus = ({ background, totalFiles, uploadDate, fileCount, color }) => {
  return (
    <TotalFileStatusContainer background={background}>
     <ContentCtn>
        <Header>
            <TotalFiles>{totalFiles}</TotalFiles>
            <UploadDate>today - {uploadDate}</UploadDate>
          </Header>
          <Footer>
            <FileCount color={color}>{fileCount.toLocaleString()}</FileCount>
            <Unit> 개</Unit>
          </Footer>
      </ContentCtn>
    </TotalFileStatusContainer>
  );
};


export default TotalFileStatus;

const TotalFileStatusContainer = styled.div`
  width: 238px;
  height: 72px;
  background: ${(props) => props.background || '#F4F4FF'};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 10px 5px; 
  gap: 10px;
  
`;

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 6%;
`

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
  color: ${(props) => props.color || '#051C91'};
  margin-left: 7px;
`;

const Unit = styled.span`
  font-size: 14px;
  margin-left: 4px;
  color: #666;
`;
