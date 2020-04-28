import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledHtmlTable from 'commonStyled/EshsStyled/Table/StyledHtmlTable';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { sagaKey: id, getCallDataHandler } = this.props;
    const apiAry = [
      {
        key: 'eshsclean',
        url: '/api/eshs/v1/common/eshsclean',
        type: 'GET',
      },
      {
        key: 'treeSelectData',
        type: 'POST',
        url: '/api/admin/v1/common/categoryMapList',
        params: { PARAM: { NODE_ID: 4013 } },
      },
    ];
    getCallDataHandler(id, apiAry, this.initData);
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  };

  initData = () => {
    const {
      result: { treeSelectData, eshsclean },
      series,
    } = this.props;
    const selected = eshsclean && eshsclean.list && eshsclean.list.find(f => f.SELECTED_NODE_ID === series);
    const imgUrl = `http://192.168.251.14:10197/down/file/${selected && selected.FILE_SEQ}`;
    const dataSource = treeSelectData && treeSelectData.categoryMapList && treeSelectData.categoryMapList.filter(f => f.PARENT_NODE_ID === series);
    this.setState({ dataSource, imgUrl });
  };

  render() {
    const { series } = this.props;
    const { dataSource, imgUrl } = this.state;
    let colgroups;
    switch (series) {
      case 4014: // HF계
        colgroups = (
          <colgroup>
            <col width="4%" />
            <col width="12%" />
            <col width="17%" />
            <col width="10%" />
            <col width="17%" />
            <col width="10%" />
            <col width="8%" />
            <col width="8%" />
            <col width="14%" />
          </colgroup>
        );
        break;
      case 4015: // AA계
        colgroups = (
          <colgroup>
            <col width="4%" />
            <col width="13%" />
            <col width="23%" />
            <col width="16%" />
            <col width="15%" />
            <col width="11%" />
            <col width="18%" />
          </colgroup>
        );
        break;
      case 4016: // 유기계
        colgroups = (
          <colgroup>
            <col width="3%" />
            <col width="10%" />
            <col width="7%" />
            <col width="8%" />
            <col width="16%" />
            <col width="8%" />
            <col width="12%" />
            <col width="8%" />
            <col width="8%" />
            <col width="8%" />
            <col width="12%" />
          </colgroup>
        );
        break;
      default:
        colgroups = '';
        break;
    }
    return (
      <ContentsWrapper>
        {dataSource ? (
          <StyledHtmlTable className="tableWrapper">
            <img alt="uploadImage" style={{ width: '100%' }} src={imgUrl} />
            <table>
              {colgroups}
              <tbody>
                <tr>
                  <td>설비</td>
                  {dataSource && dataSource.map(item => <td>{item.NAME_KOR}</td>)}
                </tr>
                <tr>
                  <td>용도</td>
                  {dataSource && dataSource.map(item => <td>{item.DESCIPTION}</td>)}
                </tr>
              </tbody>
            </table>
          </StyledHtmlTable>
        ) : (
          ''
        )}
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  result: PropTypes.any,
  series: PropTypes.number,
};

List.defaultProps = {
  getCallDataHandler: () => {},
};

export default List;
