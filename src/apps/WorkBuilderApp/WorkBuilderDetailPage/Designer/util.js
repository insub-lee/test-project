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
        size: property.maxLength || 2000,
        nullable: property.required || false,
        defaultValue: 0,
      };
    case 'checkbox':
    case 'checkboxGroup':
    case 'radio':
    case 'radioGroup':
    case 'select':
    case 'grid':
    case 'time-picker':
    case 'uploader':
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
