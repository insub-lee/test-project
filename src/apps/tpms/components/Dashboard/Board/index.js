import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import StyledBoardWrap from './StyledBoardWrap';
import List from './List';
import jsonToQueryString from '../../../utils/jsonToQueryString';
import service from './service';
import FormView from '../../FormPreview/FormView';
import alertMessage from '../../Notification/Alert';
import makeContents from '../../../utils/makeContents';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: fromJS([]),
      isShowDetail: false,
      detail: fromJS({
        title: '',
        contents: [],
      }),
      isLoadingContents: false,
      isNotice: false,
    };
    this.fetchTableData = this.fetchTableData.bind(this);
    this.fetchPost = this.fetchPost.bind(this);
    this.showDetail = this.showDetail.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    const { boardId } = this.props;
    this.fetchTableData(boardId);
    this.setState({ isNotice: boardId === 'brd00000000000000002' });
  }

  componentWillUnmount() {
    this.mounted = true;
  }

  async fetchTableData(brdId) {
    const requestQuery = {
      brdid: brdId,
      type: 'list',
      currentPage: 1,
      pageSize: 5,
    };
    const queryString = jsonToQueryString(requestQuery);
    const getUrl = `/apigate/v1/portal/post?${queryString}`;
    const { response, error } = await service.board.get(getUrl);
    if (response && !error) {
      // Todo - Must get max 5
      const list = response.list
        .filter((item, index) => index < 5)
        .map(item => ({
          id: item.postno,
          boardId: item.brdid,
          txt: item.title,
          isComments: item.hpostno > 0,
          date: item.insdt,
        }));
      if (this.mounted) {
        this.setState({
          list: fromJS(list),
        });
      }
    } else {
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  async fetchPost(postno, brdId) {
    this.setState({
      isLoadingContents: true,
    });
    const { formJson } = this.props;
    const requestQuery = {
      brdid: brdId,
      type: 'view',
      postno,
    };
    const queryString = jsonToQueryString(requestQuery);
    const getUrl = `/apigate/v1/portal/post?${queryString}`;
    const { response, error } = await service.board.get(getUrl);
    if (response && !error) {
      const content = JSON.parse(response.brdInfo.view.content);
      const contents = makeContents(formJson, content);
      console.debug('>>> contents', formJson, contents);
      // const contents = formJson.map(item => ({
      //   ...item,
      //   option: {
      //     ...item.option,
      //     value: content[item.option.name],
      //     readOnly: true,
      //   },
      // }));
      this.setState(prevState => ({
        isLoadingContents: true,
        detail: prevState.detail.set('contents', fromJS(contents)),
      }));
    } else {
      this.setState({
        isLoadingContents: false,
      });
      console.debug(error);
      alertMessage.alert('Server Error');
    }
  }

  showDetail(postNo) {
    const { boardId } = this.props;
    this.setState(
      prevState => {
        const title = prevState.list.find(item => item.get('id') === postNo).get('txt');
        return {
          isShowDetail: true,
          detail: prevState.detail.set('title', title),
        };
      },
      () => this.fetchPost(postNo, boardId),
    );
  }

  closeDetail() {
    this.setState({
      isShowDetail: false,
      detail: fromJS({
        title: '',
        contents: [],
      }),
    });
  }

  render() {
    const { list, isShowDetail, detail, isLoadingContents, isNotice } = this.state;
    const { title, data, noTitle, link } = this.props;
    return (
      <StyledBoardWrap className={`${data.bgClass} ${isNotice ? 'notice_board' : ''}`}>
        {!noTitle && (
          <div className="grid_tit">
            {title}
            <div className="btn_wrap">
              {link && <Link className="more_button" to={link} />}
              {/* <button type="button" className="more_button" /> */}
            </div>
          </div>
        )}
        <div className="main_board">
          {list.size > 0 ? (
            <List list={list.toJS()} onClickItem={id => this.showDetail(id)} />
          ) : (
            <div className="no_list">
              <span>등록된 글이 없습니다.</span>
            </div>
          )}
        </div>
        <div className={`main_board_con ${isShowDetail ? 'active' : ''}`}>
          <dl>
            <dt>{detail.get('title')}</dt>
            <dd>
              <Scrollbars style={{ height: '100%', background: 'transparent' }} autoHide>
                <FormView
                  datas={detail
                    .get('contents')
                    .toJS()
                    .filter(item => item.option.name !== 'title')}
                  noBoarder
                  noPadding
                  smallView
                  noBg={isNotice}
                  allWhiteColor={isNotice}
                />
              </Scrollbars>
            </dd>
          </dl>
          <button type="button" className="button_close" onClick={this.closeDetail} />
        </div>
      </StyledBoardWrap>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    bgClass: PropTypes.string,
    icon: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        txt: PropTypes.string,
        date: PropTypes.number,
        isReply: PropTypes.bool,
      }),
    ),
  }),
  noTitle: PropTypes.bool,
  boardId: PropTypes.string.isRequired,
  link: PropTypes.string,
};

Board.defaultProps = {
  title: '',
  data: {
    bgClass: '',
    icon: '',
    list: [],
  },
  noTitle: false,
  link: null,
};

export default Board;
