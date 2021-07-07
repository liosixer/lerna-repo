<template>
  <div class="userinfo">
    <nav-bar />
    <el-card class="cus-main-card main-card">
      <div class="header">选择：</div>
      <div class="menus">
        <div class="menu-item construction">
          <div class="menu-item__hd"></div>
          <div class="menu-item__bd">工程建设系统</div>
          <div class="menu-item__ft"><i class="el-icon-circle-check"></i></div>
        </div>
        <div class="menu-item nature">
          <div class="menu-item__hd"></div>
          <div class="menu-item__bd">自然资源系统</div>
          <div class="menu-item__ft"><i class="el-icon-circle-check"></i></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'Userinfo',
  components: { NavBar },
};
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 0 20px 20px;
  .main-card {
    min-height: calc(100% - 40px);
    .card-header {
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .header {
    padding: 10px 0 30px;
    color: #111111;
    font-size: 17px;
  }
  .menus {
    display: flex;
    .menu-item {
      cursor: pointer;
      width: 240px;
      padding: 30px 0;
      margin-right: 30px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0px -5px 16px 0px rgba(14, 26, 37, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      border: 1px solid #ffffff;
      &:hover,
      &:active {
        border-color: #144fba;
        .menu-item__hd {
          background-color: #144fba;
        }
        .menu-item__bd {
          color: #144fba;
        }
        .menu-item__ft {
          .el-icon-circle-check {
            color: #144fba;
          }
        }
      }
      .menu-item__hd {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        background-color: #f2f2f2;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 64px 64px;
        background-position: center;
        background-repeat: no-repeat;
      }
      .menu-item__bd {
        color: #111111;
        font-size: 17px;
        height: 24px;
        line-height: 24px;
        margin: 15px 0;
      }
      .menu-item__ft {
        height: 50px;
        padding: 10px;
        .el-icon-circle-check {
          font-size: 30px;
          color: #ffffff;
        }
      }
      &.construction {
        .menu-item__hd {
          background-image: url('../../../assets/images/userinfo/i-construction_off.png');
        }
        &:hover,
        &:active {
          .menu-item__hd {
            background-image: url('../../../assets/images/userinfo/i-construction.png');
          }
        }
      }
      &.nature {
        .menu-item__hd {
          background-image: url('../../../assets/images/userinfo/i-nature_off.png');
        }
        &:hover,
        &:active {
          .menu-item__hd {
            background-image: url('../../../assets/images/userinfo/i-nature.png');
          }
        }
      }
    }
  }
}
</style>
