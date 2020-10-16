<template>
  <div>
    <portal to="drawer-right">
      <span class="the-sub-title">
        Действия
      </span>
      <slot
        name="actions"
        :hasChanges="hasChanges"
        :store="totalStore"
      />
      <!-- <the-button
        filled
        @click="$router.push(`/account/${$accounts.current.id}/offers`)"
      >
        Отменить
      </the-button> -->
    </portal>

    <the-card-form
      title="Основная информация"
      :models="offer"
      :builder="mainBuilder"
      :disabled="$loading.value"
      icon="main_info"
      @changes="changesDetected"
    />

    <the-card-form
      title="Описание"
      :models="offer.descriptions"
      :builder="descriptionBuilder"
      :disabled="$loading.value"
      icon="main_info"
      @changes="changesDetected"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { FormBuilder, FormBuilderField } from '@/components/TheCard/helpers/types'

import { Offer, OfferRawData } from './Offers'

export default Vue.extend({
  props: {
    offer: {
      type: Object as () => Offer,
      required: true
    }
  },

  data () {
    const mainBuilder: FormBuilder<OfferRawData['offer']> = {
      key: 'offer',
      fields: [
        [
          { type: 'textfield', label: 'Должность', model: 'title' },
          { type: 'textfield', label: 'Компания', model: 'company' }
        ],
        [
          { type: 'textfield', label: 'Расположение компании', model: 'adress' },
          { type: 'textfield', label: 'Оплата', model: 'salary' }
        ],
        [
          { type: 'textfield', label: 'Опыт работы', model: 'experience' },
          { type: 'textfield', label: 'График работы', model: 'schedule' },
          { type: 'textfield', label: 'Место работы', model: 'location' }
        ]
      ],
      store: {}
    }

    const descriptionBuilder: FormBuilder<OfferRawData['offer']['descriptions']> = {
      key: 'descriptions',
      fields: [
        [
          { type: 'textarea', label: 'Условия', model: 'terms' }
        ],
        [
          { type: 'textarea', label: 'Требование', model: 'demands' }
        ],
        [
          { type: 'textarea', label: 'Обязанности', model: 'duties' }
        ]
      ],
      store: {}
    }

    return {
      mainBuilder,
      descriptionBuilder,
      changes: {
        main: false,
        descriptions: false
      } as {
        [key: string]: boolean
      }
    }
  },

  computed: {
    totalStore (): any {
      const totalStore = {
        descriptions: {}
      }
      this.$O2O(this.mainBuilder.store, totalStore)
      this.$O2O(this.descriptionBuilder.store, totalStore.descriptions)
      return totalStore
    },

    hasChanges (): boolean {
      return Object.values(this.changes)
        .some(value => value === true)
    }
  },

  methods: {
    changesDetected ({ key, hasChanges }: any) {
      Vue.set(this.changes, key, hasChanges)
    }
  }
})
</script>
