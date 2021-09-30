/*
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-09-08 16:55:30
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-08 18:06:25
 */
import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth'


NProgress.configure({showSpinner: false}) // NProgress Configuration

// const whiteList = ['/home', '/tasks', '/task', '/developers', '/developer', '/login', '/chooseIdentity', '/register/1', '/register/2'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // determine whether the user has logged in
    //TODO: 是否要JSON.parse()
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // 如果已经登录，重定向到 / 主页
            next({path: '/workbench/dashboard'})
            NProgress.done()
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.state.userInfo.roles && store.state.userInfo.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    const {roles} = await store.dispatch('getUserInfo')

                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch('generateRoutes', roles)

                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes)

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({...to, replace: true})
                    // next({...to})
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else { /* has no token*/
        // if (whiteList.indexOf(to.path) !== -1) {
        if (!to.path.includes('workbench') && to.name !== 'DeveloperDetail') {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            Message.warning("请登录后查看!")
            setTimeout(() => {
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }, 1000);
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
