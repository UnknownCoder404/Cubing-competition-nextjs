import { SvgProps } from "@/app/Types/svg";
type Props = {
    headingLevel: 3 | 4 | 5;
} & SvgProps;

function Header3Svg(props: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            {...props}
        >
            <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H600v-80h160v-80H520v-80h240q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H520Z" />
        </svg>
    );
}
function Header4Svg(props: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            {...props}
        >
            <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm600 0v-120H520v-280h80v200h120v-200h80v200h80v80h-80v120h-80Z" />
        </svg>
    );
}
function Header5Svg(props: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            {...props}
        >
            <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-80h240v-80H520v-240h320v80H600v80h160q33 0 56.5 23.5T840-440v80q0 33-23.5 56.5T760-280H520Z" />
        </svg>
    );
}

export default function HeaderSvg(props: Props) {
    const { headingLevel, ...rest } = props;
    switch (headingLevel) {
        case 3:
            return <Header3Svg {...rest} />;
        case 4:
            return <Header4Svg {...rest} />;
        case 5:
            return <Header5Svg {...rest} />;
        default:
            throw new Error("Invalid heading level");
    }
}
