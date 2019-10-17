import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FroalaEditorView from 'components/FormStuff/RichTextEditor/FroalaEditorView';
import Styled from '../../GenBoard/View/Styled';
import Button from '../../../styled/StyledButton';
import Footer from './footer';

class View extends Component {
  state = {
    favSeq: 0,
  };

  componentDidMount() {}
  
  viewFavorite = (data) =>{
    const { onChangeMovePageHandler } = this.props;
    onChangeMovePageHandler('LIST');
  }

  delFavorite = (data) => {
    const { favSeq } = this.props;
    const { id } = this.props;
    const apiArr = {
      WORK_SEQ: data.workSeq,
      TASK_SEQ: data.taskSeq,
      FAV_SEQ: data.favSeq,
    };
    this.props.deleteFav(id, apiArr);
    this.viewFavorite(data);
  };

  render() {
    const { formData, metaList, id, workSeq, taskSeq, delFavorite, favSeq } = this.props;
    const contentMeta = metaList.filter(meta => meta.COMP_FIELD === 'CONTENT');
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th className="manual-descriptions-item-label manual-descriptions-item-colon" style={{ width: '120px' }}>
                제목
              </th>
              <td className="manual-descriptions-item-content" colSpan="3">
                {formData.TITLE}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4">{ <Footer delFavorite={ this.delFavorite } {...this.props} favSeq={favSeq} /> }</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

View.propTypes = {
  id: PropTypes.string,
  workSeq: PropTypes.number,
  taskSeq: PropTypes.number,
  formData: PropTypes.object,
  metaList: PropTypes.array,
  addNotifyBuilder: PropTypes.func,
};

export default View;
