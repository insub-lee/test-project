import React from 'react';

const SignLineOptions = ({ signLine, action: { changeCount, changeLabel } }) => (
  <div id="sign-line-options">
    <div id="sign-line-options-up">
      <div id="sign-line-options-label">SignLine 설정</div>
      <div id="sign-line-options-status-c">
        <span id="sign-line-options-input-c">
          <div className="field select">
            <span id="sign-line-options-input-holder">
              <select id="sign-line-options-states" value={signLine.length} onChange={changeCount}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </span>
          </div>
          <div className="sel-arrow">
            <div className="d-s-arrow" />
          </div>
        </span>
      </div>
    </div>
    <div id="sign-line-options-field">
      {signLine.map(sign => (
        <div className="trt-traits" key={sign.step}>
          <div className="trt-trait">
            <div className="label" title="Id">
              STEP {sign.step}
            </div>
            <div className="field field-text">
              <div className="gjs-input-holder">
                <input type="text" defaultValue={sign.label} placeholder="Label 명" onChange={e => changeLabel(sign.step, e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SignLineOptions;
