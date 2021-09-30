/*
 * @Description: 常用工具函数
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 07:02:11
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-24 11:27:42
 */

// 1、window.localStorage 浏览器永久缓存
export const Local = {
    // 设置永久缓存
    set(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    // 获取永久缓存
    get(key) {
        let json = window.localStorage.getItem(key);
        try {
            return JSON.parse(json);
        } catch (error) {
            return json
        }
    },
    // 移除永久缓存
    remove(key) {
        window.localStorage.removeItem(key);
    }
};
// 2、window.sessionStorage 浏览器临时缓存
export const Session = {
    // 设置临时缓存
    set(key, val) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    },
    // 获取临时缓存
    get(key) {
        let json = window.sessionStorage.getItem(key);
        return JSON.parse(json);
    },
    // 移除临时缓存
    remove(key) {
        window.sessionStorage.removeItem(key);
    }
};
