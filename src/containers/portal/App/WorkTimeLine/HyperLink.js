import React from 'react';
import PropTypes from 'prop-types';

const HyperLink = ({ data, url }) => {
  const {
    dependentValues: { modDt, arSeq, arCtname, arTitle, empNo, empName, deptName, positionName },
  } = data;
  const dtArr = modDt.split(' ')[0].split('-');
  const dtObj = new Date(dtArr[0], Number(dtArr[1]) - 1, dtArr[2]);
  const diff = (new Date().getTime() - dtObj.getTime()) / 1000 / 60 / 60 / 24;
  let diffRes = '';
  if (diff >= 1) {
    diffRes = `${Math.floor(diff)} 일전`;
  } else {
    const hour = modDt.split(' ')[1].split(':');
    diffRes = `${new Date().getHours() - hour[0]} 시간전`;
  }
  return (
    <div className="contentWrapper">
      <small>{arCtname}</small>
      <a href={`${url}/article/${arSeq}`} className="titleText ellipsis" target="_blank" rel="noopener noreferrer" title={arTitle}>
        {arTitle}
      </a>
      <div className="empInfo">
        <div className="empPicWrapper">
          <img
            src={`/portalWeb/uploadfile/pictures/${empNo}.jpg`}
            alt={empNo}
            onError={e => {
              e.target.src = '/no_img_pro.jpg';
            }}
          />
        </div>
        <p className="subInfo ellipsis">
          {empName}({empNo})/{deptName} {positionName}
          <span className="br">
            {modDt} {diffRes}
          </span>
        </p>
      </div>
    </div>
  );
};

HyperLink.propTypes = {
  data: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default HyperLink;
