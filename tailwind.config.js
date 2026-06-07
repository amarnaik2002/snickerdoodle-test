export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:        '#D4400A',
          'orange-lt':   '#E8622E',
          'orange-dk':   '#A83008',
          'orange-pale': '#F5C9A8',
          'orange-mist': '#FAE8DC',
          cream:         '#F5E8D5',
          'cream-lt':    '#FBF5EC',
          'cream-dk':    '#EDD9BE',
          white:         '#FFFDF9',
          'brown-dk':    '#2C1810',
          'brown-ink':   '#1E0A04',
          'brown-mid':   '#6B3A2A',
          'brown-lt':    '#9E6B54',
          'brown-muted': '#C4A090',
        }
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        script:  ['Dancing Script', 'cursive'],
        body:    ['Lora', 'serif'],
      }
    }
  }
}