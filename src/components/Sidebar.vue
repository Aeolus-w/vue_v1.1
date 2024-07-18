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
              <router-link :to="child.link">--{{ child.name }}</router-link>
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
.sidebar {
  width: 250px;
  height: 100vh;
  /* background-color: #37474f; 深蓝色背景 */
  color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar li.has-dropdown > span {
  cursor: pointer;
  font-weight: bold;
}

.sidebar a, .sidebar span {
  color: #000000;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar a:hover, .sidebar span:hover {
  background-color: #63b3d8; /* 浅蓝色悬停效果 */
}

.sidebar ul ul {
  padding-left: 15px;
  display: none;
}

.sidebar li.has-dropdown:hover > ul {
  display: block; /* 悬停时显示下拉菜单 */
}

.sidebar ul ul li a {
  padding-left: 20px; /* 缩进子菜单项 */
}
  </style>
  