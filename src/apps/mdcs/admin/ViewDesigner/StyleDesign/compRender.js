import { CompInfo } from '../../../components/BizBuilderBase/CompInfo';

const CompRender = ({ comp }) => {
  if (comp.CONFIG.property.COMP_SRC && comp.CONFIG.property.COMP_SRC.length > 0 && CompInfo[comp.CONFIG.property.COMP_SRC]) {
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
  return `component!!!`;
};

export default CompRender;
