<template>
  <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
    <b-form-group
      id="firstName"
      label="First name:"
      label-for="firstName-input"
    >
      <b-form-input
        id="firstName-input"
        v-model="contact.firstName"
        type="text"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="lastName"
      label="Last name:"
      label-for="lastName-input"
      type="text"
      required
      >
      <b-form-input
        id="lastName-input"
        v-model="contact.lastName"
        type="text"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="group" label="Group:" label-for="group-input">
      <b-form-select
        id="group-input"
        v-model="contact.group"
        :options="groups"
        required
      ></b-form-select>
    </b-form-group>

    <b-form-row>
      <b-button type="reset" variant="outline-dark" class="col-sm-4 mr-2" squared>
        Cancel
      </b-button>
      <b-button type="submit" variant="outline-dark" class="col-sm-4" squared>
        OK
      </b-button>
    </b-form-row>
  </b-form>
</template>

<script>
import { mutations } from "@/store"
import { groups } from '@/data/groups.js'

export default {
  props: {
    incoming: Object,
    isEditingContact: Boolean
  },
  data () {
    return {
      contact: this.getNewContact(),
      groups: []
    }
  },
  created () {
    this.contact = JSON.parse(JSON.stringify(this.incoming)) // :)
    this.groups = groups
  },
  methods: {
    onSubmit () {
      // avoid any operation if nothing changed
      if (this.shallowCompare(this.contact, this.incoming)) {
        this.$emit('closeModal')
        return false
      }
      // avoid writing duplicated contacts
      if (this.StoreContacts.find(el => el.firstName === this.contact.firstName && el.lastName === this.contact.lastName)) {
        this.$bvModal.msgBoxConfirm('Contact already exists! Edit it?')
          .then(accepted => {
            if (accepted) {
              this.$emit('editExistingContact', this.contact)
            }
          })
          .catch(err => {
            console.log(err)
          })
          return false
      }
      // regular save logic here
      if (this.isEditingContact) {
        mutations.editContact(this.contact, this.incoming)
      } else {
        mutations.addContact(this.contact)
      }
      this.$emit('closeModal')
    },
    onReset () {
      this.contact  = this.getNewContact()
      this.$emit('closeModal')
    },
    getNewContact () {
      return {
        firstName: '',
        lastName: '',
        group: 'work'
      }
    },
    shallowCompare(obj1, obj2) {
      // could have used watch or computed, but this is cheaper
      for (let prop in obj1) {
        if (obj2[prop] !== obj1[prop]) {
          return false
        }
      }
      return true
    }
  }
}
</script>
