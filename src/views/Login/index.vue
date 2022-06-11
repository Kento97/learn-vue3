<template>
  <div class="login">
    <el-card class="box-card">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" label-position="top">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password />
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

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  pass: '',
  userName: '',
})
const validateUserName = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('Please input the userName'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  userName: [{ validator: validateUserName, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(toRaw(ruleForm))
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