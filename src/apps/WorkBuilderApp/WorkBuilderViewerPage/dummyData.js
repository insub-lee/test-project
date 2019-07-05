export const dummyResponse = {
  metas: [
    {
      ORD: 0,
      NAME_KOR: 'Box Title',
      COMP_TYPE: 'BOX',
      COMP_TAG: 'BOX',
      COMP_FIELD: 'BOX',
      CONFIG:
        '{"info":{},"property":{"type":"BOX","id":"box-1562052564856","property":{"label":"Box Title","useLabel":true,"type":"table","column":1}},"option":{}}',
      children: [
        {
          ORD: 0,
          NAME_KOR: 'Label',
          COMP_TYPE: 'FIELD',
          COMP_TAG: 'text',
          COMP_FIELD: 'text-1562052566684',
          CONFIG:
            '{"info":{"type":"STRING","size":2000,"nullable":false,"defaultValue":""},"property":{"type":"text","id":"text-1562052566684","parentId":"box-1562052564856","property":{"className":"","style":{},"name":"text-1562052566684","defaultValue":"","label":"Label","id":"text-1562052566684"}},"option":{}}',
        },
        {
          ORD: 1,
          NAME_KOR: 'Label',
          COMP_TYPE: 'FIELD',
          COMP_TAG: 'textarea',
          COMP_FIELD: 'textarea-1562052567324',
          CONFIG:
            '{"info":{"type":"CLOB","size":5000,"nullable":false,"defaultValue":""},"property":{"type":"textarea","id":"textarea-1562052567324","parentId":"box-1562052564856","property":{"className":"","style":{},"name":"textarea-1562052567324","defaultValue":"","label":"Label","id":"textarea-1562052567324"}},"option":{}}',
        },
      ],
    },
    {
      ORD: 1,
      NAME_KOR: 'Box Title',
      COMP_TYPE: 'BOX',
      COMP_TAG: 'BOX',
      COMP_FIELD: 'BOX',
      CONFIG:
        '{"info":{},"property":{"type":"BOX","id":"box-1562052565054","property":{"label":"Box Title","useLabel":true,"type":"normal","column":1}},"option":{}}',
      children: [
        {
          ORD: 0,
          NAME_KOR: 'Label',
          COMP_TYPE: 'FIELD',
          COMP_TAG: 'number',
          COMP_FIELD: 'number-1562052569801',
          CONFIG:
            '{"info":{"type":"NUMBER","size":2000,"nullable":false,"defaultValue":0},"property":{"type":"number","id":"number-1562052569801","parentId":"box-1562052565054","property":{"className":"","style":{},"name":"number-1562052569801","defaultValue":"","label":"Label","id":"number-1562052569801"}},"option":{}}',
        },
        {
          ORD: 1,
          NAME_KOR: 'Label',
          COMP_TYPE: 'FIELD',
          COMP_TAG: 'checkbox',
          COMP_FIELD: 'checkbox-1562052570467',
          CONFIG:
            '{"info":{"type":"STRING","size":2000,"nullable":false,"defaultValue":""},"property":{"type":"checkbox","id":"checkbox-1562052570467","parentId":"box-1562052565054","property":{"className":"","style":{},"name":"checkbox-1562052570467","defaultValue":[],"label":"Label","id":"checkbox-1562052570467","options":[{"label":"label 1","value":"label 1"},{"label":"label 2","value":"label 2"},{"label":"label 3","value":"label 3"}]}},"option":{}}',
        },
      ],
    },
    {
      ORD: 2,
      NAME_KOR: 'Box Title',
      COMP_TYPE: 'BOX',
      COMP_TAG: 'BOX',
      COMP_FIELD: 'BOX',
      CONFIG:
        '{"info":{},"property":{"type":"BOX","id":"box-1562052565236","property":{"label":"Box Title","useLabel":true,"type":"normal","column":1}},"option":{}}',
      children: [
        {
          ORD: 0,
          NAME_KOR: 'Label',
          COMP_TYPE: 'FIELD',
          COMP_TAG: 'radio',
          COMP_FIELD: 'radio-1562052573010',
          CONFIG:
            '{"info":{"type":"STRING","size":2000,"nullable":false,"defaultValue":""},"property":{"type":"radio","id":"radio-1562052573010","parentId":"box-1562052565236","property":{"className":"","style":{},"name":"radio-1562052573010","defaultValue":"","label":"Label","id":"radio-1562052573010","options":[{"label":"label 1","value":"label 1"},{"label":"label 2","value":"label 2"},{"label":"label 3","value":"label 3"}]}},"option":{}}',
        },
        {
          ORD: 1,
          NAME_KOR: 'Label',
          COMP_TYPE: 'FIELD',
          COMP_TAG: 'grid',
          COMP_FIELD: 'grid-1562052573638',
          CONFIG:
            '{"info":{"type":"STRING","size":2000,"nullable":false,"defaultValue":""},"property":{"type":"grid","id":"grid-1562052573638","parentId":"box-1562052565236","property":{"className":"","style":{},"name":"grid-1562052573638","defaultValue":"","label":"Label","id":"grid-1562052573638"}},"option":{}}',
        },
      ],
    },
  ],
};
