import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-modal';
// import Loadable from 'react-loadable';
import Loadable from 'components/Loadable';
import { intlObj } from 'utils/commonUtils';
import WithDirection from 'config/withDirection';
import Modals from 'components/Modal/index';
import Loading from './Loading';
import messages from './messages';
import ModalStyle from '../Modal/StyleModal';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

class WidgetSettingModal extends PureComponent {
  constructor(props) {
    super(props);
    /*
    this.state = {
      show: this.props.show,
    };
    */
  }

  closeModal = () => {
    this.props.closeModal();
  };

  createComponents = item => {
    const { closeModal } = this.props;
    const param = {
      loader: () => import(`apps/${item.settingPath}`),
      loading: Loading,
    };
    const COMP = Loadable(param);
    return <COMP item={item} closeModal={closeModal} />;
  };

  render() {
    const {
      // actions,
      // show,
      item,
    } = this.props;

    return (
      <Modal
        visible={this.props.show}
        title={intlObj.get(messages.widgetCfg)}
        onOk={this.closeModal}
        onCancel={this.closeModal}
        maskClosable={false}
        width={470}
        footer={[]}
        wrapClassName="widgetModal"
        bodyStyle={{ margin: '0 20px' }}
        zIndex={1011}
      >
        <div className="widgetContent">{this.createComponents(item)}</div>
      </Modal>
    );
  }
}

WidgetSettingModal.propTypes = {
  // title: PropTypes.string.isRequired,
  // content: PropTypes.array.isRequired,
  // actions: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default WidgetSettingModal;
