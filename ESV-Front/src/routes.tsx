import { Route, Routes } from "react-router-dom";

import Components from "./Components/Components";
import Modules from "./Pages/modules/modules";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Components />} children={[
                <Route path="/" element={<h1>ESTA É A HOME PAGE</h1>}/>,
                <Route path="modulos" element={<Modules />}/>,
                <Route path="modulos/assistencia-juridica-gratuita" element={<h1>assistencia-juridica-gratuita</h1>}/>,
                <Route path="modulos/tratamento-ao-uso-de-drogas" element={<h1>tratamento-ao-uso-de-drogas</h1>}/>,

                <Route path="funcionarios" element={<h1>ESTA É A PAGINA DE FUNCIONARIOS</h1>}/>,
            ]}/>
        </Routes>
    )
}

export default MainRoutes