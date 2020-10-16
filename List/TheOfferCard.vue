<template>
  <the-card-content>
    <the-row>
      <the-row-item>
        <the-label
          block
          label="Компания"
          style="padding-right: var(--padding-auto);"
        />
        <span> {{ offer.data.company }} </span>
      </the-row-item>

      <the-row-item>
        <the-label
          block
          :label="offer.displayedData.title"
          style="padding-right: var(--padding-auto)"
        />
        <span> {{ offer.displayedData.date }} </span>
      </the-row-item>
    </the-row>

    <the-row>
      <the-row-item>
        <the-label
          block
          label="Адрес"
          style="padding-right: var(--padding-auto);"
        />
        <span> {{ offer.data.adress }} </span>
      </the-row-item>

      <the-row-item>
        <the-label
          block
          label="Должность"
          style="padding-right: var(--padding-auto)"
        />
        <span> {{ offer.data.title }} </span>
      </the-row-item>
    </the-row>

    <div class="flex justify-center margin-xs-top">
      <!-- <the-button
        filled
        @click="$router.push(`${$route.path}/${offer.id}/responses`)"
      >
        Посмотреть отклики
      </the-button>

      <the-button
        v-if="state !== 'published'"
        class="margin-left-auto font-size-xs"
        filled
        @click="publish()"
      >
        Опубликовать
      </the-button>

      <the-button
        v-if="state === 'published'"
        class="margin-left-auto font-size-xs"
        filled
        @click="hide()"
      >
        Скрыть
      </the-button>

      <tr-button
        v-if="state !== 'archive'"
        class="margin-left-auto font-size-xs"
        rounded
        @click="archive()"
      >
        Архивировать
      </tr-button> -->
    </div>
  </the-card-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { Offer, OfferRawData, OffersQuery } from '../Offers'

import RouterEndpoints from '@/router/endpoints/index'

export default Vue.extend({
  name: 'TheOfferCard',

  props: {
    offer: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loader: false,
      state: 'published' as string
    }
  },

  watch: {
    '$route.query': {
      handler (query: OffersQuery) {
        const {
          page = 1,
          state = 'published'
        } = query

        this.state = state
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    // publish () {
    //   this.offer.publish()
    //     .then(() => {
    //       this.$router.push(`/account/${this.$accounts.current?.id}/offers?state=${this.offer.state}`)
    //     })
    // },

    // async hide () {
    //   await this.offer.hide()
    //   this.$router.push(`/account/${this.$accounts.current?.id}/offers?state=${this.offer.state}`)
    // },

    // async archive (id: string) {
    //   await this.offer.archive()
    //   this.$router.push(`/account/${this.$accounts.current?.id}/offers?state=${this.offer.state}`)
    // }
  }
})
</script>

<style lang="scss" scoped>
.skills__list {
  display: flex;
  flex-wrap: wrap;
}

.offer {
  &__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #363636;
  }

  &__edit {
    max-width: 939px;
    margin: 0 auto;
    margin-top: var(--padding-s);
  }
}

.box {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  padding: 0 12px;

  display: flex;

  border-radius: 4px;

  pointer-events: inherit;

  &__button {
    align-self: center;
    margin-left: auto;
  }

  &__wrap {
    display: flex;
    flex-wrap: wrap;

    position: relative;

    & > input {
      border: 0;
      height: 36px;
    }

    & > span {
      border-radius: 16px;
      font-size: 14px;
      height: 32px;
      background: #e0e0e0;

      margin: 4px;

      align-items: center;
      cursor: default;
      display: inline-flex;
      line-height: 20px;
      max-width: 100%;
      outline: none;
      overflow: hidden;
      padding: 0 12px;
      position: relative;
      text-decoration: none;
      transition-duration: .28s;
      transition-property: box-shadow,opacity;
      transition-timing-function: cubic-bezier(.4,0,.2,1);
      vertical-align: middle;
      white-space: nowrap;
    }
  }

  &__chips-button {
    width: 18px;
    height: 18px;

    border: none;
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'/%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
  }
}
</style>
