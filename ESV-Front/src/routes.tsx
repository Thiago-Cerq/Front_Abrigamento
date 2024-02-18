import { Route, Routes } from "react-router-dom";
import Components from "./Components/Components";

// Modulos
import Modules from "./Pages/modules/modules";
import Abrigamento from "./Pages/abrigamento-temporario/abrigamento"; 
import AbrigamentoCadastro from "./Pages/abrigamento-temporario-cadastro/abrigamento-temporario-cadastro";
import AbrigamentoEdita from "./Pages/abrigamento-temporario-edita/abrigamento-temporario-edita";


function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Components />} children={[
                <Route path="/" element={<h1>ESTA É A HOME PAGE</h1>}/>,
                <Route path="modulos" element={<Modules />}/>,

                <Route path="modulo-abrigamento-temporario" element={<Abrigamento/>}/>,
                <Route path="modulo-abrigamento-temporario-cadastro" element={<AbrigamentoCadastro/>}/>,

                <Route path="modulo-abrigamento-temporario-edita/:id" element={<AbrigamentoEdita/>}/>,

                <Route path="modulo-alimentacao" element={<h1>alimentacao</h1>}/>,
                <Route path="modulo-direcoes-e-enderecos-uteis" element={<h1>direcoes-e-enderecos-uteis</h1>}/>,
                <Route path="modulo-assistencia-juridica-gratuita" element={<h1>assistencia-juridica-gratuita</h1>}/>,
                <Route path="modulo-tratamento-ao-uso-de-drogas" element={<h1>tratamento-ao-uso-de-drogas</h1>}/>,
                <Route path="modulo-outros-servicos" element={<h1>outros-servicos</h1>}/>,

                <Route path="funcionarios" element={<h1>ESTA É A PAGINA DE FUNCIONARIOS</h1>}/>,
            ]}/>
        </Routes>
    )
}

export default MainRoutes


