// eslint-disable-next-line @typescript-eslint/no-var-requires
const { notEmpty } = require('../utils.js');

module.exports = {
  description: '新建一个组件',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '组件名称',
      validate: notEmpty('name'),
    },
    {
      type: 'input',
      name: 'name',
      message: '组件名称',
      validate: notEmpty('name'),
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: '是否需要:',
      choices: [
        {
          name: '<template>',
          value: 'template',
          checked: true,
        },
        {
          name: '<script>',
          value: 'script',
          checked: true,
        },
        {
          name: 'style',
          value: 'style',
          checked: true,
        },
        {
          name: '单元测试',
          value: 'unit',
          checked: false,
        },
        {
          name: '组件说明文档',
          value: 'doc',
          checked: true,
        },
      ],
      validate(value) {
        if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
          return ' <template> 和 <script> 是必须的.';
        }
        return true;
      },
    },
  ],
  actions: (data) => {
    const name = '{{properCase name}}';
    const blocks = data.blocks || [];
    const actions = [
      {
        type: 'add',
        path: `src/components/${name}/${name}.vue`,
        templateFile: 'plop-templates/component/template/template.hbs',
        data: {
          name,
          template: blocks.includes('template'),
          script: blocks.includes('script'),
          style: blocks.includes('style'),
        },
      },
      {
        type: 'add',
        path: `src/components/${name}/index.ts`,
        templateFile: 'plop-templates/component/template/index.hbs',
        data: {
          name,
          template: blocks.includes('template'),
          script: blocks.includes('script'),
          style: blocks.includes('style'),
        },
      },
    ];
    // 单元测试
    if (data.blocks.includes('unit')) {
      actions.push({
        type: 'add',
        path: `src/components/${name}/tests/${name}.spec.ts`,
        templateFile: 'plop-templates/component/template/spec.hbs',
        data: { name },
      });
    }
    // readme
    if (data.blocks.includes('doc')) {
      actions.push({
        type: 'add',
        path: `src/components/${name}/README.md`,
        templateFile: 'plop-templates/component/template/README.hbs',
        data: { name },
      });
    }

    return actions;
  },
};
