<template>
  <div id="app" :class="$style.container">
    <div :class="$style.frame">
      <word-clock :now="now" />
    </div>
    <div :class="$style.now">{{ formattedNow }}</div>
    <div>
      <button type="button" @click="travel(-60)">-1 hr</button>
      <button type="button" @click="travel(-5)">-5 min</button>
      <button type="button" @click="returnToNow">Now</button>
      <button type="button" @click="travel(+5)">+5 min</button>
      <button type="button" @click="travel(+60)">+1 hr</button>
    </div>
  </div>
</template>

<script>
import addMinutes from 'date-fns/add_minutes';

import { formatTime } from '@/utils/time-utils.js';

import WordClock from '@/components/WordClock.vue';

export default {
  name: 'App',

  components: {
    WordClock
  },

  data: () => ({
    now: new Date(),
    intervalId: undefined
  }),

  computed: {
    formattedNow() {
      return formatTime(this.now);
    }
  },

  created() {
    this.startTimer();
  },

  beforeDestroy() {
    this.stopTimer();
  },

  methods: {
    updateNow() {
      this.now = new Date();
    },

    startTimer() {
      if (this.intervalId == null) {
        this.intervalId = window.setInterval(this.updateNow, 1000);
      }
    },

    stopTimer() {
      if (this.intervalId != null) {
        this.intervalId = window.clearInterval(this.intervalId);
      }
    },

    returnToNow() {
      this.now = new Date();
      this.startTimer();
    },

    travel(minutes) {
      this.stopTimer();
      this.now = addMinutes(this.now, minutes);
    }
  }
};
</script>

<style module>
.container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.frame {
  background-color: #000;
  box-shadow: 4px 4px 12px 0px #555;
  display: inline-block;
  padding: 100px;
}

.now {
  color: #777;
  margin-top: 1em;
}
</style>

<style>
:root {
  --letter-size: 37px;
}

html,
body {
  height: 100%;
}

body {
  background-color: #f0f0f0;
  font-family: 'Lucida Console', Courier, monospace;
  font-size: 24px;
}
</style>
