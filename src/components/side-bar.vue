<script>
export default {
  props: {
    recipies_counter: Number,
    users_counter: Number
  }
}
</script>

<template>
  <div>
    <div class="latest"></div>
    <p class="rounded border-2 border-sky-500 bg-white text-left p-5">
      Forum statisics<br />
      Recipies: {{ recipies_counter }}<br />
      Members: {{ users_counter }}<br />
    </p>
  </div>
</template>
