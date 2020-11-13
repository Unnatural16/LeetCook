<template>
  <div class="the-calendar-wrapper">
      <h2 :style="{ 'padding-left': '20px' }">每日一题</h2>
    <Calendar class="the-calendar"/>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";

export default {
  name: "TheCalendar",
  components: {
    Calendar,
  },
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
</style>