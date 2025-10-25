// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/Spotify-Clone/',
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Define the base path for GitHub Pages
const REPO_NAME = 'Spotify-Clone'; // Replace with your exact repository name
const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/';

export default defineConfig({
  // 💡 CRITICAL FIX: Set the base path
  base: BASE_PATH, 
  
  plugins: [react()],
})
