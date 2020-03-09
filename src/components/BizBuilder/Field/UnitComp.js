import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, Button, Modal, Row, Col } from 'antd';
import UnitCompStyled from '../styled/compStyled/UnitCompStyled';

class UnitComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitModal: false,
      unit: [
        { col0: '길이(L)', col1: '㎜', col2: '㎝', col3: 'm', col4: 'in', col5: 'ft', col6: 'Å', col7: '㎛', col8: '㎙', col9: '㎚', col10: '㎞' },
        { col0: '면적(A)', col1: '㎟', col2: '㎠', col3: '㎡', col4: '㎢', col5: 'ft2', col6: 'in2' },
        { col0: '부피(V)', col1: '㎕', col2: '㎖', col3: '㎗', col4: 'ℓ', col5: '㎘', col6: '㏄', col7: '㎣', col8: '㎤', col9: '㎥', col10: '㎦' },
        { col0: '질량(W)', col1: '㎍', col2: '㎎', col3: 'ｇ', col4: '㎏', col5: 'lb', col6: 'ton' },
        { col0: '밀도(D)', col1: 'ｇ/㎣', col2: '㎏/㎥', col3: 'lb/in3', col4: 'lb/ft3' },
        { col0: '농도(C)', col1: '‰', col2: '％', col3: '㎎/ℓ', col4: 'ppb', col5: 'ppm', col6: '㎎/S㎥' },
        { col0: '압력(P)', col1: 'kgf/㎠', col2: 'bar', col3: 'pa', col4: 'atm', col5: '㎜H2O', col6: '㎜Hg', col7: 'mHg', col8: 'lbf/in2' },
        { col0: '속도(S)', col1: '㎜/s', col2: '㎝/s', col3: 'm/s', col4: 'm/h', col5: '㎞/h', col6: 'ft/s' },
        { col0: '점도(V)', col1: 'cp', col2: 'p', col3: 'pa·s', col4: '㎏f·s/㎡', col5: 'lbf·s/㎡' },
        { col0: '유량(F)', col1: 'l/s', col2: 'l/min', col3: '㎥/s', col4: '㎥/min', col5: '㎥/h', col6: 'ft3/s', col7: 'gal/min' },
        { col0: '열량(Ca)', col1: 'J', col2: '㎏f·m', col3: 'kw·h', col4: 'cal', col5: 'kcal', col6: 'ft·lbf', col7: 'btu' },
        { col0: '온도(T)', col1: '℃', col2: '℉' },
        { col0: '방사선량단위', col1: ' mSv', col2: 'mR/hr', col3: 'μ㏜/hr', col4: 'Gy', col5: 'Bq', col6: 'rem' },
        { col0: '가속도', col1: '㎝/s2', col2: '㎨', col3: 'ft/s2', col4: 'in/s2' },
      ],
      modalGrid: [],
    };
  }

  componentDidMount() {
    this.unitGrid();
  }

  unitGrid = () => {
    const { unit } = this.state;
    const modalGrid = [];
    unit.forEach((u, index) => {
      const cols = [];
      let i = 0;
      for (i = 0; i < 11; i++) {
        const col = u[`col${i}`] || ' ';
        if (!i) {
          cols.push(
            <Col span={2} key={`${index}_${i}`} className="unit-title">
              {col}
            </Col>,
          );
        } else if (col.trim()) {
          cols.push(
            <Col span={2} key={`${index}_${i}`} className="unit-cols" onClick={() => this.handleOnclick(col)}>
              {col}
            </Col>,
          );
        } else {
          cols.push(
            <Col span={2} key={`${index}_${i}`} className="unit-noCols">
              {col}
            </Col>,
          );
        }
      }
      const rows = (
        <Row gutter={[0, 0]} key={index}>
          {cols}
        </Row>
      );
      modalGrid.push(rows);
    });
    this.setState({
      modalGrid,
    });
  };

  handleModalVisible = () => {
    const { readOnly } = this.props;
    if (!readOnly) {
      const { unitModal } = this.state;
      this.setState({
        unitModal: !unitModal,
      });
    }
  };

  handleOnclick = col => {
    const {
      changeFormData,
      sagaKey: id,
      CONFIG: {
        property: { isRequired },
      },
      COMP_FIELD,
      NAME_KOR,
      changeValidationData,
    } = this.props;
    if (isRequired) {
      // 기본값인지 체크
      changeValidationData(id, COMP_FIELD, col !== '', col !== '' ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, col);
    this.handleModalVisible();
  };

  render() {
    const { CONFIG, visible, colData, readOnly } = this.props;
    const { unitModal, modalGrid } = this.state;
    if (readOnly || CONFIG.property.readOnly) {
      return visible ? <span>&nbsp;{colData || ''}</span> : '';
    }
    return visible ? (
      <div>
        <Input value={colData} placeholder={CONFIG.property.placeholder} className={CONFIG.property.className || ''} style={{ width: 150 }} />
        <Button shape="circle" icon="search" onClick={this.handleModalVisible} />
        <Modal title="* 단위" visible={unitModal} width={800} height={600} onCancel={this.handleModalVisible} footer={[null]}>
          <UnitCompStyled>
            {modalGrid}
            <div className="cancelBtn">
              <Button onClick={this.handleModalVisible}>취소</Button>
            </div>
          </UnitCompStyled>
        </Modal>
      </div>
    ) : (
      ''
    );
  }
}

UnitComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  id: PropTypes.any,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  compProp: PropTypes.any,
  changeSearchData: PropTypes.any,
};

export default UnitComp;
