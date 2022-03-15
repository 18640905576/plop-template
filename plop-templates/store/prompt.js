// eslint-disable-next-line @typescript-eslint/no-var-requires
const { notEmpty } = require('../utils.js');

module.exports = {
  description: '创建store',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'store名称',
      validate: notEmpty('name'),
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: '包含以下哪些:',
      choices: [
        {
          name: 'state',
          value: 'state',
          checked: true,
        },
        {
          name: 'getters',
          value: 'getters',
          checked: false,
        },
        {
          name: 'mutations',
          value: 'mutations',
          checked: true,
        },
        {
          name: 'actions',
          value: 'actions',
          checked: false,
        },
      ],
      validate(value) {
        if (!value.includes('state') || !value.includes('mutations')) {
          return 'state和mutations是必须项';
        }
        return true;
      },
    },
  ],
  actions(data) {
    const name = '{{camelCase name}}';
    const { blocks } = data;
    const options = ['state', 'mutations'];
    const joinFlag = `,
  `;
    if (blocks.includes('getters')) blocks.push('getters');
    if (blocks.includes('actions')) blocks.push('actions');

    const actions = [
      {
        type: 'add',
        path: `src/store/modules/${name}.ts`,
        templateFile: 'plop-templates/store/index.hbs',
        data: {
          options: options.join(joinFlag),
          state: blocks.includes('state'),
          mutations: blocks.includes('mutations'),
          actions: blocks.includes('actions'),
        },
      },
    ];
    return actions;
  },
};
