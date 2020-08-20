<template>
  <md-dialog :md-active.sync="innerShow" class="form-modal">
    <md-dialog-title>
      Speaker Interest Form
      <span v-if="formErrors.length" class="error-message">
        Please fill out missing items.
      </span>
    </md-dialog-title>
    <md-tabs md-dynamic-height>
      <md-tab v-for="tab in data.tabs" :key="tab.title" :md-label="tab.title" :class="{ error: getHasError(tab) }">
        <div v-for="value in tab.fields" :key="value" class="md-layout md-gutter item-container">
          <div class="md-layout-item">
            <md-field v-if="!data.formData[value].type" :class="{ 'md-invalid': formErrors.indexOf(value) > -1 }">
              <label>{{ data.formData[value].label }}</label>
              <md-input v-model="data.formData[value].value" />
            </md-field>
            <md-field v-if="data.formData[value].type === 'Select'" :class="{ 'md-invalid': formErrors.indexOf(value) > -1 }">
              <label>{{ data.formData[value].label }}</label>
              <md-select :id="data.formData[value].label" v-model="data.formData[value].value" :name="data.formData[value].label">
                <md-option v-for="opt in data.formData[value].options" :key="opt" :value="opt">
                  {{ opt }}
                </md-option>
              </md-select>
            </md-field>
            <div v-if="data.formData[value].type === 'Radio'" class="radio-container" :class="{ 'md-invalid': formErrors.indexOf(value) > -1 }">
              <label class="main-label">{{ data.formData[value].label }}</label>
              <md-radio
                v-for="opt in data.formData[value].options"
                :key="opt"
                v-model="data.formData[value].value"
                :value="opt"
                class="md-primary"
              >
                {{ opt }}
              </md-radio>
            </div>
            <md-field v-if="data.formData[value].type === 'textArea'" :class="{ 'md-invalid': formErrors.indexOf(value) > -1 }">
              <label>{{ data.formData[value].label }}</label>
              <md-textarea v-model="data.formData[value].value" />
              <span class="md-helper-text">{{ data.formData[value].help }}</span>
            </md-field>
            <md-field v-if="data.formData[value].type === 'Number'" :class="{ 'md-invalid': formErrors.indexOf(value) > -1 }">
              <label>{{ data.formData[value].label }}</label>
              <md-input v-model="data.formData[value].value" type="number" />
            </md-field>
          </div>
        </div>
      </md-tab>
    </md-tabs>
    <md-dialog-actions>
      <md-button class="md-primary" @click="handleClose">
        Cancel
      </md-button>
      <md-button class="md-primary" @click="handleFormSubmit">
        Submit
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import { SPEAKER_FORM } from '@/core/constants'

export default {
  name: 'FormModal',
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    innerShow: false,
    data: SPEAKER_FORM,
    formErrors: []
  }),
  watch: {
    formErrors(val) {
      this.$nextTick(() => {
        const errors = Array.from(document.querySelectorAll('.md-tab'))
        const tabNav = Array.from(document.querySelectorAll('.md-tab-nav-button'))
        tabNav.forEach((el, i) => {
          if (errors[i].classList.contains('error')) {
            el.classList.add('error')
          } else {
            el.classList.remove('error')
          }
        })
      })
    },
    data: {
      deep: true,
      handler() {
        this.clearFormErrors()
      }
    },
    showModal(val) {
      this.innerShow = val
    },
    innerShow(val) {
      this.setShowModal(val)
    }
  },
  methods: {
    handleFormSubmit() {
      const { formData } = this.data
      Object.keys(this.data.formData).forEach((key) => {
        if (formData[key].required && !formData[key].value) {
          this.formErrors.push(key)
        }
      })
    },
    clearFormErrors() {
      this.formErrors = []
    },
    getHasError(tab) {
      return this.formErrors.some(r => tab.fields.includes(r))
    },
    handleClose() {
      this.setShowModal(false)
    },
    ...mapMutations(['setShowModal'])
  }
}
</script>

<style lang="scss">
.form-modal {
  .md-dialog-title {
    position: relative;
  }
  .error-message {
    font-size: 14px;
    position: absolute;
    color: #ff1744;
    left: 24px;
    bottom: -24px;
  }
  .radio-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    &.md-invalid {
      .main-label {
        color: #ff1744;
      }
    }
    .md-radio {
      margin: 10px 10px 10px 0
    }
  }
  .md-has-textarea {
    margin-top: 20px;
  }
  .md-tabs.md-theme-default .md-tabs-navigation .md-button {
    &.error {
      color: #ff1744;
    }
  }
}
</style>
