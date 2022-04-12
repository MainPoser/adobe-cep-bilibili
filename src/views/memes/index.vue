<template>
  <div class="memes">
    <h1>This is an memes page{{msg}}</h1>
  </div>
</template>

<script>

export default {
  name: 'MemeView',
  data() {
    return {
      msg: 'B站热梗',
    }
  }
}
</script>
