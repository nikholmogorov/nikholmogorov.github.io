import { useProgress, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import DesktopOnlyGuard from "./components/DesktopOnlyGuard";
import DraggableCube from "./components/DraggableCube";
import Panel from "./components/Panel";
import Platform from "./components/Platform";
import SideCamera from "./components/SideCamera";
import Spinner from "./components/Spinner";

import { CUBES_INITIAL_POSITION, FIELD_SIZE, RING_TEXTURE_PATHS, SKIN_TEXTURE_PATHS } from "./constants";
import type { CubeId, CubeSkin, CubesDisposition, CubesSkins, Position } from "./types";
import { generateDisconnectedPositions, getNextCubesDisposition } from "./utils";

Object.values(SKIN_TEXTURE_PATHS).forEach((paths) => {
  useTexture.preload(paths);
});

Object.values(RING_TEXTURE_PATHS).forEach((paths) => {
  useTexture.preload(paths);
});

export default function App() {
  const [selectedCube, setSelectedCube] = useState<CubeId | null>(null);
  const [disposition, setDisposition] = useState<CubesDisposition>({
    positions: CUBES_INITIAL_POSITION,
    isCubesConnected: false,
  });
  const [cubesSkins, setCubesSkins] = useState<CubesSkins>({
    first: "skin-blue",
    second: "skin-red",
  });
  const [sideView, setSideView] = useState(true);

  const { active, progress, total } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    if (active || total === 0 || progress < 100) return;
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [active, progress, total]);

  function handlePositionChange(id: CubeId, nextPosition: Position, isSnapped = false) {
    setDisposition((prev) => getNextCubesDisposition(prev, id, nextPosition, isSnapped));
  }

  function handleSetSkin(skin: CubeSkin) {
    if (!selectedCube) return;
    setCubesSkins((prev) => ({
      ...prev,
      [selectedCube]: skin,
    }));
  }

  function handleDisconnectCubes() {
    setDisposition({
      positions: generateDisconnectedPositions(),
      isCubesConnected: false,
    });
  }

  function handleChangeView() {
    setSideView((prev) => !prev);
  }

  return (
    <div className="flex justify-center items-center h-[95vh]">
      <DesktopOnlyGuard>
        <div className="h-[800px] w-[800px]">
          <Canvas
            orthographic
            camera={{
              left: -FIELD_SIZE / 2,
              right: FIELD_SIZE / 2,
              top: FIELD_SIZE / 2,
              bottom: -FIELD_SIZE / 2,
              near: 0.1,
              far: 5000,
              position: [0, 0, 500],
              zoom: 1,
            }}
          >
            <SideCamera enabled={sideView} />
            <ambientLight intensity={0.75} />
            <directionalLight
              position={[300, -400, 800]}
              intensity={1.5}
            />
            <Platform />
            {/* <gridHelper
            // при 16 - шаг сетки 50
            args={[FIELD_SIZE, 16, "#000000", "#ffffff"]}
            position={[0, 0, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          /> */}

            <DraggableCube
              id="first"
              skin={cubesSkins.first}
              position={disposition.positions.first}
              otherPosition={disposition.positions.second}
              isAttached={disposition.isCubesConnected}
              isSelected={selectedCube === `first`}
              onSelect={setSelectedCube}
              onPositionChange={handlePositionChange}
            />

            <DraggableCube
              id="second"
              skin={cubesSkins.second}
              position={disposition.positions.second}
              otherPosition={disposition.positions.first}
              isAttached={disposition.isCubesConnected}
              isSelected={selectedCube === `second`}
              onSelect={setSelectedCube}
              onPositionChange={handlePositionChange}
            />
          </Canvas>
        </div>

        <div className="ml-12.5">
          <Panel
            sideView={sideView}
            onDisconnectCubes={handleDisconnectCubes}
            isCubesConnected={disposition.isCubesConnected}
            onChangeView={handleChangeView}
            selectedSkin={selectedCube ? cubesSkins[selectedCube] : null}
            onSetSkin={handleSetSkin}
          />
        </div>

        {showLoader && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #333333 0%, #000000 100%)",
            }}
          >
            <div className="flex flex-col items-center gap-4 nes-container with-title w-[300px] bg-red-800 border-red-950!">
              <p className="self-start title text-black bg-red-800!">CUBE FIGHT</p>
              <Spinner
                variant="diamond"
                className="size-20 text-black"
              />
              <p className="loader-text text-xl tracking-[2px] text-black">LOADING...</p>
            </div>
          </div>
        )}
      </DesktopOnlyGuard>
    </div>
  );
}
