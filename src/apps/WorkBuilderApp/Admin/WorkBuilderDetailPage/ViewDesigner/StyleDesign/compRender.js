import React from 'react';
import { CompInfo } from 'components/BizBuilder/CompInfo';

const CompRender = ({ comp }) => {
  if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0) {
    return CompInfo[comp.CONFIG.property.COMP_SRC].renderer({
      ...comp,
      colData: undefined,
      changeFormData: () => false,
      id: '',
      saveTask: () => false,
      changeValidationData: () => false,
      getExtraApiData: () => false,
      extraApiData: [],
      formData: {},
      compProps: {},
    });
  }
  return <div />;
};

export default CompRender;
