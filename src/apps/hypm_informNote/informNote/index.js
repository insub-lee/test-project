import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as feed from 'components/Feedback/functions';
import Axios from 'axios';
// import searchImg from 'images/common/icon-search2.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import locale from 'utils/pickerLang';
import { Select, Breadcrumb, Input, Button, Popover, Transfer, Tabs } from 'antd';
import 'antd/dist/antd.css';
import 'apps/hypm_common/css/gipms.css';
import moment from 'moment';
import { DatePicker, Radio, Checkbox } from 'containers/guide/components/Article/Abstraction/portalComponents';
import * as actionsLoading from 'containers/common/Loading/actions';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import InformNotice from '../notice';
import InformNoteList from '../notelist';
import Note from '../note';
import EqidSearch from '../../hypm_common/popup/eqidSearch';
import * as authSelectors from 'containers/common/Auth/selectors';

const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const isNull = value => value === '' || value === undefined || value === null;
const Options = Select.Option;
const dateFormat = 'YYYY/MM/DD';
const { TabPane } = Tabs;
class InformNote extends PureComponent {
  constructor(props) {
    super(props);
    
    const now = moment();
    this.state = {
      defaultBox: [],
      // defaultLabel: 
      fab: undefined,
      hot: undefined,
      team: undefined,
      sdpt: undefined,
      selectedSdpt: undefined,
      fl: undefined,
      selectedFl: undefined,
      model: undefined,
      selectedModel: undefined,
      shift: undefined,
      selectedShift: undefined,
      // signStatus: undefined,
      down: { label: 'ALL', value: '' },
      
      selectedDown: undefined,
      downtype: undefined,
      selectedDownType: undefined,
      lclass: undefined,
      selectedLclass: undefined,
      mclass: undefined,
      selectedMclass: undefined,
      sclass: undefined,
      selectedSclass: undefined,
      selected: 'note',
      dateoption: 'UP',
      page: '300',
      searchoption: undefined,
      order: 'NOTI_TYPE',
      radio: '',
      // eqidselView: false,
      // value: 1,
      history: false,
      disabled: true,
      // notiStyle: {},
      // noteStyle: {},
      // notelistStyle: {},
      searchDt: [moment(now), moment(now)],
      // endDate: now,
      targetKeys: [],
      radioValue: '1',
      popoverVisible: false,
      eqIdValue: undefined,
      eqIdSearchWord: '',
      openPopover: false,
      collist: [],
      moveEqid: undefined,
      // move: false,
      sdptLabel: 'All',
      flLabel: 'All',
      modelLabel: 'All',
      shiftLabel: 'All',
      downLabel: 'All',
      downTypeLabel: 'All',
      lclassLabel: 'All',
      mclassLabel: 'All',
      sclassLabel: 'All',
      userCompanyDefine: [],
    };
    this.selCollist=[];
  }

