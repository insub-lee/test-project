import React, { Component } from 'react';
import { Button } from 'antd';

import iconInput from 'images/workbuilder/icon_input.png';
import iconText from 'images/workbuilder/icon_text.png';
import iconCheckbox from 'images/workbuilder/icon_checkbox.png';
import iconFieldset from 'images/workbuilder/icon_fieldset.png';
import iconImage from 'images/workbuilder/icon_image.png';
import iconMonth from 'images/workbuilder/icon_month.png';
import iconNumber from 'images/workbuilder/icon_number.png';
import iconPassword from 'images/workbuilder/icon_password.png';
import iconRadio from 'images/workbuilder/icon_radio.png';
import iconSelect from 'images/workbuilder/icon_select.png';
import iconWatch from 'images/workbuilder/icon_watch.png';

class CompToolbar extends Component {
  state = {};

  handleChangeView = groupIdx => this.setState(prevState => ({ [groupIdx]: prevState[groupIdx] ? !prevState[groupIdx] : true }));

  render = () => {
    const {
      compPoolList,
      compGroupList,
      action: { setSelectToolbarItem },
    } = this.props;
    return (
      <div className="categoryWrapper">
        {compGroupList &&
          compGroupList.length > 0 &&
          compGroupList.map((node, nodeIdx) => (
            <React.Fragment key={`viewDesignerCategoryFragment_${nodeIdx}`}>
              <div
                key={`viewDesignerCategoryTitle_${nodeIdx}`}
                className="categoryTitle"
                onClick={() => this.handleChangeView(node.COL_GROUP_IDX)}
                role="button"
              >
                {node.COL_GROUP_NAME}
                <i className={`fa fa-angle-${this.state[node.COL_GROUP_IDX] ? 'down' : 'up'}`}></i>
              </div>
              <div key={`viewDesignerCategoryBody_${nodeIdx}`} className={`categoryBody${this.state[node.COL_GROUP_IDX] ? '' : ' hide'}`}>
                {compPoolList &&
                  compPoolList.length > 0 &&
                  compPoolList
                    .filter(fNode => fNode.COMP_SRC.length > 1 && fNode.COL_GROUP_IDX === node.COL_GROUP_IDX)
                    .map(subNode => (
                      <Button key={subNode.COMP_TAG} onClick={() => setSelectToolbarItem(subNode)}>
                        <span className="iconWrapper">
                          <img src={iconInput} alt="" />
                        </span>
                        {subNode.COMP_NAME}
                      </Button>
                    ))}
              </div>
            </React.Fragment>
          ))}
      </div>
    );
  };
}

export default CompToolbar;
