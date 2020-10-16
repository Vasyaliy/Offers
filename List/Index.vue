<template>
  <div>
    <the-card
      v-for="(offer, index) in list"
      :key="`offer-${index}-${offer.id}`"
    >
      <the-card-title>
        {{ offer.data.title }}

        <template #actions>
          <the-button
            @click="$router.push(`/account/${$accounts.currentID}/offers/${offer.id}`)"
          >
            Редактировать
          </the-button>

          <the-button
            @click="remove(index, offer.id)"
          >
            Удалить
          </the-button>
        </template>
      </the-card-title>

      <the-offer-card
        :offer="offer"
        @remove="remove"
      />
      <!-- <template #user-button-favorites>
          <tr-button
            rounded
            outlined
            background="#ffffff"
            color="var(--text-color-main)"
            class="font-size-xs margin-left-auto"
            @click="$router.push(`/account/${$auth.currentAccount}/offers/${id}`)"
          >
            <div>
              Посмотреть отклики
            </div>
          </tr-button>
        </template> -->
      <!-- </the-card-content> -->
    </the-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainCard from '@/pages/Account/Students/List/components/UserMainCard/Index.vue'
import OfferMainInfo from './OfferMainInfo.vue'
import OfferExpandInfo from './OfferExpandInfo.vue'
import TheOfferCard from './TheOfferCard.vue'
import { PrivateOffer, PrivateOffers } from '../Offers'

export default Vue.extend({
  name: 'TheOffersCards',

  components: { TheOfferCard },

  props: {
    offers: { type: Object as () => PrivateOffers, required: true }
  },

  computed: {
    list () {
      return this.offers.list.map(data => new PrivateOffer(data))
    }
  },

  methods: {
    getEditPageHandler (id: string) {
      this.offers.currentId = id
      return this.$router.push(`/account/${this.$accounts.currentID}/offers/${id}`)
    },

    remove (index: number, id: string) {
      this.$loading.value = true
      return this.offers
        .remove(index, id)
        .then(() => {
          this.$loading.value = false
          this.$router.push(`/account/${this.$accounts.currentID}/offers`)
        })
    }
  }
})
</script>
