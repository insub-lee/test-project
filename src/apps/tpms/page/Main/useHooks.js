import { useMemo } from 'react';

export default () => {
  const boards = useMemo(
    () => [
      {
        key: 0,
        comtype: '01',
        cont:
          '[{"type":"text","option":{"label":"제목","name":"title","placeholder":"제목을 입력해주세요.","value":"","required":true},"seq":0},{"type":"richTextEditor","option":{"label":"내용","name":"textarea-1539755684624","value":"","required":true},"seq":1},{"type":"password","option":{"label":"비밀번호","name":"pwd","placeholder":"비밀번호를 입력해주세요.","value":"","required":false},"seq":2},{"type":"uploader","option":{"label":"파일첨부","name":"uploader-attach"},"seq":3}]',
        id: 'brd00000000000000002',
        itemid: 'item00000000000000000000000018',
        itemtype: '00',
        pageid: 'page00000000000000000000000004',
        pagetype: '01',
        seq: 0,
        showtitle: true,
        size: 3,
        title: '공지사항',
        link: '/apps/tpms/page/Notice',
      },
      {
        key: 1,
        comtype: '01',
        cont:
          '[{"type":"text","option":{"label":"제목","name":"title","placeholder":"제목을 입력해주세요.","value":"","required":true},"seq":0},{"type":"richTextEditor","option":{"label":"내용","name":"textarea-1539755684624","value":"","required":true},"seq":1},{"type":"password","option":{"label":"비밀번호","name":"pwd","placeholder":"비밀번호를 입력해주세요.","value":"","required":false},"seq":2}]',
        id: 'brd00000000000000005',
        itemid: 'item00000000000000000000000019',
        itemtype: '00',
        pageid: 'page00000000000000000000000004',
        pagetype: '01',
        seq: 1,
        showtitle: true,
        size: 3,
        title: '개선활동신문고',
        link: '/apps/tpms/page/ImprovementActivityNewspaper',
      },
      {
        key: 2,
        comtype: '01',
        cont:
          '[{"type":"text","option":{"label":"제목","name":"title","placeholder":"제목을 입력하세요.","value":"","required":true},"seq":0},{"type":"select","option":{"label":"년도","name":"year","values":[{"id":1579510209014,"seq":2,"label":"2020","value":"2020","checked":true},{"id":1552006606918,"seq":0,"label":"2019","value":"2019","checked":false},{"id":1552006621940,"seq":1,"label":"2018","value":"2018","checked":false}]},"seq":1},{"type":"richTextEditor","option":{"label":"내용","name":"textarea-1542189210177","placeholder":"내용을 입력하세요.","value":"","required":true},"seq":2},{"type":"password","option":{"label":"비밀번호","name":"pwd","placeholder":"비밀번호를 입력해주세요.","value":"","required":false},"seq":3},{"type":"uploader","option":{"label":"파일첨부","name":"uploader-attach"},"seq":4}]',
        id: 'brd00000000000000007',
        itemid: 'item00000000000000000000000026',
        itemtype: '00',
        pageid: 'page00000000000000000000000004',
        pagetype: '01',
        seq: 8,
        showtitle: true,
        size: 6,
        title: '우수활동사례',
        link: '/apps/tpms/page/ExcellentActivityCase',
      },
    ],
    [],
  );
  const reports = useMemo(
    () => [
      { key: 0, icon: 'iconMiddle1', bgClass: 'bg01', title: '등록함', enTitle: 'Registration', to: '/apps/tpms/page/Improvement/RegisteredTable' },
      { key: 1, icon: 'iconMiddle2', bgClass: 'bg02', title: '임시저장함', enTitle: 'Operating standard', to: '/apps/tpms/page/Improvement/TempTable' },
      { key: 2, icon: 'iconMiddle3', bgClass: 'bg03', title: '수정요청함', enTitle: 'Amendment request', to: '/apps/tpms/page/Improvement/ModifyRequestTable' },
      { key: 3, icon: 'iconMiddle4', bgClass: 'bg04', title: '미결함', enTitle: 'Before Signing', to: '/apps/tpms/page/Improvement/InSuspenseTable' },
      { key: 4, icon: 'iconMiddle5', bgClass: 'bg05', title: '진행함', enTitle: 'Proceeding', to: '/apps/tpms/page/Improvement/InProgressTable' },
      {
        key: 5,
        icon: 'iconMiddle6',
        bgClass: 'bg06',
        title: '완료보고함',
        enTitle: 'Not completed report',
        to: '/apps/tpms/page/Improvement/CompletionReportTable',
      },
    ],
    [],
  );

  return {
    boards,
    reports,
  };
};
