/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import StyledBoardWrap from './StyledBoardWrap';
import List from './List';
import jsonToQueryString from '../../../utils/jsonToQueryString';
import service from './service';
import FormView from '../../FormPreview/FormView';
import alertMessage from '../../Notification/Alert';
import makeContents from '../../../utils/makeContents';

import { useBoard } from '../../../hooks/useBoard';

const Board = ({ title, data, boardId, formJson, link, boardCode, noTitle }) => {
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState([]);
  const [isNotice, setIsNotice] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const { data: boardList } = useBoard({ boardCode });

  useEffect(() => {
    setIsLoaded(false);
    setIsNotice(boardId === 'brd00000000000000002');
    if (boardList.length > 0) {
      const processedList = boardList
        .filter((item, index) => index < 5)
        .map(item => ({
          id: item?.task_seq,
          boardId: item?.boardcode,
          txt: item?.title,
          isComments: item?.parentno > 0,
          date: item?.reg_dttm,
          content: item?.content,
        }));
      setList(processedList);
      setIsLoaded(true);
    }
  }, [JSON.stringify(boardList), boardCode]);

  // componentDidMount() {
  //   this.mounted = true;
  //   const { boardId } = this.props;
  //   this.fetchTableData(boardId);
  //   this.setState({ isNotice: boardId === 'brd00000000000000002' });
  // }

  // componentWillUnmount() {
  //   this.mounted = true;
  // }

  // const fetchTableData = asnyc (brdId) => {
  //   const requestQuery = {
  //     brdid: brdId,
  //     type: 'list',
  //     currentPage: 1,
  //     pageSize: 5,
  //   };
  //   const queryString = jsonToQueryString(requestQuery);
  //   const getUrl = `/apigate/v1/portal/post?${queryString}`;
  //   const { response, error } = await service.board.get(getUrl);
  //   if (response && !error) {
  //     // Todo - Must get max 5
  //   const list = response.list
  //     .filter((item, index) => index < 5)
  //     .map(item => ({
  //       id: item.postno,
  //       boardId: item.brdid,
  //       txt: item.title,
  //       isComments: item.hpostno > 0,
  //       date: item.insdt,
  //     }));
  //   if (this.mounted) {
  //     this.setState({
  //       list: fromJS(list),
  //     });
  //   }
  // } else {
  //   console.debug(error);
  //   alertMessage.alert('Server Error');
  // }
  // };

  // const fetchPost = async (postno, brdId)=> {
  //   this.setState({
  //     isLoadingContents: true,
  //   });
  //   const { formJson } = this.props;

  //   const requestQuery = {
  //     brdid: brdId,
  //     type: 'view',
  //     postno,
  //   };
  //   const queryString = jsonToQueryString(requestQuery);
  //   const getUrl = `/apigate/v1/portal/post?${queryString}`;
  //   const { response, error } = await service.board.get(getUrl);
  //   if (response && !error) {
  //     const content = JSON.parse(response.brdInfo.view.content);
  //     const contents = makeContents(formJson, content);
  //     this.setState(prevState => ({
  //       isLoadingContents: true,
  //       detail: prevState.detail.set('contents', fromJS(contents)),
  //     }));
  //   } else {
  //     this.setState({
  //       isLoadingContents: false,
  //     });
  //     console.debug(error);
  //     alertMessage.alert('Server Error');
  //   }
  // }

  const showDetail = postNo => {
    const temp = list.filter(({ id }) => id === postNo);

    if (temp.length > 0) {
      setDetail(makeContents(formJson, JSON.parse(temp[0].content || '{}')));
      setIsShowDetail(true);
    }

    // this.setState(
    //   prevState => {
    //     const title = prevState.list.find(item => item.get('id') === postNo).get('txt');
    //     return {
    //       isShowDetail: true,
    //       detail: prevState.detail.set('title', title),
    //     };
    //   },
    //   () => this.fetchPost(postNo, boardId),
    // );
  };

  const closeDetail = () => {
    setIsShowDetail(false);
    setDetail([]);
  };

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
        {isLoaded && list.length > 0 ? (
          <List list={list} onClickItem={id => showDetail(id)} />
        ) : (
          <div className="no_list">
            <span>등록된 글이 없습니다.</span>
          </div>
        )}
      </div>
      <div className={`main_board_con ${isShowDetail ? 'active' : ''}`}>
        <dl>
          {isLoaded && (
            <>
              {detail
                ?.filter(item => item.option.name === 'title')
                .map(e => (
                  <dt>{e?.option?.value}</dt>
                ))}
              <dd>
                <Scrollbars style={{ height: '100%', background: 'transparent' }} autoHide>
                  <FormView
                    datas={detail?.filter(item => item.option.name !== 'title')}
                    noBoarder
                    noPadding
                    smallView
                    noBg={isNotice}
                    allWhiteColor={isNotice}
                  />
                </Scrollbars>
              </dd>
            </>
          )}
        </dl>
        <button
          type="button"
          className="button_close"
          aria-label="close Button"
          onClick={() => {
            closeDetail();
          }}
        />
      </div>
    </StyledBoardWrap>
  );
};

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
        content: PropTypes.object,
      }),
    ),
  }),
  formJson: PropTypes.object,
  noTitle: PropTypes.bool,
  boardId: PropTypes.string,
  boardCode: PropTypes.string.isRequired,
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
