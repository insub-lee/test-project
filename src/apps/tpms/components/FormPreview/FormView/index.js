import React from 'react';
import PropTypes from 'prop-types';
import StyledFormView from './StyledFormView';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import Select from '../Select';
import TextField from '../TextField';
import TextArea from '../TextArea';
import DatePickerGroup from '../DatePickerGroup';
import EquipSelector from '../EquipSelector';
import DatePicker from '../DatePicker';
import EmployeeSelector from '../EmployeeSelector';
import RichTextEditor from '../RichTextEditor/FroalaRichTextEditor';
import Uploader from '../Uploader';
import SingleUploader from '../../Uploader';
import SingleChoice from '../SingleChoice';
import MultipleChoice from '../MultipleChoice';
import Essay from '../Essay';

const renderTitle = form => {
  switch (form.type) {
    case 'single-choice':
    case 'multiple-choice':
    case 'essay':
      return form.option.question;
    default:
      return form.option.label;
  }
};

const renderItem = (type, option, surveyIndex, handleUpload) => {
  switch (type) {
    case 'checkbox-group':
      return <CheckboxGroup name={option.name} {...option?.props} values={option.values} />;
    case 'radio-group':
      return <RadioGroup name={option.name} values={option.values} onChange={option.onChange} />;
    case 'select':
      return (
        <Select
          name={option.name}
          disabled={option.disabled || option.readOnly}
          selectOptions={option.values}
          onChange={option.onChange}
        />
      );
    case 'text':
      return <TextField option={option} type={option.subtype} />;
    case 'textarea':
      return <TextArea option={option} />;
    case 'date-picker-group':
      return <DatePickerGroup items={option.items} />;
    case 'date-picker':
      return <DatePicker label={option.label} values={option.values} />;
    case 'equip-selector':
      return <EquipSelector values={option.values} readOnly={option.readOnly} />;
    case 'employee-selector':
      return (
        <EmployeeSelector
          values={option.values}
          readOnly={option.readOnly}
          onlySingle={option.onlySingle}
          fixed={option.fixed}
        />
      );
    case 'richTextEditor':
      return (
        <RichTextEditor
          name={option.name}
          placeholder={option.readOnly ? '' : option.placeholder}
          readOnly={option.readOnly}
          value={option.value}
        />
      );
    case 'password':
      return <TextField option={option} type="password" />;
    case 'uploader':
      return <Uploader preName={option.name} readOnly={option.readOnly} files={option.files} />;
    case 'single-uploader':
      return <SingleUploader option={option} handleUpload={handleUpload} />;
    case 'single-choice':
      return <SingleChoice name={option.name} values={option.values} surveyIndex={surveyIndex} />;
    case 'multiple-choice':
      return <MultipleChoice name={option.name} values={option.values} surveyIndex={surveyIndex} />;
    case 'essay':
      return <Essay option={option} surveyIndex={surveyIndex} />;
    default:
      return null;
  }
};

class FormView extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (!nextProps.useDefaultDatas) {
      return true;
    }
    if (JSON.stringify(nextProps.defaultDatas) !== JSON.stringify(this.props.defaultDatas)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      datas,
      noBoarder,
      noPadding,
      smallView,
      noBg,
      allWhiteColor,
      isSurvey,
      withoutLabel,
      isImprove,
      useDefaultDatas,
      defaultDatas,
      handleUpload,
    } = this.props;
    return (
      <StyledFormView
        className={`view_wrap ${noBg ? 'noBg' : ''} ${allWhiteColor ? 'all_white_color' : ''}`}
        noBoarder={noBoarder}
      >
        {/* <input type={type} id={id} name={name} placeholder={placeholder} /> */}
        <div className={`view_con ${noPadding ? 'no_padding' : ''} ${smallView ? 'small_view' : ''}`}>
          {isSurvey ? (
            <dl className="survey_form">
              {datas
                .filter(data => !(data.type === 'password' && data.option.readOnly))
                .map((data, index) => (
                  <React.Fragment key={data.seq}>
                    <dt>{renderTitle(data)}</dt>
                    <dd>{renderItem(data.type, data.option, index, handleUpload)}</dd>
                  </React.Fragment>
                ))}
            </dl>
          ) : (
            <ul className="sub_form">
              {useDefaultDatas &&
                defaultDatas
                  .filter(data => !(data.type === 'password' && data.option.readOnly))
                  .map((data, index) => (
                    <li key={data.seq} className={`${data.classname ? data.classname : ''}`}>
                      {isImprove && !withoutLabel ? (
                        <div className="title2">{renderTitle(data)}</div>
                      ) : (
                        !withoutLabel && <div className="title">{renderTitle(data)}</div>
                      )}
                      {renderItem(data.type, data.option, index, handleUpload)}
                    </li>
                  ))}
              {datas
                .filter(data => !(data.type === 'password' && data.option.readOnly))
                .map((data, index) => (
                  <li key={data.seq} className={`${data.classname ? data.classname : ''}`}>
                    {isImprove && !withoutLabel ? (
                      <div className="title2">{renderTitle(data)}</div>
                    ) : (
                      !withoutLabel && <div className="title">{renderTitle(data)}</div>
                    )}
                    {renderItem(data.type, data.option, index, handleUpload)}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </StyledFormView>
    );
  }
}

// { type, id, name, placeholder }
FormView.propTypes = {
  defaultDatas: PropTypes.arrayOf(PropTypes.object),
  datas: PropTypes.arrayOf(PropTypes.object),
  noBoarder: PropTypes.bool,
  noPadding: PropTypes.bool,
  smallView: PropTypes.bool,
  noBg: PropTypes.bool,
  allWhiteColor: PropTypes.bool,
  isSurvey: PropTypes.bool,
  withoutLabel: PropTypes.bool,
  isImprove: PropTypes.bool,
  useDefaultDatas: PropTypes.bool,
  handleUpload: PropTypes.func,
};

FormView.defaultProps = {
  defaultDatas: [],
  datas: [],
  noBoarder: false,
  noPadding: false,
  smallView: false,
  noBg: false,
  allWhiteColor: false,
  isSurvey: false,
  withoutLabel: false,
  isImprove: false,
  useDefaultDatas: false,
  handleUpload: () => false,
};

// FormView.defaultProps = {
//   id: '',
//   name: '',
//   type: '',
//   placeholder: '',
// };

export default FormView;
