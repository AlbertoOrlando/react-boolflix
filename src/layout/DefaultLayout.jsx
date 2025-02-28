import { Outlet } from "react-router-dom";
import Header from "./../components/Header"; // Importazione corretta

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}