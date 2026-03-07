import Page from './[assesmentId]/page'

function Total() {
  return (
//    <div className="min-h-screen bg-background text-foreground p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
//   {/* Left Column: Glass UI Components */}
//   <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
    
//     {/* Buttons Section */}
//     <section className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-6">
//       <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Buttons & Actions</h2>
//       <div className="flex flex-wrap gap-4">
//         <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:opacity-90 focus:ring-2 focus:ring-ring focus:ring-offset-2">
//           Start Project
//         </button>
//         <button className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border transition-all hover:bg-accent focus:ring-2 focus:ring-ring">
//           Secondary
//         </button>
//         <button className="p-2.5 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
//         </button>
//       </div>
//     </section>

//     {/* Input Section */}
//     <section className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-4">
//       <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Inputs</h2>
//       <div className="space-y-4">
//         <div className="relative">
//           <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
//           </span>
//           <input 
//             type="text" 
//             placeholder="Search projects..." 
//             className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none transition-all"
//           />
//         </div>
//         <select className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring outline-none appearance-none">
//           <option>Select option</option>
//           <option>Liquid Glass</option>
//           <option>Matte Finish</option>
//         </select>
//       </div>
//     </section>

//     {/* Selection Controls */}
//     <section className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-6">
//       <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Toggles</h2>
//       <div className="flex items-center space-x-8">
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input type="checkbox" className="sr-only peer" />
//           <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//         </label>
//         <div className="flex p-1 bg-muted rounded-lg border border-border">
//           <button className="px-4 py-1.5 bg-background shadow-sm rounded-md text-sm font-medium">Tabs</button>
//           <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">Toast</button>
//         </div>
//       </div>
//     </section>

//     {/* List / Suggestion UI */}
//     <section className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-4">
//       <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Suggestions</h2>
//       <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
//         <div className="px-4 py-3 bg-primary/5 text-primary text-sm font-medium">Pastel #1</div>
//         <div className="px-4 py-3 bg-background hover:bg-accent text-sm transition-colors cursor-pointer">Pastel #2</div>
//         <div className="px-4 py-3 bg-background hover:bg-accent text-sm transition-colors cursor-pointer">Pastel #3</div>
//       </div>
//     </section>
//   </div>

//   {/* Right Column: Cards & Specialized Displays */}
//   <div className="md:col-span-4 space-y-8">
    
//     {/* Neumorphic/Glass Travel Card */}
//     <article className="overflow-hidden rounded-lg border border-border bg-card shadow-lg transition-transform hover:scale-[1.02]">
//       <div className="relative h-48">
//         <img 
//           src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
//           alt="Mount Rainier" 
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
//           <div>
//             <h3 className="text-white font-bold text-lg drop-shadow-md">Horseshoe Ridge</h3>
//             <p className="text-white/80 text-xs">Mount Rainier Mountain</p>
//           </div>
//           <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-bold">
//             $720
//           </span>
//         </div>
//       </div>
//       <div className="p-5 space-y-4">
//         <div>
//           <p className="text-sm font-medium">Washington, USA</p>
//           <p className="text-xs text-muted-foreground">Southwest of Mount St. Helens</p>
//         </div>
//         <div className="grid grid-cols-3 gap-2 py-3 border-t border-border">
//           <div className="text-center">
//             <p className="text-[10px] uppercase text-muted-foreground">Distance</p>
//             <p className="text-sm font-bold">29km</p>
//           </div>
//           <div className="text-center border-x border-border">
//             <p className="text-[10px] uppercase text-muted-foreground">Elevation</p>
//             <p className="text-sm font-bold">29km</p>
//           </div>
//           <div className="text-center">
//             <p className="text-[10px] uppercase text-muted-foreground">Duration</p>
//             <p className="text-sm font-bold">7-9hr</p>
//           </div>
//         </div>
//         <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2">
//           <span>View Map</span>
//           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
//         </button>
//       </div>
//     </article>

//     {/* Upgrade Card */}
//     <div className="p-6 rounded-lg border border-border bg-linear-to-br from-primary/10 via-background to-accent/20 shadow-sm relative overflow-hidden">
//       <div className="relative z-10 space-y-4">
//         <div>
//           <h4 className="font-bold">Invite member</h4>
//           <p className="text-sm text-muted-foreground">Upgrade plan to add more seats</p>
//         </div>
//         <button className="w-full py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors flex items-center justify-center gap-2">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
//           Upgrade plan
//         </button>
//       </div>
//       {/* Decorative blurred circle */}
//       <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
//     </div>

//   </div>
// </div>

    <Page/>
  )
}

export default Total