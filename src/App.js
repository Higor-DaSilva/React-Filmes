//chamar as telas do index.js
import './App.css';
import CadastroFilme from './pages/cadastroFilme/CadastroFilme';
// import Login from './pages/login/Login';

function App() {
  return (
    <>
     {/* Chamar as páginas */}
     {/* // <Login/> */}
     <CadastroFilme/>
    </>

  );
}
//export : exporta o codigo de forma padrao
export default App;
