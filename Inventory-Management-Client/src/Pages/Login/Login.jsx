import loginBg from "../../assets/login-tree.jpg"

const Login = () => {


    return(
        <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
            <h4 className="text-5xl font-bold text-[#373737]">Login Now!</h4>
        <div
         className="h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
           <div className="h-96 flex-1 hidden md:flex items-center">
            <img src={loginBg} className="p-6 block right-0 left-0 h-full object-contain" />
           </div>
           <form className="card-body flex-1">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-[#7cb518]">Login</button>
        </div>
      </form>

        </div>
   </div>
    )}
export default Login;