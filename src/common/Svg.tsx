import { colors } from "../../tailwind.config";
import {
  arrowDownRightIcon,
  arrowRightIcon,
  bookOpenIcon,
  cameraIcon,
  cameraFillIcon,
  changeImageButtonIcon,
  chevronDownIcon,
  chevronLeftIcon,
  chevronRightIcon,
  chevronUpIcon,
  clockIcon,
  cornerDownRightIcon,
  cpu1Icon,
  editIcon,
  filterIcon,
  gitCommitIcon,
  link2Icon,
  linkIcon,
  plusIcon,
  robotSolidIcon,
  settingsIcon,
  slidersActiveIcon,
  slidersIcon,
  slidersWhiteIcon,
  socialGoogleButtonIcon,
  taleIcon,
  userIcon,
  usersProfilesIcon,
  xCircleIcon,
  xGrayscaleIcon,
  xIcon,
} from "../assets/icons";

const SvgIcons = {
  arrowDownRightIcon,
  arrowRightIcon,
  bookOpenIcon,
  cameraIcon,
  cameraFillIcon,
  changeImageButtonIcon,
  chevronDownIcon,
  chevronLeftIcon,
  chevronRightIcon,
  chevronUpIcon,
  clockIcon,
  cornerDownRightIcon,
  cpu1Icon,
  editIcon,
  filterIcon,
  gitCommitIcon,
  link2Icon,
  linkIcon,
  plusIcon,
  robotSolidIcon,
  settingsIcon,
  slidersActiveIcon,
  slidersIcon,
  slidersWhiteIcon,
  socialGoogleButtonIcon,
  taleIcon,
  userIcon,
  usersProfilesIcon,
  xCircleIcon,
  xGrayscaleIcon,
  xIcon,
};

export type SvgName = keyof typeof SvgIcons;

type SvgOptions = {
  size?: {
    width?: number;
    height?: number;
  };
  color?: keyof typeof colors;
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
      />
    </div>
  );
}