  componentDidMount() {
    const { profile } = this.props;

    this.props.handleLoadingFabParam();

    const hotParam = {
      EMP_NUM: profile.EMP_NO,
      SCR_NUM: 'FAB/INFORMNOTE/INFORMNOTELISTNEW',
      DEFINE_GUBUN: 'Q',
    };

    this.props.handleLoadingHotParam(hotParam);
    this.props.handleLoadingDownParam();

    const param = {
      PARAM_EMP_NUM: profile.EMP_NO,
      PARAM_SCR_NUM: 'INFORM NOTE LIST GRID',
      PARAM_DEFINE_GUBUN: 'G',
    };

    this.props.handleGridColumnSearch(param);
    this.props.handlerLoadingDangerTask();
    this.multiDefault = {
      label: 'All',
      value: '',
    };
    this.SelectDefault = {
      CODE: '',
      NAME: 'Select 하세요.',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { userCompanyDefine } = nextProps;
    if ( nextProps.userCompanyDefine && this.props.userCompanyDefine !== nextProps.userCompanyDefine ) {
      if ( userCompanyDefine.length > 0 ) {
        this.setState({
          userCompanyDefine: userCompanyDefine,
          fab: userCompanyDefine[0].BEBER,
          team: userCompanyDefine[0].STAND,
        }, () => {
          this.handleFabChange(userCompanyDefine[0].BEBER);
          this.handleTeamChange(userCompanyDefine[0].STAND);
        })
      }
    }
    if (this.props.userGridDefineList.selectList !== nextProps.userGridDefineList.selectList && nextProps.userGridDefineList.selectList.length > 0) {
      this.selCollist=[];
      const colinit = {
        COL_ID: 'NO',
        COL_TEXT: 'NO',
      }
      this.selCollist.push(colinit);
      for (let i=0; i < nextProps.userGridDefineList.selectList.length; i +=1) {
          const col = {
            COL_ID: nextProps.userGridDefineList.selectList[i].COL_ID,
            COL_TEXT: nextProps.userGridDefineList.selectList[i].COL_TEXT,
          }
          this.selCollist.push(col);
      }
    const list = this.selCollist;
      this.setState({
        collist: list,
      });
    }
    if (this.props.sdptList !== nextProps.sdptList && nextProps.sdptList.length > 1) {
      this.sdptAll = nextProps.sdptList.map(sdptKey => ({ label: sdptKey.NAME, value: sdptKey.CODE }));
      // console.log(this.sdptAll, userCompanyDefine[0].ARBPL);
      if (userCompanyDefine.length > 0 && userCompanyDefine[0].ARBPL !== '') {
        this.sdptAll.forEach(sdpt => {
          if (sdpt.value === userCompanyDefine[0].ARBPL) {
            this.handleSdptChange({label: sdpt.label, value: userCompanyDefine[0].ARBPL});
          }
        })
      } else {
        this.handleSdptChange(this.sdptAll);
      }
    }
    if (this.props.flList !== nextProps.flList && nextProps.flList.length > 1) {
      this.flAll = nextProps.flList.map(flKey => ({ label: flKey.NAME, value: flKey.CODE }));
      this.handleFlChange(this.flAll);
    }
    if (this.props.modelList !== nextProps.modelList && nextProps.modelList.length > 1) {
      this.modelAll = nextProps.modelList.map(modelKey => ({ label: modelKey.NAME, value: modelKey.CODE }));
      this.handleModelChange(this.modelAll);
    }
    if (this.props.downList !== nextProps.downList && nextProps.downList.length > 1) {
      this.downAll = nextProps.downList.map(downKey => ({ label: downKey.NAME, value: downKey.CODE }));
      // this.handleDownChange(this.downAll);
    }
    if (this.props.downTypeList !== nextProps.downTypeList && nextProps.downTypeList.length > 1) {
      this.modelTypeAll = nextProps.downTypeList.map(dTypeKey => ({ label: dTypeKey.NAME, value: dTypeKey.CODE }));
      // this.handleDownTypeChange(this.modelTypeAll);
    }
    if (this.props.shiftList !== nextProps.shiftList && nextProps.shiftList.length > 1) {
      const idx = nextProps.shiftList.findIndex(s => s.SELECTED === 'selected');
      if (idx > -1) {
        this.setState({
          shift: { label: nextProps.shiftList[idx].NAME, value: nextProps.shiftList[idx].CODE },
        });
      }
      this.shiftAll = nextProps.shiftList.map(dShiftKey => ({ label: dShiftKey.NAME, value: dShiftKey.CODE }));
      // this.handleDownTypeChange(this.modelTypeAll);
    }
    if (this.props.lclassList !== nextProps.lclassList && nextProps.lclassList.length > 1) {
      this.lclaAll = nextProps.lclassList.map(lclaKey => ({ label: lclaKey.NAME, value: lclaKey.CODE }));
      this.handleLclassChange(this.lclaAll);
    }
    if (this.props.mclassList !== nextProps.mclassList && nextProps.mclassList.length > 1) {
      this.mclaAll = nextProps.mclassList.map(mclaKey => ({ label: mclaKey.NAME, value: mclaKey.CODE }));
      this.handleMclassChange(this.mclaAll);
    }
    if (this.props.sclassList !== nextProps.sclassList && nextProps.sclassList.length > 1) {
      this.sclaAll = nextProps.sclassList.map(sclaKey => ({ label: sclaKey.NAME, value: sclaKey.CODE }));
      this.handleSclassChange(this.sclaAll);
    }
    // if (this.props.moveEqid !== nextProps.moveEqid) {
    //   if (nextProps.moveEqid !== '') {
    //     this.handleSelect('note', nextProps.moveEqid);
    //   }
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedSdpt !== this.state.selectedSdpt) {
      if (prevState.selectedSdpt !== undefined && this.state.selectedSdpt !== undefined) {
        if (prevState.selectedSdpt.indexOf("''") > -1 && this.state.selectedSdpt.indexOf("''") < 0 && this.state.sdpt.length >= 1) {
          if (prevState.sdpt.length !== this.state.sdpt.length) {
            this.handleSdptChange(false);
          }
        } else if (prevState.selectedSdpt.indexOf("''") < 0 && this.state.selectedSdpt.indexOf("''") > -1) {
          if (this.state.sdpt.length > 0) {
            this.handleSdptChange(true);
          } else this.handleSdptChange(false);
        } else if (prevState.selectedSdpt.indexOf("''") > -1 && this.state.selectedSdpt.indexOf("''") > -1) {
          if (prevState.sdpt.length > this.state.sdpt.length) {
            const idx = this.state.sdpt.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.sdpt.splice(idx, 1);
              this.handleSdptChange(this.state.sdpt);
            }
          }
        }
      } else if (prevState.selectedSdpt === undefined && this.state.selectedSdpt !== undefined) {
        if (this.state.selectedSdpt.indexOf("''") > -1) {
          this.handleSdptChange(true);
          this.setState({
            sdptLabel: `${this.state.sdpt.length-1}개 선택`,
          })
        }
      } else if (this.state.sdpt.length === 0 || this.state.selectedSdpt === undefined) {
        this.handleSdptChange(false);
      }
    } else if (prevState.selectedSdpt === this.state.selectedSdpt && this.state.selectedSdpt === '') {
      this.handleSdptChange(true);
    }
    if (prevState.selectedFl !== this.state.selectedFl) {
      if (prevState.selectedFl !== undefined && this.state.selectedFl !== undefined) {
        if (prevState.selectedFl.indexOf("''") > -1 && this.state.selectedFl.indexOf("''") < 0 && this.state.fl.length >= 1) {
          if (prevState.fl.length !== this.state.fl.length) {
            this.handleFlChange(false);
          }
        } else if (prevState.selectedFl.indexOf("''") < 0 && this.state.selectedFl.indexOf("''") > -1) {
          if (this.state.fl.length > 0) {
            this.handleFlChange(true);
          } else this.handleFlChange(false);
        } else if (prevState.selectedFl.indexOf("''") > -1 && this.state.selectedFl.indexOf("''") > -1) {
          if (prevState.fl.length > this.state.fl.length) {
            const idx = this.state.fl.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.fl.splice(idx, 1);
              this.handleFlChange(this.state.fl);
            }
          }
        }
      } else if (prevState.selectedFl === undefined && this.state.selectedFl !== undefined) {
        if (this.state.selectedFl.indexOf("''") > -1) {
          this.handleFlChange(true);
        }
      } else if (this.state.fl.length === 0 || this.state.selectedFl === undefined) {
        this.handleFlChange(false);
      }
    }
    if (prevState.selectedModel !== this.state.selectedModel) {
      if (prevState.selectedModel !== undefined && this.state.selectedModel !== undefined) {
        if (prevState.selectedModel.indexOf("''") > -1 && this.state.selectedModel.indexOf("''") < 0 && this.state.model.length >= 1) {
          if (prevState.model.length !== this.state.model.length) {
            this.handleModelChange(false);
          }
        } else if (prevState.selectedModel.indexOf("''") < 0 && this.state.selectedModel.indexOf("''") > -1) {
          if (this.state.model.length > 0) {
            this.handleModelChange(true);
          } else this.handleModelChange(false);
        } else if (prevState.selectedModel.indexOf("''") > -1 && this.state.selectedModel.indexOf("''") > -1) {
          if (prevState.model.length > this.state.model.length) {
            const idx = this.state.model.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.model.splice(idx, 1);
              this.handleModelChange(this.state.model);
            }
          }
        }
      } else if (prevState.selectedModel === undefined && this.state.selectedModel !== undefined) {
        if (this.state.selectedModel.indexOf("''") > -1) {
          this.handleModelChange(true);
        }
      } else if (this.state.model.length === 0 || this.state.selectedModel === undefined) {
        this.handleModelChange(false);
      }
    }
    if (prevState.selectedDown !== this.state.selectedDown) {
      if (prevState.selectedDown !== undefined && this.state.selectedDown !== undefined) {
        if (prevState.selectedDown.indexOf("''") > -1 && this.state.selectedDown.indexOf("''") < 0 && this.state.down.length >= 1) {
          if (prevState.down.length !== this.state.down.length) {
            this.handleDownChange(false);
          }
        } else if (prevState.selectedDown.indexOf("''") < 0 && this.state.selectedDown.indexOf("''") > -1) {
          if (this.state.down.length > 0) {
            this.handleDownChange(true);
          } else this.handleDownChange(false);
        } else if (prevState.selectedDown.indexOf("''") > -1 && this.state.selectedDown.indexOf("''") > -1) {
          if (prevState.down.length > this.state.down.length) {
            const idx = this.state.down.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.down.splice(idx, 1);
              this.handleDownChange(this.state.down);
            }
          }
        }
      } else if (prevState.selectedDown === undefined && this.state.selectedDown !== undefined) {
        if (this.state.selectedDown.indexOf("''") > -1) {
          this.handleDownChange(true);
        }
      } else if (this.state.down.length === 0 || this.state.selectedDown === undefined) {
        this.handleDownChange(false);
      }
    }
    if (prevState.selectedDownType !== this.state.selectedDownType) {
      this.modelTypeAll = this.props.downTypeList.map(dTypeKey => ({ label: dTypeKey.NAME, value: dTypeKey.CODE }));
      if (prevState.selectedDownType !== undefined && this.state.selectedDownType !== undefined) {
        if (prevState.selectedDownType.indexOf("''") > -1 && this.state.selectedDownType.indexOf("''") < 0 && this.state.downtype.length >= 1) {
          if (prevState.downtype.length !== this.state.downtype.length) {
            this.handleDownTypeChange(false);
          }
        } else if (prevState.selectedDownType.indexOf("''") < 0 && this.state.selectedDownType.indexOf("''") > -1) {
          if (this.state.downtype.length > 0) {
            this.handleDownTypeChange(true);
          } else this.handleDownTypeChange(false);
        } else if (prevState.selectedDownType.indexOf("''") > -1 && this.state.selectedDownType.indexOf("''") > -1) {
          if (prevState.downtype.length > this.state.downtype.length) {
            const idx = this.state.downtype.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.downtype.splice(idx, 1);
              this.handleDownTypeChange(this.state.downtype);
            }
          }
        }
      } else if (prevState.selectedDownType === undefined && this.state.selectedDownType !== undefined) {
        if (this.state.selectedDownType.indexOf("''") > -1) {
          this.handleDownTypeChange(true);
        }
      } else if (this.state.downtype.length === 0 || this.state.selectedDown === undefined) {
        this.handleDownTypeChange(false);
      }
    }
    if (prevState.selectedShift !== this.state.selectedShift) {
      if (prevState.selectedShift !== undefined && this.state.selectedShift !== undefined) {
        if (prevState.selectedShift.indexOf("''") > -1 && this.state.selectedShift.indexOf("''") < 0 && this.state.shift.length >= 1) {
          if (prevState.shift.length !== this.state.shift.length) {
            this.handleShiftChange(false);
          }
        } else if (prevState.selectedShift.indexOf("''") < 0 && this.state.selectedShift.indexOf("''") > -1) {
          if (this.state.shift.length > 0) {
            this.handleShiftChange(true);
          } else this.handleShiftChange(false);
        } else if (prevState.selectedShift.indexOf("''") > -1 && this.state.selectedShift.indexOf("''") > -1) {
          if (prevState.shift.length > this.state.shift.length) {
            const idx = this.state.shift.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.shift.splice(idx, 1);
              this.handleShiftChange(this.state.shift);
            }
          }
        }
      } else if (prevState.selectedShift === undefined && this.state.selectedShift !== undefined) {
        if (this.state.selectedShift.indexOf("''") > -1) {
          this.handleShiftChange(true);
        }
      } else if (this.state.shift.length === 0 || this.state.selectedShift === undefined) {
        this.handleShiftChange(false);
      }
    }
    if (prevState.selectedLclass !== this.state.selectedLclass) {
      if (prevState.selectedLclass !== undefined && this.state.selectedLclass !== undefined) {
        if (prevState.selectedLclass.indexOf("''") > -1 && this.state.selectedLclass.indexOf("''") < 0 && this.state.lclass.length >= 1) {
          if (prevState.lclass.length !== this.state.lclass.length) {
            this.handleLclassChange(false);
          }
        } else if (prevState.selectedLclass.indexOf("''") < 0 && this.state.selectedLclass.indexOf("''") > -1) {
          if (this.state.lclass.length > 0) {
            this.handleLclassChange(true);
          } else this.handleLclassChange(false);
        } else if (prevState.selectedLclass.indexOf("''") > -1 && this.state.selectedLclass.indexOf("''") > -1) {
          if (prevState.lclass !== undefined && prevState.lclass.length > this.state.lclass.length) {
            const idx = this.state.lclass.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.lclass.splice(idx, 1);
              this.handleLclassChange(this.state.lclass);
            }
          }
        }
      } else if (prevState.selectedLclass === undefined && this.state.selectedLclass !== undefined) {
        if (this.state.selectedLclass.indexOf("''") > -1) {
          this.handleLclassChange(true);
        }
      } else if (this.state.lclass.length === 0 || this.state.selectedLclass === undefined) {
        this.handleLclassChange(false);
      }
    }
    if (prevState.selectedMclass !== this.state.selectedMclass) {
      if (prevState.selectedMclass !== undefined && this.state.selectedMclass !== undefined) {
        if (prevState.selectedMclass.indexOf("''") > -1 && this.state.selectedMclass.indexOf("''") < 0 && this.state.mclass.length >= 1) {
          if (prevState.mclass.length !== this.state.mclass.length) {
            this.handleMclassChange(false);
          }
        } else if (prevState.selectedMclass.indexOf("''") < 0 && this.state.selectedMclass.indexOf("''") > -1) {
          if (this.state.mclass.length > 0) {
            this.handleMclassChange(true);
          } else this.handleMclassChange(false);
        } else if (prevState.selectedMclass.indexOf("''") > -1 && this.state.selectedMclass.indexOf("''") > -1) {
          if (prevState.mclass !== undefined && prevState.mclass.length > this.state.mclass.length) {
            const idx = this.state.mclass.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.mclass.splice(idx, 1);
              this.handleMclassChange(this.state.mclass);
            }
          }
        }
      } else if (prevState.selectedMclass === undefined && this.state.selectedMclass !== undefined) {
        if (this.state.selectedMclass.indexOf("''") > -1) {
          this.handleMclassChange(true);
        }
      } else if (this.state.mclass.length === 0 || this.state.selectedMclass === undefined) {
        this.handleMclassChange(false);
      }
    }
    if (prevState.selectedSclass !== this.state.selectedSclass) {
      if (prevState.selectedSclass !== undefined && this.state.selectedSclass !== undefined) {
        if (prevState.selectedSclass.indexOf("''") > -1 && this.state.selectedSclass.indexOf("''") < 0 && this.state.sclass.length >= 1) {
          if (prevState.sclass.length !== this.state.sclass.length) {
            this.handleSclassChange(false);
          }
        } else if (prevState.selectedSclass.indexOf("''") < 0 && this.state.selectedSclass.indexOf("''") > -1) {
          if (this.state.sclass.length > 0) {
            this.handleSclassChange(true);
          } else this.handleSclassChange(false);
        } else if (prevState.selectedSclass.indexOf("''") > -1 && this.state.selectedSclass.indexOf("''") > -1) {
          if (prevState.sclass !== undefined && prevState.sclass.length > this.state.sclass.length) {
            const idx = this.state.sclass.findIndex(s => s.value === '');
            if (idx > -1) {
              this.state.sclass.splice(idx, 1);
              this.handleSclassChange(this.state.sclass);
            }
          }
        }
      } else if (prevState.selectedSclass === undefined && this.state.selectedSclass !== undefined) {
        if (this.state.selectedSclass.indexOf("''") > -1) {
          this.handleSclassChange(true);
        }
      } else if (this.state.sclass.length === 0 || this.state.selectedSclass === undefined) {
        this.handleSclassChange(false);
      }
    }
  }

  // excelDownSet = () => {
  //   this.collist=[];
  //   for (let i=0; i < this.props.userGridDefineList.selectList.length; i +=1) {
  //       const col ={
  //         COL_ID: this.props.userGridDefineList.selectList[i].COL_ID,
  //         COL_TEXT: this.props.userGridDefineList.selectList[i].COL_TEXT,
  //       }
  //       this.collist.push(col);
  //   }
  //   this.setState({
  //     collist: this.collist,
  //   });
  // }
  handleKeyDown = (e) => {
    
  }

  handleHistoryChange = (e) => {
    if (e.target.checked) {
      if (this.state.radio !== '') {
        feed.error('HiMDM 선택시 이력조회는 선택할 수 없습니다.');
        this.setState({
          history: false,
        });
        return;
      }
    }
    this.setState({
      history: e.target.checked,
    });
  }
  handleFabChange = (event) => {
    console.log('handleFabChange', event);
    const { handleLoadingTeamParam, handleLoadingFlParam, handleLoadingShiftParam } = this.props;
    const param = {
      fab: event,
    };
    if (event !== '') {
      handleLoadingShiftParam(event);
      handleLoadingTeamParam(event);
      handleLoadingFlParam(param);
    }
    this.setState({
      fab: event,
    });
  }
  handleHotChange = (event) => {
    this.setState({
      hot: event,
    });
  }
  handleTeamChange = (event) => {
    const { handleLoadingSdptParam, handleLoadingFlParam, handleLoadingModelParam } = this.props;
    const statefab = this.state.fab;
    const teamParam = {
      fab: statefab,
      loc: event,
    };
    if (event !== '') {
      handleLoadingSdptParam(teamParam);
      let param = '';
      if (this.state.sdpt !== undefined) {
        param = this.state.sdpt.toString();
        param = this.changeString(param);
      }
      handleLoadingModelParam(param);
      handleLoadingFlParam(teamParam);
    }
    this.setState({
      team: event,
    });
  }
  changeString = (str) => {
    const temp = str.replace(/,/gi, "','");
    const param = `'${temp}'`;
    return param;
  }
  handleSdptChange = (event) => {
    console.log('handleSdptChange', event);
    const { handleLoadingModelParam } = this.props;
    const selectdData = [];
    // let label ='';
    let tempsdpt = [];
    if (event === false) {
      tempsdpt = [];
      // label ='All';
    } else if (event === true) {
      if (this.sdptAll) {
        tempsdpt = [].concat(this.sdptAll);
      }
      // label = `${tempsdpt.length-1}개 선택`;
    } else {
      tempsdpt = [].concat(event);
      // label = `${event.length}개 선택`;
    }
    for (let j = 0; j < tempsdpt.length; j += 1) {
      selectdData.push(tempsdpt[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    handleLoadingModelParam(param);
    this.setState({
      sdpt: tempsdpt,
      selectedSdpt: event === false ? undefined : param,
      // sdptLabel: label,
    });
  }
  handleFlChange = (event) => {
    let tempfl = [];
    const selectdData = [];
    if (event === false) {
      tempfl = [];
    } else if (event === true) {
      tempfl = [].concat(this.flAll);
    } else tempfl = [].concat(event);
    for (let j = 0; j < tempfl.length; j += 1) {
      selectdData.push(tempfl[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    this.setState({
      fl: tempfl,
      selectedFl: event === false ? undefined : param,
    });
  }
  handleModelChange = (event) => {
    let tempModel = [];
    const selectdData = [];
    if (event === false) {
      tempModel = [];
    } else if (event === true) {
      tempModel = [].concat(this.modelAll);
    } else tempModel = [].concat(event);
    for (let j = 0; j < tempModel.length; j += 1) {
      selectdData.push(tempModel[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    this.setState({
      model: tempModel,
      selectedModel: event === false ? undefined : param,
    });
  }
  handleDownChange = (event) => {
    let tempdown = [];
    const selectdData = [];
    const { handleLoadingDownTypeParam } = this.props;
    if (event === false) {
      tempdown = [];
    } else if (event === true) {
      tempdown = [].concat(this.downAll);
    } else tempdown = [].concat(event);
    for (let j = 0; j < tempdown.length; j += 1) {
      selectdData.push(tempdown[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    handleLoadingDownTypeParam(param);
    this.setState({
      down: tempdown,
      // downtype: tempdown,
      selectedDown: event === false ? undefined : param,
    });
  }
  handleDownTypeChange = (event) => {
    let tempDownType = [];
    const selectdData = [];
    if (event === false) {
      tempDownType = [];
    } else if (event === true) {
      tempDownType = [].concat(this.modelTypeAll);
    } else tempDownType = [].concat(event);
    for (let j = 0; j < tempDownType.length; j += 1) {
      selectdData.push(tempDownType[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    this.setState({
      downtype: tempDownType,
      selectedDownType: event === false ? undefined : param,
    });
  }
  handleShiftChange = (event) => {
    let tempShift = [];
    const selectdData = [];
    if (event === false) {
      tempShift = [];
    } else if (event === true) {
      tempShift = [].concat(this.shiftAll);
    } else tempShift = [].concat(event);
    for (let j = 0; j < tempShift.length; j += 1) {
      selectdData.push(tempShift[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    this.setState({
      shift: tempShift,
      selectedShift: event === false ? undefined : param,
    });
  }
  handleLclassChange = (event) => {
    let tempLcla = [];
    const selectdData = [];
    if (event === false) {
      tempLcla = [];
    } else if (event === true) {
      tempLcla = [].concat(this.lclaAll);
    } else tempLcla = [].concat(event);
    for (let j = 0; j < tempLcla.length; j += 1) {
      selectdData.push(tempLcla[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    // handleLoadingDownTypeParam(param);
    this.setState({
      lclass: tempLcla,
      selectedLclass: event === false ? undefined : param,
    });
  }
  handleMclassChange = (event) => {
    let tempMcla = [];
    const selectdData = [];
    if (event === false) {
      tempMcla = [];
    } else if (event === true) {
      tempMcla = [].concat(this.mclaAll);
    } else tempMcla = [].concat(event);
    for (let j = 0; j < tempMcla.length; j += 1) {
      selectdData.push(tempMcla[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    this.setState({
      mclass: tempMcla,
      selectedMclass: event === false ? undefined : param,
    });
  }
  handleSclassChange = (event) => {
    let tempScla = [];
    const selectdData = [];
    if (event === false) {
      tempScla = [];
    } else if (event === true) {
      tempScla = [].concat(this.sclaAll);
    } else tempScla = [].concat(event);
    for (let j = 0; j < tempScla.length; j += 1) {
      selectdData.push(tempScla[j].value);
    }
    let param = selectdData.join(',');
    param = this.changeString(param);
    this.setState({
      sclass: tempScla,
      selectedSclass: event === false ? undefined : param,
    });
  }
  handleDateOptionChange = (event) => {
    this.setState({
      dateoption: event,
    });
  }
  handlePageChange = (event) => {
    this.setState({
      page: event,
    });
  }
  handleSearchOptionChange = (event) => {
    this.setState({
      searchoption: event,
      disabled: false,
    });
  }
  // handlePageLengthChange = (event) => {
  //   this.setState({
  //     signStatus: event,
  //   });
  // }
  // handleDateChange = (event) => {
  //   this.setState({
  //     signStatus: event,
  //   });
  // }
  handleOrderChange = (event) => {
    this.setState({
      order: event,
    });
  }
  handlePopoverVisibleChange = (visible) => {
    const {
      fab,
      sdpt,
      team,
      openPopover,
    } = this.state;

    const comboValdArray = [fab, team, sdpt];
    const comboValdArrayText = ['[FAB]', '[TEAM]', '[SDPT]'];
    let comboValdText = '';

    for (let i = 0; i < comboValdArray.length; i += 1) {
      if (isNull(comboValdArray[i])) {
        comboValdText = `${comboValdText}, ${comboValdArrayText[i]}`;
      }
    }

    if (comboValdText === '') {
      if (openPopover) { //eslint-disable-line
        this.setState({ popoverVisible: true, openPopover: false }); //eslint-disable-line
      } else { //eslint-disable-line
        this.setState({ popoverVisible: visible }); //eslint-disable-line
      }
    } else {
      comboValdText = comboValdText.substring(2);
      feed.error(`${comboValdText} 는(은) 입력 필수값 입니다.`);
    }
  }

  validationCheck = () => {
    const {
      fab,
      sdpt,
      team,
      // openPopover,
    } = this.state;

    const comboValdArray = [fab, team, sdpt];
    const comboValdArrayText = ['[FAB]', '[TEAM]', '[SDPT]'];
    let comboValdText = '';

    for (let i = 0; i < comboValdArray.length; i += 1) {
      if (isNull(comboValdArray[i])) {
        comboValdText = `${comboValdText}, ${comboValdArrayText[i]}`;
      }
    }

    if (comboValdText !== '') {
      comboValdText = comboValdText.substring(2);
      feed.error(`${comboValdText} 는(은) 입력 필수값 입니다.`);
      return false;
      // if (openPopover) { //eslint-disable-line
      //   this.setState({ popoverVisible: true, openPopover: false }); //eslint-disable-line
      // } else { //eslint-disable-line
      //   this.setState({ popoverVisible: visible }); //eslint-disable-line
      // }
    } else return true;
    // else {
    //   comboValdText = comboValdText.substring(2);
    //   feed.error(`${comboValdText} 는(은) 입력 필수값 입니다.`);
    // }
  }
  handleRadioOnChange = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
  }
  handleInputOnChange = (e) => {
    this.setState({
      eqIdSearchWord: e.target.value,
    });
  }
  handleHimdm = (e) => {
    const { handleLoadingLClassParam, handleLoadingMClassParam, handleLoadingSClassParam } = this.props;
    const lparam = {
      MULTI_PARAM_ARBPL: this.state.selectedSdpt,
      PARAM_GRP_TYPE: e.target.value,
      PARAM_GRP_ORDER: '1',
      MULTI_PARAM_HIGH_SORT_CODE: '',
      comboType: 'COMBO_PROCESS_GROUP',
    };
    const mparam = {
      MULTI_PARAM_ARBPL: this.state.selectedSdpt,
      PARAM_GRP_TYPE: e.target.value,
      PARAM_GRP_ORDER: '2',
      MULTI_PARAM_HIGH_SORT_CODE: "'EA','INSPECTION','PA','PREP','SA'",
      comboType: 'COMBO_PROCESS_GROUP',
    };
    const sparam = {
      MULTI_PARAM_ARBPL: this.state.selectedSdpt,
      PARAM_GRP_TYPE: e.target.value,
      PARAM_GRP_ORDER: '3',
      MULTI_PARAM_HIGH_SORT_CODE: "'AUTO POLISHER','CLEAVAGE SYSTEM','DIMPLE GRINDER','EDS','FIB','ION COATOR','ION POLISHING SYSTEM','LN2 GENERATOR','MICROSCOPE','PHOTON EMISSION MICROSCOPE','PLASMA ETCHER','PLASMA_CLEANER','POLISHING GRAINDER','RIE','SEM','STEM','TEM','THERMAL EMISSION','ULTRA SONIC DISC CUTTER','WET STATION'",
      comboType: 'COMBO_PROCESS_GROUP',
    };
    if (e.target.value === '') {
      if (this.state.history) {
        feed.error('이력조회 선택시 HiMDM은 선택할 수 없습니다.');
        this.setState({
          // lclass: undefined,
          // mclass: undefined,
          radio: '',
          history: false,
        });
        return;
      }
      this.setState({
        lclass: undefined,
        mclass: undefined,
        sclass: undefined,
        radio: e.target.value,
      });
    } else {
      if (this.state.history) {
        feed.error('이력조회 선택시 HiMDM은 선택할 수 없습니다.');
        this.setState({
          history: false,
        });
        return;
      }
      handleLoadingLClassParam(lparam);
      handleLoadingMClassParam(mparam);
      handleLoadingSClassParam(sparam);
      this.setState({
        radio: e.target.value,
      });
    }
  }
  
   
  handleDtChange = (e) => {
    this.setState({
      searchDt: [e[0], e[1]],
    });
  }
  hotView = () => {
    let sParam = '';
    let sUrl = '/sm/informNote/pop/HotPopup/';
    const sdptLength = this.state.sdpt === undefined ? '' : this.state.sdpt.length - 1;
    const flLength = this.state.fl === undefined ? '' : this.state.fl.length - 1;
    const modelLength = this.state.model === undefined ? '' : this.state.model.length - 1;
    sParam += this.state.fab === undefined ? '' : this.state.fab;
    sParam += '|';
    sParam += this.state.team === undefined ? '' : this.state.team;
    sParam += '|';
    sParam += sdptLength === undefined ? '' : sdptLength;
    sParam += '|';
    sParam += this.state.selectedSdpt === undefined ? '' : this.state.selectedSdpt;
    sParam += '|';
    sParam += flLength === undefined ? '' : flLength;
    sParam += '|';
    sParam += this.state.selectedFl === undefined ? '' : this.state.selectedFl;
    sParam += '|';
    sParam += modelLength === undefined ? '' : modelLength;
    sParam += '|';
    sParam += this.state.selectedModel === undefined ? '' : this.state.selectedModel;
    sParam += '|';
    sParam += this.state.eqIdValue === undefined ? '' : this.state.eqIdValue;
    sParam += '|D';
    sUrl += sParam;
    const popOption = 'width=1200, height=650, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes';
      window.open(
        sUrl,
        '',
        popOption,
      );
      window.close();
  }
  
  handleUserHotSearch = () => {
    const { profile, handleInitInformNoteList, handleFabInformNoteListSearch } = this.props;
    const {
      hot,
      selectedDown,
      selectedLclass,
      selectedMclass,
      selectedSclass,
      selectedShift,
      selectedDownType,
      dateoption,
      page,
      searchoption,
      order,
      eqIdValue,
      history,
      searchDt,
      radio,
    } = this.state;
    if ( hot === undefined || hot === '') 
      return ;
    
    const param = {
      EMP_NUM: profile.EMP_NO,
      SCR_NUM: 'FAB/INFORMNOTE/INFORMNOTELISTNEW',
      DEFINE_GUBUN: 'Q',
      SEQ_NUM: hot + '',
    }

    const result = Axios.post('/api/gipms/v1/common/commonHotPopUserDefineDetail', param)
      .then(result => {
        if (result.data) {
          const { hotPopDataDetailList } = result.data.list;

          let fab, team, sdpt, fl, model,eqid;
          hotPopDataDetailList.map(item => {
            switch(item.ITEM_LABEL) {
              case 'FAB':
                fab = item.ITEM_VALUE;
                break;
              case 'Team':
                team = item.ITEM_VALUE;
                break;
              case 'SDPT':
                sdpt = item.ITEM_VALUE;
                break;
              case 'F/L':
                fl = item.ITEM_VALUE;
                break;
              case 'Model':
                model = item.ITEM_VALUE;
                break;
              case 'EQ ID':
                eqid = item.ITEM_VALUE;
                break;
            }
          })
          
          const param = {
            tabGubun: 'FAB', // 'FAB',
            PARAM_BEBER: fab, // FAB
            PARAM_STORT: team, // TEAM
            MULTI_PARAM_ARBPL: sdpt,
            MULTI_PARAM_TPLNR: fl,
            MULTI_PARAM_EQART: model,
            MULTI_PARAM_QMART: selectedDown,
            MULTI_PARAM_SHIFT: selectedShift,
            PARAM_TIME: 'UP',
            PARAM_TIME_TYPE: 'NOMAL',
            MULTI_PARAM_CODING: selectedDownType,
            START_DT: moment(new Date(searchDt[0])).format('YYYYMMDD'), // '20180501',
            END_DT: moment(new Date(searchDt[1])).format('YYYYMMDD'), // '20180831',
            PARAM_SEARCH_OPTION: 'DownComment',
            PARAM_SEARCH_TEXT: '',
            CURRENT_PAGE: '1',
            PAGE_LENGTH: '300', // '300',
            MAX_PAGE_LENGTH: '-1',
            ORDER_BY: 'NOTI_TYPE', // 'NOTI_TYPE',
            LIST_TYPE: 'LIST',
            INFORMNOTE_TYPE: 'CCG', // 'CCG',
            PARAM_HISTORY: 'N',
            PARAM_CHK: 'N',
            MULTI_PARAM_GRPTYP: radio,
            MULTI_PARAM_GRPTY1: selectedLclass,
            MULTI_PARAM_GRPTY2: selectedMclass,
            MULTI_PARAM_GRPTY3: selectedSclass,
          };
      
          handleInitInformNoteList();
          handleFabInformNoteListSearch(param);
        }
      });
    
  }

  handleSearch = () => {
    const { handleFabInformNoteListSearch, handleInitInformNoteList } = this.props;
    const {
      fab,
      team,
      selectedSdpt,
      selectedDown,
      selectedFl,
      selectedModel,
      selectedLclass,
      selectedMclass,
      selectedSclass,
      selectedShift,
      selectedDownType,
      dateoption,
      page,
      searchoption,
      order,
      eqIdValue,
      history,
      searchDt,
      radio,
    } = this.state;
    const sdate = moment(new Date(searchDt[0])).format('YYYYMMDD');
    const edate = moment(new Date(searchDt[1])).format('YYYYMMDD');
    let his = '';
    let equids = '';
    if (eqIdValue !== undefined) {
      equids = this.changeString(eqIdValue);
    }
    if (isNull(fab) || isNull(team)) {
      feed.error('[FAB], [TEAM] 는(은) 필수 조건입니다.');
      return;
    }
    if (history) {
      his = 'X';
    } else his = 'N';
    if (his === 'X') {
      if (equids.length === 0) {
        feed.error('이력조회 EQ ID가 필수 입니다.');
        return;
      }
      const equidArr = equids.split(',');
      if (equidArr.length === 0) {
        feed.error('이력조회는 EQ ID를 하나만 선택하십시오.');
        return;
      }
    }
    let dateType = '';
    let orderBy = '';
    if (dateoption === 'UP' || dateoption === 'DOWN') {
      dateType = 'NORMAL';
    } else if (dateoption === 'ONLY_UP' || dateoption === 'ONLY_DOWN') {
      dateType = 'ONLY';
    }
    if (his === 'X') {
      orderBy = 'HISTORY';
    } else {
      orderBy = order;
    }
    const nullParam = {
      tabGubun: 'FAB', // 'FAB',
      PARAM_BEBER: fab, // FAB
      PARAM_STORT: team, // TEAM
      MULTI_PARAM_ARBPL: selectedSdpt,
      MULTI_PARAM_TPLNR: selectedFl,
      MULTI_PARAM_EQART: selectedModel,
      MULTI_PARAM_EQUNR: equids, // EAID
      MULTI_PARAM_QMART: selectedDown,
      MULTI_PARAM_SHIFT: selectedShift,
      PARAM_TIME: dateoption,
      PARAM_TIME_TYPE: dateType,
      MULTI_PARAM_CODING: selectedDownType,
      START_DT: sdate, // '20180501',
      END_DT: edate, // '20180831',
      PARAM_SEARCH_OPTION: searchoption,
      PARAM_SEARCH_TEXT: '',
      CURRENT_PAGE: '1',
      PAGE_LENGTH: page, // '300',
      MAX_PAGE_LENGTH: '-1',
      ORDER_BY: orderBy, // 'NOTI_TYPE',
      LIST_TYPE: 'LIST',
      INFORMNOTE_TYPE: 'CCG', // 'CCG',
      PARAM_HISTORY: his,
      PARAM_CHK: his,
    };
    const param = {
      tabGubun: 'FAB', // 'FAB',
      PARAM_BEBER: fab, // FAB
      PARAM_STORT: team, // TEAM
      MULTI_PARAM_ARBPL: selectedSdpt,
      MULTI_PARAM_TPLNR: selectedFl,
      MULTI_PARAM_EQART: selectedModel,
      MULTI_PARAM_EQUNR: equids, // EAID
      MULTI_PARAM_QMART: selectedDown,
      MULTI_PARAM_SHIFT: selectedShift,
      PARAM_TIME: dateoption,
      PARAM_TIME_TYPE: dateType,
      MULTI_PARAM_CODING: selectedDownType,
      START_DT: sdate, // '20180501',
      END_DT: edate, // '20180831',
      PARAM_SEARCH_OPTION: searchoption,
      PARAM_SEARCH_TEXT: '',
      CURRENT_PAGE: '1',
      PAGE_LENGTH: page, // '300',
      MAX_PAGE_LENGTH: '-1',
      ORDER_BY: orderBy, // 'NOTI_TYPE',
      LIST_TYPE: 'LIST',
      INFORMNOTE_TYPE: 'CCG', // 'CCG',
      PARAM_HISTORY: his,
      PARAM_CHK: his,
      MULTI_PARAM_GRPTYP: radio,
      MULTI_PARAM_GRPTY1: selectedLclass,
      MULTI_PARAM_GRPTY2: selectedMclass,
      MULTI_PARAM_GRPTY3: selectedSclass,
    };

    handleInitInformNoteList();

    if (radio === '') {
      handleFabInformNoteListSearch(nullParam);
    } else handleFabInformNoteListSearch(param);
  }
  popClose = () => {
    this.setState({
      openPopover: true,
    })
  }
  PopoverClose = (eqidval) => {
    this.setState({
      popoverVisible: false,
      eqIdValue: eqidval,
    })
  }
  moveEqid = (eqid) => {
    this.handleSelect('note', eqid);
  }
  handleSelect = (key, eqid) => {
    // const styles = this.state.style;
    if (key === 'note') {
      this.setState({
        selected: key,
        moveEqid: eqid || undefined,
        // move: eqid ? true : false,
      });
    } else if (key === 'notelist') {
      this.setState({
        selected: key,
        // move: false,
        moveEqid: undefined,
      });
    } else {
      this.setState({
        selected: key,
        // move: false,
        moveEqid: undefined,
      });
    }
  }

  excelDownLoad = () => {
    
    const { handleExcelDownLoad } = this.props;
    const {
      fab,
      team,
      sdpt,
      selectedDown,
      selectedFl,
      selectedModel,
      selectedShift,
      dateoption,
      page,
      searchoption,
      order,
      eqIdValue,
      history,
      searchDt,
      collist,
      selectedSdpt,
      selectedDownType,
    } = this.state;
    const sdate = moment(new Date(searchDt[0])).format('YYYYMMDD');
    const edate = moment(new Date(searchDt[1])).format('YYYYMMDD');
    let his = '';
    let equids = '';
    if (eqIdValue !== undefined) {
      equids = this.changeString(eqIdValue);
    }
    
    if (history) {
      his = 'X';
    } else his = 'N';
    if (his === 'X') {
      if (equids.length === 0) {
        feed.error('이력조회 EQ ID가 필수 입니다.');
        return;
      }
      const equidArr = equids.split(',');
      if (equidArr.length === 0) {
        feed.error('이력조회는 EQ ID를 하나만 선택하십시오.');
        return;
      }
    }
    let dateType = '';
    let orderBy = '';
    if (dateoption === 'UP' || dateoption === 'DOWN') {
      dateType = 'NORMAL';
    } else if (dateoption === 'ONLY_UP' || dateoption === 'ONLY_DOWN') {
      dateType = 'ONLY';
    }
    if (his === 'X') {
      orderBy = 'HISTORY';
    } else {
      orderBy = order;
    }
    let valid = this.validationCheck();
    if (valid && sdpt) {
      if (sdpt.length > 1) {
        feed.error('엑셀 다운로드시 SDPT는 하나만 선택 하십시오');
      } else {
          const excelParam = {
            PARAM_BEBER: fab,
            PARAM_STORT: team,
            PARAM_ARBPL: sdpt[0].value,
            MULTI_PARAM_TPLNR: selectedFl,
            MULTI_PARAM_EQART: selectedModel,
            MULTI_PARAM_EQUNR: equids,
            MULTI_PARAM_QMART: selectedDown || '',
            MULTI_PARAM_SHIFT: selectedShift || '',
            PARAM_TIME: dateoption,
            PARAM_TIME_TYPE: dateType,
            MULTI_PARAM_CODING: selectedDownType || '',
            START_DT: sdate,
            END_DT: edate,
            PARAM_SEARCH_OPTION: searchoption,
            PARAM_SEARCH_TEXT: '',
            CURRENT_PAGE: '1',
            PAGE_LENGTH: page, // '300',
            MAX_PAGE_LENGTH: '-1',
            ORDER_BY: orderBy, // 'NOTI_TYPE',
            LIST_TYPE: 'EXCEL',
            INFORMNOTE_TYPE: 'CCG', // 'CCG',
            PARAM_HISTORY: his,
            PARAM_CHK: his,
            list: {
              IT_EXCEL_COL_LIST: collist,
            }
          }
          this.handleExcelDownLoad(excelParam);
        }
    }
  }
  handleExcelDownLoad = (param) => {
    Axios.post('/api/gipms/v1/informNote/fabInformNoteListExcel', param)
      .then((result) => {
        console.log('excel download', result);
        if ( result.data ) {
          const { filePath } = result.data;
          document.location.href = '/api/gipms/v1/common/download?filePath=' + filePath;
        }
      });
  }

  _renderHeader() {
    return (
      <header>
        <h2 className="title">Inform Note 관리</h2>
        <Breadcrumb>
          <Breadcrumb.Item>FAB</Breadcrumb.Item>
          <Breadcrumb.Item>Inform Note</Breadcrumb.Item>
          <Breadcrumb.Item>Inform Note 관리</Breadcrumb.Item>
        </Breadcrumb>
      </header>
    );
  }

  _renderSearchArea() {
    const {
      defaultBox,
      fab,
      hot,
      team,
      sdpt,
      fl,
      model,
      down,
      downtype,
      shift,
      searchDt,
      dateoption,
      page,
      searchoption,
      order,
      radio,
      lclass,
      mclass,
      sclass,
      popoverVisible,
      eqIdValue,
      disabled,
      history,
      targetKeys,
    } = this.state;
    const {
      fabList,
      hotList,
      teamList,
      sdptList,
      flList,
      modelList,
      shiftList,
      lclassList,
      mclassList,
      sclassList,
      downList,
      downTypeList,
      // moveEqid,
      tidnList,
    } = this.props;

    const eqIdcontent = (
      <EqidSearch
        targetKeys={targetKeys}
        // openPopover={openPopover}
        // popoverVisible={popoverVisible}
        handleLoadingTidnParam={this.props.handleLoadingTidnParam}
        tidnList={tidnList}
        close={this.PopoverClose}
        popClose={this.popClose}
      />
    );

    return (
      <section className="search-area" onKeyDown={this.handleKeyDown}>
        <div className="search-item-area">
          {/* 검색 옵션 search-item */}
          <div className="search-item">
            <span className="search-label required">FAB</span>
            <span className="search-select">
              {/* antd select */}
              <Select
                defaultValue={defaultBox}
                value={fab}
                style={{ width: 180 }}
                onChange={this.handleFabChange}
                notFoundContent="Select 하세요."
                placeholder="Select 하세요."
                defaultActiveFirstOption={false}
              >
                <Options value="">Select 하세요.</Options>
                { fabList && fabList.map(fabKey => <Options key={fabKey.CODE}>{fabKey.NAME}</Options>) }
              </Select>
            </span>
          </div>
          <div className="search-item">
            <span className="search-label required">Team</span>
            <span className="search-select">
              {/* antd select */}
              <Select
                defaultValue={this.state.defaultBox}
                value={team}
                style={{ width: 180 }}
                onChange={this.handleTeamChange}
                notFoundContent="Select 하세요."
                placeholder="Select 하세요."
                defaultActiveFirstOption={false}
              >
                <Options value="">Select 하세요.</Options>
                { teamList && teamList.map(detailFactoryKey => <Options value={detailFactoryKey.CODE}>{detailFactoryKey.NAME}</Options>) }
              </Select>
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">SDPT</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={sdpt}
                onChange={this.handleSdptChange}
                hideSearch={true}
                options={sdptList.length > 0 ? sdptList.map(sdptKey => ({ label: sdptKey.NAME, value: sdptKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">F/L</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={fl}
                onChange={this.handleFlChange}
                hideSearch={true}
                options={flList.length > 0 ? flList.map(flKey => ({ label: flKey.NAME, value: flKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">Model</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={model}
                onChange={this.handleModelChange}
                hideSearch={true}
                options={modelList.length > 0 ? modelList.map(modelKey => ({ label: modelKey.NAME, value: modelKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">EQID</span>
            <span className="search-select">
              {/* select - Multi */}
              <Popover
                // title="Search"
                content={eqIdcontent}
                trigger="click"
                visible={popoverVisible}
                onVisibleChange={this.handlePopoverVisibleChange}
              >
                <Input
                  style={{ width: 160 }}
                  value={eqIdValue}
                />
                <Button icon="search" style={{ width: 30 }} />
              </Popover>
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">Down</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={down}
                onChange={this.handleDownChange}
                hideSearch={true}
                options={downList.length > 0 ? downList.map(downKey => ({ label: downKey.NAME, value: downKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">Down Type</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={downtype}
                onChange={this.handleDownTypeChange}
                hideSearch={true}
                options={downTypeList.length > 0 ? downTypeList.map(downTypeKey => ({ label: downTypeKey.NAME, value: downTypeKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">Shift</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={shift}
                onChange={this.handleShiftChange}
                hideSearch={true}
                options={shiftList.length > 0 ? shiftList.map(shiftKey => ({ label: shiftKey.NAME, value: shiftKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">Page Lenth</span>
            <span className="search-select">
              {/* antd select */}
              <Select
                defaultValue={defaultBox}
                value={page}
                style={{ width: 180 }}
                onChange={this.handlePageChange}
                notFoundContent="Select 하세요."
                placeholder="Select 하세요."
                defaultActiveFirstOption={false}
              >
                <Options value="100">100</Options>
                <Options value="200">200</Options>
                <Options value="300">300</Options>
              </Select>
            </span>
          </div>
          <div className="search-item x2">
            <span className="search-label">Date</span>
            <span className="search-select">
              <div className="date-time-area">
                {/* antd select */}
                <span className="select">
                  <Select
                    defaultValue={defaultBox}
                    value={dateoption}
                    style={{ width: 100 }}
                    onChange={this.handleDateOptionChange}
                    notFoundContent="All"
                    placeholder="All"
                    defaultActiveFirstOption={false}
                  >
                    <Options value="UP">Up 기준</Options>
                    <Options value="DOWN">Down 기준</Options>
                    <Options value="ONLY_UP">Up</Options>
                    <Options value="ONLY_DOWN">Down</Options>
                  </Select>
                </span>
                {/* date picker */}
                <span className="date-range">
                  <RangePicker
                    locale={locale}
                    className="RangePicker"
                    style={{ width: '250px', marginLeft: '5px' }}
                    ranges={{
                      오늘: [moment(), moment()],
                      '이번 달': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={this.handleDtChange}
                    showToday={true}
                    value={searchDt !== '' ? searchDt : null}
                    id="searchDt"
                    format={dateFormat}
                  />
                </span>
              </div>
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">Search Option</span>
            <span className="search-select">
              {/* antd select */}
              <Select
                defaultValue={defaultBox}
                value={searchoption}
                style={{ width: 180 }}
                onChange={this.handleSearchOptionChange}
                notFoundContent="Select 하세요."
                placeholder="Select 하세요."
                defaultActiveFirstOption={false}
              >
                <Options value="">Select 하세요.</Options>
                <Options value="DownComment">Down Comment</Options>
                <Options value="Problem">Problem</Options>
                <Options value="Action">조치 상세 내용</Options>
                <Options value="Remark">Remark</Options>
              </Select>
            </span>
          </div>
          <div className="search-item no-label">
            <span className="no-label">
              {/* read only input */}
              <Input disabled={disabled} />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">정렬</span>
            <span className="search-select">
              {/* antd select */}
              <Select
                defaultValue={defaultBox}
                value={order}
                style={{ width: 180 }}
                onChange={this.handleOrderChange}
                notFoundContent="Select 하세요."
                placeholder="Select 하세요."
                defaultActiveFirstOption={false}
              >
                <Options value="NOTI_TYPE">Down Type</Options>
                <Options value="EQ_ID">EQ ID</Options>
                <Options value="DT_ASC">Down Time(ASC)</Options>
                <Options value="DT_DESC">Down Time(DESC)</Options>
              </Select>
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">HIMDM</span>
            <span className="search-select">
              {/* antd radio */}
              <RadioGroup
                defaultValue=""
                onChange={this.handleHimdm}
                value={radio}
              >
                <Radio value="">None</Radio>
                <Radio value="PROGRP">Proc</Radio>
                <Radio value="EQGRP">EQ</Radio>
              </RadioGroup>
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">대분류</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={lclass}
                onChange={this.handleLclassChange}
                hideSearch={true}
                options={lclass !== undefined && lclassList.length > 0 ? lclassList.map(lKey => ({ label: lKey.NAME, value: lKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">중분류</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={mclass}
                onChange={this.handleMclassChange}
                hideSearch={true}
                options={mclass !== undefined && mclassList.length > 0 ? mclassList.map(mKey => ({ label: mKey.NAME, value: mKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">소분류</span>
            <span className="search-select">
              {/* antd select */}
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel="ALL"
                defaultValue={defaultBox}
                value={sclass}
                onChange={this.handleSclassChange}
                hideSearch={true}
                options={sclass !== undefined && sclassList.length > 0 ? sclassList.map(sKey => ({ label: sKey.NAME, value: sKey.CODE })) : [{ label: 'All', value: '' }]}
                width={180}
              />
            </span>
          </div>
          <div className="search-item">
            <span className="search-label">이력조회</span>
            <span className="search-select">
              {/* antd checkbox */}
              <Checkbox checked={history} onChange={this.handleHistoryChange} />
            </span>
          </div>
        </div>
        <div className="btn-area">
          <aside className="add-favor-link">
            <h3>즐겨찾기</h3>
            <span className="select">
            <Select
              defaultValue={defaultBox}
              value={hot}
              style={{ width: 180 }}
              onChange={this.handleHotChange}
              notFoundContent="Select 하세요."
              placeholder="Select 하세요."
              defaultActiveFirstOption={false}
            >
              <Options value="">Select 하세요.</Options>
              { hotList && hotList.map(hotKey => <Options value={hotKey.SEQ_NUM}>{hotKey.DEFINE_NAME}</Options>) }
            </Select>
            </span>
            <Button type="primary" className="btn-apply" onClick={this.handleUserHotSearch}>검색</Button>
            <Button type="primary" className="btn-apply" onClick={this.hotView}>설정</Button>
            <Button type="primary" className="btn-apply excel">엑셀다운</Button>
          </aside>
          <Button type="primary" className="btn-search" onClick={this.handleSearch} >Search</Button>
        </div>
      </section>
    )
  }

  render() {
    const {
      selected,
    } = this.state;
    
    return (
      <section className="gipms">
        {this._renderHeader()}
        {this._renderSearchArea()}
        {/* Data Table 시작  */}
        {/* Tabs */}
        <section className="antd-tabs" style={{position:'absolute',top:'265px',bottom:'0px',left:'50px',right:'50px'}}>
          <Tabs activeKey={selected} onChange={this.handleSelect} animated={false}>
            <TabPane
              tab="Inform Notice"
              // onChange={() => this.handleSelect('notice')}
              key="notice"
            >
              <InformNotice userCompanyDefine={this.props.userCompanyDefine} />
              {/* {this.state.selected === 'notice' ?
                <InformNotice Data={this.props.informNoteDataList} />
                :
                false
              } */}
            </TabPane>
            <TabPane style={{height:'100%'}}
              tab="Inform Note"
              // onChange={() => this.handleSelect('note')}
              key="note"
            >
              <Note searchState={this.state} userCompanyDefine={this.props.userCompanyDefine} />
              {/* {this.state.selected === 'note' ?
                <Note Data={this.props.informNoteDataList} searchParam={searchParam} moveEqid={moveEqid} />
                :
                false
              } */}
            </TabPane>
            <TabPane
              tab="Inform Notes 리스트"
              // onChange={() => this.handleSelect('notelist')}
              key="notelist"
            >
              {/* <InformNoteList
                Data={this.props.informNoteDataList}
              /> */}
              <InformNoteList excelDown={this.excelDownLoad} move={this.moveEqid} userCompanyDefine={this.props.userCompanyDefine}/>
              {/* {this.state.selected === 'notelist' ?
                <InformNoteList Data={this.props.informNoteDataList} />
                :
                false
              } */}
            </TabPane>
          </Tabs>
        </section>
      </section>
    );
  }
}
InformNote.propTypes = {
  handleLoadingFabParam: PropTypes.func.isRequired,
  handleLoadingHotParam: PropTypes.func.isRequired,
  handleLoadingTeamParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handleLoadingModelParam: PropTypes.func.isRequired,
  handleLoadingDownParam: PropTypes.func.isRequired,
  handleLoadingLClassParam: PropTypes.func.isRequired,
  handleLoadingMClassParam: PropTypes.func.isRequired,
  handleLoadingSClassParam: PropTypes.func.isRequired,
  handleLoadingDownTypeParam: PropTypes.func.isRequired,
  handleLoadingShiftParam: PropTypes.func.isRequired,
  handleLoadingFlParam: PropTypes.func.isRequired,
  handleFabInformNoteListSearch: PropTypes.func.isRequired,
  handleLoadingTidnParam: PropTypes.func.isRequired,
  loadingOn: PropTypes.func.isRequired,
  handleGridColumnSearch: PropTypes.func.isRequired,
  handlerLoadingDangerTask: PropTypes.func.isRequired,
  // popClose: PropTypes.func.isRequired,
  // close: PropTypes.func.isRequired,
  tidnList: PropTypes.array.isRequired,
  // changeString: PropTypes.func.isRequired,
  fabList: PropTypes.array,
  hotList: PropTypes.array,
  teamList: PropTypes.array,
  sdptList: PropTypes.array,
  flList: PropTypes.array,
  modelList: PropTypes.array,
  lclassList: PropTypes.array,
  mclassList: PropTypes.array,
  sclassList: PropTypes.array,
  shiftList: PropTypes.array,
  dangerTaskList: PropTypes.array,
  downList: PropTypes.array,
  downTypeList: PropTypes.array,
  searchParam: PropTypes.object,
  profile: PropTypes.object,
  userCompanyDefine: PropTypes.array,
  // moveEqid: PropTypes.object,
  // pmSheetDataList: PropTypes.array,
};
InformNote.defaultProps = {
  fabList: [],
  hotList: [],
  teamList: [],
  sdptList: [],
  flList: [],
  modelList: [],
  // versionList: [],
  lclassList: [],
  mclassList: [],
  sclassList: [],
  downList: [],
  downTypeList: [],
  shiftList: [],
  searchParam: {},
  // moveEqid: undefined,
  // resultCode: '',
  profile: {},
};
const mapStateToProps = createStructuredSelector({
  fabList: selectors.makeFabList(),
  hotList: selectors.makeHotList(),
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  flList: selectors.makeFlList(),
  modelList: selectors.makeModelList(),
  downList: selectors.makeDownList(),
  downTypeList: selectors.makeDownTypeList(),
  shiftList: selectors.makeShiftList(),
  lclassList: selectors.makeLclassList(),
  mclassList: selectors.makeMclassList(),
  sclassList: selectors.makeSclassList(),
  searchParam: selectors.makeSearchParam(),
  // moveEqid: selectors.makeNoteDatail(),
  tidnList: selectors.makeTidnList(),
  searchParam: selectors.makeSearchParam(),
  userGridDefineList: selectors.makeUserGridDefineList(),
  profile: authSelectors.makeSelectProfile(),
});
export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingHotParam: value => dispatch(actions.loadingHotParam(value)),
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handleLoadingModelParam: value => dispatch(actions.loadingModelParam(value)),
    handleLoadingFlParam: value => dispatch(actions.loadingFlParam(value)),
    handleLoadingDownParam: () => dispatch(actions.loadingDownParam()),
    handleLoadingDownTypeParam: value => dispatch(actions.loadingDownTypeParam(value)),
    handleLoadingShiftParam: value => dispatch(actions.loadingShiftParam(value)),
    handleLoadingLClassParam: value => dispatch(actions.loadingLclassParam(value)),
    handleLoadingMClassParam: value => dispatch(actions.loadingMclassParam(value)),
    handleLoadingSClassParam: value => dispatch(actions.loadingSclassParam(value)),
    handleInitInformNoteList: () => dispatch(actions.initInformNoteList()),
    handleFabInformNoteListSearch: value => dispatch(actions.fabInformNoteListSearchNew(value)),
    handleLoadingTidnParam: param => dispatch(actions.loadingTidnParam(param)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
    // handlePmSheetSearch: param => dispatch(actions.pmSheetSearch(param)),
    handleGridColumnSearch: param => dispatch(actions.gridColumnSearch(param)),
    handlerLoadingDangerTask: () => dispatch(actions.loadingDangerTask()),
  };
}
const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InformNote);
