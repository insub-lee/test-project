export const makeInfo = ({ type, property }) => {
  switch (type) {
    case 'text':
    case 'textarea':
      return {
        type: 'STRING',
        size: property.maxLength || 2000,
        nullable: property.required || false,
        defaultValue: '',
      };
    case 'number':
      return {
        type: 'NUMBER',
        size: 10,
        nullable: property.required || false,
        defaultValue: 0,
      };
    case 'rich-text-editor':
      return {
        type: 'STRING',
        size: 0,
        nullable: false,
        defaultValue: '',
      };
    case 'file-upload':
    case 'image-upload': {
      return {
        type: 'NUMBER',
        size: 3,
        nullable: false,
        defaultValue: 0,
      };
    }
    case 'user': {
      return {
        type: 'STRING',
        size: 0,
        nullable: false,
        defaultValue: '',
      };
    }
    case 'checkbox':
    case 'radio':
    case 'select':
    case 'grid':
    case 'time-picker':
    case 'date-picker':
    case 'month-picker':
    case 'range-picker':
    case 'week-picker':
    case 'user-search-select':
    case 'process-info':
    default:
      return {
        type: 'STRING',
        size: 2000,
        nullable: false,
        defaultValue: '',
      };
  }
};

export const getDefaultFormProperty = (type, id) => {
  const defaultFormProperty = {
    className: '',
    style: {},
    name: id,
    defaultValue: '',
  };
  switch (type) {
    case 'checkbox':
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
        options: [
          { label: 'label 1', value: 'label 1' },
          { label: 'label 2', value: 'label 2' },
          { label: 'label 3', value: 'label 3' },
        ],
        defaultValue: [],
      };
    case 'radio':
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
        options: [
          { label: 'label 1', value: 'label 1' },
          { label: 'label 2', value: 'label 2' },
          { label: 'label 3', value: 'label 3' },
        ],
      };
    default:
      return {
        ...defaultFormProperty,
        style: { ...defaultFormProperty.style },
        label: 'Label',
        id,
      };
  }
};
