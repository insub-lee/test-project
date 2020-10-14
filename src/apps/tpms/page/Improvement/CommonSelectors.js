import React from 'react';
import PropTypes from 'prop-types';

const steps = [
  { key: 1, txt: '현' },
  { key: 2, txt: '원' },
  { key: 3, txt: '대' },
  { key: 4, txt: '개' },
  { key: 5, txt: '완' },
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
  <div className="sub_dot">
    <span className="line" />
    <ul>
      {steps.map(({ key, txt }) => (
        <li key={key} className={`${key === level ? 'on' : ''} ${isDrop ? 'drop' : ''} ${isFinish ? 'finish' : ''}`}>
          <span className="dot" />
          <span className="txt">{txt}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectLevelSelector = ({ keyValue }) =>
  projectLevel.map((lvl, index) => {
    if (index === keyValue - 1) {
      return <span>{lvl.txt}</span>;
    }
    return <span />;
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
};

StepSelector.defaultProps = {
  level: -1,
  isDrop: false,
  isFinish: false,
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
