import ArrowLoaderStyle from "./ArrowLoader.module.css";
import loaderStyles from "./Loader.module.css";
import { CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
  "--loader-color": string;
}

type ArrowLoaderProps = {
  color?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ArrowLoader(props: ArrowLoaderProps) {
  const { color = "#000", className, ...rest } = props;
  const style: CustomCSSProperties = { "--loader-color": color };

  return (
    <div
      className={`${ArrowLoaderStyle["loader"]} ${className || ""}`}
      style={style}
      {...rest}
    ></div>
  );
}

export function Loader() {
  return <div className={loaderStyles["loader"]}></div>;
}
