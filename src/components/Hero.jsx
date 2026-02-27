
const Hero = () => {
  return (
    <section
    id= "home"
    className='pt-28 lg:pt-36'
    >

    <div className='container items-center lg:grid lg:grid-cols-2 lg:gap-10  bg-zinc-900 text-white'>

  {/* ===== LEFT SIDE ===== */}
  <div>
    <div className='flex items-center gap-3'>

    <div className='flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide'>

        <span className='relative w-2 h-2 rounded-full bg-emerald-400'>
            <span className='absolute inset-0 rounded-full bg-emerald-400 animate-ping'>

            </span>

        </span>
                We are Available for freelance projects
    </div>
    </div>


<h1 className="font-extrabold bg-linear-to-r from-yellow-400 via-lime-400 to-green-500 bg-clip-text text-transparent mt-5 mb-20 md:text-7xl p-7">
  Digitale Projekte, die begeistern
</h1>

                <p className="text-zinc-300 mb-6 md:text-lg max-w-xl">
                  Herzlich willkommen auf unserem digitalen Portfolio! Wir sind Robin und Kevin, leidenschaftliche Fullstack-Webentwickler. Wir entwickeln smarte, skalierbare und kreative Webanwendungen, die Spaß machen und echten Mehrwert bieten.
                </p>


</div>
   {/* ===== RIGHT SIDE ===== */}
<div className='hidden lg:block'>
<figure className='w-full max-w-120 ml-auto bg-linear-to-t from-sky-400 via-25% via-sky-400/40 to-65% rounded-[60px] overflow-hidden'>
<img
src="/assets/img/heroplaceholder.png" 
alt='Kevin Hasler'
width={656}
height={80}

className='w-full'

/>
</figure>

</div>

</div>



    </section>
  )
}

export default Hero