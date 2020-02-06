import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        const { id, getCallDataHanlder, apiAry } = this.props;
        getCallDataHanlder(id, apiAry);
      }

    handleCmpnyOnChange = e => {
        const { id, changeFormData } = this.props;
        console.log('eeeeeeeeeeeeeee', e);
        changeFormData(id, 'ESHS_SEARCH_CMPNY', e);
    }
    handleNameOnChange = e => {
        const{ id, changeFormData } = this.props;
        console.log('name !!!! ', e.target.value);
        changeFormData(id, 'ESHS_SEARCH_NAME', e.target.value);
    }

    render(){
        const{ result:{ hstCmpnyList:eshsHstCmpnyList}, formData } = this.props;
        const cmpnyList= eshsHstCmpnyList === undefined ? [] : eshsHstCmpnyList.eshsHstCmpnyList;
        console.log(cmpnyList);
      console.log('result  ', eshsHstCmpnyList);
      return (
        <div>
            <Select defaultValue="지역 전체" style={{ width: 110, padding: 3 }}>
                <Option value="청주">청주</Option>
                <Option value="구미">구미</Option>
            </Select>
            <Select  defaultValue="회사 전체" style={{ width: 130, padding: 3 }} onChange={this.handleCmpnyOnChange}>
                <Option value={' '}>회사 전체</Option>
                {cmpnyList.map(c => (
                <Option key={c.hst_cmpny_cd} style={{height: 30}}>
                    {c.hst_cmpny_nm}
                </Option>
                ))}
            </Select>
            이름 
            <Input style={{ width: 130, padding: 3 }} 
                value={formData.ESHS_SEARCH_NAME}
                onChange={this.handleNameOnChange}
            />
                <Button>검색</Button>
                <Button>추가</Button>
        </div>
      );
    }
  }

    SearchBar.defaultProps = {
        id: 'EshshostCompny',
        getCallDataHanlder: () => {},
        result: {},
        apiAry: [
            {
                key:'hstCmpnyList',
                type:'GET',
                url: '/api/eshs/v1/common/eshsHstCompanyList',
                param:{},
            },
        ],
    };
  export default SearchBar;