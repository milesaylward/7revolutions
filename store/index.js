import { createClient } from '~/plugins/contentful'

export const state = () => ({
  appLoading: false,
  navigation: null,
  pages: [],
  podcasts: [],
  showModal: false
})

export const mutations = {
  setAppLoading(state, bool) {
    state.appLoading = bool
  },
  setAppNav(state, items) {
    state.navigation = items
  },
  setPages(state, pages) {
    state.pages = pages
  },
  setPodcasts(state, items) {
    state.podcasts = items
  },
  setShowModal(state, bool) {
    state.showModal = bool
  }
}

export const getters = {
  getContentForPage: state => key => state.pages.filter(entry => entry.fields.navTitle.toLowerCase() === key)[0]
}

export const actions = {
  async getAppNav({ commit }, isDraft) {
    const client = createClient(isDraft)
    await client.getEntry('ODctJunCHip6ijMdSV7qZ').then((res) => {
      commit('setAppNav', res.fields)
    })
  },
  async getContent({ commit, dispatch }, isDraft) {
    const client = createClient(isDraft)
    await client.getEntries({
      content_type: 'page',
      include: 5,
      resolveLinks: true
    }).then((res) => {
      commit('setPages', res.items)
    })
    await dispatch('setAppLoading', false, { root: true })
  },
  async getPodcasts({ commit }, isDraft) {
    const client = createClient(isDraft)
    await client.getEntries({
      content_type: 'blogPost',
      include: 5,
      resolveLinks: true
    }).then((res) => {
      const items = res.items.sort((a, b) => new Date(b.fields.publishDate) - new Date(a.fields.publishDate))
      commit('setPodcasts', items)
    })
  },
  setAppLoading({ commit }, bool) {
    commit('setAppLoading', bool)
  }
}
