import React from 'react';
import { Rate, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import PropTypes from 'prop-types';
import appImg from '../../../images/icon-app.png';
import Styled from './Styled';

class AppCard extends React.PureComponent {
  execPage = node => {
    let result;
    // console.log('EXEC_Page@@@@@@@@@@@@@');
    // console.log('@@@@ NODE: ', node);
    // console.log('EXEC_Page@@@@@@@@@@@@@');

    // 1. 내부서비스 /apps/SRC_PATH ex) 회의실예약, 명함신청
    // 2. 외부서비스 /apps/PAGE_ID ex) 큐브
    // 3. 페이지 /page/PAGE_ID
    if (node) {
      if (node.INTL_TYPE === 'Y') {
        // console.log('!!!!!!!!!!!!!! INTL TYPE !!!!!!!!!!', node);

        result = `/${basicPath.APPS}/${node.SRC_PATH}`;
      } else if (node.SRC_PATH === 'legacySVC') {
        // console.log('!!!!!!!!!!!!!! INTL TYPE2 !!!!!!!!!', node);
        result = `/${basicPath.APPS}/${node.PAGE_ID}`;
      } else {
        // console.log('!!!!!!!!!!!!!! INTL TYPE3 !!!!!!!!!!', node);
        result = `/${basicPath.PAGE}/${node.PAGE_ID}`;
      }
    }
    return result;
  };

  execLink = node => {
    const state = {
      type: 'execMenu',
      node,
      executedDockPageId: node.PAGE_ID,
    };
    return state;
  };

  render() {
    const { title, value, linkProps } = this.props;
    const { SubMenu } = Menu;
    let dropMenu;
    // console.log(title, linkProps);
    if (linkProps.hasOwnProperty('children')) {
      const result = linkProps.children.map(item => {
        if (item.NODE_TYPE === 'F') {
          //  console.log(item.NAME_KOR);
          return <SubMenu title={item.NAME_KOR} key={item.key}></SubMenu>;
        }
        const tempURL = this.execPage(item);
        const state = this.execLink(item);
        //  console.log(tempURL);
        return (
          <Menu.Item key={item.key}>
            {' '}
            <Link to={{ pathname: tempURL, execInfo: state }}>{item.NAME_KOR} </Link>
          </Menu.Item>
        );
      });
      dropMenu = (
        <Menu>
          <SubMenu title={title} key={value}>
            {result}
          </SubMenu>
        </Menu>
      );
    } else {
      dropMenu = (
        <Menu>
          <Menu.Item key={value}>
            {' '}
            <Link to={`/portal/card/bizMenu/detail/info/${value}`}>{title} </Link>
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Dropdown overlay={dropMenu} trigger={['click']}>
        <Styled className="app-card">
          <div className="app-card-body" onClick={this.handleOnclick} role="presentation">
            <div className="appd-card-icon">
              <img src={appImg} alt="" />
            </div>
            <div className="app-card-text">
              <p>{title}</p>
              <span>상담업무와 관련 메뉴 상세내용은 어쩌고저쩌고</span>
              <Rate allowHalf disabled value={4.5} style={{ fontSize: '12px' }} />
            </div>
          </div>
        </Styled>
      </Dropdown>
    );
  }
}

export default AppCard;

AppCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  linkProps: PropTypes.object,
};
