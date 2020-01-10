import React, { Component } from 'react';
import { Transfer, Switch, Table, Tag } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Styled from './Styled';
import selectors from '../selectors';
import * as actions from '../actions';
import RelationManual from './RelationManual';

class OptionMgr extends Component {
  render() {
    return (
      <Styled>
        <div>
          <table>
            <tr className="title-tr">
              <td>
                <p>관련매뉴얼</p>
              </td>
            </tr>
            <tr>
              <td>
                <RelationManual />
              </td>
            </tr>
          </table>
        </div>
      </Styled>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
  getOptionMgr: () => dispatch(actions.getOptionMgrBySaga()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionMgr);
