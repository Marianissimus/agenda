<template>
  <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <b-form-group
      id="filterName"
      label="Name filter:"
      label-for="filterName-input"
    >
      <b-form-input
        id="filterName-input"
        v-model="filterName"
        type="text"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="filterGroup" label="Group:" label-for="filterGroup-input">
      <b-form-select
        id="filterGroup-input"
        v-model="filterGroup"
        :options="groups"
      ></b-form-select>
    </b-form-group>

    <b-form-row>
      <b-button type="reset" variant="outline-dark" class="col-sm-4 mr-2" squared>
        Cancel
      </b-button>
      <b-button type="submit" variant="outline-dark" class="col-sm-4" squared>
        Filter
      </b-button>
    </b-form-row>

  </b-form>
</template>

<script>
import { groups } from '@/data/groups.js'

export default {
  data () {
    return {
      filterName: '',
      filterGroup: 'work',
      groups: []
    }
  },
  created () {
    this.groups = groups // neither reactive, nor editable
  },
  methods: {
    onSubmit () {
      this.$emit('onSelectedAdvanced', {
        filterName: this.filterName,
        filterGroup: this.filterGroup
      })
    },
    onReset () {
      this.$emit('closeAdvancedModal')
    }
  }
}
</script>
