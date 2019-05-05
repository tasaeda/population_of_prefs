import _ from 'lodash'
import axiosBase from 'axios'

export const state = () => ({
  datacollection: {},
  prefs: [],
  selectedPrefs: [],
  years: [],
  population: []
})

export const getters = {
  getPopulation(state) {
    const arr = []

    _.each(state.population, item => {
      arr.push({
        backgroundColor: `rgba(${getRandomInt()}, ${getRandomInt()}, ${getRandomInt()}, 0.2)`,
        label: item.label,
        data: Object.values(item.data)
      })
    })

    return arr
  }
}

export const mutations = {
  setPrefs(state, prefs) {
    state.prefs = prefs
  },
  setSelectedPrefs(state, prefs) {
    state.selectedPrefs = prefs
  },
  resetPopulation(state) {
    state.population = []
  },
  setPopulation(state, population) {
    state.population.push(population)
  },
  setYears(state, years) {
    state.years = years
  },
  setDataCollection(state, datacollection) {
    state.datacollection = datacollection
  }
}

export const actions = {
  getPrefs({ commit }) {
    fetchPrefs().then(data => {
      commit('setPrefs', data.prefs)
    })
  },
  setSelectedPrefs({ state, commit, dispatch }, selected) {
    commit('setSelectedPrefs', selected)
    commit('resetPopulation')

    _.each(selected, async function(pref) {
      await dispatch('getYearsAndPopulation', pref)
    })

    return state.datacollection
  },
  async getYearsAndPopulation({ commit, dispatch }, pref) {
    const items = await fetchYearsAndPopulation(pref)
    commit('setYears', items.years)
    commit('setPopulation', items.population)

    dispatch('setDataCollection')
  },
  setDataCollection({ state, commit }) {
    commit('setDataCollection', {
      labels: state.years,
      datasets: getPopulation(state)
    })
  }
}

const axios = axiosBase.create({
  baseURL: 'https://opendata.resas-portal.go.jp',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NUXT_ENV_RESAS_API_KEY
  },
  responseType: 'json'
})

async function fetchPrefs() {
  const items = {
    prefs: null
  }

  await axios.get('/api/v1/prefectures').then(response => {
    items.prefs = response.data.result
  })

  return items
}

async function fetchYearsAndPopulation(prefName) {
  const items = {
    prefs: null,
    population: null,
    years: null
  }

  await axios.get('/api/v1/prefectures').then(response => {
    items.prefs = response.data.result
  })
  const prefCode =
    1 + _.findIndex(items.prefs, pref => pref.prefName === prefName)

  await axios
    .get(
      `/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`
    )
    .then(response => {
      const populationTmp = _.map(response.data.result.data[0].data, item => {
        return item.value
      })
      items.population = {
        label: prefName,
        data: populationTmp
      }
      items.years = _.map(response.data.result.data[0].data, item => {
        return item.year
      })
    })

  return items
}

function getRandomInt() {
  const min = Math.ceil(0)
  const max = Math.floor(255)
  return Math.floor(Math.random() * (max - min)) + min
}

function getPopulation(state) {
  const arr = []

  _.each(state.population, item => {
    arr.push({
      backgroundColor: `rgba(${getRandomInt()}, ${getRandomInt()}, ${getRandomInt()}, 0.2)`,
      label: item.label,
      data: Object.values(item.data)
    })
  })

  return arr
}
