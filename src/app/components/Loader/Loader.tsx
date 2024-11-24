import { clsx } from "clsx";
import loaderStyles from "./Loader.module.css";

export function Loader() {
    return <div className={clsx(loaderStyles["loader"])}></div>;
}
