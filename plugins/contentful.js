const contentful = require('contentful')
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const draftConfig = {
  space: process.env.CTF_SPACE_ID,
  host: process.env.CTF_HOST_DRAFT,
  accessToken: process.env.CTF_CDA_DRAFT_ACCESS_TOKEN
}
const liveConfig = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
}

// export `createClient` to use it in page components
module.exports = {
  createClient (useDraft = process.env.NODE_ENV === 'development') {
    const config = useDraft ? draftConfig : liveConfig
    return contentful.createClient(config)
  }
}
