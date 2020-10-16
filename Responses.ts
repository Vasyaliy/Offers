import Vue from 'vue'
import { prefetch } from '@/plugins/prefetch'
import { api } from '@/plugins/api'

interface OfferResponse {
  user_id: string
}

export class OfferResponses {
  offer_id: string
  prefetchKey: string
  data: Array<OfferResponse>

  constructor (offer_id: string) {
    this.offer_id = offer_id
    this.prefetchKey = 'offerResponses'
    this.data = Vue.observable([])
  }

  checkClientPrefetchState () {
    if (!prefetch.isServer) {
      const data = prefetch.getState(this.prefetchKey)
      if (data !== undefined) {
        this.setData(data)
      }

      return data !== undefined
    } else return false
  }

  async prefetchOfferResponses () {
    if (!this.checkClientPrefetchState()) {
      await api.accounts.getResponses(this.offer_id)
        .then(res => {
          if (prefetch.isServer) {
            prefetch.setState(this.prefetchKey, res.data)
            this.setData(res.data)
          } else {
            this.setData(res.data)
          }
        })
    }
  }

  setData (data: Array<any>) {
    Vue.set(this, 'data', data)
  }
}
