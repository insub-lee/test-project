import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import ScrollBar from 'react-custom-scrollbars';
import * as selectors from '../../apps/boards/widgets/selectors';

import {RodalContentStyle, DrilldownView} from './StyleRodal';

class testModal extends Component {
  constructor(prop) {
    super(prop);
    this.state = {

    };

    this.onClick = this.onClick.bind(this);
    this.comma = this.comma.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      getDetailBoardData,
    } = nextProps;

    if (getDetailBoardData.articleDetail !== undefined) {
      return true;
    }
    return false;
  }

  onClick(url) {
    window.open(url);
  }

  comma(num){
    var len, point, str;  
       
    num = num + "";  
    point = num.length % 3 ;
    len = num.length;  
   
    str = num.substring(0, point);  
    while (point < len) {  
        if (str != "") str += ".";  
        str += num.substring(point, point + 3);  
        point += 3;  
    }  
     
    return str;
 
}

  render() {
    const { getDetailBoardData } = this.props;

    const RenderView = (detailView) => {
      const Detail = detailView.articleDetail.arDetail;

      const c = Detail.replace(/\\/ig, '').replace(/"/ig, '');
      const a = c.indexOf("html:");
      const b = c.lastIndexOf("addDiv");

      const result = c.substring(a + 5, b - 1);

      return (
        <div dangerouslySetInnerHTML= { {__html: result } } />
      );
    };

    const RenderList = (list) => {
      if (this.props.tabNum === '1') {
        return (
          this.props.setIfBoardDataList[0].map(list => 
            <li onClick={() => {this.props.show(list, this.props.tabNum)}} >
            <button className="ellipsis">
              <span>· [전사]</span>
              {list.arTitle}
            </button>
          </li>
          )
        )
      } else if (this.props.tabNum === '2') {
        return (
          this.props.setIfBoardDataList[1].map(list => 
            <li onClick={() => {this.props.show(list, this.props.tabNum)}} >
            <button className="ellipsis">
              <span>· [전사]</span>
              {list.arTitle}
            </button>
          </li>
          )
        )
      } else {
        return (
          this.props.setIfBoardDataList[2].map(list => 
            <li onClick={() => {this.props.show(list, this.props.tabNum)}} >
            <button className="ellipsis">
              <span>· [전사]</span>
              {list.arTitle}
            </button>
          </li>
          )
        )
      }
    }

    const RenderRightView = (view) => {
      const article = view.article;
      const files = view.articleFiles;

      const { tabNum } = this.props;

      return (
        <div className="rightContent">
          <div className="viewTop">
            <ScrollBar className="rodalCustomScrollbar">
              <div className="contentInfo">
                <ul className="empData">
                  <li>
                    <div className="empPicture">
                      <img
                        src={`http://skynet.skhynix.com/portalWeb/uploadfile/pictures/${article.empnoRegist}.jpg`}
                        alt={article.empnoRegist}
                        onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
                      />
                    </div>
                  </li>
                  <li className="name">
                    {article.empName}
                  </li>
                  <li className="empNo">
                    ({article.empnoRegist})
                  </li>
                  <li className="dept">
                    {article.deptName}
                  </li>
                  <li className="position">
                    {article.positionName}
                  </li>
                </ul>
                <div className="writtenDate">{article.regDt}</div>
                <h1 className="title ellipsis">{article.arTitle}</h1>
              </div>
              {files.length > 0 ?
              <div className="attachedfiles">
                <div className="saveAll">
                  <button title="모두 저장">
                    {/* <span>모두 저장</span> */}
                  </button>
                </div>
                <table>
                  <tbody>
                    {files.map(list =>
                      <tr>
                      <td>
                        <p className="iconAttachedfile">{list.fileName} <span>({`${(this.comma(list.fileSize))}KB`})</span></p>
                      </td>
                      <td>
                        <button className="iconSave" title="저장하기" onClick={() =>{this.onClick(list.fileUrl)}}>저장</button>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
              </div>
              :
              false
              }
            </ScrollBar>
          </div>
          <div className="viewBottom">
            <ScrollBar className="rodalCustomScrollbar">
              <ul className="otherListItems">
                {RenderList(this.props.setIfBoardDataList)}
                {/* {this.props.setIfBoardDataList[0].map(list => 
                  <li onClick={() => {this.props.show(list)}} >
                  <button className="ellipsis">
                    <span>· [전사]</span>
                    {list.arTitle}
                  </button>
                </li>
                )} */}
              </ul>
            </ScrollBar>
          </div>
        </div>
      );
    };

    return (
      <RodalContentStyle className="contentWrapper">
        <div className="header" />
        <Row type="flex" justify="space-between">
          <Col xs={24} md={24} xl={16} className="leftActivity">
            <ScrollBar className="rodalCustomScrollbar">
              <div className="content">
                {getDetailBoardData.articleDetail !== undefined ?
                RenderView(getDetailBoardData)
                :
                <div />
                }
              </div>
            </ScrollBar>
          </Col>
          <Col xl={8} className="rightActivity">{/* MobileView에서 숨김 */}
            <div className="view">
              <DrilldownView>
                {getDetailBoardData.article !== undefined ?
                  RenderRightView(getDetailBoardData)
                  :
                  <div />
                }
              </DrilldownView>
            </div>
          </Col>
        </Row>
      </RodalContentStyle>
    );
  }
}

testModal.propTypes = {
  getDetailBoardData: PropTypes.object.isRequired,
};

const mapDispatchToProps = () => ({});

const mapStateToProps = createStructuredSelector({
  getDetailBoardData: selectors.makeIfDetailBoardData(),
  setIfBoardDataList: selectors.makeIfBoardDataList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(testModal);
