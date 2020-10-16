<template>
  <div>
    <the-card
      v-for="{ name, photo_url, phone, email } in respones.data"
      :key="email"
    >
      <the-card-content class="flex">
        <tr-avatar
          :image="photo_url"
          rounded
        />
        <div style="margin-left: 20px;">
          <p>
            Имя: {{ name }}
          </p>
          <p v-if="email">
            Почта: {{ email }}
          </p>
          <p v-if="phone">
            Телефон: {{ phone }}
          </p>
        </div>
      </the-card-content>
    </the-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { OfferResponses } from '../Responses'

export default Vue.extend({
  name: 'Responses',

  data () {
    return {
      respones: new OfferResponses(this.$route.params.offerID)
    }
  },

  beforeMount () {
    this.respones.prefetchOfferResponses()
  },

  beforeDestroy () { this.$prefetch.clearState(this.respones.prefetchKey) },

  serverPrefetch () { return this.$data.respones.prefetchOfferResponses() as Promise<void> }

})
</script>
