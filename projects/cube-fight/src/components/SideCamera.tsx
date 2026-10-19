import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function SideCamera({ enabled }: { enabled: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    if (enabled) {
      // верх камеры по оси z
      camera.up.set(0, 0, 1);
      //  камера смотрит спереди
      camera.position.set(600, -1000, 800);
      //  камера смотрит сзади
      // camera.position.set(-2000, 3000, 2000);
      camera.zoom = 0.7;
    } else {
      // верх камеры по оси y
      camera.up.set(0, 1, 0);
      // камера смотрит вниз
      camera.position.set(0, 0, 500);
      camera.zoom = 1;
    }
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }, [enabled, camera]);
  return null;
}
