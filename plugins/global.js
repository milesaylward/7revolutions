import Vue from 'vue'
import ParralaxImage from '@/components/ParralaxImage'
import CardBlock from '@/components/CardBlock'
import PodcastBlock from '@/components/PodcastBlock'
import ModalButton from '@/components/ModalButton'
import {
  MdTabs,
  MdDialog,
  MdButton,
  MdField,
  MdMenu,
  MdList,
  MdRadio
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.component('parralax-image', ParralaxImage)
Vue.component('card-block', CardBlock)
Vue.component('podcast-block', PodcastBlock)
Vue.component('modal-button', ModalButton)
Vue.use(MdButton)
Vue.use(MdTabs)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.use(MdMenu)
Vue.use(MdRadio)
Vue.use(MdList)
