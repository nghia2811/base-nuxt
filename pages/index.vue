<template>
  <div class="login-page d-flex">
    <div class="login-side">
      <svg
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        class="login-bg-svg"
      >
        <g fill="none" stroke="currentColor" stroke-width="100">
          <circle r="234" cx="196" cy="23"></circle>
          <circle r="234" cx="790" cy="491"></circle>
        </g>
      </svg>
      <svg
        viewBox="0 0 220 192"
        width="220"
        height="192"
        fill="none"
        class="login-svg-top-right"
      >
        <defs>
          <pattern
            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="220"
          height="192"
          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
        ></rect>
      </svg>
      <div class="login-form">
        <div class="sign-in-logo d-flex justify-center">
          <header-logo/>
        </div>
        <div class="select-container">
          <v-text-field v-model="inputToken" label="Token"></v-text-field>
          <!-- <h2 class="text-center">Select Level</h2> -->
          <!-- <v-autocomplete
            v-model="autocompleteModel"
            :items="autocompleteData"
            @input="selectedPath($event)"
            dense
            outlined
            label="Level"
            class="mt-5"
            hide-details
            hide-no-data
          ></v-autocomplete> -->
          <v-btn @click="approval" color="blue-grey darken-3" dark block class="mt-8 mb-5">
            Approve
          </v-btn>
          <v-btn @click="reject" color="blue-grey darken-3" block outlined class="mt-5 mb-5">
            Reject
          </v-btn>
        </div>
      </div>
      <div class="footer">
        @kincloud2022
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios'

  export default Vue.extend({
    name  : 'HomePage',
    layout: 'home',
    data() {
      return {
        autocompleteModel: '',
        autocompleteData : [
          '1',
          '2',
          '3',
          '4',
          '5'
        ] as any,
        taskToken        : '' as any,
        inputToken       : ''
      }
    },
    mounted() {
      if (this.$route.query.token) {
        this.taskToken = this.$route.query.token
      }
    },
    methods: {
      approval() {
        axios
            .post('https://kin-api-dev.grit.software/sample/workflow/complete-activity', {
                task_token: this.inputToken || this.taskToken,
                activity_result: {
                    status: "approved"
                }
            })
            .then(response => {
                this.$toast.show('Approve successfully')
            })
            .catch(error => {
                this.$toast.show(error.response.data.message)
            });;
      },
      reject() {
        axios
            .post('https://kin-api-dev.grit.software/sample/workflow/complete-activity', {
                task_token: this.inputToken || this.taskToken,
                activity_result: {
                    status: "rejected"
                }
            })
            .then(response => {
                this.$toast.show('Reject successfully')
            })
            .catch(error => {
                this.$toast.show(error.response.data.message)
            });
      },
      selectedPath(path: any) {

      }
    }
  })
</script>

<style lang="scss">
  .login-page {
    height: 100vh;
    position: relative;
    .login-side {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: rgb(30, 41, 59);
      color: #fff;
      > svg {
        margin: 0;
        opacity: 0.04;
      }
      .login-bg-svg {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .login-svg-top-right {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
      .login-form {
        z-index: 2;
        width: 365px;
        .select-container {
          padding: 30px 20px;
          margin-top: 40px;
          border-radius: 15px;
          background: #fff;
          color: #000;
        }
      }
      .footer {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  @media screen and (max-width: 1023px) {
    .v-application div.login-page {
      display: block !important;
      .login-side {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-bg-svg {
          height: 100vh;
          min-height: 600px;
        }
        .login-svg-top-right {
          height: auto;
          max-width: 150px;
        }
        .login-form {
          width: 100%;
          max-width: 365px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .v-application div.login-page {
      .login-side {
        .login-bg-svg {
          height: 100vh;
        }
      }
    }
  }
</style>
