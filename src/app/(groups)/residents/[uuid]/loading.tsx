import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-green-200 p-4 shadow">
        <figure className="drop-shadow">
          <div className="banner bg-contain bg-no-repeat" style={{ backgroundImage: `url(/minecraft/steve.png)` }} />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <LoaderCircle className="size-7 animate-spin" />
                <span className="badge badge-sm bg-gray-400" title="Loading"></span>
              </div>
              <div className="badge badge-lg">
                <LoaderCircle className="size-4 animate-spin" />
              </div>
            </div>

            <p>Resident of</p>
            <i>Joined</i>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="badge badge-lg bg-indigo-400 text-black">
              <LoaderCircle className="mr-1 size-4 animate-spin" /> plots
            </div>
            <div className="badge badge-info badge-lg">
              <LoaderCircle className="mr-1 size-4 animate-spin" /> friends
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">About</h2>
      <LoaderCircle className="animate-spin" />
      <hr />
      <h2 className="text-xl font-black">Residence</h2>
      <LoaderCircle className="animate-spin" />
      <hr />
      <h2 className="text-xl font-black">Friends (0)</h2>
      <LoaderCircle className="animate-spin" />
    </section>
  );
}
