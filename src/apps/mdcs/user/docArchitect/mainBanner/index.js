import React from 'react';
import { Link } from 'react-router-dom';

const getType = path => {
  const type = path.substring(2, 4);
  switch (type) {
    case '11':
      return 2;
    case '12':
      return 3;
    case '15':
      return 5;
    default:
      return 1;
  }
};

const mainBanner = ({ num, modalOpenHandler, list, data }) => {
  const type = getType(data.FULLPATH);
  const link = '/apps/mdcs/user/test';
  return (
    <React.Fragment>
      <span className={`icon icon_main${type}`}></span>
      <span className="big">{data.NAME_KOR}</span>
      <span className="small">{data.NAME_ENG}</span>
      <span className="num">{num}건</span>
      <div className="main_banner_con">
        <dl>
          <dt>
            {data.NAME_KOR} {link && <Link to={link}>+</Link>}
          </dt>
          <dd>
            <ul>
              {num > 5
                ? list.slice(0, 5).map((item, index) => (
                  <li key={item.id}>
                    <a role="button" onClick={modalOpenHandler}>
                      {index + 1}.{item.TITLE}
                    </a>
                  </li>
                ))
                : list.map((item, index) => (
                  <li key={item.id}>
                    <a role="button" onClick={modalOpenHandler}>
                      {index + 1}.{item.TITLE}
                    </a>
                  </li>
                ))}
            </ul>
          </dd>
        </dl>
      </div>
    </React.Fragment>
  );
};
export default mainBanner;
