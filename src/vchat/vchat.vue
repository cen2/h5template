<template>
  <div class="vchat">
    <div class="chatScroll">
      <Scroll>
        <div class="waterfall">
          <div v-for="(item, index) in chatWave" :key="index" :class="{reverse: item.isSelf}" class="wave">
            <div class="info">
              <div v-if="item.type===1" class="date">{{item.dateTime |
                formatDate(index, chatWave[index], chatWave[index-1])}}
              </div>
              <div v-if="!item.type" class="error">网络不佳，发送失败</div>
            </div>
            <div v-if="item.type===1" class="speak">
              <div class="left">
                <img :src="item.avatar_url" alt="">
              </div>
              <div class="right">
                <div class="name">{{item.name}}</div>
                <div v-if="item.msg" class="msg">{{item.msg}}</div>
                <div v-if="item.media" class="media">
                  <embed :src="item.media">
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="chatSender">
      <div class="editArea">
        <input type="text">
      </div>
      <div class="tool">
        <span :style="{backgroundImage: photos_png}" class="photos">
          <input type="file" accept="image/*">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Scroll from './Scroll'
  import head_jpg from './youyuxi.jpg'
  import photos_png from './photos.png'

  export default {
    components: {Scroll},
    filters: {
      formatDate(value, index, c, p) {
        if (!index) {
          return ''
        } else {
          if (new Date(c.dateTime).getTime() - new Date(p.dateTime).getTime() > 2 * 60 * 1000) {
            return moment(value).format('HH:mm')
          } else {
            return ''
          }
        }
      }
    },
    data() {
      return {
        photos_png: `url(${photos_png})`,
        chatWave: [
          {
            type: 1,
            isSelf: false,
            avatar_url: head_jpg,
            name: '奔波儿霸',
            msg: '大道至简',
            media: '',
            dateTime: '2018-07-23 16:30'
          },
          {
            type: 1,
            isSelf: true,
            avatar_url: head_jpg,
            name: '霸波儿奔',
            msg: '天道酬勤',
            media: '',
            dateTime: '2018-07-23 16:30'
          },
          {
            type: 0,
            isSelf: false,
            avatar_url: head_jpg,
            name: '霸波儿奔',
            msg: '天道酬勤',
            media: '',
            dateTime: '2018-07-23 16:31'
          },
          {
            type: 1,
            isSelf: false,
            avatar_url: head_jpg,
            name: '霸波儿奔',
            msg: '大道至简',
            media: '',
            dateTime: '2018-07-23 16:35'
          },
          {
            type: 1,
            isSelf: false,
            avatar_url: head_jpg,
            name: '霸波儿奔',
            msg: '',
            media: head_jpg,
            dateTime: '2018-07-23 16:35'
          },
          {
            type: 1,
            isSelf: false,
            avatar_url: head_jpg,
            name: '霸波儿奔',
            msg: '',
            media: head_jpg,
            dateTime: '2018-07-23 16:36'
          },
          {
            type: 1,
            isSelf: false,
            avatar_url: head_jpg,
            name: '霸波儿奔',
            msg: '',
            media: head_jpg,
            dateTime: '2018-07-23 16:39'
          }
        ]
      }
    }
  }
</script>

<style lang="less">
  @import "border";

  .vchat {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #efefef;
    .chatScroll {
      flex: 1;
      overflow: hidden;
      .waterfall {
        flex: auto;
        display: flex;
        flex-direction: column;
        padding: 15px;
        .wave {
          margin-bottom: 40px;
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            color: #5d5c5e;
            .date {
              margin: 20px 0;
              &:empty {
                margin: 0;
              }
            }
            .error {
              color: #ff5351;
              margin: 20px 0;
              &:empty {
                margin: 0;
              }
            }
          }
          .speak {
            display: flex;
            .left {
              height: 90px;
              background: #fff;
              margin-right: 20px;
              img {
                width: 90px;
                height: 100%;
                object-fit: cover;
              }
            }
            .right {
              max-width: 530px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              .name {
                font-size: 26px;
                line-height: 26px;
                color: #5d5c5e;
                margin: 10px;
              }
              .msg {
                font-size: 34px;
                line-height: 42px;
                background: #fff;
                border-radius: 12px;
                padding: 20px;
              }
              .media {
                background: rgba(255, 255, 255, 0);
                border-radius: 12px;
                padding: 20px;
                embed {
                  width: 180px;
                  height: 180px;
                  object-fit: cover;
                }
              }
            }
          }
        }
        .wave.reverse {
          .speak {
            flex-direction: row-reverse;
            .left {
              margin-right: 0;
              margin-left: 20px;
            }
            .right {
              .name {
                text-align: right;
              }
              .msg {
                background: #B2E281;
              }
            }
          }
        }
      }
    }
    .chatSender {
      height: 80px;
      padding: 10px 30px;
      background: #f7f7f7;
      display: flex;
      .editArea {
        width: 600px;
        height: 100%;
        .border-bottom(rgba(0, 0, 0, .2));
        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          outline: none;
          border: none;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0);
        }
      }
      .tool {
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        .photos {
          width: 60px;
          height: 60px;
          background: transparent no-repeat center;
          background-size: contain;
          overflow: hidden;
          input{
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
          }
        }
      }
    }
  }
</style>
