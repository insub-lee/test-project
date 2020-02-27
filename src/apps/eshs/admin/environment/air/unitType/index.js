import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from './Styled';

class UnitType extends Component {
  componantDidMount() {}

  render() {
    const { onUnitValueChange } = this.props;
    const unit = [
      ['길이(L)', '㎜', '㎝', 'm', 'in', 'ft', 'Å', '㎛', '㎙', '㎚', '㎞'],
      ['면적(A)', '㎟', '㎠', '㎡', '㎢', 'ft2', 'in2'],
      ['부피(V)', '㎕', '㎖', '㎗', 'ℓ', '㎘', '㏄', '㎣', '㎤', '㎥', '㎦'],
      ['질량(W)', '㎍', '㎎', 'ｇ', '㎏', 'lb', 'ton'],
      ['밀도(D)', 'ｇ/㎣', '㎏/㎥', 'lb/in3', 'lb/ft3'],
      ['농도(C)', '‰', '％', '㎎/ℓ', 'ppb', 'ppm', '㎎/S㎥'],
      ['압력(P)', 'kgf/㎠', 'bar', 'pa', 'atm', '㎜H2O', '㎜Hg', 'mHg', 'lbf/in2'],
      ['속도(S)', '㎜/s', '㎝/s', 'm/s', 'm/h', '㎞/h', 'ft/s'],
      ['점도(V)', 'cp', 'p', 'pa·s', '㎏f·s/㎡', 'lbf·s/㎡'],
      ['유량(F)', 'l/s', 'l/min', '㎥/s', '㎥/min', '㎥/h', 'ft3/s', 'gal/min'],
      ['열량(Ca)', 'J', '㎏f·m', 'kw·h', 'cal', 'kcal', 'ft·lbf', 'btu'],
      ['온도(T)', '℃', '℉'],
      ['방사선량단위', 'mSv', 'mR/hr', 'μ㏜/hr', 'Gy', 'Bq', 'rem'],
      ['가속도', '㎝/s2', '㎨', 'ft/s2', 'in/s2'],
    ];
    const waste = [
      '길이(L)',
      '면적(A)',
      '부피(V)',
      '질량(W)',
      '밀도(D)',
      '농도(C)',
      '압력(P)',
      '속도(S)',
      '점도(V)',
      '유량(F)',
      '열량(Ca)',
      '온도(T)',
      '방사선량단위',
      '가속도',
    ];
    const table = unit.map(i => (
      <tr style={{ magin: '10px' }}>
        {i.map(j => (
          <>
            {waste.find(w => w === j) === undefined ? (
              <td value={j} onClick={() => onUnitValueChange(j)} onKeyDown={() => onUnitValueChange(j)} role="gridcell" className="td">
                {j}
              </td>
            ) : (
              <td className="nonData">{j}</td>
            )}
          </>
        ))}
      </tr>
    ));
    return (
      <Styled>
        <table role="grid" className="table">
          <tbody>{table}</tbody>
        </table>
      </Styled>
    );
  }
}

UnitType.propTypes = {
  onUnitValueChange: PropTypes.func,
};
UnitType.defaultProps = {};

export default UnitType;
