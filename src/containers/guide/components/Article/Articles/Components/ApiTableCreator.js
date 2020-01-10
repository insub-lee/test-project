import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import * as comp from '../../ArticleComponents/components';

const ApiTable = props => {
  const { Api } = props;
  console.log(Api);
  return (
    <div>
      <comp.ArticleHead txt={Api.title} />
      <comp.ArticleText txt={Api.sub} />
      <br />
      <br />
      <Table style={{ width: '100%' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Property</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Default</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Api.list.map(line => (
            <Table.Row>
              {line.map(tmp => (
                <Table.Cell>{tmp}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

ApiTable.propTypes = {
  Api: PropTypes.element.isRequired,
};

export default ApiTable;
