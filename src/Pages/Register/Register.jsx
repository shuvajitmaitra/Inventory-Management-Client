import loginBg from "../../assets/login-tree.jpg"

const Register = () => {


    return(
        <div className="min-h-screen flex py-20 justify-center items-center flex-col space-y-10 bg-zinc-100 ">
        <h4 className="text-5xl font-bold text-[#373737]">SignUp Now!</h4>
    <div
     className="min-h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
       <div className=" flex-1 hidden md:flex items-center">
        <img src={loginBg} className="p-6 block right-0 left-0 h-full object-contain" />
       </div>
       <form className="card-body flex-1">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" placeholder="name" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="email" placeholder="email" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Image url</span>
      </label>
      <input type="text" placeholder="image url" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input type="password" placeholder="password" className="input input-bordered" required />
    </div>
    <div className="form-control mt-6">
      <button className="btn bg-[#7cb518]">Sign Up</button>
    </div>
    <div className="btn btn-outline text-xl my-6 border-2 hover:bg-[#7cb518] hover:text-white hover:border-none border-[#7cb518] text-[#7cb518]">
        Sign with Google
    </div>
  </form>

    </div>
</div>
    )}
export default Register;