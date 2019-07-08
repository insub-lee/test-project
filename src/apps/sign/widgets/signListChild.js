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

const signDragSpec = {
    beginDrag(props) {
        const { changeIsWidgetDragged } = props;
        changeIsWidgetDragged();
        return {
            SEQNO: props.signList.SEQNO,
            value: '',
        };
    },
};

const signDropSpec = {
    hover(props, monitor) {
        const draggedSeqNo = monitor.getItem().SEQNO;
        if (draggedSeqNo !== props.signList.SEQNO) {
            props.dndChangePosition(draggedSeqNo, props.signList.SEQNO);
        }
    },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class SignListChild extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            signList: this.props.signList,
            uploadFiles: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.signList !== nextProps.signList) {
            this.setState({ signList: nextProps.signList });
        }
    }

    handleChangeTitle = e => {
        // const signList = Object.assign({}, this.state.signList);
        const signList = this.state.signList;
        signList.TITLE = e.target.value;
        this.setState({ signList: signList, value: signList.TITLE });
    }

    handleChangeUrl = e => {
        // const signList = Object.assign({}, this.state.signList);
        const signList = this.state.signList;
        signList.URL = e.target.value;
        this.setState({ signList: signList, value: signList.URL });
    }

    // handleChangeImage = e => {
    //     const signList = this.state.signList;
    //     signList.IMAGE = e.target.value;
    //     this.setState({ signList: signList, value: signList.IMAGE });
    // }

    handleChangeImage = e => {
        const signList = this.state.signList;
        signList.IMAGE = e;
        this.setState({ signList: signList, value: signList.IMAGE });
    }

    onFileUploaded = file => {
        const { uploadFiles } = this.state;
        const { deleteSign } = this.props;
        const tmpArr = fromJS(this.state.uploadFiles).toJS();
        //one file upload 최신 파일만 업로드 되게 
        tmpArr.splice(0, 0, file);
        this.setState({
            uploadFiles: tmpArr,
        });

        // feed.success('이미지 저장 완료');
        alert("이미지가 저장 되었습니다.");
        this.handleChangeImage(tmpArr[0].link);
        deleteSign();
    }

    handleFocusOutTitleSave = (e) => {
        const sign = this.props.signList
        const { deleteSign } = this.props;
        deleteSign(sign);
    }

    handleFocusOutURLSave = (e) => {
        const sign = this.props.signList
        const { deleteSign } = this.props;
        deleteSign();
    }

    render() {
        const {
            index
            , setDeletedSignIndex
            , connectDragSource
            , connectDropTarget
        } = this.props;

        const { signList, uploadFiles } = this.state;

        return connectDropTarget(connectDragSource(
            <div className="signRegForm" key={index}>
                {/* 드래그 되는 영역 // 시작 */}
                <div className="draggableDiv">
                    <Table style={{ width: '100%' }}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell style={{ width: 80 }}>
                                    <label htmlFor="subject">
                                        {intlObj.get(messages.signName)}
                                    </label>
                                </Table.Cell>
                                <Table.Cell style={{ width: 298 }}>
                                    <Input
                                        id="subject"
                                        name="TITLE"
                                        type="text"
                                        value={signList.TITLE}
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
                                        value={signList.URL}
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
                                            {signList.IMAGE === null ?
                                                <div>
                                                    <p>여기에 업로드 하세요</p>
                                                    <ul>
                                                        {
                                                            uploadFiles.map(f => (
                                                                <img
                                                                    src={`/img/thumb/300x240/${f.seq}`}
                                                                    alt={f.fileName}
                                                                />
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                <div>
                                                    <img
                                                        src={signList.IMAGE}
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
                    <BtnIconWidgetDel className="delete" title="delete" onClick={() => { setDeletedSignIndex(signList.SEQNO); }} i={signList.SEQNO} style={{ display: 'inline-block' }} />
                </div>
                {/* 드래그 되는 영역 // 끝 */}
            </div>
        ));
    }

}

SignListChild.propTypes = {
    SignListChild: PropTypes.array,
    index: PropTypes.number.isRequired,
    signList: PropTypes.object.isRequired,
    setDeletedSignIndex: PropTypes.func.isRequired,
    changeIsWidgetDragged: PropTypes.func.isRequired,
    dndChangePosition: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('SignListChild', signDragSpec, collectDrag)(SignListChild);
export default DropTarget('SignListChild', signDropSpec, collectDrop)(dragHighOrderApp);