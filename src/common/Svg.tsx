import { colors } from "../../tailwind.config";
import * as Svgs from "../assets/icons";

const SvgIcons = {
  ...Svgs,
};

export type SvgName = keyof typeof SvgIcons;

type SvgOptions = {
  size?: {
    width?: number;
    height?: number;
  };
  color?: keyof typeof colors;
  fillColor?: keyof typeof colors;
  viewBox?: string;
};

export default function Svg({
  icon,
  options,
}: {
  icon: SvgName;
  options?: SvgOptions;
}) {
  const SvgComponent = SvgIcons[icon];

  return (
    <div className="flex justify-center items-center">
      <SvgComponent
        width={options?.size?.width}
        height={options?.size?.height}
        viewBox={options?.viewBox || "0 0 24 24"}
        stroke={options?.color ? colors[options.color] : "none"}
        fill={options?.fillColor ? colors[options.fillColor] : "none"}
      />
    </div>
  );
}
