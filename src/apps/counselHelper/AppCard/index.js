import React from 'react';
import { Rate, Menu, Dropdown, Icon } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { basicPath } from 'containers/common/constants';
import PropTypes from 'prop-types';
// import appImg from '../../../images/icon-app.png';
import Styled from './Styled';

class AppCard extends React.PureComponent {
  // execPage = node => {
  //   let result;
  //   // console.log('EXEC_Page@@@@@@@@@@@@@');
  //   // console.log('@@@@ NODE: ', node);
  //   // console.log('EXEC_Page@@@@@@@@@@@@@');

  //   // 1. 내부서비스 /apps/SRC_PATH ex) 회의실예약, 명함신청
  //   // 2. 외부서비스 /apps/PAGE_ID ex) 큐브
  //   // 3. 페이지 /page/PAGE_ID
  //   if (node) {
  //     if (node.INTL_TYPE === 'Y') {
  //       // console.log('!!!!!!!!!!!!!! INTL TYPE !!!!!!!!!!', node);

  //       result = `/${basicPath.APPS}/${node.SRC_PATH}`;
  //     } else if (node.SRC_PATH === 'legacySVC') {
  //       // console.log('!!!!!!!!!!!!!! INTL TYPE2 !!!!!!!!!', node);
  //       result = `/${basicPath.APPS}/${node.PAGE_ID}`;
  //     } else {
  //       // console.log('!!!!!!!!!!!!!! INTL TYPE3 !!!!!!!!!!', node);
  //       result = `/${basicPath.PAGE}/${node.PAGE_ID}`;
  //     }
  //   }
  //   return result;
  // };

  // state = {
  //   flag: false,
  // };

  // execLink = node => {
  //   const state = {
  //     type: 'execMenu',
  //     node,
  //     executedDockPageId: node.PAGE_ID,
  //   };
  //   return state;
  // };

  // handleClick = () => {
  //   const { flag } = this.state;
  //   this.setState({
  //     flag: !flag,
  //   });
  // };

  // redirectRender = () => {
  //   const { value } = this.props;
  //   if (this.state.flag) {
  //     return <Redirect to={`/portal/card/bizMenu/detail/info/${value}`} />;
  //   }
  // };

  render() {
    const { title, value, DSCR_KOR, starPoint } = this.props;
    // const { SubMenu } = Menu;
    // let dropMenu;
    // // console.log(title, linkProps);
    // if (Object.prototype.hasOwnProperty.call(linkProps, 'children')) {
    //   const result = linkProps.children.map(item => {
    //     if (item.NODE_TYPE === 'F') {
    //       //  console.log(item.NAME_KOR);
    //       if (Object.prototype.hasOwnProperty.call(item, 'children')) {
    //         const folderITEM = item.children.map(fItem => {
    //           const tempURL = this.execPage(fItem);
    //           const state = this.execLink(fItem);
    //           return (
    //             <Menu.Item key={fItem.key}>
    //               {' '}
    //               <Link to={{ pathname: tempURL, execInfo: state }}>{fItem.NAME_KOR} </Link>
    //             </Menu.Item>
    //           );
    //         });
    //         return (
    //           <SubMenu title={item.NAME_KOR} key={item.key}>
    //             {folderITEM}
    //           </SubMenu>
    //         );
    //       }
    //       return <SubMenu title={item.NAME_KOR} key={item.key}></SubMenu>;
    //     }
    //     const tempURL = this.execPage(item);
    //     const state = this.execLink(item);
    //     //  console.log(tempURL);
    //     return (
    //       <Menu.Item key={item.key}>
    //         {' '}
    //         <Link to={{ pathname: tempURL, execInfo: state }}>{item.NAME_KOR} </Link>
    //       </Menu.Item>
    //     );
    //   });
    //   dropMenu = (
    //     <Menu>
    //       <SubMenu title={title} key={value}>
    //         {result}
    //       </SubMenu>
    //     </Menu>
    //   );
    // } else {
    //   dropMenu = (
    //     <Menu>
    //       <Menu.Item key={value}>
    //         {' '}
    //         <Link to={`/portal/card/bizMenu/detail/info/${value}`}>{title} </Link>
    //       </Menu.Item>
    //     </Menu>
    //   );
    // }

    return (
      <Styled className="app-card">
        <div className="app-card-body" role="presentation">
          <div className="appd-card-icon"></div>
          <div className="app-card-text">
            <Rate className="rateDesign" allowHalf disabled value={starPoint} />
            <p>{title}</p>
            <span>{DSCR_KOR}</span>
            {/*
              {//<img src={appImg} alt="" />}
            <p>{title}</p>
            <span>{DSCR_KOR}</span>
            <Dropdown overlay={dropMenu} trigger={['hover']}>
              <p className="app-run">
                앱실행 <Icon type="down" />
              </p>
            </Dropdown>
          */}
          </div>
        </div>
      </Styled>
    );
  }
}

export default AppCard;

AppCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,

  DSCR_KOR: PropTypes.string,
};
