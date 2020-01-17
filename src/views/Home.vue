<template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row class="justify-center">
          <v-col cols="lg-8 sm-10">
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
