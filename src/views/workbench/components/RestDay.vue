<!--
 * @Description: 剩余天数
 * @Autor: 孙婧雯
 * @Date: 2021-08-30 09:20:12
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-30 19:42:42
-->
<template>
  <div class="rest ls-widget">
    <div class="qm-widget-title flex align-items-center"><i class="qingmeng-icon icon-caution-line-blue"></i> 过期提醒</div>
    <div class="qm-widget-content">
      <div class="rest-day-box" v-if="restDay>0"><span class="rest-day">{{restDay}}</span><span class="day">天</span></div>
      <div class="rest-day-box" v-else><span class="rest-day">已过期</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["restDay"],
};
</script>

<style lang="scss" scoped>

.rest-day-box {
  display: flex;
  align-items: baseline;
  justify-content: center;
}
.rest-day {
  font-size: 52px;
  font-weight: bold;
  color: #dc1000;
}
.day {
  font-size: 30px;
  font-weight: 400;
  color: #000;
}

.qm-widget-content {
}
</style>