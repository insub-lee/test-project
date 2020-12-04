import React from 'react';
import PropTypes from 'prop-types';
import StyledEquipSelector from './StyledEquipSelector';
import Button from '../../Button';
import SearchEquipModal from '../../BuiltModals/SearchEquipModal';

class EquipSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
    };
    this.searchEquipModalRef = React.createRef();
    this.showSearchEquipModal = this.showSearchEquipModal.bind(this);
    this.receiveData = this.receiveData.bind(this);
  }

  showSearchEquipModal() {
    const { values } = this.state;
    this.searchEquipModalRef.current.handleOpen(values);
  }

  receiveData(checkedList) {
    this.setState({ values: checkedList });
  }

  removeEquip(index) {
    this.setState(prevState => {
      const { values } = prevState;
      values.splice(index, 1);
      return { values };
    });
  }

  render() {
    const { values } = this.state;
    const { readOnly } = this.props;
    return (
      <StyledEquipSelector>
        <input type="hidden" name="equipment_model" value={JSON.stringify(values)} />
        <ul>
          {values.map((value, index) => (
            <li className="equipment_tag" key={value.keyno}>
              <span>{`${value.fab}:${value.area}:${value.keyno}:${value.model}`}</span>
              {!readOnly && (
                <button type="button" className="close" onClick={() => this.removeEquip(index)}>
                  <i className="fas fa-times" />
                </button>
              )}
            </li>
          ))}
        </ul>
        {!readOnly && (
          <>
            <div className="btn btn_wrap">
              <Button type="button" color="gray" size="small" onClick={this.showSearchEquipModal}>
                선택
              </Button>
            </div>
            <SearchEquipModal ref={this.searchEquipModalRef} callback={this.receiveData} />
          </>
        )}
      </StyledEquipSelector>
    );
  }
}

EquipSelector.propTypes = {
  readOnly: PropTypes.bool,
  values: PropTypes.array,
};

EquipSelector.defaultProps = {
  readOnly: false,
  values: [],
};

export default EquipSelector;
