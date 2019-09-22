import React, { Component } from 'react';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';
import { Checkbox, Button } from 'antd';
import { lang, intlObj } from 'utils/commonUtils';
import Input from 'components/Input';
import ScrollBar from 'react-custom-scrollbars';
import StyleUserTree from 'style/StyleUserTree';
import _ from 'lodash';
import {
  SortableTreeWithoutDndContext as SortableTree,
} from './resource/react-sortable-tree';
import messages from './messages';
import './app.css';
import CustomTheme from './theme';
// import StyleUserTree from './StyleUserTree';

class Tree extends Component {
  constructor(props) {
    super(props);

    const {
      treeData,
    } = props;

    this.state = {
      searchFocusIndex: 0,
      checked: false, // 조직도 좌측의 트리 체크박스 defaultChecked 옵션에 들어가는 값
      // 조직도 좌측의 트리 체크박스 체크 시 onCheckedChange가 불리는데, 이 함수에서 호출되는 두번째 인자
      deptName: treeData && treeData.length !== 0 ? treeData[0][`NAME_${lang.translator[lang.getLocale()]}`] : '',
      checkedList: [], // 조직도 좌측의 트리 체크박스 중 체크된 체크박스 목록을 담고있는 배열
      // isFocus: false,
    };

    // 트리 검색에서 검색어를 입력할 때마다 updateTreeData가 불리므로, 스로틀을 이용해 호출 횟수 제한을 둔다.
    this.updateTreeData = _.debounce(this.updateTreeData.bind(this), 500);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.treeData.length === 0) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const { treeData } = this.props;
    if (treeData.length !== 0 && prevProps.treeData.length !== 0
          && treeData[0].key !== prevProps.treeData[0].key) {
      const treeDataTemp = treeData[0];
      this.setDeptName(treeDataTemp);
    }
  }

  resetCheckedList = () => {
    this.setState({ checkedList: [] });
  }

  // 트리의 체크박스 체크 시 불리는 함수로, loadSelected~를 호출하여 선택목록에 담을 준비를 함
  onCheckChange = (event) => {
    const { checkedList, deptName } = this.state;
    const { loadSelected, selectSingleDept } = this.props;
    const { target } = event;
    const value = target.checked;
    const { name } = target; // DEPT_ID
    const deptId = target.id; // DEPT_ID
    let deptIdArr = [];
    this.setState({
      [name]: value,
    });

    if (target.checked) {
      /*
        하나만 선택 할 수 있는 옵션 일 때,
        기존 선택된 데이터가 있을 때는 선택 안되도록 처리
      */
      if (selectSingleDept) {
        if (checkedList.length > 0) return;
      }

      loadSelected(target, deptName);
      deptIdArr = checkedList.slice();
      deptIdArr.push(deptId);
      this.setState({
        checkedList: deptIdArr,
      });
    } else if (!target.checked) {
      loadSelected(target);
      const idx = checkedList.findIndex(t => t === target.id);
      deptIdArr = checkedList.slice();
      deptIdArr.splice(idx, 1);
      this.setState({
        checkedList: deptIdArr,
      });
    }
  }

  setDeptName = (treeDataTemp) => {
    this.setState({
      deptName: treeDataTemp[`NAME_${lang.translator[lang.getLocale()]}`],
    });
  }

  // 트리의 변화 또는 트리의 노드 클릭 시 불리는 함수
  updateTreeData(treeData, selectedIndex) {
    const { getSaveTree } = this.props;
    getSaveTree(treeData, selectedIndex);

    // if (!this.state.isFocus) {
    //   getSaveTree(treeData, selectedIndex);
    // }
  }


  render() {
    const {
      searchFocusIndex,
      checkedList,
    } = this.state;

    const {
      initializeSearchInput,
      setSelectedIdAndCount,
      treeType,
      changeTreeData,
      isTreeCheckbox,

      treeData,
      selectedIndex,
      organizationData,
      selectedDept,
      searchString,
      handleSetSelectedIndex,
      // getSaveTree,
      getUsers,
      setSearchString,
      isTab,
      selectedUserDeptName,
      handleSetSelectedUserDeptName,
      isProfile,

      isDeptSelectbox,
      siteId,
      siteIdParam,
    } = this.props;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      lang.get('NAME', node).toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    return (
      <StyleUserTree
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: isTab ? 451 : 496,
          width: 292,
          background: '#f5f5f5',
          marginTop: isTab ? 0 : 15,
        }}
        pl={isTreeCheckbox ? '22px' : '0px'}
      >
        <div style={{ flex: '0 0 auto' }}>
          <div>
            <form
              style={{ display: 'block' }}
              onSubmit={event => event.preventDefault()}
            >
              <div className="searchOptions">
                {/* grp 트리인 경우 selectbox 제거 */}
                {
                  /* eslint-disable */
                  treeType === 'grp'
                    ?
                      isDeptSelectbox
                        ?
                          <div className="selectWrapper" style={{ marginBottom: 10 }}>
                            <select
                              value={selectedDept}
                              onChange={e => changeTreeData(e.target.value)}
                            >
                              {
                                organizationData.map(dept => (
                                  <option value={dept.SITE_ID} key={dept.SITE_ID}>
                                    {lang.get('NAME', dept)}
                                  </option>
                                ))
                              }
                            </select>
                          </div>
                        :
                        ''
                    :
                        <div className="selectWrapper" style={{ marginBottom: 10 }}>
                          <select
                            value={selectedDept}
                            onChange={e => changeTreeData(e.target.value)}
                          >
                            {
                              organizationData.map((dept) => {
                                let v = '';
                                switch (treeType) {
                                  case 'pstn':
                                    v = dept.PSTN_ID;
                                    break;
                                  case 'duty':
                                    v = dept.DUTY_ID;
                                    break;
                                  default:
                                    v = dept.DEPT_ID;
                                    break;
                                }

                                return (
                                  <option value={v} key={v}>
                                    {lang.get('NAME', dept)}
                                  </option>
                                );
                              })
                            }
                          </select>
                        </div>
                        /* eslint-disable */
                      }
                <div
                  className="inputWrapper"
                >
                  <label htmlFor="find-box">
                    <Input
                      id="find-box"
                      type="text"
                      value={searchString}
                      onChange={(event) => {
                        setSearchString(event.target.value, treeType);
                      }}
                      onFocus={() => { this.setState({ isFocus: true }); }}
                      onBlur={() => { this.setState({ isFocus: false }); }}
                    />
                  </label>
                  <Button className="searchButton" title={intlObj.get(messages.search)} />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style={{ flex: '1 0 50%', marginTop: 10, paddingLeft: 15 }}>
          <ScrollBar
            style={{ width: 280, height: '100%' }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <SortableTree
              theme={CustomTheme}
              treeData={treeData}
              onChange={(treeData) => { this.updateTreeData(treeData, selectedIndex); }}
              searchMethod={customSearchMethod}
              searchQuery={searchString && searchString.length !== 0
                            ? searchString : selectedUserDeptName}
              searchFocusOffset={searchFocusIndex}
              style={{ display: 'inline-block', width: '100%', height: '100%', overflow: 'visible' }}
              isVirtualized={false}
              generateNodeProps={({ node }) => {
                const handleOnClick = () => {

                  // Organization index.js 자체 메소드
                  // initializeSearchInput: Organization index.js의 자체 메소드
                  if (initializeSearchInput) {
                    initializeSearchInput(treeType);
                  }
                  setSelectedIdAndCount(node.key, treeType);

                  // props로 전달되야할 메소드
                  handleSetSelectedIndex(selectedIndex);
                  this.updateTreeData(treeData, node.key); // onChange
                  // getSaveTree(treeData, node.key);

                  // 그리드 구성원 목록 가져오기
                  // 조직도의 경우 GRP_ID, SITE_ID를 전달해줘야함
                  if (treeType === 'grp') {
                    if (siteIdParam) {
                      // 세션의 SITE_ID가 있는 경우
                      getUsers(node.key, siteIdParam);
                    } else if (siteId) {
                      // 조직도의 props로 SITE_ID가 들어온 경우
                      getUsers(node.key, siteId);
                    } else {
                      // 세션, props 모두 SITE_ID가 없는 경우 트리 위의 selectbox에 선택된 사이트의 SITE_ID값 사용
                      // 이 때, selectbox를 한번도 선택하지 않았을 경우 selectbox 목록 중 첫번째 목록의 SITE_ID값 사용
                      getUsers(node.key, selectedDept ? selectedDept : organizationData[0].SITE_ID);
                    }
                  } else {
                    getUsers(node.key);
                  }

                  if (isProfile) {
                    handleSetSelectedUserDeptName('');
                  }
                };

                const btn = isTreeCheckbox ?
                  (
                    <Checkbox
                      id={node.key}
                      name={`${node.key}`}
                      title={node[`NAME_${lang.translator[lang.getLocale()]}`]}
                      defaultChecked={this.state.checked}
                      onChange={this.onCheckChange}
                      checked={checkedList.findIndex(t => t === node.key) !== -1}
                      node={node}
                    />
                  ) :
                  '';

                return {
                  // 글자 배경색 주황색으로 표시
                  title: (<button className={`${node.key === selectedIndex ? 'active' : ''}`} onClick={handleOnClick}>{node[`NAME_${lang.translator[lang.getLocale()]}`]}</button>),
                  buttons: [
                    btn,
                  ],
                };
              }}
              rowHeight={24}
              scaffoldBlockPxWidth={20}
              className="orgTreeWrapper CustomSCRB"
              onlyExpandSearchedNodes={true}
              ref={(ref) => { this.tree = ref; }}
            />
          </ScrollBar>
        </div>
      </StyleUserTree>
    );
  }
}

