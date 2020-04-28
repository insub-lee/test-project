import React, { Component } from 'react';

class OldScopeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scope: undefined,
    };
  }

  componentDidMount() {
    const {
      formData: { MIG_YN, OLD_SCOPE, SCOPE },
    } = this.props;

    const scope = MIG_YN === 'Y' ? OLD_SCOPE : SCOPE;
    this.setState({ scope });
  }

  render() {
    const { scope } = this.state;
    return <div>{scope}</div>;
  }
}

export default OldScopeComp;
