import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ScrollBar from 'react-custom-scrollbars';
import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import { Checkbox } from 'antd';

let deleteCategory = [];

class selectedCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
  }

  onChange(list) {
    const { selectedList, complete } = this.props;

    const idx = selectedList.findIndex(t => t.APP_ID === list.target.value);

    if (complete === true) {
      deleteCategory = [];
    }

    if (list.target.checked === true) {
      deleteCategory.push(list.target.value);
      if (idx !== -1) {
        selectedList[idx].checked2 = 'checked';
      }
    } else if (list.target.checked === false) {
      const index = deleteCategory.findIndex(a => a === list.target.value);
      deleteCategory.splice(index, 1);
      if (idx !== -1) {
        delete selectedList[idx].checked2;
      }
    }

    this.props.deleteCategoryList(deleteCategory);
  }

  onChangeAll(e) {
    const { selectedList } = this.props;
    const catID = [];

    if (e.target.checked) {
      deleteCategory = [];
      for (let i = 0; i < selectedList.length; i += 1) {
        selectedList[i].checked2 = 'checked';
        catID.push(selectedList[i].APP_ID);
        deleteCategory.push(selectedList[i].APP_ID);
      }
      this.props.deleteCategoryList(catID, 'All');
    } else {
      for (let i = 0; i < selectedList.length; i += 1) {
        delete selectedList[i].checked2;
      }
      this.props.deleteCategoryList('', 'nAll');
      deleteCategory = [];
    }
  }

  render() {
    const { selectedList } = this.props;

    return (
      <div>
        <div className="SUTitle">
          <Checkbox onChange={this.onChangeAll} checked={this.props.checkAll} />
          <h3>선택 앱</h3>
        </div>
        <Table size="small" className="SUTable" style={{ width: '100%' }}>
          <ScrollBar autoHide autoHideTimeout={1000} style={{ height: 455 }}>
            <Table.Body>
              {selectedList.map(category => (
                <Table.Row key={category.NAME_KOR}>
                  <Table.Cell textAlign="left" title={`${category.NAME_KOR}`} className="SUTableCell">
                    <Checkbox value={category.APP_ID} onChange={this.onChange} checked={!!category.checked2}>
                      <span className="appIconWrapper">
                        <img
                          className="listImg"
                          style={{ height: 25, width: 25 }}
                          src={imgUrl.get('120x120', category.ICON)}
                          onError={e => {
                            e.target.src = '/icon_no_image.png';
                          }}
                          alt=""
                        />
                      </span>
                      {category.NAME_KOR}
                      <br />
                      <span className="ellipsis">{category.DSCR_KOR}</span>
                    </Checkbox>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </ScrollBar>
        </Table>
      </div>
    );
  }
}

selectedCategory.propTypes = {
  selectedList: PropTypes.array.isRequired,
  complete: PropTypes.bool.isRequired,
  deleteCategoryList: PropTypes.func.isRequired,
  checkAll: PropTypes.bool.isRequired,
};

export default selectedCategory;
