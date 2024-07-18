<template>
  <div>
    <header class="header">
      <h1>Traffic Analysis</h1>
    </header>
    <div class="container">
      <form @submit.prevent="submitForm">
        <label for="message">Message:</label>
        <input type="text" v-model="message" id="message" />

        <label for="file">Choose file:</label>
        <input type="file" @change="handleFileUpload" id="file" />

        <button type="submit">Submit</button>
      </form>

      <p v-if="response">Response: {{ response }}</p>
    </div>
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
  /* 顶部标题样式 */
  .header {
    width: 100%;
    padding: 20px;
    /* background-color: #007bff; 背景颜色 */
    color: rgb(0, 0, 0); /* 文字颜色 */
    text-align: center; /* 居中对齐 */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 添加阴影 */
  }
  
  .header h1 {
    margin: 0;
    font-size: 2em; /* 字体大小 */
    font-weight: bold; /* 字体加粗 */
    letter-spacing: 3px; /* 字符间距 */
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 80px); /* 使容器占满剩余视口高度 */
    font-family: Arial, sans-serif;
  }
  
  form {
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    border-radius: 10px; /* 添加圆角 */
  }
  
  label {
    margin-top: 10px;
    color: #495057; /* 设置标签颜色 */
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="file"] {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff; /* 按钮背景颜色 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease; /* 添加背景颜色渐变效果 */
  }
  
  button:hover {
    background-color: #0056b3; /* 悬停时按钮背景颜色 */
  }
  
  p {
    margin-top: 20px;
    color: #28a745; /* 设置响应文本颜色 */
    font-weight: bold;
  }
  </style>  