/*
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-09-03 18:25:24
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-09-03 19:34:51
 */
import {Session} from "@/utils";

const TOKEN_KEY = 'QM-TOKEN';
const USERINFO_KEY = 'QM-USERINFO';

export function getToken(type) {
    if (type === 'all') {
        const token = JSON.parse(Session.get(TOKEN_KEY))
        return token.tokenHead + ' ' + token.token
    }
    return Session.get(TOKEN_KEY)

}

export function setToken(token) {
    Session.set(TOKEN_KEY, token)
}

export function removeToken() {
    Session.remove(TOKEN_KEY)
}

export function getUserInfo() {
    return Session.get(USERINFO_KEY);
}

export function setUserInfo(userInfo) {
    Session.set(USERINFO_KEY, userInfo)
}

export function removeUserInfo() {
    Session.remove(USERINFO_KEY)
}