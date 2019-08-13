import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table } from 'semantic-ui-react';
import ScrollBar from 'react-custom-scrollbars';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import messages from '../../../components/Page/messages';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import { makeAppList } from './selectors';
import { changeAppList, deleteAppList, onLoadAppList } from './actions';
import reducer from './reducer';
import saga from './saga';
import WidgetList from './widgetList';
import { BtnDkGray, BtnLgtGray } from '../../../containers/store/components/uielements/buttons.style';
import StyleModal from '../../../containers/portal/components/Modal/StyleModal';
import WidgetSettingStyle from './widgetSettingStyle';

class testModal extends Component {
    constructor(prop) {
        super(prop);
        this.state = {

        };

        this.onClickTest = this.onClickTest.bind(this);
    }

    onClickTest(list) {
        this.props.addList(list);

        this.props.closeModal();
    }

    render() {
        const {
            item,
        } = this.props;

        const widget = item.data.body;
        return (
            <div>
                <div className='widgetSettingFooter'>
                </div>
                <StyleModal className="modalWrapper">
                    <div className="viewType">
                        <h2 className="titleTxt" style={{ textAlign:'center', marginBottom: 30 }}>앱 리스트</h2>
                    </div>
                    <div className="modalContents settingsWrapper">
                        <ScrollBar style={{ height: 400 }}>
                            <div style={{ height: 400 }}>
                                <WidgetSettingStyle>
                                    <div className="ItemWrapper">
                                        <Table size="small" style={{ width: '100%', background: 'lightgray' }}>
                                            <Table.Body>
                                                {
                                                    widget.map(widget => (
                                                        <Table.Row key={widget.title}>
                                                            <Table.Cell textAlign="left" title={`${widget.title}`} className="SUTableCell" style={{ paddingTop: 8, cursor: 'pointer' }} onClick={() => this.onClickTest(widget)}>
                                                                <span className="appWrapper">
                                                                    <img
                                                                        alt={widget.title}
                                                                        src={widget.image}
                                                                        style={{ width: 20, height: 20 }}
                                                                    />
                                                                </span>
                                                                {widget.title}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ))
                                                }
                                            </Table.Body>
                                        </Table>
                                    </div>
                                </WidgetSettingStyle>
                            </div>
                        </ScrollBar>
                    </div>
                </StyleModal>
            </div>
        );
    }
}

testModal.propTypes = {
    item: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({

});

export function mapDispatchToProps(dispatch) {
    return {
    };
}

const withReducer = injectReducer({ key: 'tmodal', reducer });
const withSaga = injectSaga({ key: 'tmodal', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withReducer,
  withSaga,
  withConnect,
)(testModal);
