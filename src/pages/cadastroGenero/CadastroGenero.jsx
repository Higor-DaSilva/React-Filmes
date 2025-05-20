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

    //Só criamos 
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);


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

    async function cadastrarGenero(evt) {
        evt.preventDefault();
        //verificar se o input está vindo vazio
        if (genero.trim() !== "") {
            //try => tentar(o esperado)
            //catch => lança a exceção
            try {
                //cadastrar um gènero: post
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro realizado com sucesso")
                setGenero("");
                //atualizar a minha lista assim que cadastrarm um novo gênero
                listarGenero();
            } catch (error) {

                alertar("error", "Erro! entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alertar("warning", "Preencha o campo")
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
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá desfazer esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`genero/${generoId.idGenero}`);
                alertar("success", "Gênero Excluido!")
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        });
    }
    listarGenero();

    async function editarGenero(genero) {
        //console.log(genero);
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique o gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {

                    return "O campo precisa ser preenchido!";
                }
            }
        });
        if (novoGenero) {
                try {
                        api.put(`genero/${genero.idGenero}`, {nome: novoGenero});
                        Swal.fire(`O gênero modificado ${novoGenero}`);
                    } catch (error) {
                        console.log(error);
                    }
        }
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