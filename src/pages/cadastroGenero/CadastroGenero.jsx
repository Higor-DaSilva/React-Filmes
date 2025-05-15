import { useEffect, useState } from "react";
import api from "../../Services/services"

//importar o sweet alert    
import Swal from 'sweetalert2'

//importação de componentes:
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {

    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);


    function alerta(icone, mesagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mesagem
        });
    }

    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //verificar se o input está vindo vazio
        if (genero.trim() !== "") {
            //try => tentar(o esperado)
            //catch => lança a exceção
            try {
                //cadastrar um gènero: post
                await api.post("genero", { nome: genero });
                alerta("success", "Cadastro realizado com sucesso")
                setGenero("");
            } catch (error) {

                alerta("error", "Erro! entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alerta("warning", "Preencha o campo")
        }
    }

    async function listarGenero() {
        try {
            const resposta = await api.get("genero");
            // console.log(resposta.data[3]);
            setListaGenero(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }
    
    //criar função de excluir o genero
    async function excluirGenero(generoId) {
        try {
            await api.delete(`genero/${generoId.idGenero}`);
            alerta("success", "Gênero excluído!");
            // Atualiza a lista após exclusão
        } catch (error) {
            alerta("error", "Erro ao excluir gênero.");
            console.log(error);
        }
        listarGenero();
    }
    
    function editarGenero(){
        alert("clicouuu")
    }
    
        //assim que a página renderizar, o método listarGenero() será chamado
        useEffect(() => {
            listarGenero();
        }, [genero])
    
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    campoPlaceholder="Gênero"
                    //atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    //atribuindo o valor do input:
                    valorInput={genero}
                    //atribuindo a função que atualiza o meu genero:
                    setValorInput={setGenero}

                />
                <Lista
                    nomeLista="Lista de Gênero"
                    visi_lista="none"

                    lista={listaGenero}
                    excluirGenero={excluirGenero}
                    editarGenero={editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;

// teste: validar o  genero
//     useEffect(() => {
//         console.log(genero);
//     }, [genero]);
// fim do teste


//assincrona => espera algo/resposta para ir para outro bloco de código