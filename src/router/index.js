/*
 * @Description:
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 10:06:37
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-12 10:52:06
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [{
		path: '/', //主页
		// name: 'Home',
		redirect: '/home',
		// component: () => import('../views/Home.vue')
	}, {
		path: '/home', //主页
		name: 'Home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/login', //登录
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/chooseIdentity', //选择注册身份
		name: 'ChooseIdentity',
		component: () => import('../views/ChooseIdentity.vue')
	},
	{
		path: '/register/:identityTag', //注册
		name: 'Register',
		component: () => import('../views/Register.vue')
	},
	{
		path: '/tasks',
		name: 'TaskList',
		component: () => import('../views/tasks/TaskList.vue')
	},
	{
		path: '/task/:id',
		name: 'TaskDetail',
		component: () => import('../views/tasks/TaskDetail.vue')
	}
]

/**
 * developerRoutes
 * 需要动态的根据用户的roles进行加载的routes
 */
export const developerRoutes = [{
	path: '/workbench',
	name: 'Workbench',
	component: () => import('../views/workbench/Index.vue'),
	redirect: '/workbench/dashboard',
	meta: {
		title: '工作台',
		// icon: 'lock',
		roles: ['employer', 'developer'] // you can set roles in root nav
	},
	children: [{
			path: 'dashboard', //仪表盘
			name: 'Dashboard',
			component: () => import('../views/workbench/developers/Dashboard.vue'),
			meta: {
				title: '仪表盘',
				icon: "la la-home",
				roles: ['developer'] 
			}
		},
		{
			path: 'my-tasks',
			name: 'MyTasks',
			component: () => import('../views/workbench/developers/MyTasks.vue'),
			meta: {
				title: '我的任务',
				icon: "qingmeng-icon icon-my-projects-line-gray",
				roles: ['developer'] 
			}
		},
		{
			path: 'view-task/:id', //查看项目
			name: 'ViewTask',
			component: () => import('../views/workbench/developers/ViewTask.vue'),
			hidden: true,
			meta: {
				title: '查看任务',
				icon: "qingmeng-icon icon-my-project-line-gray",
				roles: ['developer'] 
			}
		},
		{
			path: 'personal-auth',
			name: 'PersonalAuthentication',
			hidden: true,
			component: () => import('../views/workbench/developers/PersonalAuthentication.vue')
		},
		// 404 page must be placed at the end !!!
		// {path: '*', redirect: '/404', hidden: true}
	]
}]


/**
 * employerRoutes
 * 需要动态的根据用户的roles进行加载的routes
 */
export const employerRoutes = [{
	path: '/workbench',
	name: 'Workbench',
	component: () => import('../views/workbench/Index.vue'),
	redirect: '/workbench/dashboard',
	meta: {
		title: '工作台',
		// icon: 'lock',
		roles: ['employer', 'developer'] // you can set roles in root nav
	},
	children: [{
			path: 'dashboard', //仪表盘
			name: 'Dashboard',
			component: () => import('../views/workbench/employers/Dashboard.vue'),
			meta: {
				title: '仪表盘',
				icon: "la la-home",
				roles: ['employer'] 
			}
		},
		{
			path: 'my-tasks', //项目管理
			name: 'MyTasks',
			component: () => import('../views/workbench/employers/MyTasks.vue'),
			meta: {
				title: '我的任务',
				icon: "qingmeng-icon icon-my-projects-line-gray",
				roles: ['employer'] 
			}
		},
		{
			path: 'view-task/:id', //查看项目
			name: 'ViewTask',
			component: () => import('../views/workbench/employers/ViewTask.vue'),
			hidden: true,
			meta: {
				title: '查看任务',
				icon: '',
				parentPath: 'my-tasks',
				roles: ['employer'] 
			}
		},
		{
			path: 'publish-task',
			name: 'PublishTask',
			component: () => import('../views/workbench/employers/PublishTask.vue'),
			meta: {
				title: "发布任务",
				icon: "qingmeng-icon icon-publish-task-line-gray",
				roles: ['employer'] 
			}
		},
		{
			path: "company-auth",
			name: "CompanyAuthentication",
			component: () => import('../views/workbench/employers/CompanyAuthentication.vue'),
			hidden: true,
			meta: {
				title: "企业认证",
				icon: "qingmeng-icon icon-money-account-line-gray",
				roles: ['employer'] 
			}
		},
		// 404 page must be placed at the end !!!
		// {path: '*', redirect: '/404', hidden: true}
	]

}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
