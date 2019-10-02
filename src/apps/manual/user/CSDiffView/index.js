// import React, { Component } from 'react';
// import { diffLines, formatLines } from 'unidiff';
// import { parseDiff, Diff, Hunk } from 'react-diff-view';
// import 'react-diff-view/style/index.css';
// import { AllHtmlEntities } from 'html-entities';
// import htmlParse from 'html-react-parser';

// import tokenize from './tokenize';
// import Styled from './Styled';

// const EMPTY_HUNKS = [];

// const renderToken = (token, defaultRender, i) => {
//   switch (token.type) {
//     case 'space':
//       return (
//         <span key={i} className="space">
//           {token.children && token.children.map((token, i) => renderToken(token, defaultRender, i))}
//         </span>
//       );
//     default:
//       return defaultRender(token, i);
//   }
// };

// const domText = node => {
//   switch (typeof node) {
//     case 'array':
//       node.map(subNode => domText(subNode));
//       break;
//     case 'object':
//       if (node.props) console.debug(node.props);
//       break;
//     case 'string':
//       break;
//     default:
//   }
// };

// class CSDiffView extends Component {
//   componentDidMount() {}

//   render() {
//     const { maulTabList, oldVerMual } = this.props;
//     return (
//       <Styled>
//         {maulTabList &&
//           oldVerMual &&
//           maulTabList.length > 0 &&
//           oldVerMual.length > 0 &&
//           maulTabList[0].MUAL_TABVIEWINFO.filter(node => node.TYPE === 'editor').map((node, idx) => {
//             if (idx === 0) {
//               console.debug(htmlParse(oldVerMual[0].MUAL_TABVIEWINFO.filter(node => node.TYPE === 'editor')[idx].MUAL_COMPVIEWINFO));
//               console.debug(htmlParse(node.MUAL_COMPVIEWINFO));
//             }

//             const fff1 = domText(htmlParse(oldVerMual[0].MUAL_TABVIEWINFO.filter(node => node.TYPE === 'editor')[idx].MUAL_COMPVIEWINFO));
//             const fff2 = domText(htmlParse(node.MUAL_COMPVIEWINFO));

//             const oldText = AllHtmlEntities.encode(oldVerMual[0].MUAL_TABVIEWINFO.filter(node => node.TYPE === 'editor')[idx].MUAL_COMPVIEWINFO);
//             const newText = AllHtmlEntities.encode(node.MUAL_COMPVIEWINFO);
//             const diffText = formatLines(diffLines(oldText, newText), {
//               context: 3,
//             });
//             const [diffRet] = parseDiff(diffText, { nearbySequences: 'zip' });
//             let retDiff = diffRet;
//             if (diffRet.hunks.length > 0) {
//               retDiff = {
//                 ...diffRet,
//                 hunks: diffRet.hunks.map(aa => ({ ...aa, changes: aa.changes.map(z => ({ ...z, content: AllHtmlEntities.decode(z.content) })) })),
//               };
//               console.debug(tokenize(retDiff.hunks));
//             }
//             return (
//               <div key={`diff_${node.MUAL_TABCOMP_IDX}`}>
//                 <Diff viewType="split" diffType={retDiff.type} hunks={retDiff.hunks || EMPTY_HUNKS} tokens={tokenize(retDiff.hunks)} renderToken={renderToken}>
//                   {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
//                 </Diff>
//               </div>
//             );
//           })}
//       </Styled>
//     );
//   }
// }

// export default CSDiffView;
