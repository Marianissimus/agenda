<template>
  <div id="app" class="container">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mutations } from '@/store'
import { parsedContacts } from '@/data/parsedContacts.js'

export default {
  name: 'App',
  created () {
    // to load & save contacts in localStorage
    let savedContacts = JSON.parse(localStorage.getItem('contacts'))
    if (savedContacts) {
      mutations.setContacts(savedContacts)
    } else {
      localStorage.setItem('contacts', JSON.stringify(parsedContacts))
      mutations.setContacts(parsedContacts)
    }
  },
  watch: {
    // first time to use watch in over a year :)
    StoreContacts(newValue) {
      localStorage.setItem('contacts', JSON.stringify(newValue))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
