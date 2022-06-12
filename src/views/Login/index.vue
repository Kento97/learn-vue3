<template>
  <div class="login">
    <el-card class="box-card">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" label-position="top">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" type="password" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRaw } from 'vue'
import type { FormInstance } from 'element-plus'
import useStore from "@/store";
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'

const PHONEREG = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  code: '246810',
  mobile: '18761074748',
})

const { useLoginStore } = useStore()
const store = useLoginStore()
const router = useRouter()
const validateMobile = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Please input the mobile number'))
  } else {
    if (PHONEREG.test(value)) {
      callback()
    } else {
      callback(new Error('Please input the correct mobile number'))
    }
  }
}

const validateCode = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Please input the code'))
  } else {
    callback()
  }
}

const rules = reactive({
  code: [{ validator: validateCode, trigger: 'blur' }],
  mobile: [{ validator: validateMobile, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const rawRuleForm = toRaw(ruleForm)
      store.getToken({
        mobile: rawRuleForm.mobile,
        code: rawRuleForm.code
      }).then(() => {
        ElNotification({
          title: 'Success',
          message: 'Login Success',
          type: 'success',
        })
        router.push('/')
      }).catch((e) => {
        ElNotification({
          title: 'Failed',
          message: e,
          type: 'error',
        })
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped lang="scss">
.login {
  min-height: 100vh;
  background-color: seagreen;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-card {
  width: 480px;
}
</style>