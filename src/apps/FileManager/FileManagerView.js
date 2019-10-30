import React from 'react';
import PropTypes from 'prop-types';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connector from '@opuscapita/react-filemanager-connector-node-v1';
// import connector from './connector';

/*
    Override Api Options
    if use anoter locale, must check in connector ('translations.js')
 */
const apiOptions = {
  ...connector.apiOptions,
  locale: 'en',
  canAddChildren: false,
  canCopy: false,
  canDelete: {
    dir: false,
    file: true,
  },
  canDownload: false,
  canEdit: false,
  canListChildren: true,
  canRemoveChildren: false,
  canRename: false,
};

/*
  Override View Layout Options
  if use anoter locale, must check in connector ('translations.js')
 */
const viewLayoutOptions = {
  ...connector.viewLayoutOptions,
  dateTimePattern: 'YYYY-MM-DD',
  initialSortDirection: 'ASC',
  locale: 'en',
};

const customApiOptions = {
  apiRoot: 'http://localhost:9701/api/filemanager/v1/common',
};

const FileManagerView = ({ sysId, fetchFileInfo }) => (
  <FileManager>
    <FileNavigator
      id={`filemanager-${sysId}`}
      api={connector.api}
      apiOptions={{
        ...apiOptions,
        ...customApiOptions,
        sysId,
      }}
      capabilities={connector.capabilities}
      // initialResourceId={sysId}
      listViewLayout={connector.listViewLayout}
      viewLayoutOptions={viewLayoutOptions}
      // onResourceChange={resource => console.log('onResourceChange', resource)}
      // onResourceChildrenChange={resourceChildren => console.log('onResourceChildrenChange', resourceChildren)}
      // onResourceLocationChange={resourceLocation => console.log('onResourceLocationChange', resourceLocation)}
      // onResourceItemClick={({ event, number, rowData }) => console.log('onResourceItemClick', event, number, rowData)}
      // onResourceItemDoubleClick={({ event, number, rowData }) => console.log('onResourceItemDoubleClick', event, number, rowData)}
      // onSelectionChange={selection => {
      //   if (selection.length === 1) {
      //     /* Todo - how to check file, folder, system */
      //     fetchFileInfo(sysId, selection[0]);
      //   }
      // }}
    />
  </FileManager>
);

FileManagerView.propTypes = {
  sysId: PropTypes.string,
  fetchFileInfo: PropTypes.func,
};

FileManagerView.defaultProps = {
  sysId: '',
  fetchFileInfo: () => false,
};

export default FileManagerView;
