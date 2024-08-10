export default function Loading() {
  return (
    <section className="space-y-4">
      <div className="skeleton p-4 shadow">
        <div className="banner" />
      </div>
      <h2 className="text-xl font-black">Tax</h2>
      <div className="skeleton p-4 shadow">
        <div className="h-6" />
        <div className="h-5" />
      </div>
      <hr />
      <h2 className="text-xl font-black">Board</h2>
      <div className="skeleton h-6 shadow" />
      <hr />
      <h2 className="text-xl font-black">Towns</h2>
      <div className="skeleton h-16 shadow" />
      <hr />
      <h2 className="text-xl font-black">Allies</h2>
      <div className="skeleton h-16 shadow" />
      <hr />
      <h2 className="text-xl font-black">Enemies</h2>
      <div className="skeleton h-16 shadow" />
    </section>
  );
}
