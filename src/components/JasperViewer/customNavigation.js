import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Statistic } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined, RedoOutlined } from '@ant-design/icons';

// 이전페이지 버튼
export const CustomPrevButton = props => {
  const { page, handlePrevClick } = props;
  if (page === 1) return <div />;

  return (
    <Button className="prevBtn" type="dashed" shape="circle" onClick={handlePrevClick} size="small">
      <LeftOutlined style={{ color: '#000000' }} />
    </Button>
  );
};

CustomPrevButton.propTypes = {
  page: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
};

// 다음페이지 버튼
export const CustomNextButton = props => {
  const { page, pages, handleNextClick } = props;
  if (page === pages) return <div />;
  return (
    <Button className="nextBtn" type="dashed" shape="circle" onClick={handleNextClick} size="small">
      <RightOutlined style={{ color: '#000000' }} />
    </Button>
  );
};
CustomNextButton.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};

// 중앙 페이지 상태값
export const CustomPages = props => {
  const { page, pages } = props;
  return <Statistic className="page-status" prefix="Page." value={page} suffix={`/ ${pages}`} valueStyle={{ color: '#ffffff', fontSize: '15px' }} />;
};
CustomPages.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

// 페이지 확대
export const CustomZoomInBtn = props => {
  const { handleZoomIn, scale, defaultScale, maxScale } = props;

  let checkScale = maxScale;

  if (defaultScale > maxScale) {
    checkScale = defaultScale;
  }

  if (scale.toFixed(2) === checkScale.toFixed(2)) {
    return (
      <Tooltip title="확대" className="zoomInBtn">
        <Button type="dashed" shape="circle" size="small" disabled>
          <ZoomInOutlined style={{ color: '#000000' }} />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="확대" className="zoomInBtn">
      <Button type="dashed" shape="circle" onClick={handleZoomIn} size="small">
        <ZoomInOutlined style={{ color: '#000000' }} />
      </Button>
    </Tooltip>
  );
};
CustomZoomInBtn.propTypes = {
  handleZoomIn: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  defaultScale: PropTypes.number.isRequired,
  maxScale: PropTypes.number.isRequired,
};

// 페이지 축소
export const CustomZoomOutBtn = props => {
  const { handleZoomOut, scale, defaultScale, minScale } = props;

  let checkScale = minScale;

  if (defaultScale < minScale) {
    checkScale = defaultScale;
  }

  if (scale.toFixed(2) === checkScale.toFixed(2)) {
    return (
      <Tooltip title="축소" className="zoomOutBtn">
        <Button type="dashed" shape="circle" size="small" disabled>
          <ZoomOutOutlined style={{ color: '#000000' }} />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="축소" className="zoomOutBtn">
      <Button type="dashed" shape="circle" onClick={handleZoomOut} size="small">
        <ZoomOutOutlined style={{ color: '#000000' }} />
      </Button>
    </Tooltip>
  );
};
CustomZoomOutBtn.propTypes = {
  handleZoomOut: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  defaultScale: PropTypes.number.isRequired,
  minScale: PropTypes.number.isRequired,
};

// 페이지 확대 리셋
export const CustomResetZoomBtn = props => {
  const { handleResetZoom, scale, defaultScale } = props;

  if (scale.toFixed(2) === defaultScale.toFixed(2)) {
    return (
      <Tooltip title="기본값" className="zoomResetBtn">
        <Button type="dashed" shape="circle" size="small" disabled>
          <RedoOutlined style={{ color: '#000000' }} />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="기본값" className="zoomResetBtn">
      <Button type="dashed" shape="circle" onClick={handleResetZoom} size="small">
        <RedoOutlined style={{ color: '#000000' }} />
      </Button>
    </Tooltip>
  );
};
CustomResetZoomBtn.propTypes = {
  handleResetZoom: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  defaultScale: PropTypes.number.isRequired,
};

// PDF 네이게이터
const CustomNavigation = props => {
  const { page, pages } = props;

  const { handlePrevClick, handleNextClick, handleZoomIn, handleZoomOut, handleResetZoom, scale, defaultScale, maxScale, minScale, optionContents } = props;
  return (
    <div className="customWrapper">
      <div className="zoom-group">
        <CustomZoomInBtn scale={scale} defaultScale={defaultScale} maxScale={maxScale} handleZoomIn={handleZoomIn} />
        <CustomResetZoomBtn scale={scale} defaultScale={defaultScale} handleResetZoom={handleResetZoom} />
        <CustomZoomOutBtn scale={scale} defaultScale={defaultScale} minScale={minScale} handleZoomOut={handleZoomOut} />
      </div>
      <div className="page-group">
        <CustomPrevButton page={page} pages={pages} handlePrevClick={handlePrevClick} />
        <CustomPages page={page} pages={pages} />
        <CustomNextButton page={page} pages={pages} handleNextClick={handleNextClick} />
      </div>
      <div className="option-group">{optionContents()}</div>
    </div>
  );
};
CustomNavigation.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  handleResetZoom: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  defaultScale: PropTypes.number.isRequired,
  maxScale: PropTypes.number.isRequired,
  minScale: PropTypes.number.isRequired,
  optionContents: PropTypes.func,
};

CustomNavigation.defaultProps = {
  optionContents: () => '',
};

export default CustomNavigation;