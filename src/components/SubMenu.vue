<template>
  <el-sub-menu :index="item.id + ''">
    <template v-slot:title>
      {{ item.name }}
    </template>
    <template v-for="(child) in item.children">
      <SubMenu v-if="child.children" :item="child" :key="child.id"></SubMenu>
      <el-menu-item v-else :key="child.id" :index="child.id + ''">
        {{ child.name }}
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script>

export default {
  name: 'SubMenu',
  props: ['item'],
}
</script>