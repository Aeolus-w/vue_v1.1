<template>
    <div class="sidebar">
      <ul>
        <li v-for="item in menuItems" :key="item.name" :class="{ 'has-dropdown': item.children && item.children.length > 0 }">
          <!-- 主菜单项 -->
          <router-link v-if="!item.children || item.children.length === 0" :to="item.link">{{ item.name }}</router-link>
          <span v-else>{{ item.name }}</span>
  
          <!-- 下拉菜单 -->
          <ul v-if="item.children && item.children.length > 0">
            <li v-for="child in item.children" :key="child.name">
              <router-link :to="child.link">{{ child.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
import Protoanalyzer from '../views/Protoanalyzer.vue';

  export default {
    name: 'Sidebar',
    data() {
      return {
        menuItems: [
          {
            name: 'MainMenu',
            link: '/',
          },
          {
            name: 'Data Analysis',
            link: '/',
            children:[
              {name:'BaseData',link:'/BaseData'},
              {name:'Protocol Analysis',link:'/protoanalyzer'},
              {name:'Traffic Analysis',link:'/flowanalyzer'},
              {name:'IP Map',link:'/ipmap'},
            ]
          },
          {
            name: 'Data Extract',
            link: '/',
            children:[
              {name:'Web Data',link:'/webdata'},
              {name:'Mail Data',link:'/maildata'},
              {name:'FTP Data',link:'/ftpdata'},
              {name:'Telnet Data',link:'/telnetdata'},
              {name:'Client Information',link:'/clientinfo'},
              {name:'Sensitive Data',link:'/sendata'},
            ]
          },
          {
            name: 'Abnormal Information',
            link: '/exception',
          },
          {
            name: 'File Extract',
            link: '/',
            children:[
              {name:'Web File',link:'/webfile'},
              {name:'Mail File',link:'/mailfile'},
              {name:'FTP File',link:'/ftpfile'},
              {name:'All File',link:'/allfile'},
            ]
          },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* 可以添加样式 */
  .has-dropdown ul {
    display: none;
    list-style-type: none;
    padding-left: 0;
    margin-top: 5px;
  }
  
  .has-dropdown:hover ul {
    display: block;
  }

  .sidebar {
    width: 200px;
    height: 100vh;
    background-color: #f8f9fa;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin: 20px 0;
  }
  
  .sidebar a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  </style>
  