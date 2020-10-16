<template>
  <div>
    <div class="margin-s-botton">
      <user-main-card-info-block :title="!edit ?'Обзанности: ' : ''">
        <ul
          v-if="!edit"
          class="description__list"
        >
          <li
            v-for="(item, index) in duties"
            :key="`item-${index}`"
            class="description__item font-size-s c-text-main line-height-m"
          >
            {{ item }}
          </li>
        </ul>

        <div v-else>
          <tr-textfield
            v-model="value.descriptions.duties"
            type-textfield="textarea"
            label="Обзанности"
          />
        </div>
      </user-main-card-info-block>
    </div>

    <div class="margin-s-botton">
      <user-main-card-info-block :title="edit ? 'Требования:' : ''">
        <ul
          v-if="!edit"
          class="description__list"
        >
          <li
            v-for="(item, index) in demands"
            :key="`item-${index}`"
            class="description__item font-size-s c-text-main line-height-m"
          >
            {{ item }}
          </li>
        </ul>

        <div v-else>
          <tr-textfield
            v-model="value.descriptions.demands"
            type-textfield="textarea"
            label="Требования"
          />
        </div>
      </user-main-card-info-block>
    </div>

    <div class="margin-s-botton">
      <user-main-card-info-block :title="!edit ? 'Условия: ': '' ">
        <ul
          v-if="!edit"
          class="description__list margin-s-botton"
        >
          <li
            v-for="(item, index) in terms"
            :key="`item-${index}`"
            class="description__item font-size-s c-text-main line-height-m"
          >
            {{ item }}
          </li>
        </ul>

        <div v-else>
          <tr-textfield
            v-model="value.descriptions.terms"
            type-textfield="textarea"
            label="Условия"
          />
        </div>
      </user-main-card-info-block>
      <user-main-card-info-block title="Ключевые навыки: ">
        <div
          v-if="!edit"
          class="flex flex-wrap"
        >
          <span
            v-for="(it, i) in value.skills"
            :key="`it-${it}-${i}`"
            class="description__item description__item--skills"
          >{{ it }}</span>
        </div>

        <chips
          v-else
          v-model="value.skills"
        >
          <template #chips="item">
            <span>
              {{ item.chips }} <button
                type="button"
                style="font-size: 18px;"
                @click="item.removeAction"
              />
            </span>
          </template>

          <template #clear="item">
            <tr-button
              circle
              icon
              @click="item.clearAction"
            >
              <template #icon>
                <tr-icon name="close" />
              </template>
            </tr-button>
          </template>
        </chips>
      </user-main-card-info-block>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserMainCardInfoBlock from '@/pages/Account/Students/List/components/UserMainCardInfoBlock.vue'

export default Vue.extend({
  name: 'OfferExpandInfo',

  components: { UserMainCardInfoBlock },

  props: {
    value: { type: Object, default: () => {} },
    edit: { type: Boolean, default: false }
  },

  data () {
    return {
      userSkill: ''
    }
  },

  computed: {
    duties (): Array<string> {
      return this.stringToArray(this.value.descriptions.duties)
    },

    demands: {
      get: function () : Array<String> {
        return this.stringToArray(this.value.descriptions.demands)
      },

      set: function (value: string) {
        this.stringToArray(this.value.descriptions.demands)
      }
    },

    terms (): Array<string> {
      return this.stringToArray(this.value.descriptions.terms)
    },

    skills () {
      return this.value.skills
    }
  },

  methods: {
    stringToArray (string: string): Array<string> {
      return string.split(';')
    },

    addSkills (e: any) {
      e.preventDefault()
      const { target } = e
      const { userSkill } = this

      target.style.width = `${userSkill.length}px`

      if (userSkill === '') return

      this.value.skills.push(this.userSkill)
      this.userSkill = ''
    },

    remove (index: number) {
      this.value.skills.splice(index, 1)
    },

    inputHadler (e: any) {
      const { target } = e

      const list = this.$refs.list as HTMLElement

      const styleWidth = target.style.width
      const inputWidth = Number(styleWidth.slice(0, styleWidth.length - 2))

      const { width } = list.getBoundingClientRect()
      if (inputWidth > width) return

      target.style.width = `${this.userSkill.length * 100 / 4}px`
    }
  }
})
</script>

<style lang="scss">
.description {
  &__list {
    margin-top: 5px;

    &--skills {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__item {
    margin-bottom: 5px;

    &--skills {
      color: #838383;
      font-size: 14px;
      line-height: 16px;

      padding: 10px 15px;

      border: 1px solid #838383;

      display: flex;

      border-radius: 6px;

      margin: 5px;

      &:first-child {
        margin-left: 0;
      }
    }

    &--input {
      display: flex;
      align-items: center;
      border: none;
      align-self: center;

      & > input {
        border: none;
      }
    }

    &__input {
      // border: none;

      border-color: red;

      min-width: 100px;
    }
  }
}
</style>
