import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Button, Table, Radio } from 'antd';
import StyledAntdTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import request from 'utils/request';

const AntdTable = StyledAntdTable(Table);
const { Column, ColumnGroup } = Table
const cont = {
	RADIO_: 'RADIO',
	TEXT_: 'TEXT',
};
function CustomDataTableComp(props) {
	const [columns, setColumns] = useState([]);
	const [groups, setGroups] = useState([]);
	const { RADIO_, TEXT_ } = cont;

	// const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		const { URL } = props.CONFIG.property || {};
		const { formData } = props;
		if (typeof URL === 'string' || URL !== '') {
			request({
				method: 'POST',
				url: URL,
				// FIRE_CODE: FE (소화기)
				params: formData,
			}).then(({ response }) => {
				console.debug('### response: ', response);
			});
		}

		const { COLUMNS, GROUPS } = props.CONFIG.property || {};
		if (COLUMNS instanceof Array) {
			// const tempArray = [];
			// COLUMNS.forEach(header => {
			// 	const tempObj = {};
			// 	tempObj.title = header.name;
			// 	tempObj.dataIndex = header.name;
			// 	tempObj.key = header.name;
			// 	tempObj.option = header.option;
			// 	tempArray.push(tempObj);
			// });
			setColumns(COLUMNS);
		}
		if (GROUPS instanceof Array) {
			// const tempArray = [];
			// GROUPS.forEach(group => {
			// 	const tempObj = {};
			// 	tempObj.title = group.name;
			// 	tempObj.order = group.order;
			// 	tempArray.push(tempObj);
			// });
			setGroups(GROUPS);
		}
	}, []);

	const colRenderer = (e) => {
		console.debug("£££ e :", e)

	}

	return (
		<AntdTable
			rowKey="TASK_SEQ"
			// key={`${group.key}_list`}
			className="view-designer-list"
		// columns={columns}
		// dataSource={listData || []}
		// rowSelection={rowSelection}
		// pagination={{ pageSize: 50 }}
		// scroll={{ x: '800px', y: '800px' }}
		>
			{groups.map(({ title, order }, idx) => {
				if (typeof order === 'string') {
					return (
						<ColumnGroup title={title}>
							{columns.map(column => {
								if (column.order === order) {
									const { dataIndex, option } = order;
									return <Column key={'inGroup' + title + dataIndex + idx} title={column.title} dataIndex={dataIndex} key={dataIndex} />
								}
							})}
						</ColumnGroup>)
				}
			}
			)}
			{columns.map(({ order, title, dataIndex, option }, idx) => {
				if (order === undefined || order === '') {
					return <Column key={title + dataIndex + idx}
						title={title}
						dataIndex={dataIndex}
						key={dataIndex}
						render={e => colRenderer(e)}
					/>
				}
			})}
		</AntdTable>
	);
}

CustomDataTableComp.defaultProps = { CONFIG: PropTypes.objectOf(PropTypes.object), COMP_FIELD: PropTypes.string };

CustomDataTableComp.propTypes = {
	CONFIG: {
		info: {},
		option: {},
		property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
	},
	COMP_FIELD: '',
};

export default CustomDataTableComp;
