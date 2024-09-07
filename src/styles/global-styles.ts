import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Ubuntu;
    src: url(/assets/fonts/Ubuntu-Title.ttf)
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #f5f5f5;
  }

  #root {

  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .markdown-container {
    font-family: inherit; /* Inherit font from parent */
    line-height: 1.6; /* Optional: improve readability */
    color: inherit; /* Optional: inherit text color */
  }

  .markdown-container h1,
  .markdown-container h2,
  .markdown-container h3,
  .markdown-container p,
  .markdown-container code {
      font-family: inherit; /* Ensure all text inherits the font */
      color: inherit; /* Ensure all text inherits the color */
  }

  .markdown-container code {
      background-color: #f4f4f4; /* Optional: background for inline code */
      padding: 2px 4px; /* Optional: padding for inline code */
      border-radius: 4px; /* Optional: rounded corners for inline code */
  }

`
