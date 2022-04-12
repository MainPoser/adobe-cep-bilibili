<template>
  <div class="articles">
    <h1>This is an articles page{{msg}}</h1>
  </div>
</template>

<script>

export default {
  name: 'AboutView',
  data() {
    return {
      msg: '文章',
    }
  }
}
</script>
