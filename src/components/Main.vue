<template>
  <b-container fluid class="mb-3">
    <b-row no-gutters>
      <b-col col="6" md="5">

        <div
            align="left"
            border-variant="dark"
            class="border border-dark pl-3
            h-100 d-flex flex-column justify-content-between"
            >

          <div class="mt-2 mr-2" align="center">
            <b-form-input
              ref="filter"
              id="filter-contacts"
              v-model="filterName"
              type="text"
              placeholder="filter..."
              class="font-italic"
              @input="resetFilter"
            ></b-form-input>
            <div align="right" class="mr-2 font-italic">
              <b-link v-b-modal.advanced-selector>advanced filter</b-link>
            </div>
          </div>

          <div v-if="!contacts.length">
            No contacts found
          </div>
          <div v-else>
            <ul>
              <li v-for="(contact, index) in contacts" :key="contact.firstName+contact.lastName">
                <h3
                  v-if="previousDifferent(index)"
                  class="text-danger"
                  >
                  {{ contact.firstName[0] }}
                </h3>
                <p @click="selectedContact = contact">
                  <span class="text-capitalize">{{`${contact.firstName} `}}</span>
                  <span class="text-uppercase">{{ contact.lastName }}</span>
                </p>
              </li>
            </ul>
          </div>
          <div align="center" class="mt-3 mb-3 border-top pt-3">
            <b-button
              @click="showAddContactModal"
              variant="outline-dark"
              col="6"
              class="mb-1"
              squared
              >
              Add Contact
            </b-button>
          </div>
        </div>

      </b-col>

      <b-col col="6" md="7">

          <div v-if="selectedContact"
            align="left"
            border-variant="dark"
            class="border border-dark pl-3
            h-100 d-flex flex-column justify-content-between"
            >
            <div class="mt-5 mb-5">
              <h1 class="text-capitalize mt-5">
                {{`${selectedContact.firstName} ${selectedContact.lastName}`}}
              </h1>
              <br />
              <h4>
                {{ selectedContact.group }}
              </h4>
            </div>
            <div align="center" class="mt-3 mb-3 border-top pt-3">
              <b-button
                @click="editContact"
                variant="outline-dark"
                col="6"
                class="mr-2 mb-1"
                squared
                >
                Edit Contact
              </b-button>
              <b-button
                @click="deleteContact"
                variant="outline-dark"
                col="6"
                class="mb-1"
                squared
                >
                Delete Contact
              </b-button>
            </div>
          </div>

          <div v-else
            align="left"
            border-variant="dark"
            class="border border-dark pl-3
            h-100 d-flex flex-column justify-content-between"
            >
            <h4 class="mt-5 text-center">Choose contact to view or edit</h4>
          </div>

      </b-col>
    </b-row>

    <!-- placement of modals inside <template> doesn't matter-->
    <b-modal id="contact-modal"
      :title="isEditingContact ? 'Edit Contact' : 'Add contact'"
      hide-footer
      >
      <contact-form
        :incoming="selectedContact"
        :isEditingContact="isEditingContact"
        @closeModal="resetContactModal"
        @editExistingContact="switchToExistingContact($event)"
      />
    </b-modal>

    <b-modal id="advanced-selector" hide-footer>
      <advanced-selector-form
        @onSelectedAdvanced="selectAdvanced($event)"
        @closeAdvancedModal="resetAdvanced"
      />
    </b-modal>

  </b-container>
</template>

<script>
import ContactForm from './ContactForm'
import AdvancedSelectorForm from './AdvancedSelectorForm'
import { mutations } from '@/store'

export default {
  components: {
    'contact-form': ContactForm,
    'advanced-selector-form': AdvancedSelectorForm
  },
  data () {
    return {
      filterName: '',
      filterGroup: '',
      selectedContact: null,
      isEditingContact: false
    }
  },
  methods: {
    previousDifferent (index) {
      if (index === 0) return true
      if (this.contacts[index-1].firstName[0] !== this.contacts[index].firstName[0]) return true
      return false
    },
    getNewContact () {
      return {
        firstName: '',
        lastName: '',
        group: 'work'
      }
    },
    editContact () {
      this.isEditingContact = true
      this.$bvModal.show('contact-modal')
    },
    deleteContact () {
      this.$bvModal.msgBoxConfirm('Are you sure?')
      .then(accepted => {
        if (accepted) {
          mutations.deleteContact(this.selectedContact)
          this.selectedContact = null
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    switchToExistingContact (existingContact) {
      this.$bvModal.hide('contact-modal')
      this.isEditingContact = true
      this.selectedContact = existingContact
      this.$bvModal.show('contact-modal')
    },
    showAddContactModal () {
      this.isEditingContact = false
      this.selectedContact = this.getNewContact()
      this.$bvModal.show('contact-modal')
    },
    resetContactModal () {
      this.selectedContact = null
      this.$bvModal.hide('contact-modal')
    },
    selectAdvanced (advancedFilter) {
      // I allowed '' as filterName value as to allow displaying an entire group
      this.filterName = advancedFilter.filterName
      this.filterGroup = advancedFilter.filterGroup
      this.$bvModal.hide('advanced-selector')
    },
    resetFilter () {
      if (this.filterName === '') {
        this.filterGroup = ''
      }
    },
    resetAdvanced () {
      this.filterName = ''
      this.filterGroup = ''
      this.$bvModal.hide('advanced-selector')
    }
  },
  computed: {
    sortedContacts () {
      return this.StoreContacts.slice().sort((a, b) => a.firstName.localeCompare(b.firstName))
    },
    contacts () {
      let result = this.sortedContacts
      if (this.filterName) {
        result = result.filter(el => el.firstName.includes(this.filterName) || el.lastName.includes(this.filterName))
        }
      if (this.filterGroup) {
        result = result.filter(el => el.group === this.filterGroup)
      }
      return result
    }
  }
}
</script>

<style scoped>

li {
  list-style-type: none;
}

</style>
