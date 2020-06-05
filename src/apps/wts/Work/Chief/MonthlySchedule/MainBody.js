import React from 'react';
import PropTypes from 'prop-types';

import { jsonToQueryString } from 'utils/helpers';

import Wrapper from './Wrapper';
import service from '../../service';
import AllWorkScheduler from '../../AllWorkScheduler';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manWorkJoList: [],
      isLoading: true,
      tree: [],
    };
    this.fetchInfo = this.fetchInfo.bind(this);
    this.openSchedulerModal = this.openSchedulerModal.bind(this);
    this.openGroupManageModal = this.openGroupManageModal.bind(this);
    this.initData = this.initData.bind(this);
    this.refreshData = this.refreshData.bind(this);

    this.workerModifyCommentModal = React.createRef();
    this.chiefScheduleManageModal = React.createRef();
    this.workerGroupManageModal = React.createRef();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { profile, manInfo } = this.props;
    this.setState({ manWorkJoList: [], tree: [], isLoading: true }, () => {
      this.fetchInfo(profile.EMP_NO, manInfo.site).then(payload => {
        const { manWorkJoList = [] } = payload;
        const { area, workjo } = manInfo;

        // 담당 조를 우선으로 재정렬
        const ownWorkJoList = manWorkJoList.filter(member => member.area === area && member.workjo === workjo);
        // 비담당 조
        const etcWorkJoList = manWorkJoList.filter(member => member.area !== area || member.workjo !== workjo);

        this.setState({ ...payload, manWorkJoList: ownWorkJoList.concat(etcWorkJoList), isLoading: false });
        const tree = [];
        manWorkJoList.forEach(info => {
          const parentIndex = tree.findIndex(obj => obj.id === info.area);
          if (parentIndex > -1) {
            const bayList = tree[parentIndex].children;
            const bayIndex = bayList.findIndex(obj => obj.id === info.bay);
            if (bayIndex > -1) {
              const userList = bayList[bayIndex].children;
              userList.push({
                key: `${parentIndex}-${bayIndex}-${userList.length}`,
                type: 'USER',
                id: info.empno,
                title: `${info.usrnm}(${info.empno})`,
              });
            } else {
              bayList.push({
                key: `${parentIndex}-${bayList.length}`,
                type: 'BAY',
                id: info.bay,
                title: info.bay,
                children: [{ key: `${parentIndex}-${bayList.length}-0`, type: 'USER', id: info.empno, title: `${info.usrnm}(${info.empno})` }],
              });
            }
          } else {
            tree.push({
              key: `${tree.length}`,
              type: 'AREA',
              id: info.area,
              title: info.area,
              children: [
                {
                  key: `${tree.length}-0`,
                  type: 'BAY',
                  id: info.bay,
                  title: info.bay,
                  children: [{ key: `${tree.length}-0-0`, type: 'USER', id: info.empno, title: `${info.usrnm}(${info.empno})` }],
                },
              ],
            });
          }
        });
        const newTree = tree.map((area, index) => {
          const nextArea = area;
          if (nextArea.children.findIndex(bay => bay.id === '휴직') < 0) {
            nextArea.children.push({ key: `${index}-${nextArea.children.length}`, type: 'BAY', id: '휴직', title: '휴직', children: [] });
          }
          if (nextArea.children.findIndex(bay => bay.id === '미배정') < 0) {
            nextArea.children.push({ key: `${index}-${nextArea.children.length}`, type: 'BAY', id: '미배정', title: '미배정', children: [] });
          }
          return nextArea;
        });
        this.setState({ tree: newTree });
      });
    });
  }

  refreshData() {
    this.initData();
  }

  async fetchInfo(empNo, site) {
    const requestQuery = {
      empNo,
      type: 'manWorkJoList',
      searchSite: site,
    };
    const queryString = jsonToQueryString(requestQuery);
    const { response, error } = await service.manHisChief.get(queryString);
    const payload = {};
    if (response && !error) {
      payload[requestQuery.type] = response[requestQuery.type];
    }
    return payload;
  }

  openSchedulerModal() {
    this.chiefScheduleManageModal.current.handleOpenModal();
  }

  openGroupManageModal() {
    const { profile } = this.props;
    this.workerGroupManageModal.current.handleOpenModal(profile.EMP_NO);
  }

  openAllWorkScheduler() {
    this.allWorkSchedulerModal.current.handleOpenModal();
  }

  render() {
    const { profile, canUseThisPage, manInfo } = this.props;
    return (
      <Wrapper>
        {canUseThisPage ? <AllWorkScheduler manInfo={manInfo} byArea site={manInfo.site} /> : <div>현재 사용자는 사용 불가능한 페이지입니다.</div>}
      </Wrapper>
    );
  }
}

MainBody.propTypes = {
  canUseThisPage: PropTypes.bool,
};

MainBody.defaultProps = {
  canUseThisPage: false,
};

export default MainBody;
