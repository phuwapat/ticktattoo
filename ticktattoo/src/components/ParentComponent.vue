<template>
  <LoginPopup v-if="showLogin" @open-select="openSelectPopup" @close-popup="closePopups" @is-login="isLogin"/>
  <SelectRole v-if="showSelect" @open-login="openLoginPopup"  @role-selected="handleRoleSelected" @close-popup="closePopups" />
  <RegisterPopup v-if="showRegister" @open-login="openLoginPopup" @close-popup="closePopups" :role="selectedRole"/>

</template>

<script>
import LoginPopup from '@/components/LoginPopup.vue';
import RegisterPopup from '@/components/RegisterPopup.vue';
import SelectRole from '@/components/SelectRole.vue';

export default {
  components: {
    LoginPopup,
    RegisterPopup,
    SelectRole,

  },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      showSelect: false,
      isModalVisible: false,
      selectedRole: '', 
    };
  },
  methods: {
    openLoginPopup() {
      this.showLogin = true;
      this.showRegister = false;
      this.showSelect = false;
      this.isModalVisible = true;
      document.body.classList.add('no-scroll');
    },
    openRegisterPopup() {
      this.showLogin = false;
      this.showRegister = true;
      this.showSelect = false;
      this.isModalVisible = true;
      document.body.classList.add('no-scroll');
    },
    openSelectPopup() {
      this.showLogin = false;
      this.showRegister = false;
      this.showSelect = true;
      this.isModalVisible = true;
      document.body.classList.add('no-scroll');
    },
    closePopups() {
      this.showLogin = false;
      this.showRegister = false;
      this.showSelect = false;
      this.isModalVisible = false;
      document.body.classList.remove('no-scroll');
    },
    isLogin() {
      this.$emit('is-login');
    },
    handleRoleSelected(role) {
      console.log('Selected role:', role);
      this.selectedRole = role; 
      this.openRegisterPopup(); 
    },
  },
};
</script>