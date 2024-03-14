const routerData = [
    {
        path: '/formDesignerIndex/template', // 子页面路径
        name: 'template',
        component:() => import('@/views/template/index.vue'),
        langKey: 'templateManager',
        txt:'换机申请模板管理',
        index:'1',
        iconClass:'el-icon-menu',
    },
    {
        path: '/formDesignerIndex/regular', // 子页面路径
        name: 'regular',
        component:() => import('@/views/regular/index.vue'),
        langKey: 'regularManager',
        txt:'校验规则管理',
        index:'2',
        iconClass:'el-icon-folder-checked',
    },
    {
        path: '/formDesignerIndex/field', // 子页面路径
        name: 'field',
        component:() => import('@/views/field/index.vue'),
        langKey: 'fieldManager',
        txt:'字段管理后台',
        index:'3',
        iconClass:'el-icon-edit-outline',
    },
    {
        path: '/formDesignerIndex/commonAPI', // 子页面路径
        name: 'commonAPI',
        component:() => import('@/views/commonAPI/index.vue'),
        langKey: 'commonAPIManager',
        txt:'公共查询接口管理',
        index:'4',
        iconClass:'el-icon-key',
    },
];

export default routerData