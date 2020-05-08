import React from 'react';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledButtonWrapper from 'commonStyled/Buttons/StyledButtonWrapper';

import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';

import { Table, message } from 'antd';
const AntdLineTable = StyledAntdTable(Table);

const columns = [
  {
    title: () => <strong>HARDWARE ITEM</strong>,
    width: '18%',
    align: 'center',
    dataIndex: 'HARDWARE_ITEM',
  },
  {
    title: () => <strong>HEI SPECIFICATION</strong>,
    width: '66%',
    align: 'center',
    dataIndex: 'HEI_SPECIFICATION',
  },
  {
    title: () => <strong>관리조항</strong>,
    align: 'center',
    width: '8%',
    dataIndex: 'MANAGEMENT_PROVISION',
  },
  {
    title: () => <strong>REMARK</strong>,
    align: 'center',
    width: '10%',
    dataIndex: 'REMARK',
  },
];

const list = [
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;1. SAFETY <br />
        &nbsp;&nbsp;&nbsp;&nbsp;PHILOSOPHY
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 1.1 반도체 장비 제조의 표준인 'SEMI' SAFETY GUIDELINES를 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;만족 시켜야 한다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * The suplier shall ensure that the equipment satisfies with "SEMI" <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; safety guidelines.
        <br />
        <br />
        &nbsp; 1.2 'NFPA 318' (STANDARD FOR PROTECTION OF CLEANROOMS)의 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;적합성이 유지되도록 만들어져야 한다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * The equipment is being compatible "NFPA 318"(standard form <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; protection of cleanroom).
        <br />
        <br />
        &nbsp; 1.3 대한민국 관련 법규에 부합되어야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Being comply with the relating Korean laws.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        7.2
      </pre>
    ),
    REMARK: ' ',
  },
  {
    HARDWARE_ITEM: <pre align="left">&nbsp;2. GENERAL</pre>,
    HEI_SPECIFICATION: '',
    MANAGEMENT_PROVISION: '',
    REMARK: ' ',
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.1 EMO BUTTON
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.1.1. 실수로 작동하는 것을 제한하기 위한 최소한의 보호 GUARD는 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;다음 사항을 고려하여 설치하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Shroud configuration to limit act with mistake shall be equipped <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; as follows.
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; ① S/W 지름 SIZE가 50mm 이상 일때 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Switch diameter is over 50mm.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ▷ EMO S/W와 GUARD 높이간 수평면 유지
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Being maintain the level of water beteen EMO S/W and shroud.
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; ② S/W 지름 SIZE가 50mm 이하 일때 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Switch diameter is under 50mm.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ▷ EMO S/W와 GUARD 높이간 수평면 유지
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Being maintain the level of water beteen EMO S/W and shroud.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ▷ EMO S/W와 GUARD간 이격거리 확보 (20mm 이상 유지)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Maintaining the isolation distance between EMO S/W <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and shroud (over 20mm)
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp; ③ 실수로 작동하는 것이 배제된 부분은 보호 GUARD를 설치해서는 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 안된다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Shroud shall not be equipped at the excluding parts which act <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; with mistake.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;12.5
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;FIG#1
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.2 DOCUMENTS
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        <br />
        <br />
        <br />
        <br />
        &nbsp; 2.2.1. 기, 3자 인증 등 장비에 대한 각종 ESH의 성과를 입증하는 자료가 있을 시에는 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 관계자료를 제출하여 그 성과를 인정받는다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 단, 당해장비의 해당 공정(PROCESS)에 한한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * If the supplier have data demonstrating all kinds of ESH performance like a 3'rd <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; party evalution & certification etc for the equipment, present the data and should <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; be recognized.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; but, limited only the equivalent process of the equipment concerned.
        <br />
        <br />
        &nbsp; 2.2.2. 발생할 수 있는 유해·위험, 안전한 통제 방법, 안전 절차등 안전에 관련된 주요 부분에 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 대하여는 OPERATION & MAINTENANCE MANUAL의 내용을 한글화햐여 표기하여야 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * About the key items relating safety (possible hazards, safe control method, <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; safety procedures etc), contents of operation and maintenance manual are <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; recorded korea.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        9.6.2
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: '',
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.3 LOCKOUT/
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TAGOUT
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.3.1. 유해·위험한 UTILITY에 대하여는 에너지 격리장치인 잠금장치(LOCKOUT) 및 표지 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 장치(TAGOUT)는 그 DEVICE가 제공되어야 하며 LOCKOUT/TAGOUT 절차를 알려
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 주어야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *The supplier shall offer the lockout and tagout devices which are energy isolation <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; system, about the hazardous utilities, notify the lockout/tagout procedure.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;17.1.1
        <br />
        17.2
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;FIG#2
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.4 CHEMICALS & <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GAS
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.4.1. 유해·위험 물질의 공급배관과 장비가 연결되는 부분의 MECHANICAL JOINTS
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (FITTING류 등)는 반드시 EXHAUST ENCLOSURES내에서 이루어져야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Mechanical joint(fitting etc) a part connected equipment with the hazardous <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; material supply pipes shall be united in the exhaust enclosures.
        <br />
        <br />
        &nbsp; 2.4.2. TOXIC GAS등에 설치되는 DETECTOR는 TOXIC GAS MONITORING SYSTEM과의
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 상호 호환성을 고려하여야 함에 따라 SPECIFICATION은 FAB안전 담당팀과 별도
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 협의하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * For the gas leak detector equipped, the supplier shall consult together HEI safety
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; management team due to considering the mutual interaction toxic gas monitoring
        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; system and gas leak detector.
        <br />
        <br />
        &nbsp; 2.4.3. 가연성 GAS, CHEMICAL을 사용하는 장비 CANISTER (EXHAUST ENCLOSURES)의
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 내부를 볼 수 있는 투명한 부분은 불연성 재료(Non-combustible material)를 사용
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 하거나 3자 인증기관의 SEMI S2 평가결과 보고서를 제출하여 그 성과(Compliance)를
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 인정 받는다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 단, 자연발화성 가스를 사용하는 장비의 경우에는 망입강화유리를 사용하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Canister(exhaust enclosure) window and skylight of equipment that use <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; combustibe gas and chemical should be made of non-combustible material <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; or should present the third party report for SEMI S2 and be confirmed the <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; compliance.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; but, in case of equipment that use pyrophoric gas, it should be made of wired <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; safety glass.
        <br />
        <br />
        &nbsp; 2.4.4. 유기용제(SOLVENTS)를 사용하는 장비에 설치되는 LOCAL CO2 자동 소화설비는 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CENTRAL MONITORING SYSTEM과의 상호 호환성을 고려하여야 함에 따라 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPECIFICATION은 FAB안전 담당팀과 별도 협의하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Local CO2 Automatic Extinguisher Equipment for the equipment using solvent <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; should be consult together HEI safety management team due to considering <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; the mutual interaction Central Monitoring System and Local CO2 Automatic <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Extinguisher Equipment.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;23.6
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        14.4.1
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        FIG#3
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.5 MECHANICALS &<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SAFETY INTERLOCK
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.5.1. 비고의적으로 접근하여 인체의 상해를 초래할 수 있는 PINCH POINTS는 용이하게 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 접촉하지 아니 하도록 보호 COVER 또는 INTERLOCK에 의한 안전장치로 방호되어야
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Pinch points that causes an injury of an operator with an accidental access <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; should be protected with a safety device like a safety cover or an interlock <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; system to prevent touching easily.
        <br />
        <br />
        &nbsp; 2.5.2. 유지보수를 위하여 INTERLOCK을 해제하여 정비하도록 만들어져 불가피하게 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; INTERLOCK을 해제하여야 할 경우 즉, 위험한 부분에 접근하여 ADJUST등 세밀한 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 정비를 수행할 시 HUMAN ERROR로 MAINTENANCE를 보호할 수 있는 방법이 강구 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 되어져야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Inevitably when you have PM & services with remove interlocks, that is you may
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; approach hazardous zone, at this time should be solutions for protect <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maintenance.
        <br />
        <br />
        &nbsp; 2.5.3. INTERLOCK이 설치되어 있는 모든 개소에는 이를 식별하는 LABEL을 부착하여야 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * The all places that was equipped a interlock system should be labeled on them <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; to identify.
        <br />
        <br />
        &nbsp; 2.5.4. 장비가 자동으로 운전되는 상태에서 SOFTWARE상으로 INTERLOCK을 해제하는 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 기능이 있어서는 안된다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 단, 안전 MODE 또는 TEACHING MODE등에 의해 HARDWARE적으로 감속, 감압, <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 수동운전, 구분운전일 경우에는 가능하다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;* During the equipment runs automatically, their software should not have the <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; function to release a interlock system.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; But, it could be released the interlock system when the equipment runs by safety
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and teaching mode to reduce the speed and presure, or to operate manual and <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; step-by-step.
        <br />
        <br />
        &nbsp; 2.5.5. 심각한 유해·위험 사항에 대하여 적용하는 INTERLOCK은 용이하게 그 기은을 해제
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 하거나 변경할 수 없는 구조로 설치하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * The interlock that is used for a serious hazardous and dangerous condition could <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; not be constructed with easy release or modification.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;18.4
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        11.5 예외
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        11.7
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;FIG#4,5,6
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        FIG#7
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        FIG#8
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.6 ELECTRICA <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.6.1. Clean R/M의 하단붕 설치되는 전원장치가 내장된 전기설비 ENCLOSURES는 상부로
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 부터 Drop되는 액체가 직접적으로 유입되지 아니하도록 하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Enclosures of electrical facilities that have a power supply within and are <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; installed below clean room should be not inflowed directly liquids from the
        <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; upside.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;13.4.1
        <br />
        13.4.8
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;FIG#9
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.7 HAZARD
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WARNING <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.7.1. 장비의 모든 ES&H 경고 표지 (HAZARD ALERT LABELS)는 한국어의 영어로 병용 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 표기 되어야하며, 문자 도안의 양식은 안전 이격거리에서 명확히 식별 가능하도록 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 'SEMI S1' 규격 이상으로 고려 되어져야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * All ES&H hazard alert labels should be printed in korean and english, it should <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; be clear and accurate enable to see from a distance(over "SEMI S1" standard)
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;10.3 <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;FIG#10 <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.8 WET BENCH etc.
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.8.1. FLAMMABLE LIQUIDS를 사용하는 장비의 구조재료(CONSTRUCTION MATERIALS)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 는 불연성 재질을 사용하여야 한다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Should be use nonflammablity materials for Construction Materials of equipment <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; using flammable liquids.
        <br />
        <br />
        &nbsp; 2.8.2. 장비를 구성하고 있는 가연성 프라스틱(COMBUSTIBLE PLASTICS)은 'FM 4910' <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PROTOCOL에 적합한 재질을 사용하여야 한다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * The equipment composed of combustible plastics "FM 4910" should be use <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; proper materials(basis protocol).
        <br />
        <br />
        &nbsp; 2.8.3. FLAMMABLE LIQUIDS를 사용하여 화재의 위험성이 있는 장비가 양립할 수 없는 재료
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 에 의하여 불연성물질을 사용할 수 없어 가연성 재료인 PVC를 사용할 때에는 FM 4910 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PROTOCOL에 적합한 재료를 사용하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * In the equipment that uses flammable liquids and have a risk of fire, when cann't <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; use noncombustible material and use PVC(combustible material) due to the <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; incompatible materials,should meet FM 4910 protocol.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;15.1 주 <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: '',
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.9 EXHAUST
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VENTILATION
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.9.1. 배기장치는 유해물질을 효율적이고 안전하게 통제하여 배출될 수 있도록 EXHAUST <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ENCLOSURES가 사용되지 않는 구멍들을 최소화 하고, CAPING 또는 SEALING <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 되어야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Exhaust equipment should be control toxic materials enable to efficiently <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and safely.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Should be minimize hole, caping and sealing not use exhaust enclosures.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: (
      <pre>
        &nbsp;22.2
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    REMARK: (
      <pre>
        &nbsp;FIG#11
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;2.10 GAS CABINET
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 2.10.1. AUTO GUARD가 설치되어 있는 CGA CONNECTOR는 BEARING TYPE이어야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * CGA Connector equipped with automatic quard should be a bearing type.
        <br />
        <br />
        &nbsp; 2.10.2. CYLINDER를 고정하는 안전고리는 불연성이고, 폭발 등에 대한 내구력을 가져야 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * The safeyt belt for typing cylinder should be noncombustible and durable for
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; explosion.
        <br />
        <br />
        &nbsp; 2.10.3. 자연발화성 및 NFPA CODE의 화재등급분류 4이상의 GAS CYLINDER에는 AUTO <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SHUT-OFF V/V를 설치하여야 한다.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * Gas cylinder with pyrophoric gas and NFPA fire classification 4 gas should be
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; equipped automatic shut-off valve.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: ' ',
    REMARK: ' ',
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;3. GENERAL
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;REQUIREMENTS
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 3.1. HARDWARE ITEMS 중 안전 관련 PARTS가 CUSTOMER 'OPTION'사항으로 제시 될 <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 경우 FAB 안전 담당팀과 별도 협의 하여야 한다. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * In case, when customers make choice option relate safety parts(hardware
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; items) should be in terms with HEI safety management team.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: '',
    REMARK: '',
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;4. EQUIPMENT <br />
        &nbsp;&nbsp;&nbsp;&nbsp;DESIGN
      </pre>
    ),
    HEI_SPECIFICATION: '',
    MANAGEMENT_PROVISION: '',
    REMARK: '',
  },
  {
    HARDWARE_ITEM: (
      <pre align="left">
        &nbsp;&nbsp;&nbsp;4.1 GENERAL
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </pre>
    ),
    HEI_SPECIFICATION: (
      <pre align="left">
        &nbsp; 4.1.1. 장비는 재사용이나 재개조 할 수 있도록 LIFE-CYCLE을 고려하여 설계도어야
        <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 한다.
        <br />
        &nbsp; 4.1.2. 장비는 공정 운전중에 환경영향을 최소화 하도록 설계되어야 한다.
        <br />
        &nbsp; 4.1.3. 사용 CHEMICAL 및 GAS는 법적규제치를 초과하지 안흔 농도 및 양이 사용되어져야 <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 한다.
        <br />
        &nbsp; 4.2.1. EXHAUST유량과 형태는 식별되어져야하며, 정압 MONITORING은 연속적이며 정압
        <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 능력의 한계내에서 적절하게 기능될 수 있도록 설계되어야 한다.
        <br />
        &nbsp; 4.2.2. EXHAUST량이 SETTING POINT 이하로 하락시 시각적 또는 음성적 경고장치가 설치
        <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 되어 자동으로 작동하여야 한다.
        <br />
        &nbsp; 4.2.3. 유해물질을 사용하는 각 GAS의 분리BOX, GAS PANEL ENCLOSURE, 각 TOOL
        <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 실린더 가스함은 요구속도를 유지하도록 EXHAUST량을 최소화 할 수 있도록 <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 설계 되어야 한다.
        <br />
        &nbsp; 4.3.1. 국내외 법규상 사용이 금지된 물질은 사용되어져서는 안된다.
        <br />
        &nbsp; 4.3.2. 보수나 정비시 WASTE가 최소화 되고 유해물질을 최소한 사용하도록 설계되어야
        <br />
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 한다.
        <br />
        <br />
      </pre>
    ),
    MANAGEMENT_PROVISION: '',
    REMARK: '',
  },
];

const HardWareReqSpec = () => (
  <ContentsWrapper>
    <div className="selSaveWrapper alignLeft">
      <StyledButtonWrapper className="btn-wrap-left btn-wrap-mb-10">
        <StyledButton className="btn-primary btn-sm" onClick={() => message.warning('미구현')}>
          인쇄
        </StyledButton>
      </StyledButtonWrapper>
    </div>
    <AntdLineTable
      key="hardWareReqSpec"
      className="tableWrapper"
      rowKey="HARDWARE_ITEM"
      columns={columns}
      dataSource={list || []}
      bordered
      pagination={false}
    />
  </ContentsWrapper>
);

export default HardWareReqSpec;
