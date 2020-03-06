<template>
  <q-page class="chatroom-body">

        <q-chat-message
          label="Sunday, 19th"
        />

         <q-chat-message
        name="me"
        stamp="7 minutes ago"
        :text="['Have you seen Quasar?']"
        sent
      >
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--sent"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          >
        </template>
      </q-chat-message>

      <q-chat-message
        name="Lorie"
        stamp="7 minutes ago"
        :text="['Already building an app with it..']"
      >
        <template v-slot:avatar>
          <img
            class="q-message-avatar q-message-avatar--received"
            src="https://cdn.quasar.dev/img/avatar2.jpg"
          >
        </template>
      </q-chat-message>

  </q-page>
</template>

<script>
export default {
  name: 'ChatRoom',
  data() {
    return {

    }
  }
}
</script>
