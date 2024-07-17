<template>
    <div>
      <form @submit.prevent="submitForm">
        <label for="message">Message:</label>
        <input type="text" v-model="message" id="message" />
  
        <label for="file">Choose file:</label>
        <input type="file" @change="handleFileUpload" id="file" />
  
        <button type="submit">Submit</button>
      </form>
  
      <p v-if="response">Response: {{ response }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: '',
        file: null,
        response: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async submitForm() {
        try {
          const formData = new FormData();
          formData.append('message', this.message);
          formData.append('file', this.file);
  
          const res = await axios.post('http://a9056f2c3852e465ba0a764c6ebcc53d-495033777.us-east-1.elb.amazonaws.com:5000/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          this.response = res.data.response;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* 可以添加样式以美化表单 */
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
  
  label {
    margin-top: 10px;
  }
  
  button {
    margin-top: 20px;
  }
  </style>