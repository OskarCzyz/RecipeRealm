<template>
  <header class="flex flex-row gap-50 mb-10 h-24">
    <router-link class="basis-1/6 flex" to="/"
      ><img
        class="w-24 h-24 justify-self-center self-center"
        src="../assets/apple-touch-icon.png"
        alt="reciperealm"
    /></router-link>
    <div class="basis-4/6 h-10 self-center justify-self-center flex rounded bg-white mr-64">
      <input
        placeholder="search"
        name="search"
        class="w-full border-none bg-transparent text-gray-900 px-4 py-1 outline-none mr-10"
        type="text"
        v-model="searchquery"
        @change="$emit('search', searchquery)"
      />
    </div>
    <NavBar class="basis-1/6 float-right" />
  </header>
</template>
<script>
import NavBar from './navigation/nav-bar.vue'
export default {
  props: {
    login: String
  },
  data() {
    return {
      searchquery: ''
    }
  },
  components: {
    NavBar
  }
}
</script>
