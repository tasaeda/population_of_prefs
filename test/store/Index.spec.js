import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import index from '@/pages/index.vue'
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

describe('index.js', () => {
  let store
  let wrapper

  beforeEach(() => {
    silenceWarnHack.enable()
    localVue.use(Vuex)
    localVue.use(Vuetify)
    silenceWarnHack.disable()
    store = new Vuex.Store(cloneDeep(indexStore))

    wrapper = mount(index, {
      store: store,
      localVue
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('numbers/name of props in state', () => {
    test('length of state', () => {
      expect(Object.keys(store.state).length).toEqual(5)
    })

    test('keys of state', () => {
      expect(Object.keys(store.state)).toEqual([
        'datacollection',
        'prefs',
        'selectedPrefs',
        'years',
        'population'
      ])
    })
  })

  describe('default values in state', () => {
    test('datacollection value', () => {
      const expected = {
        datasets: [],
        labels: []
      }
      expect(store.state.datacollection).toEqual(expected)
    })

    test('prefs value', () => {
      expect(store.state.prefs).toEqual([])
    })

    test('selectedPrefs value', () => {
      expect(store.state.selectedPrefs).toEqual([])
    })

    test('years value', () => {
      expect(store.state.years).toEqual([])
    })

    test('population value', () => {
      expect(store.state.population).toEqual([])
    })
  })
})
