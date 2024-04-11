<template>
  <header
    class="min-h-full min-w-full flex flex-row justify-center md:justify-between items-center mb-10 h-24"
  >
    <router-link class="min-w-24" to="/"
      ><img
        class="min-w-24 min-h-24 w-24 h-24 justify-self-center self-center"
        src="../assets/apple-touch-icon.png"
        alt="reciperealm"
    /></router-link>
    <div
      class="basis-4/6 h-10 self-center min-w-[100px] min-h-[40px] justify-self-center flex rounded bg-white max-w-4xl"
    >
      <div class="self-center justify-self-center flex rounded bg-white">
        <input
          placeholder="search"
          name="search"
          class="w-full min-w-[100px] min-h-[40px] border-none bg-transparent text-gray-900 px-4 py-1 outline-none text-sm md:text-base"
          type="text"
          v-model="searchquery"
          @change="$emit('search', searchquery)"
        />
      </div>
    </div>
    <NavBar class="basis-1/6" />
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
