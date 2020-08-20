<template>
  <div class="page contact">
    <RichTextRenderer :document="page.fields.pageBlock" :node-renderers="renderNodes" />
    <div class="split-view content">
      <div class="split-view__left">
        <p>
          Want to chat, grab a coffee, or inquire about a speaking event?
          Fill out the contact form, give us a call, or send an email and we'll be in touch
          as soon as possible.
        </p>
        <p class="link-container">
          <i class="material-icons">phone</i>
          <a href="tel:+1860-860-8608">860-860-8608</a>
        </p>
        <p class="link-container">
          <i class="material-icons">email</i>
          <a href="mailto:info@7revolutions.com">info@7revolutions.com</a>
        </p>
      </div>
      <div class="split-view__right">
        <form novalidate class="md-layout" @submit.prevent="submitForm">
          <md-field :class="{ 'md-invalid': formErrors.indexOf('name') > -1 }">
            <label for="name">Name</label>
            <md-input id="name" v-model="form.name" name="name" :disabled="sending" />
          </md-field>
          <md-field :class="{ 'md-invalid': formErrors.indexOf('email') > -1 }">
            <label for="email">Email</label>
            <md-input id="email" v-model="form.email" name="email" :disabled="sending" />
          </md-field>
          <md-field :class="{ 'md-invalid': formErrors.indexOf('company') > -1 }">
            <label for="company">Company</label>
            <md-input id="company" v-model="form.company" name="company" :disabled="sending" />
          </md-field>
          <md-field :class="{ 'md-invalid': formErrors.indexOf('subject') > -1 }">
            <label for="subject">Subject</label>
            <md-select id="subject" v-model="form.subject" name="subject">
              <md-option value="Speaking at an Event">
                Speaking at an Event
              </md-option>
              <md-option value="Facilitating a Workshop">
                Facilitating a Workshop
              </md-option>
              <md-option value="Customized Business Training">
                Customized Business Training
              </md-option>
              <md-option value="Professional Mentoring/Coaching">
                Professional Mentoring/Coaching
              </md-option>
              <md-option value="Other">
                Other
              </md-option>
            </md-select>
          </md-field>
          <md-field :class="{ 'md-invalid': formErrors.indexOf('message') > -1 }">
            <label for="message">Message</label>
            <md-textarea id="message" v-model="form.message" name="message" />
          </md-field>
          <div class="bottom">
            <p class="error" :class="{ visible: formErrors.length }">
              Please fill out the highlighted fields.
            </p>
            <md-button type="submit" class="md-raised submit" :disabled="sending">
              Submit
            </md-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import richTextComponentMixin from '@/mixins/richTextComponents'
import { checkStoreContent } from '@/core/utils'

export default {
  mixins: [richTextComponentMixin],
  fetchOnServer: false,
  async validate({ route, store, query }) {
    await checkStoreContent(store, query.draft)
    return !!store.getters.getContentForPage(route.name)
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    },
    sending: false,
    formErrors: []
  }),
  computed: {
    page() {
      return this.getContentForPage(this.$route.name)
    },
    ...mapGetters([
      'getContentForPage'
    ])
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.formErrors = this.formErrors.filter(key => !this.form[key])
      }
    }
  },
  methods: {
    submitForm() {
      Object.keys(this.form).forEach((key) => {
        if (!this.form[key]) {
          this.formErrors.push(key)
        }
      })
    }
  },
  template: 'default'
}
</script>

<style lang="scss">
.contact {
  .parralax-image__copy {
    h1 {
      font-size: 60px;
    }
  }
  .split-view {
    margin: {
      top: 50px;
      bottom: 50px;
    }
    display: flex;
    &__left, &__right {
      width: 50%;
    }
    &__left {
      .link-container {
        display: flex;
        align-items: center;
        a {
          &:not(.md-button) {
            margin-left: 10px;
            &:after {
              bottom: 2px;
            }
            &:hover {
              text-decoration: none;
              color: $darkGrey;
            }
          }
        }
      }
    }
    &__right {
      margin-left: 50px;
      form {
        .bottom {
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .error {
            opacity: 0;
            padding: 0;
            margin: 0;
            position: absolute;
            left: 0;
            color: #ff1744;
            transition: opacity 250ms $easeOutMaterial;
            &.visible {
              opacity: 1;
            }
          }
          .submit {
            &.md-button.md-theme-default.md-raised {
              background-color: $offWhite;
            }
            margin: {
              right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
