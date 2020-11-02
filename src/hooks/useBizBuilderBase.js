import { getDataList } from 'apps/manual/user/newsFeed/widgets/saga';
import { useState, useEffect } from 'react';
import request from '../utils/request';

// work_seq 15961
export const useBizBuilderBase = ({ workSeq }) => {
  const [info, setInfo] = useState({});

  //getDetailData
  //saveTask
  //modifyTask
  //deleteTask
  //getListData('15961');
  //tempSaveTask

  useEffect(() => {
    getDataList();
  }, []);

  const getListData = async () => {
    const searchData = '';
    const workInfo = '';
    // const listOrderByField = '';

    const whereString = [];
    // if (!useWhereString && useWhereString !== false) {
    //   const keySet = Object.keys(searchData);
    //   keySet.forEach(key => {
    //     whereString.push(searchData[key]);
    //   });
    //   if (conditional && conditional.length > 0) whereString.push(conditional);
    // }

    let PAGE;
    let PAGE_CNT;
    let ISLAST_VER;

    // if (workInfo && workInfo.OPT_INFO) {
    // workInfo.OPT_INFO.forEach(opt => {
    // if (opt.OPT_CODE === PAGINATION_OPT_CODE && opt.ISUSED === 'Y') {
    //   if (pageIdx && pageIdx > 0) {
    //     PAGE = pageIdx;
    //   } else {
    //     PAGE = 1;
    //   }
    //   if (pageCnt && pageCnt > 0) {
    //     PAGE_CNT = pageCnt;
    //   } else {
    //     PAGE_CNT = 10;
    //   }
    // }
    // if (opt.OPT_CODE === REVISION_OPT_CODE && opt.ISUSED === 'Y') {
    //   switch (opt.OPT_VALUE) {
    //     case 'A':
    //       ISLAST_VER = 'Y';
    //       break;
    //     case 'N':
    //       ISLAST_VER = 'N';
    //       break;
    //     default:
    //       ISLAST_VER = 'Y';
    //   }
    // }
    // });
    // }

    const responseList = await request(
      {
        url: `/api/builder/v1/work/taskList/${workSeq}`,
        method: 'POST',
        data: {
          whereString,
          PAGE,
          PAGE_CNT,
          ISLAST_VER,
          // listOrderByField,
          // listOrderByRowNum: listOrderByField
          //   .replaceAll(' ASC', ' ||CSA||')
          //   .replaceAll(' DESC', ' ASC')
          //   .replaceAll(' ||CSA||', ' DESC'),
        },
      },
      // { BUILDER: 'getTaskList' },
    );

    // const _param = { whereString: [], PAGE: 1, PAGE_CNT: 10, listOrderByField: '', listOrderByRowNum: '' };

    if (responseList) {
      const { list, listTotalCnt } = responseList;
      console.debug('result: ', list, listTotalCnt);
    }
    if (typeof changeIsLoading === 'function') {
      // changeIsLoading(false)
    }
  };
  return {
    info,
    action: {
      getListData,
    },
  };
};
