import "./Lista.css";

// Importação de imagens:
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.nomeLista}</h1>
            <hr />

            <div className="tabela">
                <table>
                    {/* Cabeçalho da tabela: */}
                    <thead>
                        {/* tr => Table Row */}
                        <tr className="table_cabecalho">
                            {/* th => Table Head */}
                            <th> Nome </th>
                            <th style={{ display: props.visi_lista }}> Gênero </th>
                            <th> Editar </th>
                            <th> Excluir </th>
                        </tr>
                    </thead>
                    {/* tbody => Corpo da Tabela */}
                    <tbody >
                        {/*Verificar se a lista está vazia */}
                        {props.lista && props.lista.length > 0 ? (
                            //vamos mapear os intens da lista
                            props.lista.map((item) => (
                                //dando um identificador ára cada linha da lista
                                <tr className="item_lista" key={item.idGenero}>
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    <td data-cell="Gênero" style={{ display: props.visi_lista }}> Terror </td>
                                    <td data-cell="Editar">
                                        <img
                                            src={Editar} 
                                            alt="caneta"
                                            onClick={props.editarGenero}
                                        />
                                    </td>
                                    <td data-cell="Excluir">
                                        <img
                                            src={Excluir}
                                            alt="Lixeira"
                                            onClick={() => (props.excluirGenero(item))}
                                        />
                                    </td>
                                </tr>
                            ))

                        ) : (
                            <p>Nenhum gênero foi encontrado.</p>
                        )

                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;