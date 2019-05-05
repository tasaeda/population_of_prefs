import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import Graph from '@/components/Graph.vue'
import { SilenceWarnHack } from '@/helpers/SilenceWarnHack'

const silenceWarnHack = new SilenceWarnHack()
const localVue = createLocalVue()
const utils = require('jsdom/lib/jsdom/utils')
const canvasMock = require('jest-canvas-mock')
const indexStore = require('../../store')

function Canvas() {
  canvasMock(this)
  this.toDataURL = function() {
    return ''
  }
}
utils.Canvas = Canvas

describe('Graph.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    silenceWarnHack.enable()
    localVue.use(Vuex)
    localVue.use(Vuetify)
    silenceWarnHack.disable()
    store = new Vuex.Store(cloneDeep(indexStore))

    wrapper = mount(Graph, {
      store: store,
      localVue
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
