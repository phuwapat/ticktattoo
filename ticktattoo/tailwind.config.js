/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'use-grey' : '#D9D9D9',
        'gray-card': '#E1E1E1',
      },
      screens: {
        'xs': '480px',    // สำหรับหน้าจอขนาดเล็กมาก
        'sm': '640px',    // สำหรับหน้าจอขนาดเล็ก
        'md': '768px',    // สำหรับหน้าจอขนาดกลาง
        'lg': '1024px',   // สำหรับหน้าจอขนาดใหญ่
        'xl': '1280px',   // สำหรับหน้าจอขนาดใหญ่มาก
        '2xl': '1536px',  // สำหรับหน้าจอขนาดใหญ่สุด
        'custom': '1096px' // ตั้งค่า breakpoint ที่กำหนดเอง
      }
    },
  },
  plugins: [],
}