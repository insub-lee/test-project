/* eslint-disable import/prefer-default-export, no-restricted-globals */
import moment from 'moment';

/* Using moment for string format (current using YYYYMMDD) */

export function normalizeResource(resource) {
  if (resource) {
    const createdTime = resource.createdTime ? Date.parse(resource.createdTime) : '';
    const modifiedTime = resource.createdTime ? Date.parse(resource.modifiedTime) : '';
    return {
      capabilities: resource.capabilities,
      createdTime: !isNaN(createdTime) || createdTime === '' ? createdTime : moment(resource.createdTime, 'YYYYMMDD'),
      id: resource.id,
      modifiedTime: !isNaN(modifiedTime) || createdTime === '' ? modifiedTime : moment(resource.modifiedTime, 'YYYYMMDD'),
      name: resource.name,
      type: resource.type,
      size: resource.size,
      parentId: resource.parentId ? resource.parentId : null,
      dirtype: resource.dirtype ? resource.dirtype : null,
    };
  }
  return {};
}
