import { useState, useRef, useEffect } from "react";

const T = {
  moss:"#7BBFA3",accent:"#5BAA8A",sage:"#A8D5BA",mint:"#E8F4F0",
  deep:"#2C3E35",mid:"#6B7C73",snow:"#F9FAFB",
  night:"#1A2420",nightText:"#E8F4EE",nightCard:"#22302A",
  mist:"#B8D4E8",lavender:"#D4B8E0",sand:"#F5ECD7",
  bazar:"#3d2e1a",bazarM:"#5c4420",school:"#1a2d3d",schoolM:"#4a9fc4",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#080f0c;display:flex;justify-content:center;min-height:100vh;padding:20px 16px 40px;}
.phone{width:390px;height:844px;border-radius:48px;overflow:hidden;position:relative;display:flex;flex-direction:column;
  box-shadow:0 0 0 10px #162018,0 0 0 12px #080f0c,0 60px 160px rgba(0,0,0,.85);}
.screen{flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;}
.screen::-webkit-scrollbar{display:none;}
.sbar{height:44px;padding:14px 28px 0;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:600;position:relative;z-index:20;flex-shrink:0;}
.notch{width:120px;height:28px;background:#080f0c;border-radius:0 0 18px 18px;position:absolute;top:0;left:50%;transform:translateX(-50%);}
.nav{height:72px;display:flex;justify-content:space-around;align-items:center;padding:0 2px 8px;border-top:1px solid var(--border);flex-shrink:0;background:var(--bg);z-index:20;}
.ni{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:6px 9px;border-radius:14px;transition:all .2s;font-size:10px;font-weight:500;color:var(--sub);min-width:52px;}
.ni.on{color:#7BBFA3;background:rgba(123,191,163,.12);}
.enter{animation:up .25s ease;}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.btn{background:linear-gradient(135deg,#7BBFA3,#5BAA8A);color:#fff;border:none;border-radius:20px;padding:14px 24px;font-size:14px;font-weight:600;cursor:pointer;width:100%;transition:all .2s;font-family:'DM Sans',sans-serif;}
.btn:hover{opacity:.9;transform:translateY(-1px);}
.btn:disabled{opacity:.35;cursor:not-allowed;transform:none;}
.card{background:var(--card);border-radius:20px;padding:18px;box-shadow:0 2px 16px rgba(44,62,53,.06);border:1px solid var(--border);margin-bottom:12px;}
.inp{background:var(--inp);border:1.5px solid transparent;border-radius:14px;padding:12px 16px;font-size:14px;font-family:'DM Sans',sans-serif;color:var(--text);outline:none;width:100%;}
.inp:focus{border-color:#7BBFA3;}
.stitle{font-family:'Fraunces',serif;font-size:18px;color:var(--text);margin:20px 0 12px;font-style:italic;}
.pbar{height:5px;background:rgba(123,191,163,.15);border-radius:3px;overflow:hidden;}
.pfill{height:100%;background:linear-gradient(90deg,#7BBFA3,#5BAA8A);border-radius:3px;transition:width .6s ease;}
.orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.18;pointer-events:none;}
.toggle{width:44px;height:24px;background:rgba(123,191,163,.2);border-radius:12px;position:relative;cursor:pointer;transition:background .3s;border:none;flex-shrink:0;}
.toggle.on{background:#7BBFA3;}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform .3s;box-shadow:0 1px 4px rgba(0,0,0,.2);}
.toggle.on::after{transform:translateX(20px);}
.scrollrow{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
.scrollrow::-webkit-scrollbar{display:none;}
@keyframes sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
.sway{animation:sway 3s ease-in-out infinite;display:inline-block;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.pulse{animation:pulse 1.4s ease-in-out infinite;}
.msg-in{background:var(--card);color:var(--text);border-radius:4px 20px 20px 20px;padding:12px 16px;font-size:14px;line-height:1.5;max-width:78%;align-self:flex-start;box-shadow:0 1px 8px rgba(44,62,53,.07);}
.msg-out{background:linear-gradient(135deg,#7BBFA3,#5BAA8A);color:#fff;border-radius:20px 4px 20px 20px;padding:12px 16px;font-size:14px;line-height:1.5;max-width:78%;align-self:flex-end;}
.msg-sage{background:linear-gradient(135deg,rgba(123,191,163,.13),rgba(184,212,232,.13));border-left:3px solid #7BBFA3;border-radius:0 16px 16px 0;padding:14px 16px;font-size:13px;line-height:1.6;max-width:90%;align-self:flex-start;}
.qopt{background:rgba(184,212,232,.1);border:1.5px solid rgba(184,212,232,.25);border-radius:14px;padding:13px 16px;margin-bottom:9px;cursor:pointer;font-size:14px;color:var(--text);transition:all .2s;}
.qopt:hover{background:rgba(184,212,232,.22);}
.qopt.ok{background:rgba(123,191,163,.18);border-color:#7BBFA3;}
.qopt.no{background:rgba(232,136,136,.14);border-color:#e88;}
`;

const DATA = {
  products:[
    {e:"🎨",n:"Cuadro abstracto",m:"Sofía M.",p:"$180",bg:"#fce4d6",cat:"Arte"},
    {e:"🧶",n:"Bolsa tejida",m:"Lucas R.",p:"$95",bg:"#e8f4d4",cat:"Textiles"},
    {e:"🍪",n:"Galletas artesanales",m:"María P.",p:"$45",bg:"#fdf4d4",cat:"Comida"},
    {e:"🪴",n:"Suculenta decorada",m:"Tomás G.",p:"$60",bg:"#d4f0e8",cat:"Plantas"},
    {e:"📓",n:"Cuaderno ilustrado",m:"Ana V.",p:"$120",bg:"#e8d4f4",cat:"Papelería"},
    {e:"🧸",n:"Muñeco de tela",m:"Diego S.",p:"$85",bg:"#fde8d4",cat:"Arte"},
    {e:"🕯️",n:"Velas aromáticas",m:"Camila R.",p:"$55",bg:"#f4f0d4",cat:"Hogar"},
    {e:"🎭",n:"Máscara pintada",m:"Mateo L.",p:"$200",bg:"#f4d4e8",cat:"Arte"},
  ],
  subjects:[
    {i:"🔢",n:"Matemáticas",p:68,c:"#4a9fc4",total:8,done:5},
    {i:"📖",n:"Lenguaje",p:45,c:"#7BBFA3",total:10,done:4},
    {i:"🔬",n:"Ciencias",p:32,c:"#a0c4a0",total:12,done:4},
    {i:"🌍",n:"Sociales",p:55,c:"#c4a07a",total:8,done:4},
    {i:"🌐",n:"Inglés",p:78,c:"#a07ac4",total:10,done:8},
    {i:"💻",n:"Tecnología",p:20,c:"#7ac4b8",total:6,done:1},
  ],
  universes:[
    {i:"🎮",n:"Videojuegos",m:"2.4k",bg:"linear-gradient(135deg,#1a1a3e,#2d1b4e)",c:"#e0d0ff",active:true},
    {i:"🎨",n:"Arte & Dibujo",m:"1.8k",bg:"linear-gradient(135deg,#2e1a1a,#4e2d1b)",c:"#ffe0d0",active:true},
    {i:"🔭",n:"Astronomía",m:"980",bg:"linear-gradient(135deg,#1a2e3e,#1b3550)",c:"#d0e8ff",active:true},
    {i:"🎵",n:"Música",m:"3.1k",bg:"linear-gradient(135deg,#1e2e1a,#2d4e1b)",c:"#d0ffe0",active:false},
    {i:"🔬",n:"Ciencia",m:"1.2k",bg:"linear-gradient(135deg,#1e1e2e,#2d2d4e)",c:"#d0d0ff",active:false},
  ],
  events:[
    {i:"🔭",n:"Charla Astronomía",d:"Hoy · 19:00",spots:4,total:8,bg:"linear-gradient(135deg,#1a2e3e,#1b3550)",c:"#d0e8ff"},
    {i:"🎮",n:"Noche de Videojuegos",d:"Mañana · 20:00",spots:2,total:8,bg:"linear-gradient(135deg,#1a1a3e,#2d1b4e)",c:"#e0d0ff"},
    {i:"🎨",n:"Taller de Acuarela",d:"Sábado · 16:00",spots:6,total:10,bg:"linear-gradient(135deg,#2e1a1a,#4e2d1b)",c:"#ffe0d0"},
  ],
  greenhouse:[
    {i:"💬",n:"Iniciar conversación",sub:"Cómo empezar sin ansiedad",done:true,total:5,done2:5,c:"#7BBFA3"},
    {i:"👂",n:"Escucha activa",sub:"El arte de estar presente",done:true,total:4,done2:4,c:"#4a9fc4"},
    {i:"🧘",n:"Regulación emocional",sub:"Técnicas antes de interactuar",done:false,total:6,done2:2,c:"#a07ac4"},
    {i:"🤝",n:"Límites saludables",sub:"Decir no sin culpa",done:false,total:5,done2:0,c:"#c4a07a"},
    {i:"🎭",n:"Lectura emocional",sub:"Interpretar texto y tono",done:false,total:7,done2:0,c:"#c47aa0"},
  ],
  badges:[
    {e:"🌱",n:"Primera Semilla",ok:true},{e:"💬",n:"Primera Conversación",ok:true},
    {e:"⏸",n:"Pausa Consciente",ok:true},{e:"🎙",n:"Primera Voz",ok:false},
    {e:"💪",n:"Valentía Pequeña",ok:true},{e:"🌙",n:"Noctámbulo",ok:false},
    {e:"🤝",n:"Encuentro Real",ok:false},{e:"🧠",n:"Mente Entrenada",ok:false},
    {e:"🛍️",n:"Primera Venta",ok:true},
  ],
  weekMoods:["☀️","🌤","🌤","🌧","☀️","🌤","☀️"],
  weekConns:[2,0,3,1,4,2,3],
  lessonSteps:[
    {label:"Ancla",concept:"¿Qué tienen en común una pizza y las fracciones?",visual:"🍕",
      text:"Cuando divides una pizza en 8 porciones y comes 3, ¡ya usas fracciones! Una fracción es una parte de un todo.",type:"info"},
    {label:"Núcleo",concept:"¿Cómo se escribe una fracción?",visual:"½",
      text:"El numerador (arriba) dice cuántas partes tienes. El denominador (abajo) dice en cuántas partes está dividido el todo.",type:"info"},
    {label:"Práctica",concept:"Una pizza tiene 6 porciones y comes 2. ¿Cuál es la fracción?",
      visual:"🍕",type:"quiz",opts:["2/8","2/6","6/2","1/3"],correct:1},
    {label:"Práctica 2",concept:"¿Qué fracción representa la mitad exacta de algo?",
      visual:"✂️",type:"quiz",opts:["2/1","1/4","1/2","3/4"],correct:2},
    {label:"¡Completado!",concept:"¡Dominaste las fracciones básicas!",visual:"🎉",
      text:"Una fracción = partes de un todo. Numerador arriba, denominador abajo. ¡Ya puedes ver fracciones en tu pizza favorita!",type:"celebrate"},
  ],
};


// ── HELPERS ──────────────────────────────────────────────────────
function Pad({c,s={}}){return <div style={{padding:"0 20px",...s}}>{c}</div>;}
function Toggle({on,set}){return <button className={`toggle${on?" on":""}`} onClick={()=>set(!on)}/>;}

function DkHeader({children,grad,style={}}){
  return <div style={{background:grad||`linear-gradient(160deg,${T.night} 0%,#243d32 100%)`,padding:"20px 24px 32px",borderRadius:"0 0 32px 32px",position:"relative",overflow:"hidden",...style}}>
    <div className="orb" style={{width:220,height:220,background:T.moss,top:-80,right:-70}}/>
    {children}
  </div>;
}

function SageAvatar({size=36}){
  return <div style={{width:size,height:size,borderRadius:"50%",background:"linear-gradient(135deg,#7BBFA3,#B8D4E8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.45,flexShrink:0}}>✨</div>;
}

// ── STATUS + NAV ─────────────────────────────────────────────────
function SBar({dark}){
  return <div className="sbar" style={{color:dark?"rgba(232,244,238,.55)":T.mid,background:"transparent"}}>
    <div className="notch"/>
    <span>9:41</span>
    <div style={{display:"flex",gap:5,alignItems:"center",fontSize:10}}>
      <span>●●●</span><span>WiFi</span><span style={{fontSize:12}}>▌</span>
    </div>
  </div>;
}

function Nav({tab,set}){
  const its=[
    {id:"home",i:"🌿",l:"Inicio"},{id:"bazar",i:"🛍️",l:"Mercado"},
    {id:"school",i:"📚",l:"Escuela"},{id:"universe",i:"🌍",l:"Universos"},
    {id:"sage",i:"✨",l:"Sage"},{id:"me",i:"🌸",l:"Yo"},
  ];
  return <div className="nav">
    {its.map(x=><div key={x.id} className={`ni${tab===x.id?" on":""}`} onClick={()=>set(x.id)}>
      <span style={{fontSize:20}}>{x.i}</span>{x.l}
    </div>)}
  </div>;
}

// ── WELCOME ──────────────────────────────────────────────────────
function Welcome({go}){
  return <div className="enter" style={{minHeight:"100%",background:"linear-gradient(160deg,#080f0c,#1A2420 50%,#1e3329)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",textAlign:"center",position:"relative",overflow:"hidden"}}>
    {[{w:300,h:300,bg:T.moss,t:-90,l:-80},{w:240,h:240,bg:T.mist,b:-70,r:-60},{w:160,h:160,bg:T.lavender,t:"40%",r:-30}].map((o,i)=>
      <div key={i} className="orb" style={{width:o.w,height:o.h,background:o.bg,top:o.t,left:o.l,bottom:o.b,right:o.r}}/>
    )}
    <div style={{position:"relative",zIndex:1,width:"100%"}}>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:56,color:T.nightText,fontStyle:"italic"}}>Bloom</div>
      <div style={{fontSize:11,color:T.moss,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",marginBottom:4}}>× openLearn</div>
      <div style={{fontSize:11,color:"rgba(232,244,238,.3)",marginBottom:32,letterSpacing:".04em"}}>Changing the world, one kid at a time</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:19,color:"rgba(232,244,238,.72)",fontStyle:"italic",lineHeight:1.55,marginBottom:36}}>
        "Connect at your own pace.<br/>Bloom at your own time."
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:40}}>
        {["Neurodivergente-friendly","Sin presión","IA empática","Bazar inclusivo","Aprendizaje adaptativo"].map(p=>
          <span key={p} style={{background:"rgba(123,191,163,.1)",border:"1px solid rgba(123,191,163,.2)",borderRadius:20,padding:"5px 13px",fontSize:11,color:"rgba(232,244,238,.65)"}}>{p}</span>
        )}
      </div>
      <button className="btn" style={{maxWidth:270,margin:"0 auto",display:"block"}} onClick={go}>Comenzar mi jardín 🌱</button>
    </div>
  </div>;
}

// ── ONBOARDING ───────────────────────────────────────────────────
const OB=[
  {q:"¿Cómo quieres que te llame?",sub:"Tu nombre, apodo, o lo que prefieras.",type:"text",ph:"Tu nombre..."},
  {q:"¿Qué te trajo aquí?",sub:"Elige lo que más resuene.",type:"opts",opts:[
    {i:"🌱",t:"Hacer amigos a mi ritmo"},{i:"💬",t:"Practicar conversar"},
    {i:"📚",t:"Aprender materias"},{i:"🛍️",t:"Vender mis creaciones"},
  ]},
  {q:"¿Cómo quieres que se sienta la app?",sub:"Puedes cambiarlo cuando quieras.",type:"opts",opts:[
    {i:"🌿",t:"Muy calmada"},{i:"🍃",t:"Equilibrada"},{i:"✨",t:"Activa"},
  ]},
  {q:"Tu ritmo de respuesta",sub:"No hay ritmo incorrecto.",type:"opts",opts:[
    {i:"🐢",t:"Despacio, cuando puedo"},{i:"🦋",t:"A mi aire"},{i:"⚡",t:"Rápido y activo"},
  ]},
  {q:"Configuración sensorial",sub:"Ajustes para tu comodidad.",type:"sensor"},
];

function Onboard({done}){
  const [step,setStep]=useState(0);
  const [name,setName]=useState("");
  const [sel,setSel]=useState(null);
  const [dark,setDark]=useState(false);
  const [slow,setSlow]=useState(true);
  const [anim,setAnim]=useState(true);
  const cur=OB[step];
  const isLast=step===OB.length-1;
  const canNext=cur.type==="text"?true:cur.type==="sensor"?true:sel!=null;

  const next=()=>{
    if(isLast){done(name||"Amigo",dark);return;}
    setStep(s=>s+1);setSel(null);
  };

  return <div style={{minHeight:"100%",background:"linear-gradient(160deg,#080f0c,#1A2420 60%,#1e3329)",display:"flex",flexDirection:"column",padding:"28px 24px 36px",position:"relative",overflow:"hidden"}}>
    <div className="orb" style={{width:260,height:260,background:T.moss,top:-80,right:-70}}/>
    <div className="orb" style={{width:180,height:180,background:T.mist,bottom:-50,left:-50}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1,marginBottom:32}}>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:22,color:T.nightText,fontStyle:"italic"}}>Bloom</div>
      <span style={{fontSize:12,color:"rgba(232,244,238,.35)"}}>{step+1} / {OB.length}</span>
    </div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:24,position:"relative",zIndex:1}}>
      <div>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:28,color:T.nightText,fontStyle:"italic",lineHeight:1.2,marginBottom:8}}>{cur.q}</div>
        <div style={{fontSize:14,color:"rgba(232,244,238,.5)",lineHeight:1.5}}>{cur.sub}</div>
      </div>
      {cur.type==="text"&&<input className="inp" style={{background:"rgba(232,244,238,.07)",color:T.nightText,border:"1px solid rgba(123,191,163,.25)"}} placeholder={cur.ph} value={name} onChange={e=>setName(e.target.value)}/>}
      {cur.type==="opts"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
        {cur.opts.map((o,i)=><div key={i} onClick={()=>setSel(i)} style={{background:sel===i?"rgba(123,191,163,.18)":"rgba(232,244,238,.06)",border:`1px solid ${sel===i?T.moss:"rgba(123,191,163,.2)"}`,borderRadius:16,padding:"15px 18px",color:T.nightText,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:14,fontSize:14}}>
          <span style={{fontSize:22}}>{o.i}</span>{o.t}{sel===i&&<span style={{marginLeft:"auto",color:T.moss}}>✓</span>}
        </div>)}
      </div>}
      {cur.type==="sensor"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
        {[{l:"Modo oscuro",v:dark,s:setDark},{l:"Modo lento (sin presión)",v:slow,s:setSlow},{l:"Animaciones suaves",v:anim,s:setAnim}].map((x,i)=>
          <div key={i} style={{background:"rgba(232,244,238,.06)",border:"1px solid rgba(123,191,163,.18)",borderRadius:16,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:14,color:T.nightText}}>{x.l}</span>
            <Toggle on={x.v} set={x.s}/>
          </div>
        )}
      </div>}
    </div>
    <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:16}}>
      <button className="btn" disabled={!canNext} onClick={next}>{isLast?"Entrar a mi jardín 🌱":"Continuar →"}</button>
      <div style={{display:"flex",gap:6,justifyContent:"center"}}>
        {OB.map((_,i)=><div key={i} style={{height:6,borderRadius:3,background:i===step?T.moss:"rgba(232,244,238,.15)",width:i===step?20:6,transition:"all .3s"}}/>)}
      </div>
    </div>
  </div>;
}


// ── HOME ─────────────────────────────────────────────────────────
function Home({name,dark,goTab}){
  const [mood,setMood]=useState(1);
  const moods=[{e:"☀️",l:"Con energía"},{e:"🌤",l:"Tranquilo"},{e:"🌧",l:"Nublado"},{e:"🌙",l:"Escuchando"},{e:"⛈",l:"No disponible"}];
  return <div className="enter" style={{minHeight:"100%",paddingBottom:16}}>
    <DkHeader>
      <div style={{fontSize:12,color:"rgba(232,244,238,.45)",marginBottom:4}}>Buenos días,</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:26,color:T.nightText,fontStyle:"italic"}}>{name} 🌿</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:14}}>
        {moods.map((m,i)=><div key={i} onClick={()=>setMood(i)} style={{background:mood===i?"rgba(123,191,163,.22)":"rgba(232,244,238,.07)",border:`1px solid ${mood===i?T.moss:"rgba(123,191,163,.18)"}`,borderRadius:20,padding:"6px 13px",fontSize:12,color:T.nightText,cursor:"pointer",display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}>
          {m.e} {m.l}
        </div>)}
      </div>
    </DkHeader>
    <Pad c={<>
      <div className="stitle">Tu jardín esta semana</div>
      <div className="card" style={{background:dark?"linear-gradient(135deg,#1e3028,#243d30)":"linear-gradient(135deg,#e8f4ee,#d4ece0)",border:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <span className="sway" style={{fontSize:48}}>🌿</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:16,color:dark?T.nightText:T.deep,fontStyle:"italic"}}>Tu planta crece</div>
            <div style={{fontSize:12,color:dark?"rgba(232,244,238,.5)":T.mid,marginTop:2}}>11 conexiones este mes</div>
            <div className="pbar" style={{marginTop:10}}><div className="pfill" style={{width:"52%"}}/></div>
            <div style={{fontSize:11,color:dark?"rgba(232,244,238,.4)":T.mid,marginTop:4}}>Nivel 3 · Planta establecida</div>
          </div>
        </div>
      </div>

      <div className="stitle">Resonancias esta semana</div>
      <div className="scrollrow">
        {[{e:"🔭",n:"Luna",t:"Astronomía"},{e:"🎮",n:"Marco",t:"Videojuegos"},{e:"🎨",n:"Paz",t:"Arte"},{e:"🎵",n:"Río",t:"Música"}].map((r,i)=>
          <div key={i} className="card" style={{minWidth:130,flexShrink:0,cursor:"pointer",margin:0,textAlign:"center",padding:"16px 12px"}} onClick={()=>goTab("sage")}>
            <div style={{fontSize:34,marginBottom:8}}>{r.e}</div>
            <div style={{fontSize:13,fontWeight:600,color:dark?T.nightText:T.deep}}>{r.n}</div>
            <div style={{fontSize:11,color:dark?"rgba(232,244,238,.45)":T.mid}}>{r.t}</div>
            <div style={{marginTop:10,background:"rgba(123,191,163,.14)",borderRadius:10,padding:"4px 10px",fontSize:11,color:T.moss,display:"inline-block"}}>Conectar 🌿</div>
          </div>
        )}
      </div>

      <div className="stitle">Accesos rápidos</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[
          {i:"🛍️",l:"Mi tienda",s:"3 productos activos",t:"bazar",bg:dark?"#2d231a":"#f5ecd7"},
          {i:"📚",l:"Continuar lección",s:"Fracciones · 68%",t:"school",bg:dark?"#1a2535":"#e8f4fa"},
          {i:"🌍",l:"Universos",s:"Astronomía activo",t:"universe",bg:dark?"#1e1a2d":"#f0e8f8"},
          {i:"✨",l:"Hablar con Sage",s:"Tu IA acompañante",t:"sage",bg:dark?"#1a2d25":"#e8f4ee"},
        ].map((q,i)=><div key={i} className="card" style={{background:q.bg,border:"none",cursor:"pointer",margin:0}} onClick={()=>goTab(q.t)}>
          <div style={{fontSize:28,marginBottom:6}}>{q.i}</div>
          <div style={{fontSize:13,fontWeight:600,color:dark?T.nightText:T.deep}}>{q.l}</div>
          <div style={{fontSize:11,color:dark?"rgba(232,244,238,.45)":T.mid,marginTop:2}}>{q.s}</div>
        </div>)}
      </div>

      <div className="card" style={{marginTop:4,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:26}}>🧘</span>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:600,color:dark?T.nightText:T.deep}}>Pausa social</div>
          <div style={{fontSize:11,color:dark?"rgba(232,244,238,.45)":T.mid}}>"Recargando energía 🌿" visible para tus contactos</div>
        </div>
        <div style={{background:"rgba(123,191,163,.15)",borderRadius:10,padding:"6px 12px",fontSize:12,color:T.moss,cursor:"pointer",flexShrink:0}}>Activar</div>
      </div>
    </>}/>
  </div>;
}

