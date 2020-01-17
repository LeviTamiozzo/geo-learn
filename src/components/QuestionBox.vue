<template>
  <div>
    <v-content>
      <v-container>
        <slot name="title"></slot>

        <v-item-group :mandatory="mandatory" :multiple="multiple">
          <v-container>
            <v-row>
              <v-col v-for="item in data" :key="item.id" cols="12" :md="colsForRow">
                <v-item v-slot:default="{ active, toggle }">
                  <v-card
                    :color="active ? 'primary' : ''"
                    class="d-flex align-center justify-center"
                    :height="height"
                    dark
                    @click="selectOption(item.id); toggle();"
                  >
                    <p class="text-center p-15px">{{ item.name }}</p>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>

        <div>
          <v-btn
            color="primary"
            @click="submitAnswer()"
            :disabled="answered || selectedOption == null"
          >Next</v-btn>
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "questionBox",

  data() {
    return {
      selectedOption: null,
      answered: false
    };
  },

  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: () => "75"
    },
    colsForRow: {
      type: Number,
      default: () => 3
    },
    mandatory: {
      type: Boolean,
      default: () => false
    },
    multiple: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },

    submitAnswer() {
      this.answered = true;
    }
  }
};
</script>

<style lang="css" scoped>
</style>
