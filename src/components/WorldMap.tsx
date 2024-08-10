interface WorldMapProps {
  coordinates?: {
    x: number;
    z: number;
  };
  zoom: number;
}

export default function WorldMap({ coordinates, zoom }: WorldMapProps) {
  coordinates = {
    x: coordinates?.x || 0,
    z: coordinates?.z || 0,
  };

  return (
    <div className="relative w-full overflow-hidden rounded-box pt-[56.25%] shadow">
      <iframe
        src={`https://map.worldmc.net/?world=minecraft_overworld&zoom=${zoom}&x=${coordinates.x}&z=${coordinates.z}`}
        className="absolute left-0 top-0 h-full w-full"
        allowFullScreen
      />
    </div>
  );
}
