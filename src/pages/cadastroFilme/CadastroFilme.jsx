// import { Fragment } from "react";

import { use, useEffect, useState } from "react";
import api from "../../Services/services"
import Swal from 'sweetalert2'
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroFilme = () => {
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [filme, setFilme] = useState("")

      function alertar(icone, mesagem) {
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


    async function cadastrarFilme(e) {
        e.preventDefault();
        //tratemento de exceção
        if (filme.trim() != "") {

            try {
                await api.post("filme", {titulo: filme, idGenero: genero  })
                alertar("success", "Sucesso! Cadastro realizado com sucesso")
                setFilme("");
                setGenero("");
            } catch (error) {
                console.log(error);
            }

        }else{
            alertar("error", "Erro! preencha o campos")
        }
        // alert("aaaaaaaa");
    }
    //funcao par trazer os generos do meu select
    async function listarGeneros() {
        try {
            const resposta = await api.get("genero");
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarGeneros();
    }, []);

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Filme"
                    campoPlaceholder="Filme"

                    lista={listaGenero}

                    funcCadastro={cadastrarFilme}

                    valorInput={filme}
                    //atribuindo a função que atualiza o meu genero:
                    setValorInput={setFilme}

                    valorSelect={genero}
                    setValorSelect={setGenero}
                />
                <Lista
                    nomeLista="Lista de Filme"
                />
            </main>
            <Footer />
        </>
    )
}
export default CadastroFilme;