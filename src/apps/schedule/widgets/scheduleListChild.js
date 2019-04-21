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

const scheduleDragSpec = {
    beginDrag(props) {
        const { changeIsWidgetDragged } = props;
        changeIsWidgetDragged();
        return {
            SEQNO: props.scheduleList.SEQNO,
            value: '',
        };
    },
};

const scheduleDropSpec = {
    hover(props, monitor) {
        const draggedSeqNo = monitor.getItem().SEQNO;
        if (draggedSeqNo !== props.scheduleList.SEQNO) {
            props.dndChangePosition(draggedSeqNo, props.scheduleList.SEQNO);
        }
    },
};

const collectDrag = connect => ({ connectDragSource: connect.dragSource() });
const collectDrop = connect => ({ connectDropTarget: connect.dropTarget() });

class ScheduleListChild extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scheduleList: this.props.scheduleList,
            uploadFiles: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.scheduleList !== nextProps.scheduleList) {
            this.setState({ scheduleList: nextProps.scheduleList });
        }
    }

    handleChangeTitle = e => {
        // const scheduleList = Object.assign({}, this.state.scheduleList);
        const scheduleList = this.state.scheduleList;
        scheduleList.TITLE = e.target.value;
        this.setState({ scheduleList: scheduleList, value: scheduleList.TITLE });
    }

    handleChangeUrl = e => {
        // const scheduleList = Object.assign({}, this.state.scheduleList);
        const scheduleList = this.state.scheduleList;
        scheduleList.URL = e.target.value;
        this.setState({ scheduleList: scheduleList, value: scheduleList.URL });
    }

    // handleChangeImage = e => {
    //     const scheduleList = this.state.scheduleList;
    //     scheduleList.IMAGE = e.target.value;
    //     this.setState({ scheduleList: scheduleList, value: scheduleList.IMAGE });
    // }

    handleChangeImage = e => {
        const scheduleList = this.state.scheduleList;
        scheduleList.IMAGE = e;
        this.setState({ scheduleList: scheduleList, value: scheduleList.IMAGE });
    }

    onFileUploaded = file => {
        const { uploadFiles } = this.state;
        const { deleteSchedule } = this.props;
        const tmpArr = fromJS(this.state.uploadFiles).toJS();
        //one file upload 최신 파일만 업로드 되게
        tmpArr.splice(0, 0, file);
        this.setState({
            uploadFiles: tmpArr,
        });

        // feed.success('이미지 저장 완료');
        alert("이미지가 저장 되었습니다.");
        this.handleChangeImage(tmpArr[0].link);
        deleteSchedule();
    }

    handleFocusOutTitleSave = (e) => {
        const schedule = this.props.scheduleList
        const { deleteSchedule } = this.props;
        deleteSchedule(schedule);
    }

    handleFocusOutURLSave = (e) => {
        const schedule = this.props.scheduleList
        const { deleteSchedule } = this.props;
        deleteSchedule();
    }

    render() {
        const {
            index
            , setDeletedScheduleIndex
            , connectDragSource
            , connectDropTarget
        } = this.props;

        const { scheduleList, uploadFiles } = this.state;

        return connectDropTarget(connectDragSource(
            <div className="scheduleRegForm" key={index}>
                {/* 드래그 되는 영역 // 시작 */}
                <div className="draggableDiv">
                    <Table style={{ width: '100%' }}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell style={{ width: 80 }}>
                                    <label htmlFor="subject">
                                        {intlObj.get(messages.scheduleName)}
                                    </label>
                                </Table.Cell>
                                <Table.Cell style={{ width: 298 }}>
                                    <Input
                                        id="subject"
                                        name="TITLE"
                                        type="text"
                                        value={scheduleList.TITLE}
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
                                        value={scheduleList.URL}
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
                                            {scheduleList.IMAGE === null ?
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
                                                        src={scheduleList.IMAGE}
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
                    <BtnIconWidgetDel className="delete" title="delete" onClick={() => { setDeletedScheduleIndex(scheduleList.SEQNO); }} i={scheduleList.SEQNO} style={{ display: 'inline-block' }} />
                </div>
                {/* 드래그 되는 영역 // 끝 */}
            </div>
        ));
    }

}

ScheduleListChild.propTypes = {
    ScheduleListChild: PropTypes.array,
    index: PropTypes.number.isRequired,
    scheduleList: PropTypes.object.isRequired,
    setDeletedScheduleIndex: PropTypes.func.isRequired,
    changeIsWidgetDragged: PropTypes.func.isRequired,
    dndChangePosition: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

const dragHighOrderApp = DragSource('ScheduleListChild', scheduleDragSpec, collectDrag)(ScheduleListChild);
export default DropTarget('ScheduleListChild', scheduleDropSpec, collectDrop)(dragHighOrderApp);