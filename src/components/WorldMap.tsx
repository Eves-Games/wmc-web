interface WorldMapProps {
  coordinates?: {
    x: number;
    z: number;
  };
}

export default function WorldMap({ coordinates }: WorldMapProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-box pt-[56.25%] shadow">
      <iframe
        src={`https://map.worldmc.net/?world=minecraft_overworld${coordinates && `&zoom=5&x=${coordinates.x}&z=${coordinates.z}`}`}
        className="absolute left-0 top-0 h-full w-full"
        allowFullScreen
      />
    </div>
  );
}
