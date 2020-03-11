<template>
  <q-page class="chat-room">

    <q-chat-message
    label="Sunday, 19th"
    />

    <q-chat-message
    name="me"
    stamp="00:00"
    :text="['Bark!']"
    sent
    >
      <template v-slot:avatar>
        <q-avatar
        size="52px"
        class="chat-sent"
        >
          <q-img
          src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          :ratio="1"
          />
        </q-avatar>
      </template>
    </q-chat-message>

    <q-chat-message
    name="Lorie"
    stamp="00:00"
    :text="['Meow!']"
    >
      <template v-slot:avatar>
        <q-avatar
        size="52px"
        class="chat-received"
        >
          <q-img
          src="https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          :ratio="1"
          />
        </q-avatar>
      </template>
    </q-chat-message>

    <q-chat-message
    name="me"
    stamp="00:00"
    :text="['hi']"
    sent
    >
      <template v-slot:avatar>
        <q-avatar
        size="52px"
        class="chat-sent"
        >
          <q-img
          src="https://images.pexels.com/photos/850602/pexels-photo-850602.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          :ratio="1"
          />
        </q-avatar>
      </template>
    </q-chat-message>

  </q-page>
</template>

<script>
export default {
  name: 'ChatRoom',
}
</script>