// ── BAZAR ────────────────────────────────────────────────────────
function Bazar({dark}){
  const [cat,setCat]=useState("Todos");
  const [cart,setCart]=useState([]);
  const [showSell,setShowSell]=useState(false);
  const [sellStep,setSellStep]=useState(0);
  const [pname,setPname]=useState("");
  const [pprice,setPprice]=useState("");
  const [pdesc,setPdesc]=useState("");
  const [pcat,setPcat]=useState("Arte");
  const [products,setProducts]=useState(DATA.products);
  const EMOJIS={"Arte":"🎨","Textiles":"🧶","Comida":"🍪","Plantas":"🪴","Papelería":"📓","Hogar":"🕯️"};
  const BCOLORS={"Arte":"#fce4d6","Textiles":"#e8f4d4","Comida":"#fdf4d4","Plantas":"#d4f0e8","Papelería":"#e8d4f4","Hogar":"#f4f0d4"};
  const cats=["Todos","🎨 Arte","🧶 Textiles","🍪 Comida","🪴 Plantas","📓 Papelería"];
  const filtered=cat==="Todos"?products:products.filter(p=>p.cat===cat.split(" ")[1]);
  const publishProduct=()=>{
    if(!pname.trim())return;
    const newP={e:EMOJIS[pcat]||"🎁",n:pname,m:"Tú ✨",p:`$${pprice||"0"}`,bg:BCOLORS[pcat]||"#f0f0f0",cat:pcat,isNew:true};
    setProducts(ps=>[newP,...ps]);
    setSellStep(3);
  };

  if(showSell) return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <div style={{background:`linear-gradient(160deg,${T.bazar},${T.bazarM})`,padding:"20px 24px 28px",borderRadius:"0 0 28px 28px"}}>
      <div onClick={()=>{setShowSell(false);setSellStep(0);}} style={{fontSize:13,color:"rgba(245,236,215,.6)",cursor:"pointer",marginBottom:12}}>← Volver</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:24,color:"#F5ECD7",fontStyle:"italic"}}>Abre tu tienda 🛍️</div>
      <div style={{fontSize:13,color:"rgba(245,236,215,.55)",marginTop:4}}>Sage te ayuda en cada paso</div>
      <div style={{display:"flex",gap:6,marginTop:14}}>
        {["Foto","Descripción","Precio","¡Listo!"].map((s,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=sellStep?"#F5ECD7":"rgba(245,236,215,.2)",transition:"all .3s"}}/>)}
      </div>
    </div>
    <Pad c={<>
      {sellStep===0&&<><div className="stitle">Foto del producto</div>
        <div style={{background:dark?"rgba(232,244,238,.05)":"rgba(61,46,26,.06)",borderRadius:20,height:160,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px dashed rgba(92,68,32,.3)",flexDirection:"column",gap:12}}>
          <span style={{fontSize:48}}>📸</span>
          <span style={{fontSize:13,color:dark?T.nightText:T.bazar,fontWeight:500}}>Toca para agregar foto</span>
          <span style={{fontSize:11,color:dark?"rgba(232,244,238,.4)":T.mid}}>Sage te guía para tomar la mejor foto</span>
        </div>
        <div className="card" style={{marginTop:16,display:"flex",gap:12,alignItems:"flex-start"}}>
          <SageAvatar/><div style={{fontSize:13,color:dark?T.nightText:T.mid,lineHeight:1.5}}><strong style={{color:T.moss}}>Sage:</strong> Una foto con buena luz natural funciona perfectamente. No necesitas nada especial 🌿</div>
        </div>
        <button className="btn" style={{marginTop:16,background:`linear-gradient(135deg,${T.bazar},${T.bazarM})`}} onClick={()=>setSellStep(1)}>Siguiente → Descripción</button>
      </>}
      {sellStep===1&&<><div className="stitle">Cuéntanos sobre tu producto</div>
        <input className="inp" placeholder="Nombre del producto..." value={pname} onChange={e=>setPname(e.target.value)} style={{marginBottom:12}}/>
        <textarea className="inp" placeholder="¿Qué inspiró este producto? (opcional)" value={pdesc} onChange={e=>setPdesc(e.target.value)} style={{minHeight:100,resize:"none",marginBottom:12}}/>
        <div className="card" style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <SageAvatar/><div style={{fontSize:13,color:dark?T.nightText:T.mid,lineHeight:1.5}}><strong style={{color:T.moss}}>Sage:</strong> {pname?`"${pname}" suena genial. Puedo ayudarte a escribir una descripción más completa si quieres 🌿`:"Escribe el nombre de tu creación. No necesitas que sea perfecto."}</div>
        </div>
        <button className="btn" style={{marginTop:16,background:`linear-gradient(135deg,${T.bazar},${T.bazarM})`}} onClick={()=>setSellStep(2)}>Siguiente → Precio</button>
      </>}
      {sellStep===2&&<><div className="stitle">Precio y categoría</div>
        <input className="inp" placeholder="Precio (ej: 150)" value={pprice} onChange={e=>setPprice(e.target.value)} type="number" style={{marginBottom:12}}/>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
          {["Arte","Textiles","Comida","Plantas","Papelería","Hogar"].map(ct=><div key={ct} onClick={()=>setPcat(ct)} style={{background:pcat===ct?T.bazar:"var(--card)",border:`1.5px solid ${pcat===ct?T.bazarM:"var(--border)"}`,borderRadius:14,padding:"7px 14px",fontSize:12,color:pcat===ct?"#F5ECD7":"var(--text)",cursor:"pointer"}}>{ct}</div>)}
        </div>
        <div className="card" style={{background:"rgba(123,191,163,.08)",border:"1px solid rgba(123,191,163,.2)"}}>
          <div style={{fontSize:12,fontWeight:600,color:T.moss,marginBottom:6}}>💡 Tu trabajo tiene valor</div>
          <div style={{fontSize:12,color:dark?T.nightText:T.mid,lineHeight:1.5}}>Productos similares se venden entre $80 y $200. Tu tiempo y creatividad valen.</div>
        </div>
        <div className="card" style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <SageAvatar/><div style={{fontSize:13,color:dark?T.nightText:T.mid,lineHeight:1.5}}><strong style={{color:T.moss}}>Sage:</strong> Recuerda incluir materiales + tu tiempo. ¡Ya casi está listo! 🌿</div>
        </div>
        <button className="btn" style={{marginTop:16,background:`linear-gradient(135deg,${T.bazar},${T.bazarM})`,opacity:pprice?"1":".5"}} onClick={publishProduct}>Publicar en El Mercado ✓</button>
      </>}
      {sellStep===3&&<div style={{textAlign:"center",padding:"40px 0"}}>
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:24,color:dark?T.nightText:T.deep,fontStyle:"italic",marginBottom:8}}>{pname||"Tu producto"} está en El Mercado</div>
        <div style={{fontSize:14,color:dark?"rgba(232,244,238,.55)":T.mid,marginBottom:32,lineHeight:1.6}}>Precio: ${pprice||"0"} · Comisión Bloom: 8%<br/>Tú recibes el 92% de cada venta</div>
        <button className="btn" style={{maxWidth:240,margin:"0 auto",display:"block"}} onClick={()=>{setShowSell(false);setSellStep(0);setPname("");setPprice("");setPdesc("");setCat("Todos");}}>Ver mi producto en el Mercado →</button>
      </div>}
    </>}/>
  </div>;

  return <div className="enter" style={{minHeight:"100%",paddingBottom:16}}>
    <div style={{background:`linear-gradient(160deg,${T.bazar},${T.bazarM})`,padding:"20px 24px 28px",borderRadius:"0 0 32px 32px",position:"relative",overflow:"hidden"}}>
      <div className="orb" style={{width:200,height:200,background:"#c4883a",top:-60,right:-60}}/>
      <div style={{fontSize:11,color:"rgba(245,236,215,.45)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>openLearn</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:28,color:"#F5ECD7",fontStyle:"italic"}}>El Mercado 🛍️</div>
      <div style={{fontSize:13,color:"rgba(245,236,215,.55)",marginTop:4}}>Hecho con amor por nuestra comunidad</div>
      <div style={{marginTop:14,background:"rgba(245,236,215,.08)",borderRadius:14,padding:"10px 16px",display:"flex",gap:10,alignItems:"center"}}>
        <span>🔍</span><span style={{fontSize:13,color:"rgba(245,236,215,.4)"}}>Buscar productos...</span>
        {cart.length>0&&<div style={{marginLeft:"auto",background:T.moss,borderRadius:12,padding:"3px 10px",fontSize:12,color:"#fff",fontWeight:600}}>🛒 {cart.length}</div>}
      </div>
    </div>
    <div style={{display:"flex",gap:8,overflowX:"auto",padding:"14px 20px 0",scrollbarWidth:"none"}}>
      {cats.map(c=><div key={c} onClick={()=>setCat(c)} style={{background:cat===c?T.bazar:"var(--card)",border:`1.5px solid ${cat===c?T.bazarM:"var(--border)"}`,borderRadius:20,padding:"7px 16px",fontSize:12,fontWeight:500,color:cat===c?"#F5ECD7":"var(--text)",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{c}</div>)}
    </div>
    <Pad s={{padding:"10px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{filtered.length} productos</span>
        <div onClick={()=>setShowSell(true)} style={{background:T.bazar,color:"#F5ECD7",borderRadius:14,padding:"8px 16px",fontSize:13,cursor:"pointer",fontWeight:600}}>+ Vender</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {filtered.map((p,i)=><div key={i} style={{background:"var(--card)",borderRadius:20,overflow:"hidden",boxShadow:"0 2px 12px rgba(61,46,26,.08)",cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
          <div style={{height:130,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,position:"relative"}}>
            {p.e}
            <div style={{position:"absolute",bottom:8,left:8,background:"rgba(61,46,26,.7)",backdropFilter:"blur(8px)",borderRadius:10,padding:"3px 8px",fontSize:10,color:"#F5ECD7"}}>{p.isNew?"⭐ Tu producto":"🌱 Creador Bloom"}</div>
          </div>
          <div style={{padding:12}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{p.n}</div>
            <div style={{fontSize:11,color:"var(--sub)",marginTop:2}}>por {p.m}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:16,color:T.bazarM,fontWeight:600}}>{p.p}</div>
              <div onClick={()=>setCart(c=>[...c,p])} style={{width:28,height:28,background:T.bazar,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5ECD7",fontSize:18,cursor:"pointer"}}>+</div>
            </div>
          </div>
        </div>)}
      </div>
    </Pad>
  </div>;
}


// ── SCHOOL ───────────────────────────────────────────────────────
function School({dark,goLesson}){
  const [style_,setStyle]=useState(0);
  const styles=["🎯 Visual","👂 Auditivo","🤲 Kinestésico","📖 Lector"];
  return <div className="enter" style={{minHeight:"100%",paddingBottom:16}}>
    <div style={{background:`linear-gradient(160deg,${T.school},#1e3850)`,padding:"20px 24px 28px",borderRadius:"0 0 32px 32px",position:"relative",overflow:"hidden"}}>
      <div className="orb" style={{width:200,height:200,background:T.schoolM,top:-60,right:-60}}/>
      <div style={{fontSize:11,color:"rgba(232,244,250,.45)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>openLearn</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:28,color:"#e8f4fa",fontStyle:"italic"}}>La Escuela 📚</div>
      <div style={{fontSize:13,color:"rgba(232,244,250,.55)",marginTop:4}}>Aprende a tu ritmo, a tu manera</div>
      <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
        {styles.map((s,i)=><div key={i} onClick={()=>setStyle(i)} style={{background:style_===i?"rgba(232,244,250,.2)":"rgba(232,244,250,.06)",border:`1px solid ${style_===i?"rgba(232,244,250,.4)":"rgba(232,244,250,.1)"}`,borderRadius:20,padding:"6px 12px",fontSize:11,color:"#e8f4fa",cursor:"pointer"}}>{s}</div>)}
      </div>
    </div>
    <Pad c={<>
      <div onClick={goLesson} style={{background:"linear-gradient(135deg,#e8f4fa,#d4e8f5)",borderRadius:20,padding:18,display:"flex",gap:14,alignItems:"center",cursor:"pointer",marginTop:16,transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
        <div style={{fontSize:38}}>🔢</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:T.schoolM,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em"}}>Continuar</div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:16,color:T.deep,marginTop:2}}>Fracciones básicas</div>
          <div className="pbar" style={{marginTop:8}}><div className="pfill" style={{width:"68%",background:`linear-gradient(90deg,${T.schoolM},#2d7fa8)`}}/></div>
          <div style={{fontSize:11,color:T.mid,marginTop:4}}>68% · Lección 5 de 8</div>
        </div>
        <div style={{background:T.schoolM,color:"#fff",borderRadius:12,padding:"8px 14px",fontSize:13,fontWeight:600}}>→</div>
      </div>

      <div className="stitle">Materias</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {DATA.subjects.map((s,i)=><div key={i} onClick={goLesson} style={{background:"var(--card)",borderRadius:20,padding:16,cursor:"pointer",border:"1.5px solid var(--border)",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
          <div style={{fontSize:34,marginBottom:8}}>{s.i}</div>
          <div style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{s.n}</div>
          <div style={{fontSize:11,color:"var(--sub)",marginTop:3}}>{s.done}/{s.total} lecciones</div>
          <div className="pbar" style={{marginTop:8}}><div className="pfill" style={{width:`${s.p}%`,background:`linear-gradient(90deg,${s.c}88,${s.c})`}}/></div>
        </div>)}
      </div>

      <div style={{marginTop:16,background:"linear-gradient(135deg,#1a2d3d,#1e3850)",borderRadius:22,padding:20}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:18,color:"#e8f4fa",fontStyle:"italic",marginBottom:6}}>Practica con Sage 🧠</div>
        <div style={{fontSize:13,color:"rgba(232,244,250,.6)",lineHeight:1.5,marginBottom:14}}>Tu tutor IA. Sin juicios, sin prisa. Solo aprendizaje a tu ritmo.</div>
        <button style={{background:"rgba(232,244,250,.1)",border:"1px solid rgba(232,244,250,.2)",borderRadius:14,padding:"10px 20px",color:"#e8f4fa",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Preguntar a Sage →</button>
      </div>
    </>}/>
  </div>;
}

// ── LESSON ───────────────────────────────────────────────────────
function Lesson({onBack,dark}){
  const [step,setStep]=useState(0);
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const cur=DATA.lessonSteps[step];
  const pct=Math.round((step/DATA.lessonSteps.length)*100);

  const answer=i=>{if(answered)return;setSel(i);setAnswered(true);};
  const next=()=>{if(step<DATA.lessonSteps.length-1){setStep(s=>s+1);setSel(null);setAnswered(false);}else onBack();};

  return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <div style={{background:`linear-gradient(160deg,${T.school},#1e3850)`,padding:"20px 24px 24px",borderRadius:"0 0 28px 28px"}}>
      <div onClick={onBack} style={{fontSize:13,color:"rgba(232,244,250,.6)",cursor:"pointer",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>← Matemáticas</div>
      <div style={{fontSize:11,color:"rgba(232,244,250,.45)",textTransform:"uppercase",letterSpacing:".08em"}}>Lección 5 · Fracciones</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:20,color:"#e8f4fa",fontStyle:"italic",marginTop:4}}>Aprende a tu ritmo 🌱</div>
      <div className="pbar" style={{marginTop:14}}>
        <div className="pfill" style={{width:`${pct+20}%`,background:`linear-gradient(90deg,${T.schoolM},#2d7fa8)`}}/>
      </div>
      <div style={{fontSize:11,color:"rgba(232,244,250,.4)",marginTop:4}}>Paso {step+1} de {DATA.lessonSteps.length}</div>
    </div>
    <Pad c={<>
      <div style={{fontSize:11,color:"var(--sub)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600,marginTop:20,marginBottom:6}}>Paso {step+1}: {cur.label}</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:20,color:"var(--text)",lineHeight:1.35,marginBottom:16}}>{cur.concept}</div>
      <div style={{background:"linear-gradient(135deg,#e8f4fa,#d4e8f5)",borderRadius:20,padding:24,textAlign:"center",marginBottom:20}}>
        <span style={{fontSize:cur.visual.length>2?52:72}}>{cur.visual}</span>
      </div>
      {cur.type==="info"&&<>
        <div style={{fontSize:14,color:"var(--sub)",lineHeight:1.7,marginBottom:20}}>{cur.text}</div>
        <div style={{background:"linear-gradient(135deg,rgba(123,191,163,.12),rgba(184,212,232,.1))",borderLeft:`3px solid ${T.moss}`,borderRadius:"0 16px 16px 0",padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",marginBottom:24}}>
          <SageAvatar size={32}/><div style={{fontSize:13,color:"var(--sub)",lineHeight:1.5}}><strong style={{color:T.moss}}>Sage:</strong> No hay prisa. Puedes volver a este paso cuando quieras 🌿</div>
        </div>
        <button className="btn" style={{background:`linear-gradient(135deg,${T.schoolM},#2d7fa8)`}} onClick={next}>{step<DATA.lessonSteps.length-1?"Entendido, siguiente →":"¡Completé la lección! 🎉"}</button>
      </>}
      {cur.type==="quiz"&&<>
        {cur.opts.map((o,i)=><div key={i} className={`qopt${answered&&i===cur.correct?" ok":""}${answered&&sel===i&&i!==cur.correct?" no":""}`} onClick={()=>answer(i)}>{o}{answered&&i===cur.correct&&" ✓"}</div>)}
        {answered&&<>
          <div style={{background:"linear-gradient(135deg,rgba(123,191,163,.12),rgba(184,212,232,.1))",borderLeft:`3px solid ${sel===cur.correct?T.moss:"#e88"}`,borderRadius:"0 16px 16px 0",padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start",marginTop:4,marginBottom:20}}>
            <SageAvatar size={32}/><div style={{fontSize:13,color:"var(--sub)",lineHeight:1.5}}><strong style={{color:sel===cur.correct?T.moss:"#e88"}}>Sage:</strong> {sel===cur.correct?"¡Excelente! Tu razonamiento es correcto 🌟":"Casi. La respuesta correcta está marcada. ¡Cada error es aprendizaje! 🌱"}</div>
          </div>
          <button className="btn" style={{background:`linear-gradient(135deg,${T.schoolM},#2d7fa8)`}} onClick={next}>Continuar →</button>
        </>}
      </>}
      {cur.type==="celebrate"&&<>
        <div style={{fontSize:14,color:"var(--sub)",lineHeight:1.7,marginBottom:20}}>{cur.text}</div>
        <div style={{background:"linear-gradient(135deg,rgba(123,191,163,.15),rgba(168,213,186,.1))",borderRadius:20,padding:20,textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:13,color:T.moss,fontWeight:600,marginBottom:8}}>🏆 Lección completada</div>
          <div style={{fontSize:12,color:"var(--sub)"}}>+50 XP · Insignia: Mente Matemática</div>
        </div>
        <button className="btn" onClick={onBack}>Volver a materias 📚</button>
      </>}
    </>}/>
  </div>;
}

// ── UNIVERSE ─────────────────────────────────────────────────────
function Universe({dark,goChat}){
  const [view,setView]=useState("list");
  const [joined,setJoined]=useState([0,1,2]);

  if(view==="events") return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <DkHeader>
      <div onClick={()=>setView("list")} style={{fontSize:13,color:"rgba(232,244,238,.6)",cursor:"pointer",marginBottom:12}}>← Universos</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:26,color:T.nightText,fontStyle:"italic"}}>Eventos 📅</div>
      <div style={{fontSize:13,color:"rgba(232,244,238,.5)",marginTop:4}}>Pequeños y seguros · Cámaras opcionales</div>
    </DkHeader>
    <Pad c={<>
      <div className="stitle">Próximos eventos</div>
      {DATA.events.map((ev,i)=><div key={i} style={{borderRadius:20,overflow:"hidden",marginBottom:12,cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
        <div style={{background:ev.bg,padding:"18px 20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:32}}>{ev.i}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:600,color:ev.c}}>{ev.n}</div>
              <div style={{fontSize:12,color:ev.c,opacity:.7,marginTop:2}}>{ev.d}</div>
            </div>
          </div>
          <div style={{marginTop:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:11,color:ev.c,opacity:.65,marginBottom:4}}>{ev.spots} lugares disponibles de {ev.total}</div>
              <div style={{height:4,background:"rgba(255,255,255,.15)",borderRadius:2,width:140,overflow:"hidden"}}>
                <div style={{height:"100%",background:ev.c,width:`${((ev.total-ev.spots)/ev.total)*100}%`,borderRadius:2}}/>
              </div>
            </div>
            <div style={{background:"rgba(255,255,255,.15)",border:`1px solid ${ev.c}`,borderRadius:14,padding:"8px 16px",fontSize:12,color:ev.c,fontWeight:600,cursor:"pointer"}}>Reservar</div>
          </div>
        </div>
      </div>)}
    </>}/>
  </div>;

  return <div className="enter" style={{minHeight:"100%",paddingBottom:16}}>
    <DkHeader>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:26,color:T.nightText,fontStyle:"italic"}}>Universos 🌍</div>
      <div style={{fontSize:13,color:"rgba(232,244,238,.5)",marginTop:4}}>Tu lugar en el mundo</div>
      <div onClick={()=>setView("events")} style={{marginTop:14,background:"rgba(232,244,238,.07)",border:"1px solid rgba(123,191,163,.2)",borderRadius:14,padding:"8px 16px",fontSize:13,color:T.moss,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>📅 Ver próximos eventos</div>
    </DkHeader>
    <Pad c={<>
      <div className="stitle">Tus universos</div>
      {DATA.universes.filter((_,i)=>joined.includes(i)).map((u,i)=><div key={i} onClick={goChat} style={{borderRadius:20,overflow:"hidden",marginBottom:12,cursor:"pointer",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
        <div style={{background:u.bg,padding:"16px 20px",display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{u.i}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:600,color:u.c}}>{u.n}</div>
            <div style={{fontSize:12,color:u.c,opacity:.65,marginTop:2}}>{u.m} exploradores</div>
          </div>
          <div style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"4px 10px",fontSize:11,color:u.c}}>Activo ✓</div>
        </div>
      </div>)}
      <div className="stitle">Explorar más</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {DATA.universes.filter((_,i)=>!joined.includes(i)).map((u,i)=><div key={i} onClick={()=>setJoined(j=>[...j,i+3])} style={{background:"var(--card)",border:"1.5px solid var(--border)",borderRadius:20,padding:"8px 16px",fontSize:13,color:"var(--text)",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
          {u.i} {u.n} <span style={{fontSize:11,color:"var(--sub)"}}>· {u.m}</span>
        </div>)}
      </div>
    </>}/>
  </div>;
}

// ── CHAT ─────────────────────────────────────────────────────────
function Chat({dark}){
  const [msgs,setMsgs]=useState([
    {t:"Hola! Vi que también te gusta la astronomía 🔭",out:false,time:"Ayer"},
    {t:"¡Sí! Me fascina Saturno. ¿Cuál es tu planeta favorito?",out:true,time:"Ayer"},
    {t:"Neptuno, por su color azul profundo. No mucha gente lo menciona 😊",out:false,time:"09:14"},
    {t:"Qué coincidencia... yo también tengo una cosa con el azul 💙",out:true,time:"09:32"},
  ]);
  const [inp,setInp]=useState("");
  const bottomRef=useRef(null);
  useEffect(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  const send=()=>{if(!inp.trim())return;setMsgs(m=>[...m,{t:inp,out:true,time:"Ahora"}]);setInp("");};
  return <div className="enter" style={{height:"100%",display:"flex",flexDirection:"column"}}>
    <div style={{background:"var(--card)",padding:"14px 20px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid var(--border)",flexShrink:0}}>
      <div style={{position:"relative"}}>
        <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#1a2e3e,#1e3850)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🔭</div>
        <div style={{width:8,height:8,borderRadius:"50%",background:T.moss,position:"absolute",bottom:0,right:0,border:"2px solid var(--card)"}}/>
      </div>
      <div style={{flex:1}}>
        <div style={{fontWeight:600,fontSize:14,color:"var(--text)"}}>Luna</div>
        <div style={{fontSize:11,color:"var(--sub)"}}>Astronomía · 🐢 Modo lento</div>
      </div>
      <div style={{background:"rgba(123,191,163,.1)",border:"1px solid rgba(123,191,163,.2)",borderRadius:12,padding:"4px 10px",fontSize:11,color:T.moss}}>🌤 Tranquila</div>
    </div>
    <div style={{textAlign:"center",padding:"10px 0",flexShrink:0}}>
      <span style={{background:"rgba(123,191,163,.1)",borderRadius:10,padding:"5px 14px",fontSize:11,color:"var(--sub)"}}>🐢 Sin presión de respuesta · Modo Carta activo</span>
    </div>
    <div style={{flex:1,padding:"8px 20px",display:"flex",flexDirection:"column",gap:10,overflowY:"auto",scrollbarWidth:"none"}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.out?"flex-end":"flex-start",gap:3}}>
        <div className={m.out?"msg-out":"msg-in"}>{m.t}</div>
        <div style={{fontSize:10,color:"var(--sub)",padding:m.out?"0 6px 0 0":"0 0 0 6px"}}>{m.time}</div>
      </div>)}
      <div ref={bottomRef}/>
    </div>
    <div style={{padding:"6px 20px",display:"flex",gap:7,flexShrink:0}}>
      {["☀️ Con energía","🌿 Pausa","🎙 Audio"].map(s=><div key={s} style={{background:"rgba(123,191,163,.1)",border:"1px solid rgba(123,191,163,.18)",borderRadius:14,padding:"5px 10px",fontSize:11,color:T.moss,cursor:"pointer"}}>{s}</div>)}
    </div>
    <div style={{padding:"8px 20px 10px",display:"flex",gap:10,alignItems:"center",background:"var(--card)",borderTop:"1px solid var(--border)",flexShrink:0}}>
      <input className="inp" style={{flex:1}} placeholder="Escribe cuando quieras..." value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
      <div onClick={send} style={{width:40,height:40,background:`linear-gradient(135deg,${T.moss},${T.accent})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",fontSize:18,flexShrink:0}}>↑</div>
    </div>
  </div>;
}


// ── SAGE AI SCREEN ────────────────────────────────────────────────
function SageScreen({dark}){
  const [msgs,setMsgs]=useState([
    {role:"assistant",text:"Hola 🌿 Soy Sage, tu acompañante de IA. Estoy aquí para ayudarte a practicar conversaciones, procesar emociones, o simplemente hablar. ¿Cómo estás hoy?"}
  ]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const [mode,setMode]=useState("chat");
  const bottomRef=useRef(null);
  useEffect(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);



  const SAGE_RESPONSES={
    ansiedad:["La ansiedad antes de socializar es completamente normal, incluso para personas neurotípicas 🌿 Lo que sientes es una señal de que te importa — no de que algo está mal en ti. ¿Qué situación específica te genera más nervios?","Respiremos juntos un momento. Inhala 4 segundos, sostén 4, exhala 4 🌱 La ansiedad pasa como las nubes. ¿Quieres contarme más sobre lo que estás sintiendo?","Tu sistema nervioso está tratando de protegerte, aunque no lo necesite ahora ✨ ¿Hay algo concreto que pueda ayudarte a preparar para esa situación?"],
    solo:["Sentirse solo duele, y es válido reconocerlo 🌿 El hecho de que estés aquí, buscando conexión, ya dice mucho de tu valentía. ¿Hay alguna forma pequeña en que te gustaría conectar hoy?","La soledad no significa que algo está mal contigo — a veces simplemente no hemos encontrado aún a las personas correctas 🌱 ¿Qué tipo de conexión extrañas más?","Estoy aquí contigo ahora mismo ✨ ¿Quieres hablar de cómo te sientes, o prefieres que practiquemos juntos alguna forma de conectar con otros?"],
    presentar:["Presentarse puede sentirse intimidante, pero hay una fórmula simple que funciona 🌿 Nombre + algo que te gusta = inicio perfecto. Por ejemplo: 'Hola, soy [tu nombre], me fascina la astronomía.' ¿Quieres practicarlo conmigo?","Lo más importante es que no tienes que ser perfecto/a 🌱 La otra persona también puede estar nerviosa. ¿Te gustaría que yo haga de 'persona nueva' y lo practicamos ahora mismo?","Una presentación honesta siempre gana ✨ No necesitas ser gracioso/a ni impresionar — solo ser tú. ¿Qué te gustaría que la gente supiera de ti primero?"],
    amistad:["Las amistades más duraderas suelen empezar por intereses compartidos 🌿 ¿Hay algún universo o hobby donde te gustaría encontrar a alguien afín?","Una amistad real se construye despacio, sin presión 🌱 Empieza con pequeñas conversaciones sobre algo que ambos amen. ¿Tienes algún interés muy específico que pocas personas comparten?","El secreto es la consistencia suave — aparecer sin abrumar ✨ Un mensaje cada varios días sobre algo compartido va construyendo confianza. ¿Hay alguien con quien quisieras intentarlo?"],
    dificil:["Los días difíciles tienen permiso de existir 🌿 No tienes que convertirlos en algo productivo ni superarlos rápido. ¿Quieres contarme qué pasó, o prefieres simplemente que esté aquí?","Gracias por contarme 🌱 ¿Hubo algo específico que hizo que el día fuera pesado, o fue más una acumulación de cosas pequeñas?","A veces el día simplemente pesa, y está bien ✨ ¿Hay algo pequeño que normalmente te hace sentir un poco mejor, aunque sea por un momento?"],
    no:["Decir 'no' es un acto de respeto hacia ti mismo/a 🌿 Una forma suave pero clara: 'Gracias por pensar en mí, pero ahora no puedo.' ¿En qué situación específica necesitas usarlo?","El 'no' no necesita explicación ni disculpa 🌱 Aunque podemos practicar juntos si quieres sentirte más seguro/a. ¿Quieres que hagamos un roleplay de la situación?","Practicar el 'no' en voz alta ayuda mucho ✨ Puedes empezar con: 'Necesito pensarlo' para ganar tiempo. ¿Te gustaría que yo hiciera de la persona que te pide algo?"],
    default:["Gracias por compartir eso conmigo 🌿 ¿Puedes contarme un poco más sobre cómo te sientes al respecto?","Entiendo, y tiene mucho sentido que lo sientas así 🌱 ¿Hay algo específico en lo que te pueda ayudar ahora mismo?","Estoy aquí y te escucho ✨ ¿Qué necesitas más en este momento — hablar, practicar algo, o simplemente que te acompañe?","Eso que describes es más común de lo que crees entre personas como nosotros 🌿 ¿Quieres explorar juntos alguna forma de manejarlo?","Lo que sientes es completamente válido 🌱 A veces solo necesitamos que alguien nos escuche sin juzgar. Cuéntame más."],
  };

  const getReply=(text,mode)=>{
    const t=text.toLowerCase();
    let pool=SAGE_RESPONSES.default;
    if(t.includes("ansio")||t.includes("nervio")||t.includes("miedo")||t.includes("pánico")) pool=SAGE_RESPONSES.ansiedad;
    else if(t.includes("solo")||t.includes("sola")||t.includes("aislad")||t.includes("nadie")) pool=SAGE_RESPONSES.solo;
    else if(t.includes("presentar")||t.includes("conocer")||t.includes("nuevo")||t.includes("iniciar")) pool=SAGE_RESPONSES.presentar;
    else if(t.includes("amig")||t.includes("amistad")||t.includes("amigo")) pool=SAGE_RESPONSES.amistad;
    else if(t.includes("difícil")||t.includes("mal día")||t.includes("horrible")||t.includes("cansad")) pool=SAGE_RESPONSES.dificil;
    else if(t.includes("no ")||t.includes("rechaz")||t.includes("límite")||t.includes("negar")) pool=SAGE_RESPONSES.no;
    else if(mode==="calm") pool=SAGE_RESPONSES.ansiedad;
    else if(mode==="practice") pool=SAGE_RESPONSES.presentar;
    return pool[Math.floor(Math.random()*pool.length)];
  };

  const send=()=>{
    if(!inp.trim()||loading)return;
    const userMsg=inp.trim();
    setInp("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);
    setTimeout(()=>{
      const reply=getReply(userMsg,mode);
      setMsgs(m=>[...m,{role:"assistant",text:reply}]);
      setLoading(false);
    },900+Math.random()*600);
  };

  const STARTERS=[
    "Estoy ansioso por una conversación",
    "Quiero practicar cómo presentarme",
    "Tuve un día difícil",
    "¿Cómo inicio una amistad?",
    "Me siento solo/a hoy",
    "Quiero practicar decir no",
  ];

  const MODES=[{id:"chat",l:"💬 Conversar"},{id:"practice",l:"🎭 Practicar"},{id:"calm",l:"🧘 Calmarme"}];

  return <div className="enter" style={{height:"100%",display:"flex",flexDirection:"column"}}>
    <DkHeader style={{borderRadius:"0 0 24px 24px",padding:"16px 20px 24px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <SageAvatar size={44}/>
        <div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:20,color:T.nightText,fontStyle:"italic"}}>Sage ✨</div>
          <div style={{fontSize:12,color:"rgba(232,244,238,.5)"}}>Tu acompañante de IA · siempre disponible</div>
        </div>
        <div style={{marginLeft:"auto",background:"rgba(123,191,163,.2)",border:"1px solid rgba(123,191,163,.3)",borderRadius:10,padding:"4px 10px",fontSize:11,color:T.moss}}>En línea</div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:14}}>
        {MODES.map(m=><div key={m.id} onClick={()=>setMode(m.id)} style={{flex:1,background:mode===m.id?"rgba(123,191,163,.22)":"rgba(232,244,238,.06)",border:`1px solid ${mode===m.id?T.moss:"rgba(123,191,163,.15)"}`,borderRadius:14,padding:"7px 10px",fontSize:11,color:mode===m.id?T.moss:T.nightText,cursor:"pointer",textAlign:"center",transition:"all .2s"}}>{m.l}</div>)}
      </div>
    </DkHeader>

    <div style={{flex:1,padding:"12px 16px",display:"flex",flexDirection:"column",gap:10,overflowY:"auto",scrollbarWidth:"none"}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start",gap:4}}>
        {m.role==="assistant"&&<div style={{display:"flex",gap:8,alignItems:"flex-start",maxWidth:"90%"}}>
          <SageAvatar size={28}/>
          <div className="msg-sage">{m.text}</div>
        </div>}
        {m.role==="user"&&<div className="msg-out">{m.text}</div>}
      </div>)}
      {loading&&<div style={{display:"flex",gap:8,alignItems:"center"}}>
        <SageAvatar size={28}/>
        <div className="msg-sage" style={{display:"flex",gap:5,alignItems:"center"}}>
          <span className="pulse">●</span><span className="pulse" style={{animationDelay:".2s"}}>●</span><span className="pulse" style={{animationDelay:".4s"}}>●</span>
        </div>
      </div>}
      <div ref={bottomRef}/>
    </div>

    {msgs.length<=1&&<div style={{padding:"0 16px 8px"}}>
      <div style={{fontSize:11,color:"var(--sub)",marginBottom:8,textAlign:"center"}}>Empieza con algo que sientas...</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center"}}>
        {STARTERS.map(s=><div key={s} onClick={()=>{setInp(s);}} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:14,padding:"7px 12px",fontSize:12,color:"var(--text)",cursor:"pointer"}}>{s}</div>)}
      </div>
    </div>}

    <div style={{padding:"8px 16px 10px",display:"flex",gap:10,alignItems:"center",background:"var(--card)",borderTop:"1px solid var(--border)",flexShrink:0}}>
      <input className="inp" style={{flex:1}} placeholder={mode==="calm"?"¿Qué te está generando ansiedad?":mode==="practice"?"¿Qué situación quieres practicar?":"Escribe lo que sientas..."} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} disabled={loading}/>
      <div onClick={send} style={{width:40,height:40,background:loading?"rgba(123,191,163,.3)":`linear-gradient(135deg,${T.moss},${T.accent})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:loading?"not-allowed":"pointer",color:"#fff",fontSize:18,flexShrink:0,transition:"all .2s"}}>
        {loading?"⋯":"↑"}
      </div>
    </div>
  </div>;
}

// ── GREENHOUSE ────────────────────────────────────────────────────
// ── GH LESSON SUB-COMPONENT ──────────────────────────────────────
function GHLesson({mod,ghStep,setGhStep,onBack,dark}){
  const GH_LESSONS=[
    {q:"¿Cuál es la primera cosa que dices al conocer a alguien?",opts:["Hola, me llamo...","Oye, ¿qué tal?","Emmm... hola"],correct:0,tip:"Una presentación clara y tu nombre es el mejor inicio. Simple y efectivo 🌱"},
    {q:"Hay un silencio incómodo en la conversación. ¿Qué haces?",opts:["Pregunto algo sobre ellos","Me voy sin decir nada","Me quedo paralizado"],correct:0,tip:"Las preguntas sobre la otra persona son puentes naturales. A la gente le encanta hablar de sí misma 🌿"},
    {q:"Alguien te dice algo que te lastimó sin querer. ¿Cómo respondes?",opts:["Me lo guardo todo","Digo que me afectó un poco","Cambio de tema rápido"],correct:1,tip:"Expresar cómo nos sentimos en primera persona es honesto y abre diálogo saludable ✨"},
  ];
  const [sel,setSel]=useState(null);
  const [answered,setAnswered]=useState(false);
  const lesson=GH_LESSONS[ghStep%GH_LESSONS.length];
  return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <div style={{background:`linear-gradient(135deg,${mod.c}33,${mod.c}11)`,padding:"20px 24px 24px",borderRadius:"0 0 28px 28px",borderBottom:`3px solid ${mod.c}44`}}>
      <div onClick={onBack} style={{fontSize:13,color:"var(--sub)",cursor:"pointer",marginBottom:12}}>← El Invernadero</div>
      <div style={{fontSize:28,marginBottom:8}}>{mod.i}</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:20,color:"var(--text)",fontStyle:"italic"}}>{mod.n}</div>
      <div style={{fontSize:13,color:"var(--sub)",marginTop:4}}>{mod.sub}</div>
    </div>
    <Pad c={<>
      <div style={{fontSize:11,color:"var(--sub)",textTransform:"uppercase",letterSpacing:".08em",fontWeight:600,marginTop:20,marginBottom:8}}>Ejercicio {ghStep+1}</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:18,color:"var(--text)",lineHeight:1.4,marginBottom:20}}>{lesson.q}</div>
      {lesson.opts.map((o,i)=><div key={i} className={`qopt${answered&&i===lesson.correct?" ok":""}${answered&&sel===i&&i!==lesson.correct?" no":""}`} onClick={()=>{if(answered)return;setSel(i);setAnswered(true);}}>{o}{answered&&i===lesson.correct&&" ✓"}</div>)}
      {answered&&<>
        <div style={{background:`linear-gradient(135deg,${mod.c}15,${mod.c}08)`,borderLeft:`3px solid ${mod.c}`,borderRadius:"0 16px 16px 0",padding:"14px 16px",marginTop:4,marginBottom:20,display:"flex",gap:12}}>
          <SageAvatar size={30}/><div style={{fontSize:13,color:"var(--sub)",lineHeight:1.5}}><strong style={{color:mod.c}}>Sage:</strong> {lesson.tip}</div>
        </div>
        <button className="btn" style={{background:`linear-gradient(135deg,${mod.c},${mod.c}bb)`}} onClick={()=>{if(ghStep<GH_LESSONS.length-1){setGhStep(s=>s+1);setSel(null);setAnswered(false);}else onBack();}}>
          {ghStep<GH_LESSONS.length-1?"Siguiente ejercicio →":"¡Módulo completado! 🎉"}
        </button>
      </>}
    </>}/>
  </div>;
}


function Greenhouse({dark,onBack}){
  const [active,setActive]=useState(null);
  const [ghStep,setGhStep]=useState(0);
  if(active!==null){
    return <GHLesson mod={DATA.greenhouse[active]} ghStep={ghStep} setGhStep={setGhStep} onBack={()=>{setActive(null);setGhStep(0);}} dark={dark}/>;
  }

  return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <DkHeader>
      <div onClick={onBack} style={{fontSize:13,color:"rgba(232,244,238,.6)",cursor:"pointer",marginBottom:12}}>← Perfil</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:26,color:T.nightText,fontStyle:"italic"}}>El Invernadero 🌱</div>
      <div style={{fontSize:13,color:"rgba(232,244,238,.5)",marginTop:4}}>Entrena habilidades sociales a tu ritmo</div>
    </DkHeader>
    <Pad c={<>
      <div style={{background:"linear-gradient(135deg,rgba(123,191,163,.12),rgba(168,213,186,.06))",borderRadius:20,padding:18,marginTop:16,display:"flex",gap:14,alignItems:"center"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:28,color:T.moss}}>2/5</div>
          <div style={{fontSize:11,color:"var(--sub)"}}>Módulos</div>
        </div>
        <div style={{flex:1}}>
          <div className="pbar"><div className="pfill" style={{width:"40%"}}/></div>
          <div style={{fontSize:12,color:"var(--sub)",marginTop:6}}>40% completado · Sigue a tu ritmo 🌿</div>
        </div>
      </div>
      <div className="stitle">Módulos</div>
      {DATA.greenhouse.map((m,i)=><div key={i} onClick={()=>setActive(i)} style={{background:`linear-gradient(135deg,${m.c}14,${m.c}06)`,border:`1.5px solid ${m.done?""+m.c+"44":"var(--border)"}`,borderRadius:20,padding:18,cursor:"pointer",marginBottom:12,transition:"all .2s",display:"flex",gap:14,alignItems:"center"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
        <div style={{width:44,height:44,borderRadius:14,background:`${m.c}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{m.i}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{m.n}</div>
          <div style={{fontSize:12,color:"var(--sub)",marginTop:2}}>{m.sub}</div>
          <div className="pbar" style={{marginTop:8}}><div className="pfill" style={{width:`${(m.done2/m.total)*100}%`,background:`linear-gradient(90deg,${m.c},${m.c}bb)`}}/></div>
          <div style={{fontSize:11,color:"var(--sub)",marginTop:4}}>{m.done2}/{m.total} ejercicios</div>
        </div>
        {m.done&&<span style={{fontSize:20}}>✅</span>}
      </div>)}
    </>}/>
  </div>;
}


// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({dark,onBack}){
  const days=["L","M","M","J","V","S","D"];
  const maxConn=Math.max(...DATA.weekConns);
  return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <DkHeader>
      <div onClick={onBack} style={{fontSize:13,color:"rgba(232,244,238,.6)",cursor:"pointer",marginBottom:12}}>← Perfil</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:26,color:T.nightText,fontStyle:"italic"}}>Tu semana 📊</div>
      <div style={{fontSize:13,color:"rgba(232,244,238,.5)",marginTop:4}}>Solo para tus ojos · Sin comparaciones</div>
    </DkHeader>
    <Pad c={<>
      <div className="stitle">Estado emocional</div>
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          {days.map((d,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <span style={{fontSize:18}}>{DATA.weekMoods[i]}</span>
            <span style={{fontSize:10,color:"var(--sub)"}}>{d}</span>
          </div>)}
        </div>
        <div style={{fontSize:12,color:"var(--sub)",background:"rgba(123,191,163,.08)",borderRadius:12,padding:"8px 12px",marginTop:8}}>
          🌱 Esta semana tuviste más días tranquilos que nublados. ¡Eso es un avance!
        </div>
      </div>

      <div className="stitle">Conexiones por día</div>
      <div className="card">
        <div style={{display:"flex",alignItems:"flex-end",gap:8,height:100}}>
          {DATA.weekConns.map((v,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6,height:"100%",justifyContent:"flex-end"}}>
            <span style={{fontSize:10,color:"var(--sub)"}}>{v}</span>
            <div style={{width:"100%",borderRadius:6,background:`linear-gradient(180deg,${T.moss},${T.accent})`,height:`${(v/maxConn)*75}px`,minHeight:4,opacity:v===0?.2:1,transition:"height .5s ease"}}/>
            <span style={{fontSize:10,color:"var(--sub)"}}>{days[i]}</span>
          </div>)}
        </div>
        <div style={{fontSize:12,color:"var(--sub)",background:"rgba(123,191,163,.08)",borderRadius:12,padding:"8px 12px",marginTop:12}}>
          ✨ Tu día más activo fue el viernes con 4 conexiones. Tus conexiones nocturnas han aumentado.
        </div>
      </div>

      <div className="stitle">Resumen semanal</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {[
          {n:"Conexiones",v:"15",i:"🤝",c:"rgba(123,191,163,.12)"},
          {n:"Lecciones",v:"3",i:"📚",c:"rgba(184,212,232,.12)"},
          {n:"En El Mercado",v:"$90",i:"🛍️",c:"rgba(245,236,215,.2)"},
          {n:"Con Sage",v:"8 chats",i:"✨",c:"rgba(212,184,224,.12)"},
        ].map((s,i)=><div key={i} className="card" style={{background:s.c,border:"none",margin:0,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:6}}>{s.i}</div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:22,color:"var(--text)",fontWeight:600}}>{s.v}</div>
          <div style={{fontSize:11,color:"var(--sub)",marginTop:2}}>{s.n}</div>
        </div>)}
      </div>

      <div className="card" style={{marginTop:4,background:"linear-gradient(135deg,rgba(123,191,163,.1),rgba(168,213,186,.05))"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:16,color:"var(--text)",fontStyle:"italic",marginBottom:10}}>💡 Sage observa...</div>
        <div style={{fontSize:13,color:"var(--sub)",lineHeight:1.6}}>Tus conversaciones duran más cuando empiezas tú. Esta semana iniciaste 4 veces — eso es valentía real 🌱</div>
      </div>
    </>}/>
  </div>;
}

// ── SETTINGS ──────────────────────────────────────────────────────
function Settings({dark,setDark,onBack}){
  const [slow,setSlow]=useState(true);
  const [anim,setAnim]=useState(true);
  const [notif,setNotif]=useState(1);
  const [textSize,setTextSize]=useState(1);
  const [contrast,setContrast]=useState(false);
  const notifLabels=["Ninguna","Suaves","Estándar"];
  const textLabels=["Pequeño","Normal","Grande"];
  return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <DkHeader>
      <div onClick={onBack} style={{fontSize:13,color:"rgba(232,244,238,.6)",cursor:"pointer",marginBottom:12}}>← Perfil</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:26,color:T.nightText,fontStyle:"italic"}}>Configuración 🌿</div>
      <div style={{fontSize:13,color:"rgba(232,244,238,.5)",marginTop:4}}>Tu comodidad es la prioridad</div>
    </DkHeader>
    <Pad c={<>
      <div className="stitle">Sensorial</div>
      {[
        {l:"Modo oscuro",sub:"Fondo verde profundo para la noche",v:dark,s:setDark,icon:"🌙"},
        {l:"Modo lento",sub:"Sin presión de respuesta",v:slow,s:setSlow,icon:"🐢"},
        {l:"Animaciones",sub:"Movimientos suaves",v:anim,s:setAnim,icon:"🍃"},
        {l:"Alto contraste",sub:"Mejor legibilidad",v:contrast,s:setContrast,icon:"👁"},
      ].map((x,i)=><div key={i} className="card" style={{margin:"0 0 10px",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:22}}>{x.icon}</span>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{x.l}</div>
          <div style={{fontSize:12,color:"var(--sub)",marginTop:2}}>{x.sub}</div>
        </div>
        <Toggle on={x.v} set={x.s}/>
      </div>)}

      <div className="stitle">Notificaciones</div>
      <div className="card">
        <div style={{fontSize:13,color:"var(--sub)",marginBottom:12}}>Nivel actual: <strong style={{color:"var(--text)"}}>{notifLabels[notif]}</strong></div>
        <div style={{display:"flex",gap:8}}>
          {notifLabels.map((l,i)=><div key={i} onClick={()=>setNotif(i)} style={{flex:1,background:notif===i?"rgba(123,191,163,.2)":"rgba(123,191,163,.06)",border:`1.5px solid ${notif===i?T.moss:"var(--border)"}`,borderRadius:12,padding:"8px 4px",fontSize:12,color:notif===i?T.moss:"var(--sub)",cursor:"pointer",textAlign:"center"}}>{l}</div>)}
        </div>
      </div>

      <div className="stitle">Tamaño de texto</div>
      <div className="card">
        <div style={{display:"flex",gap:8}}>
          {textLabels.map((l,i)=><div key={i} onClick={()=>setTextSize(i)} style={{flex:1,background:textSize===i?"rgba(123,191,163,.2)":"rgba(123,191,163,.06)",border:`1.5px solid ${textSize===i?T.moss:"var(--border)"}`,borderRadius:12,padding:"8px 4px",fontSize:10+i*2,color:textSize===i?T.moss:"var(--sub)",cursor:"pointer",textAlign:"center"}}>{l}</div>)}
        </div>
      </div>

      <div className="stitle">Ritmo social</div>
      <div className="card">
        <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:8}}>Tiempo de respuesta que comunicas</div>
        {[{l:"🐢 Sin expectativa",s:"Respondo cuando puedo"},{l:"🌤 24 horas",s:"Respondo en un día"},{l:"⚡ Rápido",s:"Respondo pronto"}].map((r,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid var(--border)":"none",cursor:"pointer"}}>
          <span style={{fontSize:20}}>{r.l.split(" ")[0]}</span>
          <div><div style={{fontSize:13,color:"var(--text)"}}>{r.l}</div><div style={{fontSize:11,color:"var(--sub)"}}>{r.s}</div></div>
          {i===0&&<span style={{marginLeft:"auto",color:T.moss,fontSize:16}}>✓</span>}
        </div>)}
      </div>

      <div className="card" style={{background:"rgba(232,136,136,.06)",border:"1px solid rgba(232,136,136,.15)"}}>
        <div style={{fontSize:14,fontWeight:600,color:"var(--text)",marginBottom:4}}>🔒 Tu privacidad</div>
        <div style={{fontSize:12,color:"var(--sub)",lineHeight:1.6,marginBottom:12}}>Tus datos nunca se venden. Mensajes encriptados E2E. Elimina tu cuenta y datos en 72h.</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <div style={{background:"rgba(123,191,163,.1)",border:"1px solid rgba(123,191,163,.2)",borderRadius:12,padding:"6px 12px",fontSize:12,color:T.moss,cursor:"pointer"}}>Ver mis datos</div>
          <div style={{background:"rgba(232,136,136,.08)",border:"1px solid rgba(232,136,136,.2)",borderRadius:12,padding:"6px 12px",fontSize:12,color:"#e88",cursor:"pointer"}}>Eliminar cuenta</div>
        </div>
      </div>
    </>}/>
  </div>;
}

// ── PROFILE ───────────────────────────────────────────────────────
function Profile({name,dark,setDark,goSub}){
  const [view,setView]=useState("main");
  if(view==="dashboard") return <Dashboard dark={dark} onBack={()=>setView("main")}/>;
  if(view==="greenhouse") return <Greenhouse dark={dark} onBack={()=>setView("main")}/>;
  if(view==="settings") return <Settings dark={dark} setDark={setDark} onBack={()=>setView("main")}/>;

  return <div className="enter" style={{minHeight:"100%",paddingBottom:24}}>
    <div style={{background:`linear-gradient(160deg,${T.night},#243d32)`,padding:"20px 24px 40px",borderRadius:"0 0 32px 32px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div className="orb" style={{width:200,height:200,background:T.moss,top:-60,right:-60}}/>
      <div style={{fontSize:58,marginBottom:8}}>🌌</div>
      <div style={{fontFamily:"'Fraunces',serif",fontSize:22,color:T.nightText,fontStyle:"italic"}}>{name}</div>
      <div style={{fontSize:13,color:"rgba(232,244,238,.5)",marginTop:4}}>"Me fascina el cosmos y el café frío"</div>
      <div style={{display:"flex",gap:7,justifyContent:"center",marginTop:14,flexWrap:"wrap"}}>
        {["🔭 Astronomía","🎨 Arte","🎮 Videojuegos"].map(t=><span key={t} style={{background:"rgba(232,244,238,.1)",border:"1px solid rgba(123,191,163,.25)",borderRadius:20,padding:"5px 13px",fontSize:11,color:T.nightText}}>{t}</span>)}
      </div>
    </div>

    <Pad c={<>
      <div style={{background:"linear-gradient(135deg,#e8f4ee,#d4ece0)",borderRadius:22,padding:20,marginTop:16,textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div className="orb" style={{width:120,height:120,background:T.moss,bottom:-40,right:-40,opacity:.12}}/>
        <span className="sway" style={{fontSize:60,display:"inline-block",marginBottom:8}}>🌿</span>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:18,color:T.deep,fontStyle:"italic"}}>Planta establecida</div>
        <div style={{fontSize:12,color:T.mid,marginTop:4}}>Nivel 3 · 3 semanas activa</div>
        <div style={{height:5,background:"rgba(44,62,53,.12)",borderRadius:3,marginTop:12,overflow:"hidden"}}>
          <div style={{height:"100%",width:"52%",background:`linear-gradient(90deg,${T.moss},${T.accent})`,borderRadius:3}}/>
        </div>
        <div style={{fontSize:11,color:T.mid,marginTop:4}}>52% hacia Nivel 4 · Árbol</div>
      </div>

      <div className="stitle">Logros desbloqueados</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {DATA.badges.map((b,i)=><div key={i} style={{background:"var(--card)",borderRadius:18,padding:"14px 10px",textAlign:"center",border:`1.5px solid ${b.ok?"rgba(123,191,163,.35)":"var(--border)"}`,opacity:b.ok?1:.38,filter:b.ok?"none":"grayscale(1)"}}>
          <div style={{fontSize:28,marginBottom:6}}>{b.e}</div>
          <div style={{fontSize:10,fontWeight:600,color:"var(--text)",lineHeight:1.3}}>{b.n}</div>
        </div>)}
      </div>

      <div className="stitle">Accesos</div>
      {[
        {i:"📊",l:"Mi semana",sub:"Dashboard emocional",action:()=>setView("dashboard"),bg:"rgba(123,191,163,.1)"},
        {i:"🌱",l:"El Invernadero",sub:"Entrenamiento social",action:()=>setView("greenhouse"),bg:"rgba(168,213,186,.1)"},
        {i:"⚙️",l:"Configuración",sub:"Sensorial · Privacidad · Ritmo",action:()=>setView("settings"),bg:"rgba(184,212,232,.1)"},
        {i:"🛍️",l:"Mi tienda",sub:"3 productos · $435 vendidos",action:()=>goSub("bazar"),bg:"rgba(245,236,215,.2)"},
      ].map((x,i)=><div key={i} onClick={x.action} style={{background:x.bg,border:"1px solid var(--border)",borderRadius:18,padding:"14px 16px",cursor:"pointer",marginBottom:10,display:"flex",gap:14,alignItems:"center",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
        <span style={{fontSize:26}}>{x.i}</span>
        <div><div style={{fontSize:14,fontWeight:600,color:"var(--text)"}}>{x.l}</div><div style={{fontSize:12,color:"var(--sub)",marginTop:2}}>{x.sub}</div></div>
        <span style={{marginLeft:"auto",color:"var(--sub)",fontSize:18}}>›</span>
      </div>)}

      <div style={{background:"linear-gradient(135deg,rgba(123,191,163,.08),rgba(168,213,186,.04))",borderRadius:20,padding:18,border:"1px solid rgba(123,191,163,.15)"}}>
        <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:4}}>✨ Bloom Premium</div>
        <div style={{fontSize:12,color:"var(--sub)",lineHeight:1.5,marginBottom:12}}>Sage con memoria · Universos ilimitados · Dashboard completo · Eventos exclusivos</div>
        <button className="btn" style={{background:`linear-gradient(135deg,${T.bazar},${T.bazarM})`,padding:"12px 20px",fontSize:13}}>Ver plan Premium →</button>
      </div>
    </>}/>
  </div>;
}


// ── ROOT APP ──────────────────────────────────────────────────────
export default function App(){
  const [phase,setPhase]=useState("welcome");
  const [tab,setTab]=useState("home");
  const [name,setName]=useState("Explorador");
  const [dark,setDark]=useState(false);
  const [lesson,setLesson]=useState(false);
  const [chat,setChat]=useState(false);

  const goTab=(t)=>{setTab(t);setLesson(false);setChat(false);};

  const bgStyle={
    "--bg": dark?T.night:T.snow,
    "--card": dark?T.nightCard:"#fff",
    "--text": dark?T.nightText:T.deep,
    "--sub": dark?"rgba(232,244,238,.5)":T.mid,
    "--border": dark?"rgba(123,191,163,.1)":"rgba(168,213,186,.2)",
    "--inp": dark?"#1e2e28":T.mint,
  };

  const renderScreen=()=>{
    if(phase==="welcome") return <Welcome go={()=>setPhase("onboard")}/>;
    if(phase==="onboard") return <Onboard done={(n,d)=>{setName(n||"Explorador");setDark(d);setPhase("app");}}/>;
    if(lesson) return <Lesson onBack={()=>setLesson(false)} dark={dark}/>;
    if(chat) return <Chat dark={dark}/>;
    switch(tab){
      case "home":     return <Home name={name} dark={dark} goTab={goTab}/>;
      case "bazar":    return <Bazar dark={dark}/>;
      case "school":   return <School dark={dark} goLesson={()=>setLesson(true)}/>;
      case "universe": return <Universe dark={dark} goChat={()=>setChat(true)}/>;
      case "sage":     return <SageScreen dark={dark}/>;
      case "me":       return <Profile name={name} dark={dark} setDark={setDark} goSub={goTab}/>;
      default:         return <Home name={name} dark={dark} goTab={goTab}/>;
    }
  };

  const showNav=phase==="app"&&!lesson&&!chat;
  const isDark=phase!=="app"||dark;

  return <>
    <style>{CSS}</style>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:20,width:"100%"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontFamily:"'Fraunces',serif",fontStyle:"italic",fontSize:18,color:T.moss}}>Bloom × openLearn</div>
        <div style={{fontSize:11,color:"rgba(232,244,238,.3)",marginTop:2}}>Changing the world, one kid at a time · Prototipo interactivo completo</div>
      </div>

      <div className={`phone${dark?" dark-mode":""}`} style={bgStyle}>
        <SBar dark={isDark}/>
        <div className="screen">{renderScreen()}</div>
        {showNav&&<Nav tab={tab} set={goTab}/>}
      </div>

      {phase==="app"&&<div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",maxWidth:420}}>
        {[
          {l:"💬 Abrir chat",a:()=>setChat(true)},
          {l:"📖 Ver lección",a:()=>setLesson(true)},
          {l:"✨ Ir a Sage",a:()=>goTab("sage")},
          {l:"🌙 Modo oscuro",a:()=>setDark(d=>!d)},
          {l:"🔄 Reiniciar",a:()=>{setPhase("welcome");setTab("home");setLesson(false);setChat(false);setDark(false);}},
        ].map(b=><button key={b.l} onClick={b.a} style={{background:"rgba(123,191,163,.1)",border:"1px solid rgba(123,191,163,.22)",borderRadius:14,padding:"8px 14px",color:T.moss,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{b.l}</button>)}
      </div>}
    </div>
  </>;
}
