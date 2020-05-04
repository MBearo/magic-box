<template>
  <div>
    <div class="body">
      <div v-if="type==='item'">开发中...</div>
      <div v-else>
        <div v-if="BoxPosition===''">
          <div class="notfound">
            <svg
              t="1588578639031"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5978"
              width="128"
              height="128"
            >
              <path d="M512 784.352m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z" p-id="5979" />
              <path
                d="M512 960C264.96 960 64 759.04 64 512S264.96 64 512 64s448 200.96 448 448S759.04 960 512 960zM512 128.288C300.416 128.288 128.288 300.416 128.288 512c0 211.552 172.128 383.712 383.712 383.712 211.552 0 383.712-172.16 383.712-383.712C895.712 300.416 723.552 128.288 512 128.288z"
                p-id="5980"
              />
              <path
                d="M512 673.696c-17.664 0-32-14.336-32-32l0-54.112c0-52.352 40-92.352 75.328-127.648C581.216 434.016 608 407.264 608 385.92c0-53.344-43.072-96.736-96-96.736-53.824 0-96 41.536-96 94.56 0 17.664-14.336 32-32 32s-32-14.336-32-32c0-87.424 71.776-158.56 160-158.56s160 72.096 160 160.736c0 47.904-36.32 84.192-71.424 119.296C572.736 532.992 544 561.728 544 587.552l0 54.112C544 659.328 529.664 673.696 512 673.696z"
                p-id="5981"
              />
            </svg>
          </div>
          <div class="name">{{BoxName}}没有找到位置</div>
          <div class="btn-list">
            <van-button round type="info" @click="show=true">立即添加</van-button>
          </div>
        </div>
        <div v-else>
          <div class="notfound">
            <svg
              t="1588579559884"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6118"
              width="128"
              height="128"
            >
              <path
                d="M928 288h-147.2l54.4-51.2c19.2-19.2 28.8-44.8 28.8-73.6 0-25.6-9.6-51.2-28.8-70.4-19.2-19.2-44.8-28.8-70.4-28.8-25.6 0-51.2 9.6-70.4 28.8l-105.6 105.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l105.6-105.6c6.4-6.4 16-9.6 25.6-9.6 9.6 0 19.2 3.2 25.6 9.6 6.4 9.6 9.6 16 9.6 25.6s-3.2 19.2-9.6 25.6L691.2 288h-166.4l-195.2-195.2C310.4 73.6 284.8 64 259.2 64c-25.6 0-51.2 9.6-70.4 28.8S160 137.6 160 163.2c0 28.8 9.6 54.4 28.8 73.6L243.2 288H96c-19.2 0-32 12.8-32 32v163.2c0 19.2 12.8 32 32 32v313.6C96 883.2 137.6 928 188.8 928h646.4c51.2 0 96-44.8 96-102.4V512c16 0 32-16 32-32v-160c-3.2-19.2-16-32-35.2-32z m-32 163.2H544V352h352v99.2zM233.6 188.8c-6.4-6.4-9.6-16-9.6-25.6 0-9.6 3.2-19.2 9.6-25.6s16-9.6 25.6-9.6c9.6 0 19.2 3.2 25.6 9.6L435.2 288h-102.4L233.6 188.8zM480 352v99.2H131.2 128V352h352zM188.8 864c-16 0-28.8-19.2-28.8-38.4V512h320v352H188.8z m646.4 0H544V515.2h320v313.6c0 16-12.8 35.2-28.8 35.2z"
                fill="#60646D"
                p-id="6119"
              />
            </svg>
          </div>
          <div class="title">{{BoxName}}</div>
          <div class="position">{{BoxPosition}}</div>
        </div>
      </div>
    </div>
    <div>
      <van-dialog
        v-model="show"
        title="添加位置"
        showCancelButton
        closeOnClickOverlay
        @confirm="submit"
      >
        <van-form>
          <van-field
            v-model="position"
            placeholder="请填写位置"
            :rules="[{ required: true, message: '请填写位置' }]"
          />
        </van-form>
      </van-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
  props: {},

  components: {},

  mixins: [],

  data () {
    return {
      BoxName: '',
      BoxPosition: '',
      type: 'box',
      show: false,
      position: ''
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {
    console.log(this.getQueryVariable('id'))
    console.log(this.getQueryVariable('type'))
    const type = this.getQueryVariable('type')
    const id = this.getQueryVariable('id')
    this.id = id
    this.type = type
    this.refresh()
  },

  methods: {
    refresh () {
      if (this.type === 'box') {
        axios({
          url: 'http://localhost:7777/getPosition',
          params: {
            id: this.id
          }
        })
          .then(res => {
            if (res.data.error_code === 0) {
              console.log(res.data)
              this.BoxPosition = res.data.BoxPosition || ''
              this.BoxName = res.data.BoxName
            } else {
              Toast(res.data.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.type = 'item'
      }
    },
    submit () {
      console.log(this.position)
      axios({
        url: 'http://localhost:7777/updatePosition',
        method: 'post',
        data: {
          id: this.id,
          position: this.position
        }
      })
        .then(res => {
          console.log(res.data)
          if (res.data.error_code === 0) {
            Toast('添加成功')
            this.show = false
            this.refresh()
          } else {
            Toast(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getQueryVariable (variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === variable) {
          return pair[1]
        }
      }
      return false
    }
  }
}
</script>
<style scoped>
.body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.name {
  text-align: center;
  font-size: 18px;
}
.notfound {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.btn-list {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}
.position {
  background-color: white;
  width: 95vw;
  padding: 20px;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
<style>
html,
body {
  background-color: #f2f2f2;
}
</style>
