import { intlObj } from 'utils/commonUtils';
import messages from './messages';
import Modals from './modal';

const { confirm } = Modals;

const success = (title, content) => {
  Modals.success({
    title,
    content,
    okText: `${intlObj.get(messages.ok)}`,
    cancelText: `${intlObj.get(messages.cancel)}`,
  });
};

const warning = (title, content) => {
  Modals.warning({
    title,
    content,
    okText: `${intlObj.get(messages.ok)}`,
    cancelText: `${intlObj.get(messages.cancel)}`,
  });
};

const error = (title, content) => {
  Modals.error({
    title,
    content,
    okText: `${intlObj.get(messages.ok)}`,
    cancelText: `${intlObj.get(messages.cancel)}`,
  });
};

const showConfirm = (title, content, callback) => {
  confirm({
    title,
    content,
    onOk() {
      callback();
    },
    onCancel() { },
    okText: `${intlObj.get(messages.ok)}`,
    cancelText: `${intlObj.get(messages.cancel)}`,
  });
};

export {
  success,
  warning,
  error,
  showConfirm,
};
