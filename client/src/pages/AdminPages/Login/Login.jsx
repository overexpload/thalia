function Login() {
  return (
    <>
      <div className="min-w-full min-h-screen bg-background">
        <div className="w-full h-screen flex justify-center py-16">
          <div className="w-1/4 h-96 bg-gray-800 rounded-md">
            <form action="" onSubmit={""}>
              <div className="py-4">
                <h1 className="text-center py-5 text-primary text-2xl font-bold">
                  Login
                </h1>
              </div>
              <div className="px-4">
                <label htmlFor="">
                  <h1 className="text-text">Enter your email</h1>
                  <input type="text" className="w-full rounded-md mt-2" />
                </label>
                <div className="mt-2">
                  <label htmlFor="">
                    <h1 className="text-text">Password</h1>
                    <input type="text" className="w-full rounded-md mt-2" />
                  </label>
                </div>
              </div>
              <div className="flex justify-center px-2 py-10">
                <button className="bg-primary text-black px-4 py-1 rounded">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
