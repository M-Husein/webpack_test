/** 
 * @type {import('tailwindcss').Config} 
 * @DOCS : https://tailwindcss.com/docs/configuration
 */

module.exports = {
  // For Tailwind's base/reset styles
  // corePlugins: {
	// 	preflight: false,
	// },
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    // 
    "./public/**/*.{html,php}",
    "./sources/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {

    },
  },
  plugins: [

  ],
}

