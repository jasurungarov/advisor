/* eslint-disable @next/next/no-img-element */


function Page() {
  return (
    <div className="min-h-screen bg-[#e2e5e9] dark:bg-slate-950 p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
  
  {/* Main Glass Dashboard Container (Inspired by Image 1 & 2) */}
  <main className="lg:col-span-8 relative group">
    <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent rounded-[2rem] blur-2xl -z-10"></div>
    
    <div className="relative overflow-hidden bg-white/30 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/40 dark:border-slate-700/30 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Top Left: Logo & Glass Buttons */}
      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Liquid Glass Kit</h1>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-[10px]">D</div>
            <div className="w-6 h-1 bg-slate-400 rounded-full mt-2.5"></div>
          </div>
        </header>

        <div className="space-y-4">
          {/* Secondary Purple Pill */}
          <button className="w-full py-4 px-6 rounded-full bg-linear-to-r from-[#9d72ff] to-[#7b4dff] text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_-5px_rgba(123,77,255,0.4)] hover:brightness-110 transition-all border-t border-white/30">
            secondary
          </button>
          
          {/* Secondary Teal Pill */}
          <button className="w-full py-4 px-6 rounded-full bg-linear-to-r from-[#50c9c3] to-[#3eb0ac] text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_-5px_rgba(62,176,172,0.4)] hover:brightness-110 transition-all border-t border-white/30">
            Secondary
          </button>
        </div>

        {/* Search & Inputs */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-lg border border-white/50 text-xl font-light">+</button>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-inner"></div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Create workspace" 
              className="w-full py-3 px-5 bg-white/60 dark:bg-slate-800/40 border border-white/40 rounded-full outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Workspace</span>
            <span className="text-emerald-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Complex Widgets */}
      <div className="space-y-6">
        {/* Project Search Glass Card */}
        <div className="p-1 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[1.5rem] shadow-xl">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">M</div>
              <div className="w-8 h-8 rounded-full border-2 border-primary/30 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="flex-1 py-2 px-4 bg-white/80 dark:bg-slate-900/60 rounded-full text-sm border border-white/20"
              />
              <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">+</button>
            </div>
          </div>
        </div>

        {/* Small Toggles Row */}
        <div className="flex gap-4">
          <div className="flex-1 p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-between px-5">
            <span className="text-sm font-medium">Search...</span>
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>

        {/* Gradient Member Card (Bottom Right Image 1) */}
        <div className="p-6 rounded-[2rem] bg-linear-to-br from-rose-200/50 via-purple-200/50 to-cyan-200/50 dark:from-purple-900/20 dark:to-cyan-900/20 backdrop-blur-3xl border border-white/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:bg-white/50 transition-all"></div>
          <div className="relative z-10 space-y-4">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">Invite member</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Upgrade plan</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-slate-800 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all">
              <span className="text-lg">+</span> Upgrade plan
            </button>
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-6 border-2 border-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  </main>

  {/* Side Column (Inspired by Image 4 Travel Card) */}
  <aside className="lg:col-span-4 space-y-8">
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-1">
      <div className="relative h-64">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
          alt="Nature" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div className="text-white">
            <h2 className="text-xl font-bold">Horseshoe Ridge</h2>
            <p className="text-xs text-white/70">Mount Rainier Mountain</p>
          </div>
          <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-bold text-sm">
            $720
          </div>
        </div>
      </div>
      
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Washington, USA</p>
            <p className="text-xs text-muted-foreground italic">southwest of Mount St. Helens</p>
          </div>
          <button className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 shadow-inner">
            <svg className="w-5 h-5 rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50">
          <div className="text-center space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Distance</p>
            <p className="font-bold text-sm">29km</p>
          </div>
          <div className="text-center space-y-1 border-x border-border/50">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Elevation</p>
            <p className="font-bold text-sm">29Km</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Duration</p>
            <p className="font-bold text-sm">7-9hr</p>
          </div>
        </div>
      </div>
    </div>
  </aside>

</div>
  )
}

export default Page