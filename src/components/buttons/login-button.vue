<template>
  <div>
    <button
      @click="login"
      class="bg-blue-500 text-white px-6 py-2 rounded font-medium sm:mx-3 hover:bg-blue-600 transition duration-200 each-in-out"
    >
      Log in
    </button>
  </div>
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  setup() {
    const { loginWithRedirect } = useAuth0()

    return {
      login: () => {
        loginWithRedirect()
      }
    }
  }
}
</script>
