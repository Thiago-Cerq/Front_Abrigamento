import { Route, Routes } from "react-router-dom";

import Components from "./Components/Components";
import Modules from "./Pages/modules/modules";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Components />} children={[
                <Route path="modules" element={<Modules />}/>
            ]}/>
        </Routes>
    )
}

export default MainRoutes