import * as types from '../mutation-types'

export function getRebaseUserInfo({ dispatch, state }) {
    return http.get(`${gConfig.PROJECT_REBATE}/api/rebateuser/userInfo`, null, { noTips: true })
        .success(({ data, code }) => {
            if (code === 1000) {
                dispatch(types.SET_REBASE_USER_INFO, data)
            }
        })
}
//购物车数量
export function getCartCount({ dispatch, state }) {
    return http.get(gConfig.PROJECT_PRODUCT + '/api/cart/getCartCount', null, { noTips: true }).success(({ data, code }) => {
        if (code === 1000) {
            dispatch(types.SET_CART_COUNT, data.cartCount)
        }
    });
}

export function getUserInfo({ dispatch, state }) {
    return http.get(`${gConfig.PROJECT_USER}/api/users/getUsersInfo`, null, { noTips: true }).success((resData) => {
        const code = resData.code
        const data = resData.data || {}
        data.isLogin = code !== 1003
        dispatch(types.SET_USER, data)
    })
}
