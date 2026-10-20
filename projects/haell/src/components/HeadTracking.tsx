import type { HeadTrackingProps } from "../types";
import HeadTrackingDebugPanel from "./HeadTrackingDebugPanel";
import { useHeadTracking } from "./useHeadTracking";

export default function HeadTracking(props: HeadTrackingProps) {
  const tracking = useHeadTracking(props);

  return <HeadTrackingDebugPanel debug={props.debug ?? false} {...tracking} />;
}
