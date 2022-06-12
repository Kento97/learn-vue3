<template>
  <el-container class="container">
    <el-header class="header">
      <div class="header-item">
        <img src="@/assets/logo.png" alt="logo">
      </div>
      <div class="header-item">
        <span class="userName">user.name</span>
        <span class="logout" @click="logout">退出登录</span>
      </div>
    </el-header>
    <el-container class="inner-container">
      <el-aside width="200px" class="el-side">
        <el-menu :default-active='currentPath' class="el-menu-vertical-demo" :router="true" @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="/home">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>数据概览</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <el-icon>
              <document />
            </el-icon>
            <span>内容管理</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <el-icon>
              <setting />
            </el-icon>
            <span>发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>
import useStore from '@/store';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import { removeToken } from "@/utils";
const router = useRouter()
const currentPath = router.currentRoute.value.path
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const { useUserStore } = useStore()
const userStore = useUserStore()
userStore.getUserInfo().then((res) => {
  console.log(res, '用户信息');
})

//退出登录
function logout() {
  removeToken('loginToken')
  ElNotification({
    title: 'Success',
    message: "成功退出",
    type: 'success',
  })
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;

  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    background-color: seagreen;

    .header-item {
      display: flex;
      align-items: center;
      width: fit-content;

      img {
        height: 50px;
        margin-left: 50px;
      }

      .userName {}

      .logout {
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }

  .inner-container {
    height: calc(100% - 50px);

    .el-side {
      /* height: 100%; */

      .el-menu-vertical-demo {
        height: calc(100vh - 50px);
        background-color: rgb(214, 220, 222);
      }
    }

    .main {
      background-color: pink;
    }
  }
}
</style>