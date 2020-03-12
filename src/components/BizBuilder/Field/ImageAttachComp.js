import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'components/FormStuff/Upload/ImageUploader';

const ImageAttachComp = ({ colData, changeFormData, sagaKey: id, changeValidationData, readOnly, NAME_KOR, COMP_FIELD, visible }) =>
  visible ? <ImageUploader /> : '';

ImageAttachComp.propTypes = {
  colData: PropTypes.object,
  changeFormData: PropTypes.func,
  sagaKey: PropTypes.string,
  changeValidationData: PropTypes.func,
  readOnly: PropTypes.bool,
  NAME_KOR: PropTypes.string,
  COMP_FIELD: PropTypes.string,
  visible: PropTypes.bool,
};
export default ImageAttachComp;
