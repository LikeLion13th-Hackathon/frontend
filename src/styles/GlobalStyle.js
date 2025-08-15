// 전역 스타일 (글꼴)
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body {
    margin: 0;
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic',
                 'NanumBarunGothic', system-ui, -apple-system, 'Segoe UI',
                 Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
  }
  button, input, textarea, select { font: inherit; } 
`;
