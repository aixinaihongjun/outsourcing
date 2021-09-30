<template>
  <section class="page-title">
    <div class="auto-container">
      <div class="title-outer">
        <h1>{{ title }}</h1>
        <p>{{ desc }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  p {
    position: relative;
    display: block;
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>