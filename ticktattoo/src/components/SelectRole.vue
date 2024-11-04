<template>
    <div class="popup">
        <div class="popup-content">
            <span class="close-btn" @click="closePopup">&times;</span>
            <div class="content">
                <p>Hi There!</p>
                <h1>Sign Up </h1>
                <h2>as </h2>
                <div class="content-btn">
                    <button @click="selectRoleAndRegister('USER')">USER</button>
                    <button @click="selectRoleAndRegister('DESIGNER')">DESIGNER</button>
                    <button @click="selectRoleAndRegister('STUDIO')">STUDIO</button>
                </div>
                <p class="signup-text">Already Have An Account? &nbsp;<a href="#" @click="openLogin">Sign In</a></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'SelectRole',
methods: {
    openLogin() {
        this.closePopup();
        this.$emit('open-login'); 
    },
    closePopup() {
        this.$emit('close-popup'); 
    },
    selectRole(role) {
        this.$emit('role-selected', role);
    },
    selectRoleAndRegister(role) {
        this.closePopup();
        this.selectRole(role); 
        this.$emit('open-register'); 
        // console.log(role);
    }
}

}
</script>
<style scoped>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
    
    .popup-content {
        background-color: white;
        border-radius: 40px;
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        position: relative;
    }
    
    .content {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        position:relative;
    }
        .content h1 {
            text-align: center;  
            width: 100%;  
            margin: 0; 
            font-size: 3.5rem;
            font-weight: 400;
        }
        .content h2{
            font-size:2rem;
            margin-bottom: 20px;
        }
        .content p {
            text-align: center;  
            width: 100%;  
            margin: 0; 
        }
        .content .signup-text{
            text-align: center;
            color: gray;
        }
    
    a{
        color: black;
        text-decoration: none;
    }
    
    form{
        display: inherit;
        flex-direction: column;
        width: 100%;
    }
    .content-btn{
        display:flex;
        gap:20px;
    }
    button {
        width: 200px; 
        height: 40px; 
        min-width:200px;
        background-color: white; 
        border:3px black solid;
        color: black;
        cursor: pointer; 
        display: block; 
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 20px;
    }
        button:hover{
            background-color:black;
            color:white;
        }
    
    p{
        font-size: 1rem;
    }
    .close-btn{
        position: absolute;
        left:2%;
        top:2%;
        font-size: 2rem;
        cursor: pointer;
        height: fit-content;
    }
</style>