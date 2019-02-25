<template>
  <div :class="$style.container">
    <div
      v-for="[l, on] in lettersWithStatus"
      :class="[$style.letter, { [$style.on]: on }]"
    >
      {{ l }}
    </div>
  </div>
</template>

<script>
import { getLettersWithStatus } from '@/services/word-clock.js';

export default {
  name: 'WordClock',

  props: {
    now: {
      type: Date,
      required: true
    }
  },

  computed: {
    lettersWithStatus() {
      return getLettersWithStatus(this.now);
    }
  }
};
</script>

<style module>
.container {
  display: grid;
  grid-template-columns: repeat(11, var(--letter-size));
  grid-template-rows: repeat(10, var(--letter-size));
}

.letter {
  color: #333;
  line-height: var(--letter-size);
  text-align: center;
  text-transform: uppercase;
}

.on {
  color: #fff;
}
</style>
