import sanitizeFilename from 'sanitize-filename';
import api from '../api';
import onFailError from '../utils/onFailError';
import icons from '../icons-svg';
import getMess from '../translations';

const label = 'rename';

function handler(apiOptions, actions) {
  const { showDialog, hideDialog, navigateToDir, updateNotifications, getSelectedResources, getResource, getNotifications } = actions;

  const getMessage = getMess.bind(null, apiOptions.locale);
  const localeLabel = getMessage(label);

  const rawDialogElement = {
    elementType: 'SetNameDialog',
    elementProps: {
      initialValue: getSelectedResources()[0].name,
      onHide: hideDialog,
      onSubmit: async name => {
        const selectedResources = getSelectedResources();
        try {
          const resourceChildren = await api(apiOptions, { id: selectedResources[0].parentId });
          const alreadyExists = resourceChildren.some(o => o.name === name);
          if (alreadyExists) {
            return getMessage('fileExist', { name });
          }
          hideDialog();
          const result = await api.renameResource(apiOptions, selectedResources[0].id, name);
          const resource = getResource();
          navigateToDir(resource.id, result.body.id, false);

          return null;
        } catch (err) {
          hideDialog();
          onFailError({
            getNotifications,
            label: localeLabel,
            notificationId: label,
            updateNotifications,
          });
          console.log(err);
          return null;
        }
      },
      onValidate: async name => {
        if (!name) {
          return getMessage('emptyName');
        }
        if (name.length >= 255) {
          return getMessage('tooLongFolderName');
        }
        if (name.trim() !== sanitizeFilename(name.trim())) {
          return getMessage('folderNameNotAllowedCharacters');
        }
        return null;
      },
      inputLabelText: getMessage('newName'),
      headerText: getMessage('rename'),
      submitButtonText: localeLabel,
      cancelButtonText: getMessage('cancel'),
    },
  };
  showDialog(rawDialogElement);
}

export default (apiOptions, actions) => {
  const localeLabel = getMess(apiOptions.locale, label);
  const { getSelectedResources } = actions;
  return {
    id: label,
    icon: { svg: icons.rename },
    label: localeLabel,
    shouldBeAvailable: apiOptions => {
      const selectedResources = getSelectedResources();
      return (
        selectedResources.length === 1 &&
        selectedResources.every(resource => {
          if (resource.capabilities) {
            return resource.capabilities.canRename;
          }
          return apiOptions.canRename || false;
        })
      );
    },
    availableInContexts: ['row', 'toolbar'],
    handler: () => handler(apiOptions, actions),
  };
};
