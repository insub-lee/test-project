import React from 'react';
// import Modal from 'react-Modal';
import { debounce } from 'lodash';
import Modal from 'rc-dialog';

import { fromJS } from 'immutable';
// import Scrollbars from 'react-custom-scrollbars';
// import modalStyles from '../modalStyles';
import Button from '../../Button';
import StyledContent from './StyledContent';
import service from './service';
import Pagination from '../../Tableboard/Pagination';
import alertMessage from '../../Notification/Alert';
import SearchWrap from '../../Tableboard/SearchWrap';
import jsonToQueryString from '../../../utils/jsonToQueryString';
// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

class SearchEquipModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      data: fromJS([]),
      pagination: fromJS({
        current: 1,
        pageSize: 10,
        total: 0,
      }),
      selector: fromJS([]),
      selectorArea: fromJS([]),
      selectorKeyno: fromJS([]),
      selectorModel: fromJS([]),
      checkedList: fromJS([]),
      search: fromJS({
        category: 'all',
        text: undefined,
      }),
      fab: 'all',
      area: 'all',
      keyno: 'all',
      model: 'all',
      isAllChecked: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.pageHandler = this.pageHandler.bind(this);
    this.pageSizeHandler = this.pageSizeHandler.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.sendSelectedKeys = this.sendSelectedKeys.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.searchWrapRef = React.createRef();
    this.handleChangeFab = this.handleChangeFab.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeKeyno = this.handleChangeKeyno.bind(this);
    this.handleFilterValue = debounce(this.handleFilterValue.bind(this), 300);
    this.handleChangeAll = this.handleChangeAll.bind(this);
    // this.keynoRef = React.createRef();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = true;
  }

  pageHandler(page) {
    this.setState(
      prevState => ({ pagination: prevState.pagination.set('current', page), isAllChecked: false }),
      () => this.fetchData(),
    );
  }

  pageSizeHandler(e) {
    const pageSize = parseInt(e.target.value, 10);
    this.setState(
      prevState => ({
        pagination: prevState.pagination.set('pageSize', pageSize).set('current', 1),
      }),
      () => this.fetchData(),
    );
  }

  async fetchSelector() {
    const url = '/api/tpms/v1/common/searchInfo?type=fab';
    const { response, error } = await service.board.get(url);
    if (response && !error) {
      const { list } = response;
      if (this.mounted) {
        this.setState({ selector: fromJS(list) });
      }
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  async fetchSelectorArea() {
    const url = `/api/tpms/v1/common/searchInfo?type=area`;

    const { response, error } = await service.board.get(url);
    if (response && !error) {
      const { list } = response;
      if (this.mounted) {
        this.setState({ selectorArea: fromJS(list) });
      }
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  async fetchSelectorKeyno() {
    const requestQuery = {
      fab: this.state.fab === 'all' ? undefined : this.state.fab,
      area: this.state.area === 'all' ? undefined : this.state.area,
      type: 'keyno',
    };
    const url = `/api/tpms/v1/common/searchInfo?${jsonToQueryString(requestQuery)}`;
    const { response, error } = await service.board.get(url);
    if (response && !error) {
      const { list } = response;
      if (this.mounted) {
        this.setState({ selectorKeyno: fromJS(list) });
      }
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  async fetchSelectorModel() {
    const requestQuery = {
      fab: this.state.fab === 'all' ? undefined : this.state.fab,
      area: this.state.area === 'all' ? undefined : this.state.area,
      type: 'model',
    };
    const url = `/api/tpms/v1/common/searchInfo?${jsonToQueryString(requestQuery)}`;
    const { response, error } = await service.board.get(url);
    if (response && !error) {
      const { list } = response;
      if (this.mounted) {
        this.setState({ selectorModel: fromJS(list) });
      }
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  async fetchData() {
    const { pagination, search } = this.state;

    // 검색박스
    const searchData = search.toJS();
    let fab;
    let area;
    let keyno;
    let model;
    let searchAll;
    if (searchData.category === 'fab') {
      fab = searchData.text === '' ? undefined : searchData.text;
    } else if (searchData.category === 'area') {
      area = searchData.text === '' ? undefined : searchData.text;
    } else if (searchData.category === 'keyno') {
      keyno = searchData.text === '' ? undefined : searchData.text;
    } else if (searchData.category === 'model') {
      model = searchData.text === '' ? undefined : searchData.text;
    } else if (searchData.category === 'all') {
      searchAll = searchData.text === '' ? undefined : searchData.text;
    }

    let fabFilter = '';
    fabFilter = this.state.fab === 'all' ? undefined : this.state.fab;

    let areaFilter = '';
    areaFilter = this.state.area === 'all' ? undefined : this.state.area;

    let keynoFilter = '';
    keynoFilter = this.state.keyno === 'all' ? undefined : this.state.keyno;

    let modelFilter = '';
    modelFilter = this.state.model === 'all' ? undefined : this.state.model;

    const requestQuery = {
      fab: fabFilter,
      area: areaFilter,
      keyno: keynoFilter,
      model: modelFilter,
      like_all: searchAll,
      like_fab: fab,
      like_area: area,
      like_keyno: keyno,
      like_model: model,
    };

    console.debug('>>> requestQuery', requestQuery);
    const queryString = jsonToQueryString(requestQuery);
    // const url = `/apigate/v1/portal/sign/task?sysid=TPMS&mnuid=EQUIPMODEL&currentPage=${pagination.get('current')}&pageSize=${pagination.get('pageSize')}`;
    // const getUrl = `${url}&${queryString}`;

    const url2 = `/api/tpms/v1/common/searchInfo?type=search&currentPage=${pagination.get('current')}&pageSize=${pagination.get('pageSize')}`;
    const getUrl2 = `${url2}&${queryString}`;
    // const ttt = await service.board.get(getUrl2);

    const { response, error } = await service.board.get(getUrl2);

    if (response && !error) {
      console.debug('# response', response);
      const { list } = response;
      if (this.mounted) {
        this.setState(prevState => ({
          data: fromJS(list),
          pagination: prevState.pagination.set('total', response.pagination.total),
        }));
      }
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  handleOpen(checkedList) {
    this.setState({ isOpen: true, checkedList: fromJS(checkedList) });
    this.fetchSelector();
    this.fetchSelectorArea();
    this.fetchSelectorKeyno();
    this.fetchSelectorModel();
    this.fetchData();
  }

  handleClose() {
    this.setState({
      isOpen: false,
      data: fromJS([]),
      pagination: fromJS({
        current: 1,
        pageSize: 10,
        total: 0,
      }),
      selector: fromJS([]),
      selectorArea: fromJS([]),
      selectorKeyno: fromJS([]),
      selectorModel: fromJS([]),
      checkedList: fromJS([]),
      search: fromJS({
        category: 'all',
        text: undefined,
      }),
      fab: 'all',
      area: 'all',
      keyno: 'all',
      model: 'all',
    });
    // Todo - Need Common Api handler
  }

  handleCheck(item) {
    const keyno = item.get('keyno');
    console.debug('# handlecheck', item.toJS());
    this.setState(prevState => {
      const { checkedList } = prevState;
      const targetIndex = checkedList.findIndex(checkedItem => checkedItem.get('keyno') === keyno);
      return {
        checkedList: targetIndex > -1 ? checkedList.delete(targetIndex) : checkedList.push(item),
      };
    });
  }

  sendSelectedKeys() {
    const { checkedList } = this.state;
    if (checkedList.toJS().length < 1) {
      alertMessage.alert('장비를 선택주십시오.');
      return;
    }
    this.props.callback(checkedList.toJS());
    this.handleClose();
  }

  submitSearch() {
    const formNode = this.searchWrapRef.current.formRef.current;
    const category = formNode.querySelector('select[name=category]').value;
    const text = formNode.querySelector('input[name=text]').value || undefined;
    const option = {
      category,
      text,
    };
    // console.debug('category', category);
    // console.debug('text', text);
    // this.keynoRef.current.value = '';
    this.setState(
      {
        search: fromJS(option),
        fab: 'all',
        area: 'all',
        keyno: 'all',
        model: 'all',
      },
      () => this.fetchData(),
    );
  }

  handleChangeFab(e) {
    this.setState({ fab: e.target.value }, () => this.fetchData().then(() => this.fetchSelectorKeyno(), this.fetchSelectorModel()));
  }

  handleChangeArea(e) {
    this.setState({ area: e.target.value }, () => this.fetchData().then(() => this.fetchSelectorKeyno(), this.fetchSelectorModel()));
  }

  handleChangeModel(e) {
    this.setState({ model: e.target.value }, () => this.fetchData());
  }

  handleChangeKeyno(e) {
    this.setState({ keyno: e.target.value }, () => this.fetchData());
  }

  handleFilterValue(value) {
    this.setState({ keyno: value }, () => this.fetchData());
  }

  handleChangeAll() {
    this.setState(prevState => {
      const { isAllChecked } = prevState;
      let { checkedList } = prevState;
      // console.debug('checkedList', checkedList.toJS());
      if (!isAllChecked) {
        const { data } = prevState;
        const addDataList = data.toJS().filter(dataItem => checkedList.findIndex(checkedItem => checkedItem.get('keyno') === dataItem.keyno) === -1);
        addDataList.forEach(list => {
          checkedList = checkedList.push(fromJS(list));
        });
        console.debug('checkedList', checkedList.toJS());
        return { checkedList, isAllChecked: !isAllChecked };
      }
      // return { checkedList: fromJS([]), isAllChecked: !isAllChecked };
      const { data } = prevState;
      data.toJS().forEach(dataItem => {
        // console.debug(dataItem);
        const targetIndex = checkedList.findIndex(checkedItem => checkedItem.get('keyno') === dataItem.keyno);
        if (targetIndex > -1) {
          checkedList = checkedList.delete(targetIndex);
        }
      });
      console.debug('checkedList', checkedList.toJS());
      return { checkedList, isAllChecked: !isAllChecked };
    });
  }

  render() {
    const { isOpen, pagination, data, selector, checkedList, fab, area, model, keyno, selectorArea, selectorKeyno, selectorModel, isAllChecked } = this.state;

    const categories = [
      { value: 'all', text: '전체' },
      { value: 'fab', text: 'FAB' },
      { value: 'area', text: 'AREA' },
      { value: 'keyno', text: 'EquipNo' },
      { value: 'model', text: 'EquipModel' },
    ];
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleClose}
        style={{
          width: 1050,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div id="modal-content" ref={this.contentRef}>
          <StyledContent>
            <div className="pop_tit">
              장비찾기
              <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
            </div>

            <div className="pop_con">
              <SearchWrap ref={this.searchWrapRef} categories={categories} submit={this.submitSearch} />

              <div className="tb_wrap">
                <table className="tb01">
                  <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="30%" />
                    <col width="30%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        <div className="checkbox">
                          <input type="checkbox" id="rootCheckBox" onChange={() => this.handleChangeAll()} checked={isAllChecked} />
                          <label htmlFor="rootCheckBox">
                            <span />
                          </label>
                        </div>
                      </th>
                      <th>
                        <div style={{ margin: 'auto', width: '90%' }}>
                          <select name="fab" id="fab" onChange={this.handleChangeFab} value={fab}>
                            <option value="all">FAB - 전체</option>
                            {selector.map(option => (
                              <option key={`${option.get('cd')}`} value={option.get('cd')}>{`FAB - ${option.get('cdnm')}`}</option>
                            ))}
                          </select>
                        </div>
                      </th>
                      <th>
                        <div style={{ margin: 'auto', width: '90%' }}>
                          <select name="area" id="area" onChange={this.handleChangeArea} value={area}>
                            <option value="all">AREA - 전체</option>
                            {selectorArea.map(option => (
                              <option key={`${option.get('cd')}`} value={option.get('cd')}>{`AREA - ${option.get('cdnm')}`}</option>
                            ))}
                          </select>
                        </div>
                      </th>
                      <th>
                        <div style={{ margin: 'auto', width: '90%' }}>
                          <select name="equipModel" id="equipModel" onChange={this.handleChangeModel} value={model}>
                            <option value="all">EquipModel - 전체</option>
                            {selectorModel.map(option => (
                              <option key={`${option.get('cd')}`} value={option.get('cd')}>{`EquipModel - ${option.get('cdnm')}`}</option>
                            ))}
                          </select>
                        </div>
                      </th>
                      <th>
                        <div style={{ margin: 'auto', width: '90%' }}>
                          <select name="equipkeyno" id="equipkeyno" onChange={this.handleChangeKeyno} value={keyno}>
                            <option value="all">EquipkeyNo - 전체</option>
                            {selectorKeyno.map(option => (
                              <option key={`${option.get('cd')}`} value={option.get('cd')}>{`EquipkeyNo - ${option.get('cdnm')}`}</option>
                            ))}
                          </select>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
                {/* <Scrollbars autoHeight> */}
                <table className="tb01">
                  <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="30%" />
                    <col width="30%" />
                  </colgroup>
                  <tbody>
                    {data.toJS().length > 0 ? (
                      data.map(item => (
                        <tr key={`${item.get('keyno')}_${item.get('model')}_${item.get('fab')}_${item.get('area')}`}>
                          <td>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id={`${item.get('keyno')}_${item.get('model')}`}
                                checked={checkedList.findIndex(checkedItem => checkedItem.get('keyno') === item.get('keyno')) > -1}
                                onChange={() => this.handleCheck(item)}
                              />
                              <label htmlFor={`${item.get('keyno')}_${item.get('model')}`}>
                                <span />
                              </label>
                            </div>
                          </td>
                          <td>{item.get('fab')}</td>
                          <td>{item.get('area')}</td>
                          <td>{item.get('model')}</td>
                          <td>{item.get('keyno')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', fontSize: 20 }}>
                          <span>검색 결과가없습니다.</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* </Scrollbars> */}
                <Pagination {...pagination.toJS()} groupSize={10} pageHandler={this.pageHandler} pageSizeHandler={this.pageSizeHandler} fixedViewSize />
              </div>
              <div className="btn_wrap">
                <Button type="button" color="primary" onClick={this.sendSelectedKeys}>
                  확인하기
                </Button>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default SearchEquipModal;
