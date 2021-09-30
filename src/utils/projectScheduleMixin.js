/**
 * @description: 处理项目状态的 mixin
 * @author: 单伟
 */

import { getUserInfo } from '@/utils/auth'

// 时间轴文字
const timelineInfo = {
  employer: {
    1: { content: "发布项目" },
    2: { content: "项目通过审核，正在等待开发者接单" },
    3: { content: "有开发者想接单，查看开发者信息", to: "/seedeveloper/" },
    5: { content: "开发者已接单，请支付项目托管费用", to: "/workbench/trusteeship/" },
    6: { content: "项目款已托管，进入正式开发" },
    7: { content: "开发已完成，请验收", to: "/yanshou" },
    8: { content: "项目已验收，等待平台给开发者打款" },
    9: { content: "平台已给开发者打款，等待开发者收款" },
    10: { content: "开发者已收款，项目已完成，请对此次合作评价", to: "/workbench/evaluateEmployer/" },
    12: { content: "项目已评价" },
  },
  developer: {
    5: { content: "已接单，等待雇主托管项目款" },
    6: { content: "项目款已托管，可以正式进入开发" },
    7: { content: "开发已完成，发起验收请求", to: "/xxx" },
    8: { content: "项目已验收，等待平台打款" },
    9: { content: "平台已打款，请及时接收项目款", to: "/xxx" },
    10: { content: "已收款，项目已完成，请对此次合作评价", to: "/xxx" },
    11: { content: "项目已评价" }
  }
};

export default {
  data() {
    return {
      colorList: {
        1: "#FFC800",
        2: "#1966D2",
        3: "#F03362",
        0: "#35B45C",
      },
      wantDeveloperList: [],
      wantDevloperDialogVisible: false,
    }
  },
  computed: {
    timeline() { //根据登录者身份，显示对应的 timeline 文本
      const userInfo = getUserInfo();
      if (userInfo) {
        let { roles } = JSON.parse(userInfo);
        if (roles.includes('employer')) {
          return timelineInfo.employer;
        }
        return timelineInfo.developer;
      }
    }
  },
  methods: {
    getWantDeveloperList(projectId) {
      this.axios.post('/project/getWantDeveloperListByProjectId', {}, {
        params: {
          projectId: projectId
        }
      }).then(res => {
        this.wantDeveloperList = res
        this.wantDevloperDialogVisible = true
      })
    }
  }
}