import React from 'react';
import Axios from 'axios';

class DatabaseSession extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    Axios.post('/api/gipms/v1/common/checkDatabaseSession', {})
      .then(result => {
        console.log('componentDidMount', result);
        this.setState({list: result.data.list});
      })
  }

  render() {
    const { list } = this.state;

    let data = [];

    if (list.comboList) {
      data = list.comboList.map(item => {
        return ( 
          <div>
            <span>{item.PARAMETER}</span>
            <span>:</span>
            <span>{item.VALUE}</span>
          </div>
        )
      })
    }
    return (
      <div>
        <h2>Database Session</h2>
        {data}
      </div>
    );
  }
}

export default DatabaseSession;