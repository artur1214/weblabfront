import { render } from "react-dom";
import {
    BrowserRouter,
    Route, Routes
} from "react-router-dom";
import App from "./App";
import MedicineTable from "./Elements/medicine/MedicineTable";
import MainPage from "./Elements/MainPage";
import 'antd/dist/antd.css';
import LoginPage from "./Elements/LoginPage";
import VKAuthPage from "./Elements/auth/VKAuthPage";
const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="" element={<MainPage />} />
                <Route path="medicine" element={<MedicineTable />} />
                <Route path="login" element={<LoginPage/>}/>
                <Route path="vk" element={<VKAuthPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
    rootElement
);