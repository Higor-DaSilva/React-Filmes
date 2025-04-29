import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
const CadastroGenero = () => {
    return(
       <>
            <Header/>
            <main>
                <Cadastro 
                tituloCadastro="Cadastro de Gênero"
                visibilidade="none"
                campoPlaceholder="Gênero"
                />
                <Lista
                 nomeLista="Lista de Gênero"
                 visi_lista="none"
                 />
            </main>
            <Footer/>
       </>
    )
}

export default CadastroGenero;