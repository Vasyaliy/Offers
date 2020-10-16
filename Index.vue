<template>
  <div>
    <the-card
      flat
      first
    >
      <the-card-title>
        Вакансии

        <template #actions>
          <the-button @click="$router.push(`/account/${$accounts.currentID}/new_offer`)">
            Создать вакансию
          </the-button>
        </template>
      </the-card-title>
    </the-card>

    <the-offers-cards
      :offers="offers"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TheOffersCards from './List/Index.vue'

import { PrivateOffers, OffersQuery, PrivateOffer } from './Offers'

import RouterEndpoints from '@/router/endpoints/index'
import { TrCardActions } from '@tralents/components/types/components'

const filters = [
  {
    group: 'Ваши вакансии',
    links: [
      {
        title: 'Активные'
      },
      {
        title: 'Архив'
      }
    ]
  }
]

const parameters = [
  {
    group: 'Специализация',
    child: [
      {
        title: 'Продажи',
        changes: false
      },
      {
        title: 'Бухгалтерия, управленческий учет',
        changes: false
      },
      {
        title: 'Маркетинг, реклама, PR',
        changes: true
      },
      {
        title: 'Производство, сельское хозяйство',
        changes: false
      }, {
        title: 'Транспорт, логистика',
        changes: false
      }
    ]
  }
]

export default Vue.extend({
  ...RouterEndpoints.Account.children.AccountOffersLayout.children.AccountOffers.getExtension(),

  components: { TheOffersCards },

  props: {
    offers: {
      type: Object as () => PrivateOffers,
      required: true
    }
  },

  data () {
    return {
      parameters,
      isLoad: false
    }
  },

  watch: {
    '$route.query': {
      handler (query: OffersQuery) {
        if (query.state === undefined) {
          this.$router.push({ query: { state: 'published' } })
        } else {
          this.getFilteredList(query)
        }
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    getFilteredList (query: any) {
      const {
        page = 1,
        state = 'published'
      } = query

      this.$loading.value = true

      this.offers
        .getFilteredList({ page, state })
        .then(() => {
          this.$loading.value = false
        })
    }
  }
})
</script>
