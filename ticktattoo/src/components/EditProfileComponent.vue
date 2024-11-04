<template>
  <div class="edit-profile-component">
    <label :for="label">{{ label }}</label>
    <input
      :type="type"
      :id="label"
      :value="value"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field"
    />
  </div>
</template>

<script>
export default {
  name: 'EditProfileComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      required: true,
    },
  },
  emits: ['update:value'],
  watch: {
    value(newValue) {
      this.$emit('update:value', newValue);
    },
  },
};
</script>

<style scoped>
.edit-profile-component {
  margin-bottom: 16px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 5px;
  background-color: #f8f8f8; /* Light gray background */
  transition: border-color 0.3s ease; /* Animation on focus */
}

.input-field:focus {
  border-color: #000; /* Black border on focus */
  outline: none; /* Remove outline */
}
</style>
