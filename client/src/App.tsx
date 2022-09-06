import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loggedInState } from "./atom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
@@ -51,26 +52,27 @@
border-spacing: 0;
}
* {
  box-sizing: border-box;
  list-style:none;
}
body {
  font-weight: 300;
  // font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.2;
  background:#2C3333;
}
a {
  text-decoration:none;
  color:inherit;
}

`;

function App() {
  const [isLogin, setIsLogin] = useRecoilState(loggedInState);

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      setIsLogin(true);
    }
  });

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
}

export default App;
