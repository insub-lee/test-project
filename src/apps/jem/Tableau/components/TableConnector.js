import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'tableau-api';
import request from 'utils/request';

const Wrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 795px;
  width: 1366px;
`;
// 03__0/03_
const TableConnector = ({ host }) => {
  // Ticket 관련 각종 에러 발생시 에러 메세지 화면에 노출
  const [viewError, setViewError] = useState(false);
  // Get Ticket
  useEffect(() => {
    const getTicket = async () => {
      const { response, error } = await request({
        url: '/api/jem/tableau/getTicket',
      });
      return { response, error };
    };

    getTicket()
      .then(({ response, error }) => {
        if (response && !error) {
          const { ticket, userId, userName } = response;
          console.log('@@@ :', ticket, userId, userName, host);
          if (ticket) {
            const trustedTicket = `/trusted/${ticket}`;
            // const shareUrl = `http://10.100.22.103${trustedTicket}/views/${host}`;
            const shareUrl = `http://tableau.magnachip.com${trustedTicket}/views/${host}`;
            // const shareUrl = `http://10.100.22.103/views/${host}`;
            const options = {
              hideTabs: true,
              hideToolbar: false,
              width: '100%',
              height: '100%',
              P_NO: userId,
              P_NAME: userName,
            };

            const vizContainer = document.getElementById('vizContainer');
            console.log('2 :', vizContainer, shareUrl, options);
            if (vizContainer) {
              const viz = new window.tableau.Viz(vizContainer, shareUrl, options);
              console.log('333 : ', viz);
            }
          }
        } else {
          console.debug('No Authorize');
          setViewError(true);
        }
      })
      .catch(error => {
        console.debug('Fail', error);
        setViewError(true);
      });
  }, [host]);

  return (
    <div>
      <Wrapper id="vizContainer" style={{ width: '100%', height: '100%' }} />
      {viewError && <p style={{ padding: 50 }}>네트워크상 에러로 인해 조회 불가능합니다.</p>}
    </div>
  );
};

TableConnector.propTypes = {
  host: PropTypes.string.isRequired,
};

export default TableConnector;
