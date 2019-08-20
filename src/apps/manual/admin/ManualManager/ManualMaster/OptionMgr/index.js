import React, { Component } from 'react';
import { Transfer, Switch, Table, Tag } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import selectors from '../selectors';
import * as actions from '../actions';
import RelationManual from './RelationManual';

class OptionMgr extends Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            <td>관련매뉴얼</td>
          </tr>
          <tr>
            <td>
              <RelationManual />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  getOptionMgr: () => dispatch(actions.getOptionMgrBySaga()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionMgr);
