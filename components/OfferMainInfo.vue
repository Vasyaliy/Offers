<template>
  <div>
    <ul class="flex">
      <li class="margin-xs">
        <user-main-card-info-block :title="!edit ? 'Опыт работы:' : ''">
          <span
            v-if="!edit"
            class="font-size-m line-height-m c-text-main bold-400"
          >
            {{ value.experience }}
          </span>
          <tr-textfield
            v-else
            v-model="value.experience"
            label="Опыт работы"
          />
        </user-main-card-info-block>
      </li>
      <li class="margin-xs">
        <user-main-card-info-block :title="!edit ? 'График работы': ''">
          <span
            v-if="!edit"
            class="font-size-m line-height-m c-text-main bold-400"
          >
            {{ value.schedule }}
          </span>
          <tr-textfield
            v-else
            v-model="value.schedule"
            label="График работы"
          />
        </user-main-card-info-block>
      </li>
      <li class="margin-xs">
        <user-main-card-info-block :title="!edit ?'Метро' : ''">
          <span
            v-if="!edit"
            class="font-size-m line-height-m c-text-main bold-400"
          >
            {{ value.location }}
          </span>
          <tr-textfield
            v-else
            v-model="value.location"
            label="Метро"
          />
        </user-main-card-info-block>
      </li>
      <li class="margin-xs">
        <user-main-card-info-block :title="!edit ? 'HR' : ''">
          <span
            v-if="!edit"
            class="font-size-m line-height-m c-text-main bold-400"
          >
            {{ value.hr }}
          </span>
          <tr-textfield
            v-else
            v-model="value.hr"
            label="HR
"
          />
        </user-main-card-info-block>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserMainCardInfoBlock from '@/pages/Account/Students/List/components/UserMainCardInfoBlock.vue'
export default Vue.extend({
  name: 'OfferMainCardInfoBlock',

  components: { UserMainCardInfoBlock },
  props: {
    value: { type: Object, default: () => {} },
    edit: { type: Boolean, default: false }
  }
})
</script>
