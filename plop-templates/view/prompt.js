// eslint-disable-next-line @typescript-eslint/no-var-requires
const { notEmpty } = require('../utils.js');

module.exports = {
  description: '新建一个页面',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '页面名称',
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
          name: '<style>',
          value: 'style',
          checked: true,
        },
        {
          name: '页面说明文档',
          value: 'doc',
          checked: false,
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
        path: `src/views/${name}/index.vue`,
        templateFile: 'plop-templates/view/template/template.hbs',
        data: {
          name,
          template: blocks.includes('template'),
          script: blocks.includes('script'),
          style: blocks.includes('style'),
        },
      },
    ];

    // readme
    if (data.blocks.includes('doc')) {
      actions.push({
        type: 'add',
        path: `src/views/${name}/README.md`,
        templateFile: 'plop-templates/view/template/README.hbs',
        data: { name },
      });
    }

    return actions;
  },
};
