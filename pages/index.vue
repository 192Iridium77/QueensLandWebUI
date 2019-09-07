<template>
<div class="content">
  <explore></explore>
</div>
</template>

<script>
import Explore from "~/components/Explore";

export default {
  name: "Homepage",
  components: {
    Explore
  },
}
</script>

<style lang="scss" scoped>
.content {
    background-color: #ECEFF1;
    height: 300vh;
}
</style>
