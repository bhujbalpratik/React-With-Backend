const Loader = () => {
  return (
    <div className="p-3 max-w-lg mx-auto text-white animate-pulse">
      <h1 className="text-3xl text-center font-semibold my-7">Loading...</h1>
      <div className="flex flex-col gap-6">
        <label className="ml-1">Username</label>
        <input
          type="text"
          id="email"
          className="bg-white/20 p-3 rounded-lg"
          required
          readOnly
        />

        <label className="ml-1">Email</label>
        <input
          type="text"
          id="password"
          className="bg-white/20 p-3 rounded-lg"
          required
          readOnly
        />
      </div>
    </div>
  )
}
export default Loader
