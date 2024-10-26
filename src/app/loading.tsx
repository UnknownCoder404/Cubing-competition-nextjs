import { Loader } from "./components/Loader/Loader";

export default function LoadingPage() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <Loader />
        </div>
    );
}
