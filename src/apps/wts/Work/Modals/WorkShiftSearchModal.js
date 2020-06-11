import React from 'react';
import Modal from 'rc-dialog';

import { fromJS } from 'immutable';
import TreeView from 'react-treeview';
import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContent from './StyledContent';

class WorkShiftSearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      categories: fromJS([]),
      nodes: [
        {
          type: 'A조',
          collapsed: false,
          people: [
            {
              name: 'Paul Gordon',
            },
            {
              name: 'Sarah Lee',
            },
          ],
        },
        {
          type: 'B조',
          collapsed: false,
          people: [
            {
              name: 'Drew Anderson',
            },
          ],
        },
      ],
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.submitData = this.submitData.bind(this);
    this.fetchCodes = this.fetchCodes.bind(this);
    this.handleMainCategory = this.handleMainCategory.bind(this);
  }

  componentDidMount() {
    this.fetchCodes();
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  handleAfterOpen() {
    const { id } = this.state;
    console.debug('Opened Modal : ', id);
  }

  async fetchCodes() {
    const payload = {};
    // Todo - add fetch handler
    // This is sample
    const categories = [
      {
        cd: '0',
        cdnm: '근무조',
        children: [
          { cd: '00', cdnm: 'A조' },
          { cd: '01', cdnm: 'B조' },
          { cd: '02', cdnm: 'C조' },
          { cd: '03', cdnm: 'D조' },
        ],
        selected: true,
      },
      {
        cd: '1',
        cdnm: 'AREA',
        children: [
          { cd: '10', cdnm: '시스템 A' },
          { cd: '11', cdnm: '시스템 B' },
        ],
        selected: false,
      },
    ];
    this.setState({ categories: fromJS(categories) });
  }

  handleMainCategory(e) {
    const { value } = e.target;
    this.setState(prevState => {
      const { categories } = prevState;
      return {
        categories: categories.map(category => category.set('selected', category.get('cd') === value)),
      };
    });
  }

  submitData(e) {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });
    console.debug('# Search Payload : ', payload);
  }

  render() {
    const { isOpen, categories, nodes } = this.state;
    const currentMainCategory = categories.find(category => category.get('selected'));
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        bodyStyle={{
          width: 500,
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              근무조/AREA 검색
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              {/* 검색 영역 */}
              <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
                <ul className="sub_form small2">
                  <li className="">
                    <label htmlFor="type01" className="title">
                      구분1
                    </label>
                    <select name="type01" id="type01" value={currentMainCategory ? currentMainCategory.get('cd') : ''} onChange={this.handleMainCategory}>
                      {categories.map(category => (
                        <option key={category.get('cd')} value={category.get('cd')}>
                          {category.get('cdnm')}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="">
                    <label htmlFor="type02" className="title">
                      구분2
                    </label>
                    <select name="type02" id="type02">
                      {currentMainCategory &&
                        currentMainCategory.get('children').map(category => (
                          <option key={category.get('cd')} value={category.get('cd')}>
                            {category.get('cdnm')}
                          </option>
                        ))}
                    </select>
                  </li>
                  <li>
                    <label htmlFor="searchInput" className="title">
                      검색어
                    </label>
                    <div className="input_with_btn">
                      <input type="text" id="searchInput" className="input" placeholder="검색어를 입력하세요." />
                      <button type="submit" className="icon searchNumber">
                        검색
                      </button>
                    </div>
                  </li>
                </ul>
              </StyledCommonForm>
              {/* 결과 영역 */}
              <div className="tree">
                <div className="tree_title">A 조</div>
                <div className="tree_contents">
                  {nodes.map((node, i) => {
                    const { type } = node;
                    const label = <span className="node">{type}</span>;
                    return (
                      <TreeView key={`${type}|${i}`} nodeLabel={label} defaultCollapsed={false}>
                        {node.people.map(person => (
                          <div key={person.name}>
                            <span className="node">{person.name}</span>
                          </div>
                        ))}
                      </TreeView>
                    );
                  })}
                </div>
              </div>
              <div className="btn_wrap">
                <StyledButton type="submit" className="btn-primary btn-sm">
                  확인
                </StyledButton>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

export default WorkShiftSearchModal;
