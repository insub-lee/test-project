import React from 'react';

import GridContainer from '../../components/GridContainer';
import GridBox from '../../components/Dashboard/GridBox';
import Report from '../../components/Dashboard/Report';
import Board from '../../components/Dashboard/Board';
import SignTotal from '../../components/Dashboard/BuiltChart/SignTotal';
import MonthlyTransition from '../../components/Dashboard/BuiltChart/MonthlyTransition';

import useHooks from './useHooks';

/**
 * TPMS - MAIN
 * @returns {*}
 * @constructor
 */
const Main = () => {
  const {
    boards: [notice, improvementActivityNewspaper, excellentActivityCase],
    reports,
  } = useHooks();

  return (
    <GridContainer className="grid">
      <GridBox size={3}>
        <section>
          {notice && (
            <Board
              title={notice.title}
              data={notice.data}
              boardId={notice.id}
              formJson={notice.formJson}
              link={notice.link}
              boardCode={notice.boardCode}
            />
          )}
        </section>
      </GridBox>
      <GridBox size={3}>
        <section>
          {improvementActivityNewspaper && (
            <Board
              title={improvementActivityNewspaper.title}
              data={improvementActivityNewspaper.data}
              boardId={improvementActivityNewspaper.id}
              formJson={improvementActivityNewspaper.formJson}
              link={improvementActivityNewspaper.link}
              boardCode={improvementActivityNewspaper.boardCode}
            />
          )}
        </section>
      </GridBox>
      {reports.map(report => (
        <GridBox key={report.key} size={1}>
          <section>
            <Report title={report.title} report={report} />
          </section>
        </GridBox>
      ))}
      <GridBox size={3}>
        <section>
          <SignTotal />
        </section>
      </GridBox>
      <GridBox size={3}>
        <section>
          <MonthlyTransition />
        </section>
      </GridBox>
      <GridBox size={6}>
        <section>
          <section>
            {excellentActivityCase && (
              <Board
                title={excellentActivityCase.title}
                data={excellentActivityCase.data}
                boardId={excellentActivityCase.id}
                formJson={excellentActivityCase.formJson}
                link={excellentActivityCase.link}
                boardCode={excellentActivityCase.boardCode}
              />
            )}
          </section>
        </section>
      </GridBox>
    </GridContainer>
  );
};
export default Main;
