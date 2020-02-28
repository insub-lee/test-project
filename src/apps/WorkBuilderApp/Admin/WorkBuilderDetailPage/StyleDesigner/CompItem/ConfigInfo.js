import React from 'react';

import LabelWithCopyCompConfig from 'components/BizBuilder/Field/LabelWithCopyCompConfig';
import TextCompConfig from 'components/BizBuilder/Field/TextCompConfig';
import TreeSelectCompConfig from 'components/BizBuilder/Field/TreeSelectCompConfig';
import SelectCompConfig from 'components/BizBuilder/Field/SelectCompConfig';
import CheckListCompConfig from 'components/BizBuilder/Field/CheckListCompConfig';
import CheckboxCompConfig from 'components/BizBuilder/Field/CheckboxCompConfig';
import DocSelectCompConfig from 'components/BizBuilder/Field/DocSelectCompConfig';
import ReadOnlyTextCompConfig from 'components/BizBuilder/Field/ReadOnlyTextCompConfig';
import RadioCompConfig from 'components/BizBuilder/Field/RadioCompConfig';
import DwCheckListCompConfig from 'components/BizBuilder/Field/DwCheckListCompConfig';
import DocStatusLabelConfig from 'components/BizBuilder/Field/DocStatusLabelConfig';
import RadioCharCompConfig from 'components/BizBuilder/Field/RadioCharCompConfig';
import JoinReadCompConfig from 'components/BizBuilder/Field/JoinReadCompConfig';
import DragUploadCompConfig from 'components/BizBuilder/Field/DragUploadCompConfig';

export const ConfigInfo = {
  'components/BizBuilder/Field/TextCompConfig': { renderer: property => <TextCompConfig {...property} /> },
  'components/BizBuilder/Field/TreeSelectCompConfig': { renderer: property => <TreeSelectCompConfig {...property} /> },
  'components/BizBuilder/Field/SelectCompConfig': { renderer: property => <SelectCompConfig {...property} /> },
  'components/BizBuilder/Field/CheckboxCompConfig': { renderer: property => <CheckboxCompConfig {...property} /> },
  'components/BizBuilder/Field/DocSelectCompConfig': { renderer: property => <DocSelectCompConfig {...property} /> },
  'components/BizBuilder/Field/ReadOnlyTextCompConfig': { renderer: property => <ReadOnlyTextCompConfig {...property} /> },
  'components/BizBuilder/Field/CheckListCompConfig': { renderer: property => <CheckListCompConfig {...property} /> },
  'components/BizBuilder/Field/RadioCompConfig': { renderer: property => <RadioCompConfig {...property} /> },
  'components/BizBuilder/Field/DwCheckListCompConfig': { renderer: property => <DwCheckListCompConfig {...property} /> },
  'components/BizBuilder/Field/LabelWithCopyCompConfig': { renderer: property => <LabelWithCopyCompConfig {...property} /> },
  'components/BizBuilder/Field/DocStatusLabelConfig': { renderer: property => <DocStatusLabelConfig {...property} /> },
  'components/BizBuilder/Field/RadioCharCompConfig': { renderer: property => <RadioCharCompConfig {...property} /> },
  'components/BizBuilder/Field/JoinReadCompConfig': { renderer: property => <JoinReadCompConfig {...property} /> },
  'components/BizBuilder/Field/DragUploadCompConfig': { renderer: property => <DragUploadCompConfig {...property} /> },
};
