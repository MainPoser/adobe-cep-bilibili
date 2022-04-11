<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import adobe_cep from '@/assets/adobe-cep'

export default {
  name: 'AboutView',
  mounted() {
    adobe_cep.saySomething()
  }
}
</script>
