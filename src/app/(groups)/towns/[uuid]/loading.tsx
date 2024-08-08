import { Banner } from "@/banners";

export default async function Loading() {
  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-base-200 p-4 shadow">
        <figure className="drop-shadow-lg">
          <Banner baseColour="white-dye" primaryPattern={null} secondaryPattern={null} />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div className="skeleton h-full w-1/2" />

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div className="skeleton h-6 w-1/2" />
            <button className="btn btn-outline">Join Town</button>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">Settings</h2>
      <div className="grid auto-cols-max grid-flow-col gap-2">
        <div className="badge skeleton badge-lg">PVP</div>
        <div className="badge skeleton badge-lg">Fire Spread</div>
        <div className="badge skeleton badge-lg">Hostile Mobs</div>
        <div className="badge skeleton badge-lg">Explosions</div>
      </div>
      <hr />
      <h2 className="text-xl font-black">Board</h2>
      <div className="skeleton h-6" />
      <hr />
      <h2 className="text-xl font-black">Residents</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
        <div className="flex flex-col items-center">
          <div className="size-24 p-2">
            <div className="skeleton size-full" />
          </div>
          <div className="skeleton h-8 w-full rounded-lg shadow" />
        </div>
      </div>
    </section>
  );
}
