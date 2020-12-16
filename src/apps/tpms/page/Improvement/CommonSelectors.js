import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  &.sub_dot {
    position: relative;
    font-size: 0;
    text-align: center;
    width: 100%;
    max-width: 130px;
    margin: auto;

    .line {
      height: 1px;
      background: #e6e8e8;
      width: calc(100% - 14px);
      position: absolute;
      left: 7px;
      top: 4px;
      z-index: 1;
    }

    ul {
      position: relative;
      z-index: 2;
    }

    li {
      display: inline-block;
      width: 20%;
      position: relative;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 100%;
      display: block;
      background: white;
      border: 1px solid #a9adb1;
      margin: 0 auto;
    }

    .on .dot {
      background: ${({ inProgress }) => (inProgress ? '#ff5d5d' : '#000000')};
      border: 1px solid ${({ inProgress }) => (inProgress ? '#ff5d5d' : '#000000')};
    }

    .drop .dot {
      background: #ff5d5d;
      border: 1px solid #ff5d5d;
    }

    .finish .dot {
      background: #0000ff;
      border: 1px solid #0000ff;
    }

    .txt {
      font-size: 12px;
      color: #777;
      display: block;
      margin-top: 5px;
    }
  }
`;

const steps = [
  { key: 3, txt: '현' },
  { key: 4, txt: '원' },
  { key: 5, txt: '대' },
  { key: 6, txt: '개' },
  { key: 7, txt: '완' },
];

const projectLevel = [
  { key: 1, txt: '본부' },
  { key: 2, txt: '담당' },
  { key: 3, txt: '팀' },
  { key: 4, txt: 'Part' },
];

const projectType = [
  { key: 'W', txt: 'Wafer Loss' },
  { key: 'T', txt: 'TFT' },
  { key: 'G', txt: '개별개선' },
];

const performType = [
  { key: 'C', txt: 'Cost' },
  { key: 'D', txt: 'Delivery' },
  { key: 'M', txt: 'Morale' },
  { key: 'P', txt: 'Productivity' },
  { key: 'Q', txt: 'Quality' },
  { key: 'S', txt: 'Safety' },
];

const StepSelector = ({ level, isDrop, isFinish }) => (
  <StyledDiv className="sub_dot" inProgress={level >= 2 && level <= 7}>
    <span className="line" />
    <ul>
      {steps.map(({ key, txt }) => (
        <li key={key} className={`${key === level ? 'on' : ''} ${isDrop ? 'drop' : ''} ${isFinish ? 'finish' : ''}`}>
          <span className="dot" />
          <span className="txt">{txt}</span>
        </li>
      ))}
    </ul>
  </StyledDiv>
);

const ProjectLevelSelector = ({ keyValue }) =>
  projectLevel.map(({ key, txt }) => {
    return <span>{key === keyValue ? txt : ''}</span>;
  });

const ProjectTypeSelector = ({ keyValue }) =>
  projectType.map(item => {
    if (item.key === keyValue) {
      return <span>{item.txt}</span>;
    }
    return <span />;
  });

const PerformTypeSelector = ({ keyValue }) =>
  performType.map(item => {
    if (item.key === keyValue) {
      return <span>{item.txt}</span>;
    }
    return <span />;
  });

StepSelector.propTypes = {
  level: PropTypes.number,
  isDrop: PropTypes.bool,
  isFinish: PropTypes.bool,
  inProgress: PropTypes.bool,
};

StepSelector.defaultProps = {
  level: -1,
  isDrop: false,
  isFinish: false,
  inProgress: false,
};

ProjectLevelSelector.prototype = {
  keyValue: PropTypes.number,
};

ProjectLevelSelector.defaultProps = {
  keyValue: -1,
};

ProjectTypeSelector.prototype = {
  keyValue: PropTypes.string,
};

ProjectTypeSelector.defaultProps = {
  keyValue: '',
};

PerformTypeSelector.prototype = {
  keyValue: PropTypes.string,
};

PerformTypeSelector.defaultProps = {
  keyValue: '',
};

export { StepSelector, ProjectLevelSelector, ProjectTypeSelector, PerformTypeSelector };
