

const CreateShop = () => {

    const inputStyle = "focus:border-b-2 focus:border-[#7cb518] focus:outline-none text-[#7cb518] border-b-2 border-zinc-300 pb-3 w-full font-medium" 
    return(
        <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
        <h4 className="text-5xl font-bold text-[#373737]">Create Your Shop!</h4>
    <div
     className="h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
       <form className="card-body">
   <div className="md:flex gap-6 mb-6">
      <input type="text" placeholder="Shop Name" className={inputStyle} required />
      <input type="text" placeholder="Shop Logo" className={inputStyle} required />
   </div>
   <div className="md:flex gap-6 mb-6">
      <input type="text" placeholder="Shop Info" className={inputStyle} required />
      <input type="password" placeholder="Shop Location" className={inputStyle} required />
   </div>
   <div className="md:flex gap-6 mb-6">
      <input type="text" placeholder="Shop-Owner Name" className={inputStyle} required />
      <input type="text" placeholder="Shop-Owner Email" className={inputStyle} required />
   </div>
    <div className="form-control mt-6">
      <button className="btn bg-[#7cb518] text-lg hover:text-[#7cb518] font-medium text-white">Create Shop</button>
    </div>
  </form>

    </div>
</div>
    )}
export default CreateShop;