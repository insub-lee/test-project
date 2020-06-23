import React from 'react';
import PropTypes from 'prop-types';
import Datasheet from 'react-datasheet';

import StyledCustomSearch from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledButtonWrapper from 'components/BizBuilder/styled/Buttons/StyledButtonWrapper';
import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import Styled from '../Styled';
import useHooks from './useHooks';

const Sheet = ({ updateData }) => {
  const {
    mode,
    grid,
    filteredGrid,
    action: { onChangedCells, onClickRead, onClickWrite },
  } = useHooks({ updateData });
  return (
    <StyledContentsWrapper>
      <StyledCustomSearch className="search-wrapper-inline">
        <div className="search-input-area">
          <span className="text-label">용/폐수 일지</span>
        </div>
        <StyledButtonWrapper className="btn-area">
          <StyledButton className="btn-gray btn-first btn-sm" onClick={onClickWrite}>
            입력 모드
          </StyledButton>
          <StyledButton className="btn-gray btn-first btn-sm" onClick={onClickRead}>
            조회 모드
          </StyledButton>
        </StyledButtonWrapper>
      </StyledCustomSearch>
      <Styled>
        <div className="sheet-container">
          {mode === 'write' && (
            <Datasheet
              data={grid}
              valueRenderer={cell => cell.value}
              onContextMenu={(e, cell, i, j) => (cell.readOnly ? e.preventDefault() : null)}
              onCellsChanged={onChangedCells}
              parsePaste={clipboardData => clipboardData.split(String.fromCharCode(13)).map(row => row.split(String.fromCharCode(9)))}
            />
          )}
          {mode === 'read' && <Datasheet data={filteredGrid} valueRenderer={cell => cell.value} />}
        </div>
      </Styled>
    </StyledContentsWrapper>
  );
};

Sheet.propTypes = {
  updateData: PropTypes.func,
};

Sheet.defaultProps = {
  updateData: () => {},
};

export default Sheet;
