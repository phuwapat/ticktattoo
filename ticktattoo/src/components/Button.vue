<template>
    <button
      :class="buttonClass"
      @click="handleClick"
    >
      <!-- Slot for button content -->
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'ButtonComponent',
    props: {
      type: {
        type: String,
        default: 'button'
      },
      variant: {
        type: String,
        default: 'primary', // can be 'primary', 'secondary', etc.
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      buttonClass() {
        // Apply different styles based on the 'variant' prop
        let baseClasses = 'px-4 py-2 w-48 rounded text-white font-bold transition duration-300';
        let variantClasses = '';
  
        switch (this.variant) {
          case 'primary':
            variantClasses = 'bg-blue-500 hover:bg-blue-600';
            break;
          case 'secondary':
            variantClasses = 'bg-gray-500 hover:bg-gray-600';
            break;
          case 'success':
            variantClasses = 'bg-green-500 hover:bg-green-600';
            break;
          case 'danger':
            variantClasses = 'bg-red-500 hover:bg-red-600';
            break;
          default:
            variantClasses = 'bg-blue-500 hover:bg-blue-600';
        }
  
        return `${baseClasses} ${variantClasses}`;
      }
    },
    methods: {
      handleClick(event) {
        // Emit a click event only if the button is not disabled
        if (!this.isDisabled) {
          this.$emit('click', event);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  </style>