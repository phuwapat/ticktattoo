<template>
    <div>
      <div class="card" :style="{ backgroundImage: `url(${backgroundImage})` }"> 
        <ul class="desc"><slot name="description"></slot></ul>
      </div>
      <h3><slot name="role"></slot></h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoleCard',
    props: {
      backgroundImage: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    width: 350px;
    height: 450px;
    border-radius: 30px;
    background-color: white;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden; 
    transition: 0.5s ease; 
  }
  
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); 
    transition: background-color 0.5s ease; 
  }
  
  .card:hover::before {
    background-color: rgba(0, 0, 0, 0.7); 
  }
  .desc{
    opacity: 0;
    color: white;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    list-style: disc; 
    padding-top: 20px;
    padding-left: 20px;
    transition: 0.5s;
    font-size: 1.2rem;
    text-align: start;
    word-wrap: break-word; 
    word-break: break-word; 
    position: relative; 
    z-index: 1; 
  }

  .card:hover .desc {
    opacity: 1; 
  }
  .desc > * {
    padding-bottom: 20px;
  }
  h3{
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: 600;
    
  }
  </style>
  