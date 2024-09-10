import { createGlobalStyle } from 'styled-components'
import 'react-mde/lib/styles/css/react-mde-all.css';

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

  .mde-box {
    border-width: 0;
  }

  .mde-toolbar {
    border-width: 0;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .mde-textarea-dark {
    color: #fff;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #1f1f1f;
    border: 1px solid #424242 !important;
  }

  .mde-textarea-light {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #d9d9d9 !important;
  }
`
