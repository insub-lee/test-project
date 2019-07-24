import React from 'react';
import PropTypes from 'prop-types';
import { Select, Icon } from 'antd';

import { searchedUsers } from './dummyData';

const { Option, OptGroup } = Select;

class UserSearchSelector extends React.Component {
  state = {
    data: [],
    value: undefined,
  };

  componentDidMount() {
    const group = {};
    searchedUsers.forEach(user => {
      if (!group[user.DEPT_ID]) {
        group[user.DEPT_ID] = {
          label: user.DEPT_NAME_KOR,
          children: [user],
        };
      } else {
        group[user.DEPT_ID].children.push(user);
      }
    });
    this.setState({ data: group });
  }

  generateOptionLabel = option => {
    const { DEPT_NAME_KOR, DUTY_NAME_KOR, NAME_KOR, PSTN_NAME_KOR } = option;
    return `${DEPT_NAME_KOR} ${DUTY_NAME_KOR} ${NAME_KOR} ${PSTN_NAME_KOR} `;
  };

  onSelect = (value, option) => {
    const { user } = option.props;
    console.debug('# user info', user);
  };

  render() {
    const { data } = this.state;
    const { mode } = this.props;
    return (
      <Select mode={mode} placeholder="select user" defaultValue={[]} style={{ width: '100%' }} onSelect={this.onSelect} suffixIcon={<Icon type="user" />}>
        {Object.keys(data).map(key => (
          <OptGroup key={key} label={data[key].label}>
            {data[key].children.map(option => (
              <Option value={this.generateOptionLabel(option)} user={option}>
                {this.generateOptionLabel(option)}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    );
  }
}

UserSearchSelector.propTypes = {
  mode: PropTypes.string,
};

UserSearchSelector.defaultTypes = {
  mode: 'default',
};

export default UserSearchSelector;
