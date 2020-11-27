<template>
  <div class="the-calendar-wrapper">
      <h2 :style="{ 'padding-left': '20px' }">每日一题</h2>
    <Calendar class="the-calendar" is-expanded/>
  </div>
</template>

<script>
import Calendar from 'v-calendar/lib/components/calendar.umd'

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