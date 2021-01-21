<template>
  <td>
    <div class="cell">
      <slot>{{ text }}</slot>
    </div>
  </td>
</template>

<script>
export default {
  name: "table-col",
  props: {
    text: { type: String, required: false, default: "" },
  },
}
</script>
