const state = {
    lists: [],
    item: {}
}

const actions = {
    async ['getCategoryList']({ commit, state, rootState: { $api } }, config) {
        if (state.lists.length) return
        const { code, data } = await $api.get('backend/category/list', { ...config, cache: true })
        if (data && code === 200) {
            commit('receiveCategoryList', data.list)
        }
    },
    async ['getCategoryItem']({ commit, rootState: { $api } }, config) {
        const { code, data } = await $api.get('backend/category/item', config)
        if (data && code === 200) {
            commit('receiveCategoryItem', {
                data,
                ...config
            })
        }
    }
}

const mutations = {
    ['receiveCategoryList'](state, payload) {
        state.lists = payload
    },
    ['receiveCategoryItem'](state, payload) {
        state.item = payload
    },
    ['insertCategoryItem'](state, payload) {
        state.lists = [payload].concat(state.lists)
    },
    ['updateCategoryItem'](state, payload) {
        state.item.data = payload
        const index = state.lists.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.splice(index, 1, payload)
        }
    },
    ['deleteCategory'](state, id) {
        const obj = state.lists.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
    },
    ['recoverCategory'](state, id) {
        const obj = state.lists.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
    }
}

const getters = {
    ['getCategoryList'](state) {
        return state.lists
    },
    ['getCategoryItem'](state) {
        return state.item
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
