<template>
  <div v-if="!offer.error">
    <the-controller :offer="offer.data">
      <template #actions="{ hasChanges, store }">
        <the-button
          :disabled="!hasChanges"
          @click="save(store)"
        >
          Сохранить
        </the-button>
        <the-button
          @click="$router.push(`${$route.path}/responses`)"
        >
          Посмотреть отклики
        </the-button>

        <the-button
          v-if="offer.state !== 'published'"
          @click="offer.publish()"
        >
          Опубликовать
        </the-button>

        <the-button
          v-if="offer.state === 'published'"
          @click="offer.hide()"
        >
          Скрыть
        </the-button>

        <the-button
          v-if="offer.state !== 'archive'"
          @click="offer.archive()"
        >
          Архивировать
        </the-button>
      </template>
    </the-controller>
  </div>

  <div v-else>
    Offer with ID {{ $route.params.offerID }} does not exist.
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TheController from '../TheController.vue'
import { PrivateOffer, OfferRawData } from '../Offers'

export default Vue.extend({
  components: {
    TheController
  },

  data () {
    const offerID = this.$route.params.offerID
    const offer = PrivateOffer.create(offerID) as PrivateOffer

    return { offer }
  },

  beforeMount () {
    console.log(this.$auth)
  },

  methods: {
    async save (store: OfferRawData['offer']) {
      this.$loading.value = true
      this.offer.data = store
      await this.offer.update()
      this.$loading.value = false
    }
  }
})
</script>
