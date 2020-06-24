<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置表单
    resetLoginForm() {
      // this指向当前登陆组件的实例对象
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登陆按钮，进行表单的预验证
    login() {
      this.$refs.loginFormRef.validate(async vaild => {
        if (!vaild) return
        // 发送请求
        const { data: result } = await this.$http.post('login', this.loginForm)
        // 打印结果是promise对象，所以加一个await和async来简化操作。
        if (result.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1. 将登陆成功后的 token，保存到客户端的sessionStorage中。
        //   1. 登陆拦截：项目中除了登录之外的其他API接口，必须在登陆后才能访问。
        //   2. token 只应在当前网站打开期间生效，所以将 token 保存在sessionStorage（会话期间的存储机制）中。
        // console.log(result)
        window.sessionStorage.setItem('token', result.data.token)
        // 2. 通过编程式导航跳转好后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 支持less语法；scoped样式只在当前组件中生效
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  // 将盒子居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    // 调整位置
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  // 表单向下对齐
  position: absolute;
  bottom: 0;
  // 文本框宽度
  width: 100%;
  // 美化边距
  padding: 0 20px;
  // 默认form表单是css3盒模型 content-box;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
