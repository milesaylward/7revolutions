export async function checkStoreContent({ state, dispatch }, isDraft) {
  if (!state.pages.length) { await dispatch('getContent', isDraft) }
  if (!state.navigation) { await dispatch('getAppNav', isDraft) }
}

export async function getPodcastItems({ state, dispatch }, isDraft) {
  if (!state.podcasts.length) { await dispatch('getPodcasts', isDraft) }
}
