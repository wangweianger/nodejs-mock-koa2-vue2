import * as types from '../mutation-types'

const state = {
    leftBarToggle: false,
    navCatalogList: [],
    navCatalogThreeList: [],
    navLlistData: [],
}

const mutations = {
    [types.GET_TWO_CATALOG](state, payload) {
        state.navCatalogList = payload
    },
    [types.GET_THREE_CATALOG](state, payload) {
        state.navCatalogThreeList = payload
    },
    [types.NAV_LIST_DATA](state, payload) {
        state.navLlistData = payload
    },
    [types.LEFT_BAR_TOGGLE](state, payload) {
        state.leftBarToggle = payload
    },
}

const actions = {

    // 获得二级列表
    async setLeftBarToggle({
        state,
        rootState,
        commit
    }, {
        value
    }) {
        return commit(types.LEFT_BAR_TOGGLE, value)
    },

    // 获得二级列表
    async getNavCatalogList({
        state,
        rootState,
        commit
    }, {
        projectId,
        datatype,
        type,
        parentId,
        fn
    }) {
        return util.ajax({
            url: config.baseApi + 'api/catalog/getNavCatalogList',
            data: {
                projectId: projectId,
                type: type,
                parentId: parentId
            },
            success: data => {
                util.pushKeVaInArr({
                    arr: data.data,
                    pushps: [{
                        key: 'isOpen',
                        val: false
                    }]
                })
                if (datatype == 2) {
                    commit(types.GET_TWO_CATALOG, data.data)
                } else if (datatype == 3) {
                    commit(types.GET_THREE_CATALOG, data.data)
                }
                fn && fn()
            }
        })
    },

    // 获得nav导航
    async getNavCommonTwoCatalog({
        state,
        rootState,
        commit
    }, {
        projectId,
        type
    }) {
        if (!type) {
            let navLlistData = util.getStorage('session', 'navLlistData') ? JSON.parse(util.getStorage('session', 'navLlistData')) : ''
            if (navLlistData) {
                return commit(types.NAV_LIST_DATA, navLlistData)
            }
        }

        return util.ajax({
            url: config.baseApi + 'api/common/getNavCommonTwoCatalog',
            data: {
                projectId: projectId
            },
            success: data => {
                util.setStorage('session', 'navLlistData', JSON.stringify(data.data))
                commit(types.NAV_LIST_DATA, data.data)
            }
        })

    },
}

export default {
    state,
    mutations,
    actions,
}