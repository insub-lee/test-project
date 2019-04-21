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

const todayDragSpec = {
    beginDrag(props) {
        const { changeIsWidgetDragged } = props;
        changeIsWidgetDragged();
        return {
            SEQNO: props.todayList.SEQNO,
            value: '',
        };
    },
};

const todayDropSpec = {
    hover(props, monitor) {
        const draggedSeqNo = monitor.getItem().SEQNO;
        if (draggedSeqNo !== props.todayList.SEQNO) {
            props.dndChangePosition(draggedSeqNo, props.todayList.SEQNO);
        }
    },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class TodayListChild extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            todayList: this.props.todayList,
            uploadFiles: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.todayList !== nextProps.todayList) {
            this.setState({ todayList: nextProps.todayList });
        }
    }

    handleChangeTitle = e => {
        // const todayList = Object.assign({}, this.state.todayList);
        const todayList = this.state.todayList;
        todayList.TITLE = e.target.value;
        this.setState({ todayList: todayList, value: todayList.TITLE });
    }

    handleChangeUrl = e => {
        // const todayList = Object.assign({}, this.state.todayList);
        const todayList = this.state.todayList;
        todayList.URL = e.target.value;
        this.setState({ todayList: todayList, value: todayList.URL });
    }

    // handleChangeImage = e => {
    //     const todayList = this.state.todayList;
    //     todayList.IMAGE = e.target.value;
    //     this.setState({ todayList: todayList, value: todayList.IMAGE });
    // }

    handleChangeImage = e => {
        const todayList = this.state.todayList;
        todayList.IMAGE = e;
        this.setState({ todayList: todayList, value: todayList.IMAGE });
    }

    onFileUploaded = file => {
        const { uploadFiles } = this.state;
        const { deleteToday } = this.props;
        const tmpArr = fromJS(this.state.uploadFiles).toJS();
        //one file upload 최신 파일만 업로드 되게
        tmpArr.splice(0, 0, file);
        console.log('UPLOAD COMPLETE FILE', tmpArr);
        console.log('UPLOAD COMPLETE FILE', this);
        this.setState({
            uploadFiles: tmpArr,
        });

        // feed.success('이미지 저장 완료');
        alert("이미지가 저장 되었습니다.");
        this.handleChangeImage(tmpArr[0].link);
        deleteToday();
    }

    handleFocusOutTitleSave = (e) => {
        const today = this.props.todayList
        const { deleteToday } = this.props;
        deleteToday(today);
    }

    handleFocusOutURLSave = (e) => {
        const today = this.props.todayList
        const { deleteToday } = this.props;
        deleteToday();
    }

    render() {
        const {
            index
            , setDeletedTodayIndex
            , connectDragSource
            , connectDropTarget
        } = this.props;

        const { todayList, uploadFiles } = this.state;

        console.log(uploadFiles, 'this.state.uploadfiles');

        return connectDropTarget(connectDragSource(
            <div className="todayRegForm" key={index}>
                {/* 드래그 되는 영역 // 시작 */}
                <div className="draggableDiv">
                    <Table style={{ width: '100%' }}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell style={{ width: 80 }}>
                                    <label htmlFor="subject">
                                        {intlObj.get(messages.todayName)}
                                    </label>
                                </Table.Cell>
                                <Table.Cell style={{ width: 298 }}>
                                    <Input
                                        id="subject"
                                        name="TITLE"
                                        type="text"
                                        value={todayList.TITLE}
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
                                        value={todayList.URL}
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
                                            {todayList.IMAGE === null ?
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
                                                        src={todayList.IMAGE}
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
                    <BtnIconWidgetDel className="delete" title="delete" onClick={() => { setDeletedTodayIndex(todayList.SEQNO); }} i={todayList.SEQNO} style={{ display: 'inline-block' }} />
                </div>
                {/* 드래그 되는 영역 // 끝 */}
            </div>
        ));
    }

}

TodayListChild.propTypes = {
    TodayListChild: PropTypes.array,
    index: PropTypes.number.isRequired,
    todayList: PropTypes.object.isRequired,
    setDeletedTodayIndex: PropTypes.func.isRequired,
    changeIsWidgetDragged: PropTypes.func.isRequired,
    dndChangePosition: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('TodayListChild', todayDragSpec, collectDrag)(TodayListChild);
export default DropTarget('TodayListChild', todayDropSpec, collectDrop)(dragHighOrderApp);