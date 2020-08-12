import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';

const Styled = styled.div`
  .isHover {
    background: #e6f7ff;
  }
  .hoverCursor:hover {
    cursor: pointer;
  }
`;

class unitSelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOverCell: '',
    };
  }

  render() {
    const { onClickItem } = this.props;
    const { mouseOverCell } = this.state;
    const units = [
      { key: '길이(L)', kind: ['㎜', '㎝', 'm', 'in', 'ft', 'Å', '㎛', '㎙', '㎚', '㎞', '', '', ''] },
      { key: '면적(A)', kind: ['㎟', '㎠', '㎡', '㎢', 'ft²', 'in²', '', '', '', '', '', '', ''] },
      { key: '부피(V)', kind: ['㎕', '㎖', '㎗', 'ℓ', '㎘', '㏄', '㎣', '㎤', '㎥', '㎦', '', '', ''] },
      { key: '질량(W)', kind: ['㎍', '㎎', 'ｇ', '㎏', 'lb', 'ton', '', '', '', '', '', '', ''] },
      { key: '밀도(D)', kind: ['ｇ/㎣', '㎏/㎥', 'lb/in³', 'lb/ft³', '', '', '', '', '', '', '', '', ''] },
      { key: '농도(C)', kind: ['‰', '％', '㎎/ℓ', 'ppb', 'ppm', 'pcs/㎖', '㎛EA/㎖', '', '', '', '', '', ''] },
      { key: '압력(P)', kind: ['kgf/㎠', '㎏/㎠', 'bar', 'pa', 'atm', '㎜H2O', '㎜Hgf', 'mHg', 'lb/in²', 'cum/hr', 'Ncum/hr', 'N㎥/hr', 'ton/hr'] },
      { key: '속도(S)', kind: ['㎜/s', '㎝/s', 'm/s', 'm/h', '㎞/h', 'ft/s', '', '', '', '', '', '', ''] },
      { key: '점도(V)', kind: ['cp', 'p', 'pa·s', '㎏f·s/㎡', 'lbf·s/㎡', '', '', '', '', '', '', '', ''] },
      { key: '유량(F)', kind: ['ℓ/s', 'ℓ/min', '㎥/s', '㎥/min', '㎥/h', 'ft3/s', 'gal/min', '㎤/min', '㏄/min', '', '', '', ''] },
      { key: '열량(Ca)', kind: ['J', '㎏f·m', '㎾·h', '㎈', '㎉', 'ft·lbf', 'btu', '', '', '', '', '', ''] },
      { key: '온도(T)', kind: ['℃', '℉', '', '', '', '', '', '', '', '', '', '', ''] },
      { key: '방사선량단위', kind: ['mSv', 'mR/hr', 'μ㏜/hr', 'Gy', 'Bq', 'rem', '', '', '', '', '', '', ''] },
      { key: '가속도', kind: ['㎝/s²', '㎨', 'ft/s²', 'in/s²', '', '', '', '', '', '', '', '', ''] },
      { key: '색도', kind: ['intensity', '', '', '', '', '', '', '', '', '', '', '', ''] },
      { key: '탁도', kind: ['NTU', '', '', '', '', '', '', '', '', '', '', '', ''] },
      { key: '전도도', kind: ['㏀·㎝', '', '', '', '', '', '', '', '', '', '', '', ''] },
      { key: '박테리아', kind: ['Cfu/㎖', 'Cfu/100㎖', '/50㎖', 'COL/ℓ', 'COL/100㎖', '/100㎖', '/2ℓ', '', '', '', '', '', ''] },
      { key: '전력', kind: ['㎐', '㎑', '㎒', '㎓', '㎔', '㎾', '㎿', '㎾h', '', '', '', '', ''] },
      { key: '경도', kind: ['mgCaCO3/ℓ', '', '', '', '', '', '', '', '', '', '', '', ''] },
    ];
    return (
      <Styled>
        <StyledHtmlTable>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              {units.map((row, index1) => {
                const { kind } = row;
                return (
                  <tr key={row.key}>
                    <th>{row.key}</th>
                    {kind.map((item, index2) => (
                      <td
                        className={`${index1}-${index2}` === mouseOverCell ? 'isHover hoverCursor' : 'hoverCursor'}
                        onMouseOver={() => this.setState({ mouseOverCell: `${index1}-${index2}` })}
                        onFocus={() => false}
                      >
                        <div
                          style={{ width: '100%', height: '100%' }}
                          role="button"
                          tabIndex={0}
                          onClick={() => onClickItem(item)}
                          onKeyPress={() => onClickItem(item)}
                        >
                          {item}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </StyledHtmlTable>
      </Styled>
    );
  }
}

unitSelectTable.propTypes = {
  onClickItem: PropTypes.func,
};

unitSelectTable.defaultProps = {
  onClickItem: item => console.log(item),
};

export default unitSelectTable;
