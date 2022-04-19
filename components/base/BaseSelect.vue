<template>
  <div class="base-select">
    <div class="base-select__title" v-if="title">{{ title }}</div>
    <div class="base-select__options">
      <v-select
        class="base-select__select"
        :options="ownOptions"
        :label="ownLabel"
        :value="ownValue"
        :reduce="(option) => ownValueField ? option[ownValueField] : option"
        :placeholder="placeholder"
        :filterable="false"
        :searchable="false"
        @input="inputHandle($event)"
      />
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {mapActions, mapGetters} from "vuex";
import {Dictionary} from "@/store/dictionary";

export default {
  name:'BaseSelect',

  components: {vSelect},

  props:{
    options: {
      type: Array,
      default: null
    },
    title: {
      type: String
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: [Array,String,Number,Object,Boolean],
      default: null
    },
    placeholder: {
      type: String,
      default:'Не применяется'
    },
    dictionary: {
      type: Object,
      default: null
    },
    dictionaryPayload: {
      type: Object,
      default: null
    },
    valueField: {
      type: String,
      default: null
    },
    fullInput: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      dictionaries: "dictionary/getDictionaries",
    }),
    ownOptions() {
      if (this.dictionary){
        if (!this.dictionary.payloadKeys.length) {
          return this.dictionaries[this.dictionary.name] || [];
        }
        else {
          return this.dictionaries[this.dictionary.name]?.[Dictionary.getDictKey(this.dictionary, this.dictionaryPayload)] || [];
        }
      }
      return this.options || [];
    },
    ownLabel() {
      if (this.label !== null) return this.label;
      return "name";
    },
    ownValueField() {
      if (this.fullInput) return null;
      if (this.valueField !== null) return this.valueField;
      return "id";
    },
    ownValue() {
      if (this.fullInput) return this.value?.name || "";
      return this.value;
    }
  },
  watch: {
    dictionaryPayload: {
      immediate: true,
      deep: true,
      handler() {
        if (this.dictionary) {
          this.getDictionary();
        }
      }
    }
  },
  methods: {
    ...mapActions({
      fetchDict: "dictionary/fetchDict",
    }),
    inputHandle(event) {
      this.$emit('input', event);
    },
    async getDictionary() {
      await this.fetchDict({dictionary: this.dictionary, payload: this.dictionaryPayload});
    }
  },
}
</script>

<style lang="scss">
.base-select{
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  border-radius: $border-radius__little;
  //overflow: hidden;

  &__title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #111111;
    margin-bottom: 8px;
  }
  &__options{
    cursor: pointer;
    background: $color__background-primary;
    max-width: 448px;
    border-radius: 12px;
  }
  &__select{
    border: none;
    outline: none;

    ::v-deep {
      input {
        display: none;
      }
      .vs__dropdown-toggle {
        border: none;
        background: #F8F8F8;
    }}
  }
}
.base-select__select .vs__search::placeholder,
.base-select__select .vs__dropdown-toggle,
.base-select__select .vs__dropdown-menu {
  border: none;
  color:#888888;
  //max-width: 240px;
  background: #F8F8F8;
}
</style>
