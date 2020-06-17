import React from 'react';
import Draggable from 'react-draggable';

import Contents from './Contents';

const DraggableModal = () => (
  <div>
    <h2>Drag 가능한 모달</h2>
    <section>
      {/* Draggable 사용 */}
      <Draggable
       handle=".handle"
       bounds="body" // selector 사이즈 범위내에서 움직임
       defaultPosition={{ x: 50, y: 40 }} // 초기 위치
      >
        <div style={{ display: 'inline-block' }}>
          <Contents />
        </div>
      </Draggable>
    </section>
  </div>
);

export default DraggableModal;
