import { api } from '@/plugins/api'
import { prefetch } from '@/plugins/prefetch'
import Vue from 'vue'

export interface OfferRawData {
  account_id: string
  id: string
  offer: {
    [key: string]: any
    title: string
  }
  published_date: Date
  created_date: Date
  state: OfferState
}

export interface OffersQuery {
  state: 'published' | 'draft' | 'archive',
  page: number
}

const store = Vue.observable({
  offers: [] as OfferRawData[]
})

enum OfferState {
  draft,
  published,
  archive
}

class Offer {
  id: string
  data: OfferRawData['offer']
  state: string
  published_date: Date
  created_date: Date

  constructor (data: OfferRawData) {
    this.id = data.id
    this.state = OfferState[data.state]
    this.data = data.offer
    this.published_date = data.published_date
    this.created_date = data.created_date
  }

  get localeDate () {
    return this.published_date.toLocaleString()
  }
}

export class PrivateOffer extends Offer {
  static create (offerID: string) {
    const offer = store.offers
      .find(offer => {
        return offer.id === offerID
      })

    if (offer) return new PrivateOffer(offer)
    else return { id: offerID, error: true }
  }

  static storeUpdate (updatedOffer: Offer) {
    const foundedOffer = store.offers
      .find(({ id }) => updatedOffer.id === id)
    if (foundedOffer) foundedOffer.offer = updatedOffer.data
  }

  get displayedData () {
    return {
      title: 'Дата создания',
      date: this.created_date.toLocaleString()
    }
  }

  update = () => {
    const offer = JSON.stringify(this.data)
    return api.accounts.updateOffer(this.id, offer, this.state)
      .then(res => {
        PrivateOffer.storeUpdate(this)
        return res
      })
  }

  publish = () => {
    this.state = 'published'
    return this.update()
  }

  hide = () => {
    this.state = 'draft'
    return this.update()
  }

  archive = () => {
    this.state = 'archive'
    return this.update()
  }
}

class Offers {
  list: OfferRawData[]
  currentId: string

  constructor () {
    this.list = []
    this.currentId = ''
  }

  get current () { return this.list.find(({ id }) => id === this.currentId) || null }

  setData (data: OfferRawData[]) {
    // console.log(data)
    data = data.map(offer => {
      offer.published_date = new Date(offer.published_date)
      offer.created_date = new Date(offer.created_date)
      return offer
    })
    store.offers = data
    this.list = store.offers
  }

  getPublicList = async (filterParams: { accountID: string }) => {
    const { data } = await api.accounts.publicList(filterParams)
    this.setData(data)
  }

  getFilteredList = async (filterParams: OffersQuery) => {
    const { data } = await api.accounts
      .filteredOffers(JSON.stringify(filterParams))

    this.setData(data)
  }
}

export class PrivateOffers extends Offers {
  prefetchKey: string

  constructor () {
    super()
    this.list = store.offers
    this.prefetchKey = 'accountOffers'
  }

  async prefetchAcountsOffers () {
    if (!this.checkClientPrefetchState()) {
      await api.accounts.offers()
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

  checkClientPrefetchState () {
    if (!prefetch.isServer) {
      const data = prefetch.getState(this.prefetchKey)
      if (data !== undefined) {
        this.setData(data)
      }

      return data !== undefined
    } else return false
  }

  add = async (offerData: OfferRawData['offer']) => {
    const [offer] = await api.accounts.createOffer(JSON.stringify(offerData), 'draft')
    // @ts-ignore
    this.list.push(offer)
    return offer.id
  }

  remove = (index: number, offerId: string) => {
    return api.accounts.deleteOffer(offerId)
      .then(() => {
        this.list.splice(index, 1)
      })
  }
}

export { Offers, Offer }
