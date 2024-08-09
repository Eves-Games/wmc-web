export default function Loading() {
  return (
    <section className="space-y-4">
      <div className="skeleton p-4 shadow">
        <div className="banner" />
      </div>
      <h2 className="text-xl font-black">Settings</h2>
      <div className="skeleton h-6 shadow" />
      <hr />
      <h2 className="text-xl font-black">Board</h2>
      <div className="skeleton h-6 shadow" />
      <hr />
      <h2 className="text-xl font-black">Nation</h2>
      <div className="skeleton h-16 shadow" />
      <hr />
      <h2 className="text-xl font-black">Residents</h2>
      <div className="skeleton h-16 shadow" />
    </section>
  );
}
