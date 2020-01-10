import React from 'react';

import LabelComp from './viewComponent/Comp/LabelComp';
import CustomLabelComp from './viewComponent/Comp/CustomComp/CustomLabelComp';
import LabelWithCopyComp from './viewComponent/Comp/LabelWithCopyComp';
import TextComp from './viewComponent/Comp/TextComp';
import EditorComp from './viewComponent/Comp/EditorComp';
import CustomEditorComp from './viewComponent/Comp/CustomComp/CustomEditorComp';
import InsertBtnComp from './viewComponent/Comp/InsertBtnComp';
import ModalInsertBtnComp from './viewComponent/Comp/ModalInsertBtnComp';
import AttachComp from './viewComponent/Comp/AttachComp';
import DragUploadComp from './viewComponent/Comp/DragUploadComp';
import TreeSelectComp from './viewComponent/Comp/TreeSelectComp';
import SelectComp from './viewComponent/Comp/SelectComp';
import ReadOnlyTextComp from './viewComponent/Comp/CustomComp/ReadOnlyTextComp';
import CheckboxComp from './viewComponent/Comp/CheckboxComp';
import RadioComp from './viewComponent/Comp/RadioComp';
import RadioYnComp from './viewComponent/Comp/CustomComp/RadioYnComp';
import DocSelectComp from './viewComponent/Comp/CustomComp/DocSelectComp';
import CustomCheckListComp from './viewComponent/Comp/CustomComp/CustomCheckListComp';
import CheckListComp from './viewComponent/Comp/CheckListComp';
import DwCheckListComp from './viewComponent/Comp/CustomComp/DwCheckListComp';

export const CompInfo = {
  LabelComp: { renderer: property => <LabelComp {...property} /> },
  CustomLabelComp: { renderer: property => <CustomLabelComp {...property} /> },
  TextComp: { renderer: property => <TextComp {...property} /> },
  EditorComp: { renderer: property => <EditorComp {...property} /> },
  CustomEditorComp: { renderer: property => <CustomEditorComp {...property} /> },
  InsertBtnComp: { renderer: property => <InsertBtnComp {...property} /> },
  ModalInsertBtnComp: { renderer: property => <ModalInsertBtnComp {...property} /> },
  AttachComp: { renderer: property => <AttachComp {...property} /> },
  DragUploadComp: { renderer: property => <DragUploadComp {...property} /> },
  TreeSelectComp: { renderer: property => <TreeSelectComp {...property} /> },
  SelectComp: { renderer: property => <SelectComp {...property} /> },
  LabelWithCopyComp: { renderer: property => <LabelWithCopyComp {...property} /> },
  ReadOnlyTextComp: { renderer: property => <ReadOnlyTextComp {...property} /> },
  CheckboxComp: { renderer: property => <CheckboxComp {...property} /> },
  RadioComp: { renderer: property => <RadioComp {...property} /> },
  RadioYnComp: { renderer: property => <RadioYnComp {...property} /> },
  DocSelectComp: { renderer: property => <DocSelectComp {...property} /> },
  CustomCheckListComp: { renderer: property => <CustomCheckListComp {...property} /> },
  CheckListComp: { renderer: property => <CheckListComp {...property} /> },
  DwCheckListComp: { renderer: property => <DwCheckListComp {...property} /> },
};
