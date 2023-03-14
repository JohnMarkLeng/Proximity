import '@/styles/globals.css'
import { createGlobalStyle } from "styled-components";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config, dom } from "@fortawesome/fontawesome-svg-core";


// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;


const GlobalStyles = createGlobalStyle`
    ${dom.css()}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
       <GlobalStyles/>
       <Component {...pageProps}/> 
    </>

  );
  
}
