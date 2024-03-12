<template>
  <div>
    <div class="blank-top"></div>
    <div class="resume">
      <h1>{{ candidate.name }}</h1>
      <h2>个人信息</h2>
      <ul>
        <li>年龄: {{ candidate.age }}</li>
        <li>联系方式: {{ candidate.phone }}</li>
        <li>邮箱: {{ candidate.email }}</li>
        <li>期望薪资: {{ candidate.expectedSalary }}K</li>
        <li>期望城市: {{ candidate.expectedCity }}</li>
      </ul>
      <h2>工作经历</h2>
      <ul>
        <li v-for="(job, index) in candidate.workExperience" :key="index">
          <h3>{{ job.company }}</h3>
          <p>{{ job.position }} - {{ job.startDate }} 至 {{ job.endDate }}</p>
          <ul>
            <li v-for="(item, idx) in job.responsibilities" :key="idx">{{ item }}</li>
          </ul>
        </li>
      </ul>
      <h2>项目经历</h2>
      <ul>
        <li v-for="(project, index) in candidate.projectExperience" :key="index">
          <h3>{{ project.projectName }}</h3>
          <p>{{ project.description }}</p>
          <ul>
            <li v-for="(tech, idx) in project.technologies" :key="idx">{{ tech }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Resume',
  setup() {
    const candidate = ref({
      name: '虞军军',
      age: 32,
      phone: '18***19',
      email: 'admin@jayyu.cn',
      expectedSalary: '25-26',
      expectedCity: '武汉',
      workExperience: [
        {
          company: '欢乐互娱（上海）科技股份有限公司',
          position: 'Cocos开发工程师',
          startDate: '2017.07',
          endDate: '2023.12',
          responsibilities: [
            '游戏引擎开发',
            '脚本语言专长',
            '跨平台技术',
            '性能与资源优化',
            '系统学习与项目实践',
            '团队合作与项目管理',
          ],
        },
        {
          company: '深圳市艺融创科技有限公司',
          position: 'ios开发工程师',
          startDate: '2015.09',
          endDate: '2017.05',
          responsibilities: [
            '负责 iOS 客户端程序框架设计、功能开发、应用上线发布',
            '根据项目计划和需求，按时提交高质量的代码，并完成开发任务',
            '参与软件项目的需求分析和设计',
            '优化代码性能，提高软件运行速度',
          ],
        },
        // ... 其他工作经历  
      ],
      projectExperience: [
        {
          projectName: '街机三国',
          description: '一款深受玩家喜爱的 ACT 游戏',
          technologies: ['Laya+FairyGUI', 'Unity'],
        },
        // ... 其他项目经历  
      ],
    });

    return { candidate };
  },
});  
</script>

<style lang="scss" scoped>
.resume {
  @include border;
  background-color: #fff;
  padding: 20px;
  display: block;
  align-items: center;
}

.blank-top {
  height: 85px;
}
</style>
