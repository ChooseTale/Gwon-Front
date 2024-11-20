import {
  Viewer as ToastViewer,
  type ViewerProps,
} from "@toast-ui/react-editor";

export default function Viewer({ ...rest }: ViewerProps) {
  return <ToastViewer {...rest} />;
}
