import React, { PureComponent } from 'react';
import Popover from 'components/uielements/popover';
import AntRadiobox from 'containers/portal/components/uielements/radiobox.style';
import { Radio, Spin, Icon } from 'antd';
import { intlObj, lang } from 'utils/commonUtils';
import messages from './messages';
import PreviewTypeClass from './previewTypeClass';
import PopoverWrapper from './popover.style';

const RadioGroup = AntRadiobox(Radio.Group);

class PreviewWidget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
    this.onChangeDispSize = this.onChangeDispSize.bind(this);
  }

  onChangeDispSize(DISP_SIZE) {
    const data = { PAGE_ID: this.props.item.PAGE_ID, DISP_SIZE };
    this.props.item.updateWidget(Number(this.props.item.id), data);
    // this.setState({
    //   loading: true,
    // });
  }

  render() {
    const { item } = this.props;

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    const content = (
      <PopoverWrapper>
        <div className="widgetSize">
          <RadioGroup
            onChange={e => {
              const DISP_SIZE = e.target.value;
              if (item.size !== DISP_SIZE) {
                this.onChangeDispSize(DISP_SIZE);
              }
            }}
            value={item.size}
          >
            {item.sizeArr &&
              item.sizeArr.map(s => (
                <Radio.Button value={s}>
                  <div className={`rbox w${s}`}>
                    <p>{s}</p>
                  </div>
                </Radio.Button>
              ))}
          </RadioGroup>
        </div>
        {this.state.loading ? (
          <div className="loading centerPos">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          ''
        )}
      </PopoverWrapper>
    );

    return (
      <PreviewTypeClass className={`type${item.basic.type}`}>
        <div className="backgroundPattern" />
        {item.SEC_YN === 'Y' ? (
          <Popover
            placement="top"
            // title={intlObj.get(messages.changeDispSize)}
            arrowPointAtCenter
            content={content}
            trigger="click"
            overlayClassName="sizeOptionPopover"
          >
            <button className="sizeOption draggableCancel" title={intlObj.get(messages.changeDispSize)} />
          </Popover>
        ) : (
          ''
        )}
      </PreviewTypeClass>
    );
  }
}

export default PreviewWidget;
