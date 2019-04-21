import React from 'react';

class RenderCheckComponent extends React.Component {
  constructor(props, name) {
    super(props);

    this.count = 0;
    this.name = name;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.shallowCompare(this, nextProps, nextState);
  }

  shallowEqual = (objA, objB) => {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null
      || typeof objB !== 'object' || objB === null) {
        return false;
    }

    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    let bHasOwnProperty = hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i += 1) {
      if(!bHasOwnProperty(keysA[i])) {
        console.log(`######RENDERING CHECK######\n <${this.name}>\n count: ${this.count + 1}\n`,
        '존재하지 않는 props =>', keysA[i]);
        this.count += 1;
        return false;
      }

      if (objA[keysA[i]] !== objB[keysA[i]]) {
        console.log(`######RENDERING CHECK######\n <${this.name}>\n count: ${this.count + 1}\n`,
        '변경된 값(keyName, thisProps, nextProps) =>', keysA[i], objA[keysA[i]], objB[keysB[i]]);
        this.count += 1;
        return false;
      }
    }

    return true;
  }

  shallowCompare = (instance, nextProps, nextState) => (
    !this.shallowEqual(instance.props, nextProps) ||
    !this.shallowEqual(instance.state, nextState)
  )
}

const initializeCount = (_this) => {
  _this.count = 0;
  console.log('######INITIALIZE COUNT######');
}

export {
  RenderCheckComponent,
  initializeCount,
};
