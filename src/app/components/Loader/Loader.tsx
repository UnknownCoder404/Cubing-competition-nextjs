import ArrowLoaderStyle from "./ArrowLoader.module.css";
import { CSSProperties } from "react";

interface CustomCSSProperties extends CSSProperties {
  "--loader-color": string;
}

type ArrowLoaderProps = {
  color?: string;
};

export function ArrowLoader(props: ArrowLoaderProps) {
  const color = props.color || "#000";
  const style: CustomCSSProperties = { "--loader-color": color };

  return <div className={ArrowLoaderStyle["loader"]} style={style}></div>;
}