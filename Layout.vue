<template>
  <the-page>
    <portal to="drawer-left">
      <the-drawer-link
        v-for="link in routes"
        :key="`path-link-${link.key}`"
        :link="link"
      >
        {{ link.label }}
      </the-drawer-link>
    </portal>

    <router-view
      :offers="offers"
      :account="account"
      @create="create"
    />
  </the-page>
</template>

<script lang="ts">
import Vue from 'vue'

import { Account } from '@/plugins/Accounts/index'
import { PrivateOffer, PrivateOffers, OfferRawData } from './Offers'

export default Vue.extend({
  name: 'AccountOffersLayout',

  props: {
    account: {
      type: Object as () => Account,
      required: true
    }
  },

  data () {
    const offers = new PrivateOffers()

    return {
      offers,
      routes: [
        {
          key: 'published',
          path: `/account/${this.$accounts.currentID}/offers?state=published`,
          label: 'Активные',
          active: false,
          exact: true
        },
        {
          key: 'draft',
          path: `/account/${this.$accounts.currentID}/offers?state=draft`,
          label: 'Черновик',
          active: false,
          exact: true
        },
        {
          key: 'archive',
          path: `/account/${this.$accounts.currentID}/offers?state=archive`,
          label: 'Архив',
          active: false,
          exact: true
        }
      ]
    }
  },

  beforeMount () {
    this.offers.prefetchAcountsOffers()
  },

  beforeDestroy () { this.$prefetch.clearState(this.offers.prefetchKey) },

  methods: {
    async create (offer: OfferRawData['offer']) {
      this.$loading.value = true

      const id = await this.offers.add(offer)
      this.$router.push(`/account/${this.$accounts.currentID}/offers/${id}`)

      this.$loading.value = false
    }
  },

  serverPrefetch () { return this.$data.offers.prefetchAcountsOffers() as Promise<void> }
})
</script>
