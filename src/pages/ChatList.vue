<template>
  <q-page class="chat-list">
    
    <!-- Chat List Search -->
    <q-input
    v-model="search"
    placeholder="Search"
    dense
    >      
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <!-- /Chat List Search -->

    <!-- Chat List Conversations -->
    <q-list>
      
      <q-slide-item
      @right="onRight"
      v-for="chatItem in chatItems"
      v-bind:key="chatItem.id"
      >

        <template v-slot:right>
          <q-icon name="delete_forever" />
        </template>

        <q-item
        clickable
        to="/ChatRoom"
        >
          <q-item-section avatar>
            <q-avatar
            size="52px"
            >
              <q-img
              :src="chatItem.chatAvatar"
              :ratio="1"
              />
            </q-avatar>
          </q-item-section>
          
          <q-item-section>
            <q-item-label overline>{{ chatItem.chatName }}</q-item-label>
            <q-item-label caption>{{ lastMsgLimit(chatItem.chatLastMsg) }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-slide-item>

    </q-list>
    <!-- /Chat List Conversations -->

  </q-page>
</template>

<script>
export default {
  name: 'ChatList',
  data() {
    return {
      chatItems: [
        {
          chatAvatar: 'https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          chatName: 'Charlie',
          chatLastMsg: "That's cool! See you tmr" 
        },
        {
          chatAvatar: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          chatName: 'Lorie',
          chatLastMsg: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem nemo ut harum, iusto numquam quia vitae repudiandae facilis aut rem minus provident?" 
        }
      ],
      search: ''
    }
  },
  methods: {
    
    lastMsgLimit(lastMsg){
      var limitMsg = '';
      var msgMax = lastMsg.length;

      if(lastMsg.length > 25){
        msgMax = 30;
      }

      for(var i = 0; i < msgMax; i++){
        limitMsg += lastMsg[i];
      }

      if(msgMax == 30){
        limitMsg += '...';
      }

      return limitMsg;
    },

    onRight ({ reset }) {
      this.$q.notify({
        position: 'top',
        caption: 'Chat Deleted',
        color: 'negative',
        timeout: 1000
      })
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    }
  },

  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
