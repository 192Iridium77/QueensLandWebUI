<template lang="html">
  <div>
    <v-container class="content">
      Content here
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Explore",
}
</script>

<style lang="scss" scoped>
.explore {
    display: flex;
    flex-direction: row;
    .categories {
        width: 400px;
    }
    .content {
        flex: 1;
    }
}
</style>