Tree.propTypes = {
  treeData: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired, // 트리의 노드를 클릭하면 그리드에 뿌려 줄 users(store) 데이터를 가져오는 콜백 함수
  getSaveTree: PropTypes.func.isRequired, // 트리의 상태 유지를 위한 함수로, 트리의 onChange 속성에서 불려짐
  initializeSearchInput: PropTypes.func.isRequired, // 트리의 노드를 클릭하면 불려지는 함수로, 그리드 위의 검색어를 초기화 해주는 함수
  setSelectedIdAndCount: PropTypes.func.isRequired, // 트리의 노드를 클릭하면 불려지는 함수로, 그리드의 무한 스크롤에 필요한 함수
  selectedIndex: PropTypes.string.isRequired, // 트리에서 선택된 노드의 인덱스
  selectedDept: PropTypes.number.isRequired, // 조직도 좌측 select에 선택되어 있는 부서 ID
  organizationData: PropTypes.array, // 조직도 좌측 select에 들어갈 부서명 배열
  changeTreeData: PropTypes.func, // 트리 위의 select를 변경할 경우 새로운 트리의 treeData를 가져오는 액션을 디스패치하기 위한 함수
  loadSelected: PropTypes.func, // 트리의 체크박스 클릭 시 선택된 부서 저장하는 함수
  searchString: PropTypes.string,

  treeType: PropTypes.string.isRequired,
  isTreeCheckbox: PropTypes.bool.isRequired, // 조직도 index의 isOnlyMember 값을 전달받음, 트리의 체크박스 유무를 위한 플래그
  handleSetSelectedIndex: PropTypes.func.isRequired,
  handleSetSelectedUserDeptName: PropTypes.func.isRequired,
  setSearchString: PropTypes.func.isRequired,
  isTab: PropTypes.bool.isRequired,
  selectedUserDeptName: PropTypes.string,
  isProfile: PropTypes.bool.isRequired,

  isDeptSelectbox: PropTypes.bool.isRequired,
  siteId: PropTypes.number.isRequired,
  siteIdParam: PropTypes.number.isRequired,
  selectSingleDept: PropTypes.bool,
};

Tree.defaultProps = {
  organizationData: undefined,
  changeTreeData: undefined,
  loadSelected: undefined,
  searchString: '',
  selectedUserDeptName: undefined,
  selectSingleDept: false,
};

export default Tree;
