<template>
  <div id="app">
    <h3>Firebase Data</h3>
    {{ firebaseData }}

    <h3>Form Data</h3>
    {{ formData }}

    <div v-if="state === 'synced'">Form is synced with Firestore</div>
    <div v-if="state === 'modified'">
      Form data changed, will sync with Firebase
    </div>
    <div v-if="state === 'error'">
      Failed to save to Firestore. {{ errorMessage }}
    </div>
    <div v-if="state === 'loading'">Loading...</div>

    <form @submit.prevent="updateFirebase" @input="fieldUpdate">
      <input type="text" name="name" v-model="formData.name" />
      <input type="text" name="phone" v-model="formData.phone" />
      <input type="text" name="email" novalidate v-model="formData.email" />

      <button type="submit">Submit</button>
    </form>

    <button @click="revokeData">REVERT!</button>
  </div>
</template>

<script>
import { db } from './firebase';

import { debounce } from 'debounce';

const documentPath = 'contacts/gian';

export default {
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: 'loading',

      originalData: null,
      errorMessage: '',
    };
  },

  firestore() {
    return {
      firebaseData: db.doc(documentPath),
    };
  },

  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = 'synced';
      } catch (error) {
        this.errorMessage = JSON.stringify(error);
        this.state = 'error';
      }
    },
    fieldUpdate() {
      this.state = 'modified';
      this.debouncedUpdate();
    },

    debouncedUpdate: debounce(function () {
      this.updateFirebase();
    }, 2000),

    revokeData() {
      this.formData = { ...this.originalData };
      this.updateFirebase();
      this.state = 'revoked';
    },
  },

  created: async function () {
    const docRef = db.doc(documentPath);

    let data = (await docRef.get()).data();

    if (!data) {
      data = { name: '', phone: '', email: '' };
      docRef.set(data);
    }
    this.originalData = { ...data }; // Create a new object reference for original dataa
    this.formData = data;
    this.state = 'synced';
  },
};
</script>

<style>
h1,
h2,
h3 {
  font-weight: 600;
}
#app {
  font-family: 'sofia-pro', sans-serif;
  text-align: center;
  padding: 10vh 15vw;
}
p.help {
  text-align: left;
}
</style>
