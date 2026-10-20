import type { RefObject } from "react";

type HeadTrackingDebugPanelProps = {
  debug: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
  isCameraOn: boolean;
  isActive: boolean;
  isFaceDetected: boolean;
  isError: boolean;
  status: string;
  positionX: number;
  positionY: number;
  positionZ: number;
};

function formatPosition(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(3)}`;
}

export default function HeadTrackingDebugPanel(
  props: HeadTrackingDebugPanelProps,
) {
  const {
    debug,
    videoRef,
    isCameraOn,
    isActive,
    isFaceDetected,
    isError,
    status,
    positionX,
    positionY,
    positionZ,
  } = props;

  return (
    <section
      aria-hidden={!debug}
      className={
        debug
          ? "fixed bottom-2 right-2 z-20 w-52 border border-red-500 p-3 text-white  backdrop-blur-sm sm:bottom-5 sm:right-5 text-xs"
          : "pointer-events-none fixed -left-[10000px] top-0 z-[-1] w-52 opacity-0"
      }
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />

        {debug && !isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center px-3 text-center ">
            Камера недоступна
          </div>
        )}
      </div>

      {debug && (
        <>
          <div className="my-2 flex items-center gap-2">
            <span
              className={`h-2 w-2  ${
                isError
                  ? "bg-red-500"
                  : isFaceDetected
                    ? "bg-green-400"
                    : isActive
                      ? "bg-amber-400"
                      : "bg-slate-500"
              }`}
            />{" "}
            <p className="">
              Камера:{" "}
              {isCameraOn ? "включена" : isError ? "ошибка" : "подключение"}
            </p>
          </div>

          <p className={` ${isError && "text-red-400"}`}>{status}</p>

          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="">X</span>
              <span className="text-sm tabular-nums">
                {formatPosition(positionX)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="">Y</span>
              <span className="text-sm tabular-nums">
                {formatPosition(positionY)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="">Z</span>
              <span className="text-sm tabular-nums">
                {formatPosition(positionZ)}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
