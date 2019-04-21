import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { DragSource, DropTarget } from 'react-dnd';
import { Table } from 'semantic-ui-react';
import { Input } from 'antd';
import { BtnIconFind, BtnIconDragSymbol, BtnIconWidgetDel } from '../../../components/uielements/styles/buttons.style';
import { intlObj } from 'utils/commonUtils';
import Upload from '../../../components/Upload';
import messages from '../../../components/Page/messages';
// import * as feed from '../../../components/Feedback/functions';

const mailDragSpec = {
    beginDrag(props) {
        const { changeIsWidgetDragged } = props;
        changeIsWidgetDragged();
        return {
            SEQNO: props.mailList.SEQNO,
            value: '',
        };
    },
};

const mailDropSpec = {
    hover(props, monitor) {
        const draggedSeqNo = monitor.getItem().SEQNO;
        if (draggedSeqNo !== props.mailList.SEQNO) {
            props.dndChangePosition(draggedSeqNo, props.mailList.SEQNO);
        }
    },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class MailListChild extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mailList: this.props.mailList,
            uploadFiles: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.mailList !== nextProps.mailList) {
            this.setState({ mailList: nextProps.mailList });
        }
    }

    handleChangeTitle = e => {
        // const mailList = Object.assign({}, this.state.mailList);
        const mailList = this.state.mailList;
        mailList.TITLE = e.target.value;
        this.setState({ mailList: mailList, value: mailList.TITLE });
    }

    handleChangeUrl = e => {
        // const mailList = Object.assign({}, this.state.mailList);
        const mailList = this.state.mailList;
        mailList.URL = e.target.value;
        this.setState({ mailList: mailList, value: mailList.URL });
    }

    // handleChangeImage = e => {
    //     const mailList = this.state.mailList;
    //     mailList.IMAGE = e.target.value;
    //     this.setState({ mailList: mailList, value: mailList.IMAGE });
    // }

    handleChangeImage = e => {
        const mailList = this.state.mailList;
        mailList.IMAGE = e;
        this.setState({ mailList: mailList, value: mailList.IMAGE });
    }

    onFileUploaded = file => {
        const { uploadFiles } = this.state;
        const { deleteMail } = this.props;
        const tmpArr = fromJS(this.state.uploadFiles).toJS();
        //one file upload 최신 파일만 업로드 되게 
        tmpArr.splice(0, 0, file);
        this.setState({
            uploadFiles: tmpArr,
        });

        // feed.success('이미지 저장 완료');
        alert("이미지가 저장 되었습니다.");
        this.handleChangeImage(tmpArr[0].link);
        deleteMail();
    }

    handleFocusOutTitleSave = (e) => {
        const mail = this.props.mailList
        const { deleteMail } = this.props;
        deleteMail(mail);
    }

    handleFocusOutURLSave = (e) => {
        const mail = this.props.mailList
        const { deleteMail } = this.props;
        deleteMail();
    }

    render() {
        const {
            index
            , setDeletedMailIndex
            , connectDragSource
            , connectDropTarget
        } = this.props;

        const { mailList, uploadFiles } = this.state;

        return connectDropTarget(connectDragSource(
            <div className="mailRegForm" key={index}>
                {/* 드래그 되는 영역 // 시작 */}
                <div className="draggableDiv">
                    <Table style={{ width: '100%' }}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell style={{ width: 80 }}>
                                    <label htmlFor="subject">
                                        {intlObj.get(messages.mailName)}
                                    </label>
                                </Table.Cell>
                                <Table.Cell style={{ width: 298 }}>
                                    <Input
                                        id="subject"
                                        name="TITLE"
                                        type="text"
                                        value={mailList.TITLE}
                                        onChange={e => this.handleChangeTitle(e)}
                                        onBlur={e => this.handleFocusOutTitleSave(e.target.value)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell style={{ width: 80 }}>
                                    URL
                                </Table.Cell>
                                <Table.Cell style={{ width: 298 }}>
                                    <Input
                                        id="subject2"
                                        name="url"
                                        type="text"
                                        value={mailList.URL}
                                        onChange={e => this.handleChangeUrl(e)}
                                        onBlur={e => this.handleFocusOutURLSave(e.target.value)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="last">
                                <Table.Cell style={{ width: 80 }}>
                                    IMAGE
                                </Table.Cell>
                                <Table.Cell style={{ width: 298 }}>
                                    <section>
                                        <Upload
                                            accept="image/jpeg, image/png" // default ALL
                                            onFileUploaded={this.onFileUploaded}
                                            multiple={false} // default true
                                            width={300}
                                            height={240}
                                        // borderStyle="none"
                                        >
                                            {mailList.IMAGE === null ?
                                                <div>
                                                    <p>여기에 업로드 하세요</p>
                                                    <ul>
                                                        {
                                                            uploadFiles.map(f => (
                                                                <img
                                                                    src={`http://10.158.122.195/img/thumb/300x240/${f.seq}`}
                                                                    alt={f.fileName}
                                                                />
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                <div>
                                                    <img
                                                        src={mailList.IMAGE}
                                                    />
                                                </div>
                                            }
                                        </Upload>
                                    </section>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    <BtnIconDragSymbol className="dnd" title="dragSortChange" />
                    <BtnIconWidgetDel className="delete" title="delete" onClick={() => { setDeletedMailIndex(mailList.SEQNO); }} i={mailList.SEQNO} style={{ display: 'inline-block' }} />
                </div>
                {/* 드래그 되는 영역 // 끝 */}
            </div>
        ));
    }

}

MailListChild.propTypes = {
    MailListChild: PropTypes.array,
    index: PropTypes.number.isRequired,
    mailList: PropTypes.object.isRequired,
    setDeletedMailIndex: PropTypes.func.isRequired,
    changeIsWidgetDragged: PropTypes.func.isRequired,
    dndChangePosition: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('MailListChild', mailDragSpec, collectDrag)(MailListChild);
export default DropTarget('MailListChild', mailDropSpec, collectDrop)(dragHighOrderApp);