<template>
  <div>
    <button
      class="bg-gray-500 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-600 transition duration-200 each-in-out"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>
<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  setup() {
    const { logout } = useAuth0()

    return {
      logout: () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    }
  }
}
</script>
