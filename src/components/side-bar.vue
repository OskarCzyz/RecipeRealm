<script>
export default {
  props: {
    recipies_counter: Number,
    users_counter: Number,
    latest_user: String
  }
}
</script>

<template>
  <div>
    <div class="latest"></div>
    <p class="rounded border-2 border-sky-500 bg-white text-left p-5 float-left md:float-right m-2">
      Forum statisics<br />
      Recipies: {{ recipies_counter }}<br />
      Members: {{ users_counter }}<br />
      Latest user: {{ latest_user }}
    </p>
  </div>
</template>
