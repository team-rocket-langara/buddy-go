<template>
  <q-page>
    <!-- Chat List -->
    <div class="chat-list">

      <!-- Chat List Search -->
      <q-input
        v-model="search"
        placeholder="Search"
      >      
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <!-- /Chat List Search -->

      <!-- Chat List List -->
      <q-list>

        <!-- Chat List Preview -->
        <q-btn v-for="ChatItem in ChatItems" v-bind:key="ChatItem.id" to="/ChatRoom">
          <q-img
          :src="ChatItem.ChatAvatar"
          :ratio="1"
          />
          <div class="chat-list-preview">
            <ul>
              <li>{{ ChatItem.ChatName }}</li>
              <li>{{ lastMsgLimit(ChatItem.ChatLastMsg) }}</li>
            </ul>
          </div>
        </q-btn>
        <!-- /Chat List Preview -->

      </q-list>
      <!-- /Chat List List -->

    </div>
    <!-- /Chat List -->
  </q-page>
</template>

<script>
export default {
  name: 'ChatList',
  data() {
    return {
      ChatItems: [
        {
          ChatAvatar: 'https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          ChatName: 'Charlie',
          ChatLastMsg: "That's cool! See you tmr" 
        },
        {
          ChatAvatar: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          ChatName: 'Lorie',
          ChatLastMsg: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem nemo ut harum, iusto numquam quia vitae repudiandae facilis aut rem minus provident?" 
        }
      ]
    }
  },
  methods:{
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
    }
  }
}
</script>
