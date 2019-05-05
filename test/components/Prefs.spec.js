import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import Prefs from '@/components/Prefs.vue'
import { SilenceWarnHack } from '@/helpers/SilenceWarnHack'

const indexStore = require('../../store')
const silenceWarnHack = new SilenceWarnHack()
const localVue = createLocalVue()

describe('Prefs.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    silenceWarnHack.enable()
    localVue.use(Vuex)
    localVue.use(Vuetify)
    silenceWarnHack.disable()
    store = new Vuex.Store(cloneDeep(indexStore))

    wrapper = mount(Prefs, {
      store: store,
      localVue
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
