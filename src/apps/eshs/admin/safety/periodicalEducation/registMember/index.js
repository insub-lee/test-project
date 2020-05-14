import React from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import UserSelect from 'components/UserSelect';

const RegistMember = () => <BizBuilderBase sagaKey="RegistMember" workSeq={7553} viewType="INPUT" CustomInputPage={UserSelect} />;

RegistMember.propTypes = {};

export default RegistMember;
