import { ElMessage } from "element-plus";

export const getNavigationBarHeight = (): number => document.getElementById('el-header').clientHeight

export const Message = {
    error: (message: string) => ElMessage.error({ offset: 200, message: message }), success: (message: string) =>  ElMessage.success({ offset: 200, message: message })
}