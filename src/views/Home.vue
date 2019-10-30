<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="6">
            <question-box />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import questionBox from '../components/QuestionBox'

export default {
  components: {
    questionBox
  }

};
</script>

<style lang="css" scoped>
</style>
