<template>
  <div>
    <the-controller :offer="offer">
      <template #actions="{ hasChanges, store }">
        <the-button
          :disabled="!hasChanges"
          @click="$emit('create', store)"
        >
          Сохранить
        </the-button>
      </template>
    </the-controller>

    <!-- <portal to="drawer-right">
      <span class="the-sub-title">Действия</span>

      <the-button
        @click="$router.back()"
      >
        Отменить
      </the-button>
    </portal> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { UserProfile } from '@/pages/User/UserProfile'

import TheController from '../TheController.vue'
import { Offer } from '../Offers'

export const currentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентрябрь', 'октябрь', 'ноябрь', 'декабрь']

  return `${day} ${months[month]} ${year}`
}

export default Vue.extend({
  components: {
    TheController
  },

  data () {
    const offer = {
      company: '',
      date: currentDate(),
      adress: '',
      title: '',
      salary: '',
      experience: '',
      schedule: '',
      location: '',
      hr: '',
      descriptions: {
        terms: '',
        demands: '',
        duties: ''
      },
      response: 0,
      active: false,
      skills: ['good lier'] as String[]
    }

    return { offer }
  },

  methods: {
    async add (store: any) {
      // @click="$emit('create', offer)"

      // this.$loading.value = true

      // this.$O2O(store, this.offer)
      // const res = await this.offers.add(this.offer)
      // this.offers.currentId = res
      // this.$router.push(`/account/${this.$accounts.currentID}/offers/${res}`)

      // this.$loading.value = false
    }
  }
})
</script>
