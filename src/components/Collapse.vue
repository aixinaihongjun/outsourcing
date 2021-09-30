<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-31 14:51:40
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-31 18:38:52
-->
<template>
  <div class="project-info ls-widget">
    <div class="qm-widget-title flex" :class="{'border-b':!isCollapse}">
      <span class="flex"><i :class="['icon',icon]"></i>{{title}}</span>
      <i @click="isCollapse = !isCollapse" :class="{'qm-collapse':isCollapse}" class="icon down fa fa-angle-up"></i>
    </div>
    <div :class="{'content-collapse':isCollapse}" class="qm-widget-content">
      <div class="content item">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  props: ["title", "icon", "isShow"],
  data() {
    return {
      isCollapse: !this.$props.isShow,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 30px;
  margin-right: 10px;
}
.border-b {
  border-bottom: 1px solid #e5e5e5;
  transition: all ease 0.5s;
}
.qm-widget-title {
  padding: 15px 0;
  margin: 0 20px;
  color: #000000;
  font-size: 18px;
  justify-content: space-between;
  .down {
    cursor: pointer;
    transition: all ease 0.5s;
    font-size: 20px;
    &.qm-collapse {
      transform: rotate(-180deg);
    }
    &::before {
      color: rgb(93, 91, 91);
    }
  }
}
.qm-widget-content {
  transition: max-height ease 1s;
  transition-delay: -0.4s;
  overflow: hidden;
  max-height: 2000px;
  .icon {
    color: #1966d2;
    font-size: 20px;
  }
  &.content-collapse {
    max-height: 0;
  }
  .item {
    padding: 0 15px;
  }
  .content {
    padding: 10px 20px;
    li {
      display: flex;
      align-items: center;
      margin: 20px 0;
      .title {
        font-size: 18px;
        margin-right: 30px;
        white-space: nowrap;
      }
      a:last-child span {
        display: none;
      }
    }
  }
}
</style>