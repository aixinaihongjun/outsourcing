<!--
 * @Description: 排序列表组件
 * @Autor: 孙婧雯
 * @Date: 2021-08-23 10:21:02
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-23 12:20:14
 * @使用指南:「
    属性 
      v-model | object: 设置和获取当前排序方式,格式要求与list中的一样
      list | array: 排序按钮配置
        格式要求：[ {
          title：按钮名字,
          sort：初始排序方式,
          key：对应的接口的参数名
        } ]
    方法
      @change: 修改排序方式以后被调用
 」
-->
<template>
  <div class="sort-by">
    <strong>排序：</strong>
    <ul class="sort-group">
      <li v-for="item in list" :key="item.key">
        <a
          :class="{ active: active.key == item.key }"
          @click.prevent="changeSort(item)"
          href="#"
        >
          {{ item.title }}
          <span
            v-show="active.key == item.key && active.sort == 'desc'"
            class="fa fa-angle-down"
          ></span>
          <span
            v-show="active.key == item.key && active.sort == 'asc'"
            class="fa fa-angle-up"
          ></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
    sortBy: {},
  },
  model: {
    prop: "sortBy",
    event: "click",
  },
  data() {
    return {
      active: this.sortBy,
    };
  },
  methods: {
    changeSort(obj) {
      if (this.active.key == obj.key) {
        // 已经处于激活状态了，再次点击修改排序方式
        this.active.sort = this.active.sort == "asc" ? "desc" : "asc";
      } else {
        this.active = obj;
      }
      this.$emit("click", this.active);
      this.$emit("change");
    },
  },
};
</script>

<style lang="scss">
.sort-group {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.sort-group li {
  position: relative;
  margin-right: 5px;
  a {
    position: relative;
    background: #ffffff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
    color: #696969;
    padding: 5px 20px;
    &.active {
      background: #d4e1f6;
      color: #1967d2;
    }
    &:hover {
      @extend .active;
    }
    .icon {
      font-size: 8px;
    }
  }
}
</style>
