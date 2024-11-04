<template>
  <div class="container-home">
    <section class="one">
      <div class="content-one">
        <h1>TICKTATTOO</h1>
        <p>Ink Your Story, Find Your Artist.</p>
        <p>
          A tattoo gallery website showcasing studio artwork for those who want
          to choose tattoo using their own decision.
        </p>
        <button v-if="!isLoggedIn" class="btn-signup" @click="openRegister">Join Us!</button>
      </div>
    </section>
    <section class="two">
      <div class="content-two">
        <div>
          <h2>ROLE that We Have</h2>
          <p>knows your role</p>
        </div>
        <div>
          <div class="card-container">
            <RoleCardComponent
              :background-image="require('../../public/assets/user_role.png')"
            >
              <template #description>
                <li>Discover your ideal tattoo</li>
                <li>Choose the studio that fits your needs</li>
                <li>Choose the designer that matches your style</li>
                <li>Available to chatting with studio or designer</li>
              </template>
              <template #role> User </template>
            </RoleCardComponent>
            <RoleCardComponent
              :background-image="
                require('../../public/assets/designer_role.png')
              "
            >
              <template #description>
                <li>Posting your tattoo gallery</li>
                <li>Can do same thing as user</li>
              </template>
              <template #role> Designer </template>
            </RoleCardComponent>
            <RoleCardComponent
              :background-image="require('../../public/assets/studio_role.png')"
            >
              <template #description>
                <li>Posting your tattoo gallery</li>
                <li>Show your location of your studio</li>
                <li>Can do same thing as user</li>
              </template>
              <template #role> Studio </template>
            </RoleCardComponent>
          </div>
        </div>
      </div>
    </section>
    <section class="three">
      <header>
        <h2>CATEGORY</h2>
        <p>choose your best fit</p>
      </header>
      <div class="category-container">
        <div class="category-item blackwork">
          <div class="overlay"><a href="#">Blackwork Tattoo</a></div>
        </div>
        <div class="category-item watercolor">
          <div class="overlay"><a href="#">Water Color Tattoo</a></div>
        </div>
        <div class="category-item geometric">
          <div class="overlay"><a href="#">Geometric Tattoo</a></div>
        </div>
        <div class="category-item pointillism">
          <div class="overlay"><a href="#">Pointillism Tattoo</a></div>
        </div>
        <div class="category-item surrealism">
          <div class="overlay"><a href="#">Surrealism Tattoo</a></div>
        </div>
      </div>
    </section>
    <FooterComponent />
  </div>
  <ParentComponent @is-login="handleLogin" ref="parentComponent" />
</template>
<script>
import FooterComponent from "@/components/Footer.vue";
import ParentComponent from "@/components/ParentComponent.vue";
import RoleCardComponent from "@/components/RoleCardComponent.vue";

export default {
    name:'HomePage',
    components:{
        RoleCardComponent,
        ParentComponent,
        FooterComponent
    },
    // data(){
    //   return{
    //     isLogin: false
    //   }
    // },
    methods:{
        openRegister(){
            this.$refs.parentComponent.openSelectPopup()
        },
        // handleLogin(){
        //   this.isLogin = true;
        // }
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      }
    }

};
</script>
<style scoped>
    .container-home{
        width: 100%;
        height: 100vh;
        scroll-snap-type: y mandatory;
    }
    section{
        width: 100%;
        height: 100vh;
        display: flex;
        scroll-snap-align: start;
    }

    .one{
        color: white;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
    }
    .one::before{
        content: ' ';
        background-image: url(../../public/assets/home-bg-1.png);
        display: block;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.9;
    
    }
    .content-one{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 900px;
    }
        .content-one h1{
            font-size: 6.25rem;
            font-weight: 600;
            margin-bottom: 30px;
            letter-spacing: 10px;
        }
        .content-one :nth-child(3){
            font-size: 1.6rem;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 500;
            word-spacing: 2px;
        }
        .content-one :nth-child(2){
            position: absolute;
            font-size: 1.2rem;
            right: 130px;
            top:120px;
            font-weight: 500;
        }
    .btn-signup{
        width: 190px;
        height: 56px;
        border-radius: 30px;
        border: 4px solid white;
        background-color: transparent;
        color:white;
        font-size: 1.6rem;
        font-weight: 400;
        cursor: pointer;
        transition: 0.5s ;

    }
    .btn-signup:hover{
        border: 4px solid transparent;
        color:white;
        background-color: green;
    }
    .two{
        background-color: black;
    }
    .content-two{
        width: 100%;
        height: 100vh;
        margin-top: 80px;
        color:white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
        .content-two div:nth-child(1){
            text-align: center;
            
        }
        .content-two div:nth-child(1) h2{
            margin-bottom: 20px;
            font-size: 2.4rem;
            font-weight: 600;
        }
        .content-two div:nth-child(1) p{
            margin-bottom: 30px;
            font-size: 1.6rem;
            font-weight: 600;
        }
    .card-container{
        display: flex;
        flex-direction: row;
        gap: 40px;
    }

    .three{
        background-color: black;
        display: flex;
        flex-direction: column;
    }
        .three header{
            margin-left: 40px;
            color: white;
            position: absolute;
            justify-content: center;
            align-items: center;
            text-align: left;
            z-index: 999;
        }
        .three h2{
            margin-bottom: 20px;
            margin-top: 40px; 
            font-size: 6rem;
            font-weight: 600;
            
        }
        .three p{
            margin-bottom: 30px;
            font-size: 2rem;
            font-weight: 400;
            
        }
    .category-container{
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        color: white;
        gap: 5px;
        margin: 5px;
    }
        .blackwork{
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),url("../../public/assets/blackwork-img.jpg");
            background-position: 25% 25%;
            background-repeat: no-repeat;
            background-size: cover; 

        }
        .watercolor{
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),url("../../public/assets/water-color-img.jpg");
            background-position: 50% 25%;
            background-repeat: no-repeat;
            background-size: cover; 
        }
        .geometric{
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),url("../../public/assets/geometric-img.jpg");
            background-position: 50% 25%;
            background-repeat: no-repeat;
            background-size: cover; 
        }
        .pointillism{
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),url("../../public/assets/Pointillism-img.jpg");
            background-position: 50% 25%;
            background-repeat: no-repeat;
            background-size: cover; 
        }
        .surrealism{
            background-image: linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),url("../../public/assets/Surrealism-img.jpg");
            background-position: 50% 25%;
            background-repeat: no-repeat;
            background-size: cover; 
        }

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Starting background color */
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.5s ease, background-color 0.5s ease;
  text-decoration: none;
  font-size: 1.5rem;
}
.overlay a {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
}

.category-container div {
  position: relative;
}

.category-container :hover .overlay {
  opacity: 1;
  text-decoration: none;
}
</style>
