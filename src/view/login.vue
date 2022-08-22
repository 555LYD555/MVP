<template>
  <div class="contanier">
    <el-form :model="pwdForm" label-width="120px" :rules="pwdRules" ref="pwdForm" style="display:flex;justify-content:center;width:100%;height:100%;">
        <div style="width:700px;padding:40px;margin-top:20vh;height:fit-content;">
                        <el-form-item style="display:flex;justify-content:center;color:white;">
                            <span style="font-size:28px;font-weight:800;">系统登录</span>
                        </el-form-item>
                        <el-form-item label="用户" prop="username">
                            <el-input v-model="pwdForm.username"  onpaste="return false"
                                      oncopy="return false" oncut="return false">
                                      <template slot="prepend"><i class="el-icon-user"></i></template>
                                      </el-input>
                        </el-form-item>
                    
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="pwdForm.password" type="password" onpaste="return false"
                                      oncopy="return false" oncut="return false" show-password>
                                      <template slot="prepend"><i class="el-icon-lock"></i></template>
                                      </el-input>
                        </el-form-item>
                    
                        <el-form-item label="验证码" prop="checkCode">
                            <el-input v-model="pwdForm.checkCode"  onpaste="return false"
                                      oncopy="return false" oncut="return false"></el-input>
                        </el-form-item>
              
                    <el-button type="primary" @click.native="login()" :loading="pwdLoading" style="margin-left:50%;">登录</el-button>
  
        </div>
    </el-form>
    <!-- 验证码插件 -->
    <Vcode :show="isShow" @success="isShow=false" @close="isShow=false"></Vcode>
  </div>
</template>
<script>
import Vcode from "vue-puzzle-vcode";
export default ({
  name: 'vueTemplateMap',
  props: {},
  data () {
    return {
        pwdLoading: false,
        pwdForm: {
            username: '',
            password: '',
            checkCode: '',
        },
        pwdRules: {
            username: [
                {required: true, message: '请输入账号', trigger: 'blur'},
            ],
            password: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                // {validator: validateNewPassword, trigger: 'blur'}
            ],
            surePassword: [
                {required: true, message: '请输入验证码', trigger: 'blur'},
                // {validator: validatePass2, trigger: 'blur'}
            ],
        },



        // 验证码弹窗是否显示
        isShow:false,


    }
  },
  components:{
    Vcode
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    // 点击登录
    login(){
        this.isShow=true;

    },

  }

})
</script>
<style lang="scss" scoped>
.contanier{
    width: 100%;
    height: 100%;
    background: #2d384b;
}
</style>
