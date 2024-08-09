export default function Loading() {
  return (
    <section className="space-y-4">
      <div className="skeleton p-4 shadow">
        <div className="banner" />
      </div>
      <h2 className="text-xl font-black">About</h2>
      <div className="skeleton h-6 shadow" />
      <hr />
      <h2 className="text-xl font-black">Residence</h2>
      <div className="skeleton h-16 shadow" />
      <hr />
      <h2 className="text-xl font-black">Friends</h2>
      <div className="skeleton h-16 shadow" />
    </section>
  );
}
