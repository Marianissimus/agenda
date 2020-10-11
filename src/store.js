import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    contacts: [],
    user: ''
  }
})

function findContact(contact) {
  const index = store.state.contacts.findIndex(el => el.firstName === contact.firstName && el.lastName === contact.lastName)
  return index
}

export const mutations = {
  setContacts(contacts) {
    store.state.contacts = contacts
  },
  setUser (name) {
    store.user = name;
  },
  addContact (contact) {
    store.state.contacts.push(contact)
  },
  editContact (newContact, oldContact) {
    let editIndex = findContact(oldContact)
    store.state.contacts.splice(editIndex, 1, newContact)
  },
  deleteContact (contact) {
    let deleteIndex = findContact(contact)
    store.state.contacts.splice(deleteIndex, 1)
  }
}
