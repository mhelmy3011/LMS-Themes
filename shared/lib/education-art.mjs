/**
 * Web Academy / The learning illustration collection.
 * Original, editable SVG geometry. No raster images, external URLs or scripts.
 * Scene parts are animated by education.css only when inline and in view.
 */
const C = { navy:'#012A5D', deep:'#001A3D', mid:'#14427F', sky:'#8DB8FF', ice:'#EAF1FB', lime:'#C8F560', white:'#FFFFFF' };
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const rect = (x,y,w,h,fill=C.white,r=16,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const line = (d,color=C.navy,width=3,extra='') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const text = (x,y,s,size=16,color=C.navy,weight=500,extra='') => `<text x="${x}" y="${y}" fill="${color}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" ${extra}>${esc(s)}</text>`;
const dot = (x,y,r,fill=C.lime,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const check = (x,y,s=1,color=C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${line('M0 7l5 5L16 0',color,3)}</g>`;
const sparkle = (x,y,s=1,color=C.navy) => `<g transform="translate(${x} ${y}) scale(${s})">${line('M0-12V12M-12 0H12M-8-8 8 8M8-8-8 8',color,2)}</g>`;
const paperLines = (x,y,width=160,count=4,color=C.sky) => Array.from({length:count},(_,i)=>rect(x,y+i*18,width*(i===count-1?.65:1),5,color,2)).join('');
const windowHead = (x,y,w,label='THE LEARNING STUDIO',dark=false) => `${rect(x,y,w,44,dark?C.mid:C.ice,16)}${rect(x,y+22,w,22,dark?C.mid:C.ice,0)}${[0,1,2].map((_,i)=>dot(x+20+i*14,y+22,3,i===0?C.lime:dark?C.sky:C.navy)).join('')}${text(x+72,y+27,label,10,dark?C.white:C.navy,600,'letter-spacing="2"')}`;
const book = (x,y,s=1,rotate=0) => `<g class="edu-part edu-part--float" transform="translate(${x} ${y}) rotate(${rotate}) scale(${s})"><path d="M0 10Q42-2 84 14Q126-2 168 10v104q-42-12-84 4-42-16-84-4Z" fill="${C.white}" stroke="${C.navy}" stroke-width="3"/>${line('M84 14v104',C.navy,2)}${paperLines(14,34,53,3)}${paperLines(100,34,52,3)}${line('M15 99q26-5 52 2M100 101q26-7 52-2',C.mid,2)}</g>`;

/** Expressive original portraits, including eyes, nose, ears and hair detail. */
export function educator(x,y,scale=1,variant=0,pose='rest') {
 const skins=['#E8C7A8','#C88F63','#9A6642','#F0D2B4','#7A4A2C','#D9A97F','#B57D57','#D5B28D'];
 const skin=skins[variant%skins.length], cloth=variant%3===1?C.mid:C.navy;
 const hair=variant%2?C.deep:C.navy;
 return `<g transform="translate(${x} ${y}) scale(${scale})">
 <path d="M-68 120v-22c0-39 29-60 68-60s68 21 68 60v22Z" fill="${cloth}"/>
 ${line('M-43 99q43 17 86 0',C.sky,1.5,'opacity=".3"')}
 <path d="M-18 36v20q18 20 36 0V36" fill="${skin}"/>
 <path d="m-20 46 20 19 20-19 12 13-32 28-32-28Z" fill="${C.ice}"/>
 <ellipse cx="-40" cy="-2" rx="8" ry="12" fill="${skin}"/><ellipse cx="40" cy="-2" rx="8" ry="12" fill="${skin}"/>
 <path d="M-40-20q0-49 40-49t40 49v25Q37 43 0 47-37 43-40 5Z" fill="${skin}"/>
 ${variant%3===0?`<path d="M-42 1q-17-77 43-77 52 0 43 77L29-36q-32 24-61 13L-42 1Z" fill="${hair}"/><path d="M-40-10q-8 36 3 58l-17-9q-10-34 4-66Z" fill="${hair}"/>`:variant%3===1?`<path d="M-42-5q-10-69 42-69 54 0 43 66L31-31Q6-16-29-28Z" fill="${hair}"/>`:`<path d="M-41-8q-11-64 41-66 51-1 43 66L25-35Q0-18-25-35Z" fill="${hair}"/>`}
 ${line('M-26-5q7-5 14 0M12-5q7-5 14 0',C.deep,2.5)}
 <ellipse cx="-19" cy="3" rx="2.5" ry="3.6" fill="${C.deep}"/><ellipse cx="19" cy="3" rx="2.5" ry="3.6" fill="${C.deep}"/>
 ${line('M0 5l-3 12h6',C.deep,1.4,'opacity=".45"')}${line('M-11 25q11 9 22 0',C.deep,2)}
 ${variant%4===1?`${line('M-32-2h25v17h-25ZM7-2h25v17H7ZM-7 4H7',C.deep,2)}`:''}
 ${pose==='teach'?`<path d="M43 76q34 10 52-26l16 9q-16 65-65 45Z" fill="${cloth}"/><path d="m95 50 9-19q2-7 7-4l-2 14 13-6q9 1 3 9l-15 15Z" fill="${skin}"/>`:''}
 ${pose==='draw'?`<path d="M-43 75q-8 32 30 29l4 16q-61 9-58-30Z" fill="${cloth}"/><ellipse cx="-4" cy="111" rx="15" ry="8" fill="${skin}"/>`:''}
 </g>`;
}

export function portraitArt(seed, index=0) {
 return wrap(`${rect(0,0,320,360,C.ice,0)}<path d="M0 300Q120 165 320 230v130H0Z" fill="${C.sky}" opacity=".35"/>${dot(160,166,114,C.white)}${educator(160,158,1.42,index)}${sparkle(267,65,.65,C.mid)}`,{id:`portrait-${seed}`,w:320,h:360,title:'Illustrated educator portrait',desc:'An original illustrated portrait of an educator.'});
}

function novaHero(){return `
 ${dot(418,343,285,C.ice)}${line('M91 275Q90 77 327 52M635 103q131 103 77 287',C.sky,2,'stroke-dasharray="5 10"')}
 <g transform="rotate(-4 398 332)">${rect(108,150,566,370,C.white,24,'stroke="#8DB8FF" stroke-width="1.5"')}${windowHead(108,150,566,'LEARN SOMETHING. MAKE SOMETHING.')}
 ${rect(132,219,152,275,C.ice,12)}${text(149,245,'YOUR LEARNING PATH',9,C.mid,700,'letter-spacing="1"')}
 ${[0,1,2,3].map((i)=>`${dot(151,277+i*56,10,i===0?C.lime:C.white)}${i===0?check(145,273,.7):text(147,281+i*56,String(i+1),10,C.mid)}${text(170,281+i*56,['Discover','Make','Get feedback','Keep growing'][i],12,C.navy)}${i<3?line(`M151 ${288+i*56}v33`,C.sky,2):''}`).join('')}
 ${rect(302,219,346,183,C.navy,12)}${text(323,247,'A LITTLE PRACTICE.',13,C.white,600)}${text(323,266,'A BIG DIFFERENCE.',13,C.white,600)}
 ${rect(325,290,135,88,C.ice,9)}${rect(337,302,48,48,C.sky,6)}${dot(404,326,16,C.lime)}${line('M434 348h-34',C.white,5)}${rect(480,291,145,12,C.sky,5)}${rect(480,315,100,7,C.white,3,'opacity=".8"')}${rect(480,335,125,7,C.white,3,'opacity=".6"')}${rect(480,362,79,18,C.lime,9)}
 ${text(307,429,'Lesson 03 / Make your first project',13,C.navy,600)}${rect(307,446,324,5,C.ice,2)}${rect(307,446,205,5,C.mid,2,'class="edu-progress-stroke"')}${text(307,478,'Watch. Try. Understand.',11,C.mid)}${dot(612,473,14,C.lime)}${check(606,469,.8)}</g>
 <g class="edu-part--float">${book(508,53,.88,12)}</g>
 <g class="edu-part--float-slow">${rect(38,388,208,113,C.navy,18)}${dot(70,421,14,C.lime)}${check(64,417,.8)}${text(94,427,'Made by you.',16,C.white,600)}${text(60,465,'Skills you can actually use.',12,C.white)}</g>
 <g>${dot(664,488,88,C.sky)}${educator(663,466,1.02,2,'teach')}</g>
 ${rect(376,550,325,72,C.white,18,'stroke="#8DB8FF"')}${dot(411,586,20,C.ice)}${check(403,581,1)}${text(446,580,'A mentor in your corner.',14,C.navy,600)}${text(446,601,'Real feedback. Your next step.',11,C.mid)}
 ${sparkle(76,141,.9)}${sparkle(721,204,.55)}${dot(322,90,8,C.lime)}${line('M49 555q52 32 115-1t110 15',C.navy,3)}
 `;}
function atelierHero(){return `
 ${rect(62,38,676,562,C.ice,3)}${rect(84,16,632,562,C.white,3,'stroke="#8DB8FF"')}
 ${text(112,58,'THE STUDIO / FIELD NOTES',12,C.navy,600,'letter-spacing="2"')}${text(659,58,'07',14,C.mid)}${line('M112 78H688',C.sky,1)}
 ${text(113,121,'A practice,',34,C.navy,400)}${text(113,160,'not just a course.',34,C.navy,600)}
 ${rect(112,190,268,228,C.navy,3)}${educator(244,296,1.15,3,'teach')}${text(132,397,'CRITIQUE / REFINE / REPEAT',10,C.white,500,'letter-spacing="1"')}
 ${text(408,207,'YOUR SIX-WEEK STUDIO',10,C.mid,600,'letter-spacing="1.5"')}
 ${[0,1,2,3].map(i=>`${line(`M423 ${233+i*44}v${i===3?0:44}`,C.sky,1.5)}${dot(423,236+i*44,7,i===3?C.lime:C.navy)}${text(444,241+i*44,['Find your question','Develop your method','Invite a critique','Make it your own'][i],13,C.navy)}`).join('')}
 ${line('M112 446H688',C.sky,1)}${text(112,474,'ONE FINISHED PROJECT.',15,C.navy,600)}${text(112,499,'A clear rationale. A new way of seeing.',14,C.mid)}${text(112,544,'SMALL COHORTS. GENEROUS FEEDBACK.',10,C.navy,500,'letter-spacing="1.5"')}
 <g class="edu-part--float-slow" transform="rotate(7 664 408)">${rect(584,356,154,110,C.lime,3)}${line('M608 410l18 18 53-53',C.navy,4)}${text(604,450,'WORK WORTH SHOWING',9,C.navy,700)}</g>
 ${line('M35 99H64M48 86v26',C.navy,1)}${line('M738 520h27M752 507v26',C.navy,1)}
 `;}
function aeroStage(){return `
 ${rect(0,0,960,600,C.deep,0)}<path d="M0 600V148Q295-90 508 185T960 71v529Z" fill="${C.navy}"/>
 ${rect(48,72,318,393,C.mid,22)}${dot(208,250,130,C.navy)}${educator(200,277,1.87,1,'teach')}${rect(74,420,246,32,C.deep,16)}${text(97,441,'IDRIS / YOUR INSTRUCTOR',12,C.white,600,'letter-spacing="1"')}
 ${rect(397,72,515,348,C.white,18)}${text(426,107,'TODAY IN THE STUDIO',11,C.mid,600,'letter-spacing="1.6"')}${text(426,145,'Good ideas become',25,C.navy,600)}${text(426,176,'better with practice.',25,C.navy,600)}
 ${line('M447 280h96q35 0 35-28v-5q0-28 35-28h61q35 0 35 29v3q0 28 35 28h83',C.sky,4,'class="edu-draw" pathLength="1"')}
 ${[447,619,827].map((x,i)=>`${dot(x,i===1?220:280,22,i===2?C.lime:C.ice)}${text(x-4,(i===1?220:280)+6,String(i+1),16,C.navy,600)}${text(x-28,330,['Observe','Experiment','Understand'][i],12,C.mid)}`).join('')}
 ${line('M426 371H879',C.sky,1)}${text(426,398,'A question is always welcome here.',13,C.navy)}
 <g class="edu-part--float-slow">${rect(407,446,433,77,C.mid,15)}${dot(441,484,19,C.sky)}${text(468,478,'“Can we try that with a real example?”',14,C.white,500)}${text(468,501,'A great question. Let’s make it together.',12,C.ice)}</g>
 ${dot(871,486,24,C.lime)}${check(861,480,1.2)}${text(63,527,'A real room. A shared learning moment.',15,C.white,500)}
 `;}
function folioHero(){return `
 ${rect(65,60,660,640,C.ice,70)}${line('M49 246Q26 95 198 53M620 716q132-32 117-143',C.sky,2)}
 <g transform="rotate(-8 192 177)">${rect(111,87,161,185,C.white,12)}${rect(125,101,133,143,C.navy,7)}<path d="M193 122c-42 0-65 54-24 70-42 23-9 62 24 33 31 29 65-10 24-33 39-16 17-70-24-70Z" fill="${C.sky}"/>${dot(193,181,14,C.lime)}${text(130,260,'LEARN TO MAKE',9,C.navy,600,'letter-spacing="1"')}</g>
 <g transform="rotate(5 573 178)">${rect(487,87,178,157,C.white,12)}${text(506,120,'YOUR NEXT',17,C.navy,600)}${text(506,145,'CHAPTER.',25,C.navy,700)}${line('M506 164q60-14 135 0',C.lime,5)}${text(506,205,'A little courage.',11,C.mid)}${text(506,223,'A lot of possibility.',11,C.mid)}</g>
 ${dot(390,197,37,C.white)}${line('M380 185l26 12-26 12Z',C.navy,2)}
 ${educator(371,375,2.05,0,'draw')}
 ${rect(141,561,511,19,C.navy,9)}${rect(167,580,13,125,C.navy,6)}${rect(614,580,13,125,C.navy,6)}
 <g transform="rotate(-5 358 495)">${rect(234,432,243,133,C.white,12,'stroke="#8DB8FF" stroke-width="2"')}${rect(248,447,215,104,C.navy,6)}${text(266,470,'YOUR CREATIVE PRACTICE',10,C.white,600)}${rect(267,483,79,51,C.sky,6)}${line('M280 519q25-54 52 0',C.white,3)}${paperLines(362,489,80,3,C.ice)}${rect(220,564,272,11,C.sky,5)}</g>
 ${rect(546,473,31,88,C.mid,10)}${line('M561 473v-121',C.navy,6)}<circle cx="562" cy="304" r="49" fill="none" stroke="${C.white}" stroke-width="14"/><path d="M562 255a49 49 0 0 1 49 49" fill="none" stroke="${C.lime}" stroke-width="14" stroke-linecap="round"/>
 ${rect(187,519,34,40,C.lime,8)}${line('M222 528q26-3 14 22h-14',C.navy,4)}
 <g class="edu-part--float">${rect(473,606,244,75,C.white,15,'stroke="#8DB8FF"')}${dot(506,644,18,C.lime)}${check(499,640,.9)}${text(536,639,'Made with intention.',13,C.navy,600)}${text(536,658,'Taught with generosity.',11,C.mid)}</g>
 ${sparkle(722,345,.8)}${sparkle(99,402,.6)}${dot(444,67,7,C.lime)}${line('M67 626q20-26 42-6t40-5',C.navy,3)}
 `;}
function learningPath(){return `
 ${rect(70,75,660,470,C.ice,30)}${text(108,123,'YOUR NEXT CHAPTER',13,C.mid,600,'letter-spacing="2"')}${text(108,166,'A clear path. Your own pace.',28,C.navy,600)}
 ${line('M142 380C142 210 328 449 328 280S514 409 514 260 658 320 658 220',C.sky,9)}${line('M142 380C142 210 328 449 328 280S514 409 514 260 658 320 658 220',C.navy,3,'class="edu-draw" pathLength="1"')}
 ${[[142,380,'Start here'],[328,280,'Build a skill'],[514,260,'Make a project'],[658,220,'Own it']].map(([x,y,l],i)=>`${dot(x,y,23,i===3?C.lime:C.white,'stroke="#012A5D" stroke-width="2"')}${i===3?check(x-8,y-5,1):text(x-5,y+6,String(i+1),18,C.navy,600)}${text(x-30,y+50,l,12,C.navy)}`).join('')}
 ${book(87,437,.56,-8)}${text(297,483,'Learn → practice → feedback → progress',14,C.mid)}${sparkle(696,440,.8)}
 `;}
function critique(){return `
 ${rect(58,70,684,464,C.ice,28)}${rect(248,106,446,322,C.white,14,'stroke="#8DB8FF"')}${windowHead(248,106,446,'THE PROJECT / A SECOND LOOK')}
 ${rect(272,174,204,221,C.navy,8)}<path d="M304 341q15-100 70-103t70 105Z" fill="${C.sky}"/>${dot(374,254,25,C.lime)}${line('M300 354q72-55 150 0',C.white,3)}
 ${text(502,195,'WHAT WORKS',11,C.mid,700,'letter-spacing="1"')}${paperLines(502,216,161,3)}${text(502,296,'WHAT TO TRY',11,C.mid,700,'letter-spacing="1"')}${paperLines(502,315,141,3)}
 ${educator(157,313,1.32,3,'teach')}${line('M213 261q56-78 104-38',C.navy,2,'stroke-dasharray="5 6"')}
 <g class="edu-part--float-slow">${rect(311,447,354,60,C.white,12)}${dot(341,477,15,C.lime)}${check(335,473,.8)}${text(371,482,'Specific feedback. A stronger next draft.',13,C.navy,600)}</g>
 `;}
function curriculum(){return `
 ${rect(62,58,676,488,C.white,8,'stroke="#8DB8FF"')}${text(101,103,'THE PROGRAMME',12,C.mid,600,'letter-spacing="2"')}${text(101,147,'Small steps. Lasting skills.',30,C.navy,500)}${line('M101 172H699',C.sky,1)}
 ${[0,1,2,3,4,5].map(i=>`${text(103,209+i*49,String(i+1).padStart(2,'0'),18,C.mid,400)}${text(155,208+i*49,['Get curious','Build foundations','Explore a method','Make something','Invite feedback','Show your work'][i],16,C.navy,500)}${line(`M101 ${225+i*49}H699`,C.sky,1)}${dot(674,201+i*49,10,i===5?C.lime:C.ice)}${i===5?check(668,197,.75):''}`).join('')}
 ${text(102,526,'SIX WEEKS. ONE PROJECT YOU CAN BE PROUD OF.',10,C.mid,600,'letter-spacing="1"')}
 `;}
function certificate(){return `
 ${[0,1,2,3,4].map(i=>`<path d="M${20+i*30} 550V310a${380-i*30} ${245-i*22} 0 0 1 ${760-i*60} 0v240" fill="none" stroke="${C.sky}" stroke-width="1.5"/>`).join('')}
 <g transform="rotate(-4 400 300)">${rect(122,111,556,365,C.white,6,'stroke="#012A5D" stroke-width="2"')}${rect(141,130,518,327,'none',1,'stroke="#8DB8FF"')}${text(188,178,'WEB ACADEMY',12,C.navy,700,'letter-spacing="2"')}${text(188,231,'A new skill.',34,C.navy,500)}${text(188,274,'An earned achievement.',29,C.navy,600)}${text(188,320,'CERTIFICATE OF COMPLETION',10,C.mid,600,'letter-spacing="2"')}${paperLines(188,344,276,2)}${line('M188 415H366',C.navy,1)}${text(188,435,'LEARN / MAKE / KEEP GROWING',9,C.mid,600)}
 ${dot(587,381,42,C.navy)}${dot(587,381,31,C.lime)}${check(573,374,1.6)}<path d="m562 414-8 50 32-15 28 17-6-52" fill="${C.sky}"/></g>
 ${sparkle(92,159,.7)}${sparkle(709,437,.7)}
 `;}
function library(){return `
 ${dot(404,309,233,C.ice)}${rect(165,400,450,22,C.navy,10)}${rect(198,422,13,96,C.navy,5)}${rect(571,422,13,96,C.navy,5)}
 ${[[212,211,52,189,C.navy],[274,179,55,221,C.mid],[340,223,49,177,C.sky]].map(([x,y,w,h,f],i)=>`${rect(x,y,w,h,f,6)}${line(`M${x+11} ${y+25}h${w-22}M${x+11} ${y+33}h${w-22}`,i===2?C.navy:C.white,2)}${dot(x+w/2,y+h-27,5,C.lime)}`).join('')}
 <g transform="rotate(8 497 281)">${rect(419,130,178,242,C.white,10,'stroke="#8DB8FF"')}${text(441,167,'THE WORKBOOK',12,C.navy,700)}${paperLines(441,189,134,5)}${rect(441,291,134,53,C.ice,6)}${check(454,309,.9)}${text(481,320,'Try it yourself.',11,C.navy)}</g>
 ${rect(411,381,170,19,C.lime,6)}${text(433,451,'Resources for the real work.',14,C.navy,500)}${book(97,87,.58,-12)}${sparkle(656,320,.8)}
 `;}
function community(){return `
 ${dot(400,295,244,C.ice)}${line('M164 249Q396 31 635 249M167 380q235 139 471 0',C.sky,3,'stroke-dasharray="6 9"')}
 ${[[218,290,.95,1],[405,237,1.17,2],[594,290,.95,3]].map(([x,y,s,v])=>`${dot(x,y,82,C.white)}${educator(x,y,s,v)}`).join('')}
 ${rect(288,437,257,65,C.navy,16)}${text(321,465,'Better, together.',21,C.white,600)}${text(321,485,'A community that gets your craft.',11,C.white)}
 <g class="edu-part--float">${rect(82,119,144,65,C.white,12,'stroke="#8DB8FF"')}${text(103,147,'“How did you do that?”',11,C.navy)}${text(103,167,'Let’s figure it out.',11,C.mid)}</g>${sparkle(664,145,.7)}
 `;}
function project(){return `
 ${rect(58,60,684,480,C.ice,30)}${text(97,104,'FROM FIRST ATTEMPT TO FINISHED WORK',11,C.mid,600,'letter-spacing="1.5"')}
 <g transform="rotate(-5 218 287)">${rect(108,151,225,290,C.white,12)}${rect(128,174,185,200,C.ice,5)}${line('M155 330q20-122 65-121t67 124M162 297l49 38 60-70',C.navy,3)}${text(131,405,'01 / THE FIRST IDEA',11,C.mid,600)}</g>
 ${line('M358 285h53m-16-16 16 16-16 16',C.navy,3)}
 <g class="edu-part--float-slow" transform="rotate(5 566 286)">${rect(458,150,225,290,C.white,12)}${rect(478,173,185,200,C.navy,5)}<path d="M502 345c0-80 33-133 66-134 38 0 71 63 71 134Z" fill="${C.sky}"/>${dot(568,268,31,C.lime)}${line('M496 346q73-80 149 0',C.white,3)}${text(480,405,'02 / MADE YOUR OWN',11,C.navy,600)}</g>
 ${text(193,496,'Practice makes a difference you can see.',17,C.navy,500)}
 `;}
function creator(){return `
 ${rect(54,42,692,500,C.ice,35)}${rect(90,82,273,331,C.white,10,'stroke="#8DB8FF"')}${text(114,116,'THE CREATIVE PRACTICE',12,C.mid,600)}
 ${educator(222,263,1.26,0,'draw')}${rect(110,400,238,14,C.navy,7)}${book(376,310,1.18,-8)}
 <g class="edu-part--float-slow" transform="rotate(5 545 200)">${rect(421,80,258,200,C.navy,12)}${text(447,118,'IDEA / EXPERIMENT / MAKE',11,C.white,600)}${dot(493,182,36,C.sky)}${rect(552,147,78,78,C.lime,8)}${line('M453 247h182',C.sky,2)}</g>
 ${rect(143,449,520,58,C.white,12)}${text(169,483,'Your process is as valuable as the finished piece.',16,C.navy)}${sparkle(690,370,.8)}
 `;}
function workshop(){return `
 ${rect(48,45,704,510,C.deep,24)}${text(80,86,'THE LIVE WORKSHOP / LET’S TRY IT TOGETHER',12,C.white,600,'letter-spacing="1"')}
 ${rect(80,111,435,320,C.white,13)}${text(106,148,'A QUESTION WORTH EXPLORING',11,C.mid,600)}
 ${dot(175,248,48,C.ice)}${rect(267,203,91,91,C.sky,9)}<path d="m403 293 38-89 41 89Z" fill="${C.lime}"/>${line('M222 248h36M360 248h35',C.navy,3,'class="edu-draw" pathLength="1"')}
 ${text(108,350,'Observe a pattern.',17,C.navy,600)}${text(108,378,'Change one thing. See what happens.',14,C.mid)}
 ${rect(539,111,181,320,C.mid,13)}${educator(628,213,.88,4,'teach')}${text(557,353,'YOUR AGENDA',11,C.white,600)}${text(557,378,'01 / Look closely',11,C.ice)}${text(557,401,'02 / Make a test',11,C.ice)}
 ${rect(80,460,640,53,C.navy,12)}${dot(109,487,15,C.lime)}${check(103,483,.8)}${text(139,493,'Bring one idea. Leave with a next step.',16,C.white)}
 `;}
function novaMentoring(){return `
 ${dot(230,271,179,C.ice)}${educator(225,273,1.75,2,'teach')}
 ${rect(407,76,306,360,C.white,20,'stroke="#8DB8FF" stroke-width="2"')}${windowHead(407,76,306,'A MENTOR IN YOUR CORNER')}
 ${rect(432,143,256,153,C.navy,11)}${dot(508,211,36,C.lime)}${line('M561 178h99M561 198h72M561 218h93',C.sky,5)}
 ${text(434,329,'What’s working?',18,C.navy,600)}${text(434,358,'A clear idea. A strong starting point.',12,C.mid)}${text(434,394,'What’s your next small step?',13,C.navy,600)}
 <g class="edu-part--float-slow">${rect(129,461,532,71,C.navy,18)}${text(154,491,'Specific feedback. Not just “looks good.”',17,C.white,600)}${text(154,514,'Learn to see your own work with a fresh perspective.',12,C.ice)}</g>
 ${line('M354 250q44-76 72-45',C.mid,3,'stroke-dasharray="4 8"')}${sparkle(83,95,.7)}
 `;}
function atelierCertificate(){return `
 ${rect(70,36,660,519,C.ice,2)}<g transform="rotate(-3 367 279)">${rect(104,70,570,405,C.white,2,'stroke="#012A5D" stroke-width="1.5"')}${line('M127 93H652V453H127Z',C.sky,1)}
 ${text(150,129,'THE STUDIO / CERTIFICATE OF COMPLETION',10,C.mid,600,'letter-spacing="1.8"')}${text(150,185,'A practice, developed.',29,C.navy,500)}${text(150,225,'A point of view, earned.',29,C.navy,600)}
 ${paperLines(151,261,414,3,C.sky)}${text(151,349,'For the work, the revisions and the generous questions.',12,C.mid)}${line('M151 396h190M406 396h190',C.navy,1)}${text(151,418,'THE LEARNER',9,C.mid,500)}${text(406,418,'THE EDUCATOR',9,C.mid,500)}</g>
 <g class="edu-part--float-slow">${dot(659,447,55,C.navy)}${dot(659,447,39,C.lime)}${check(642,436,2)}${text(590,533,'SAMPLE / NOT ACCREDITATION',8,C.navy,500)}</g>
 `;}
function aeroReplay(){return `
 ${rect(39,43,722,516,C.deep,24)}${text(69,82,'AFTER THE LIVE CLASS / KEEP THE MOMENTUM',12,C.white,600,'letter-spacing="1"')}
 ${rect(70,111,439,327,C.navy,13)}${rect(90,132,399,234,C.white,9)}${text(113,168,'ONE IDEA. THREE USEFUL EXAMPLES.',11,C.mid,600)}${[154,288,420].map((x,i)=>`${dot(x,244,35,i===2?C.lime:C.ice)}${text(x-6,252,String(i+1),23,C.navy)}`).join('')}${line('M183 244h68M323 244h61',C.sky,3)}
 ${text(93,403,'REVISIT THE METHOD',13,C.white,600)}${rect(90,418,399,4,C.mid,2)}${rect(90,418,241,4,C.lime,2,'class="edu-progress-stroke"')}
 ${rect(532,111,199,327,C.mid,13)}${text(554,149,'YOUR FIELD NOTES',11,C.white,600)}${paperLines(554,175,150,4,C.sky)}${text(554,285,'One thing to try:',13,C.white)}${paperLines(554,310,150,4,C.sky)}
 ${text(72,494,'Pause. Try it. Come back with a question.',17,C.white,500)}${text(72,522,'An illustrated lesson preview, not a connected video stream.',11,C.ice)}
 `;}
function folioGallery(){return `
 ${rect(47,41,706,508,C.ice,45)}${text(85,91,'A FEW GOOD THINGS, MADE BY LEARNERS',12,C.mid,600,'letter-spacing="1"')}
 <g transform="rotate(-7 202 277)">${rect(90,128,224,278,C.white,8)}${rect(105,143,194,205,C.navy,4)}${dot(200,238,58,C.sky)}${line('M151 264q49-98 98 0',C.lime,8)}${text(110,380,'A NEW POINT OF VIEW',10,C.navy,600)}</g>
 <g transform="rotate(5 455 249)">${rect(341,120,225,279,C.white,8)}${rect(356,135,195,205,C.sky,4)}<path d="M383 318V174h143v144Z" fill="${C.navy}"/><path d="m383 318 72-136 71 136Z" fill="${C.lime}"/>${text(361,374,'AN IDEA, MADE REAL',10,C.navy,600)}</g>
 ${rect(591,170,123,163,C.navy,8)}${text(606,203,'KEEP',22,C.white,600)}${text(606,234,'MAKING.',19,C.white,600)}${line('M607 256h88',C.lime,4)}${text(606,307,'ONE SMALL STEP.',8,C.ice)}
 ${text(96,477,'The work is yours. The possibilities are open.',20,C.navy,500)}${text(96,508,'Illustrative student projects / original vector artwork',11,C.mid)}
 `;}
const scenes={nova:novaHero,atelier:atelierHero,aero:aeroStage,folio:folioHero,path:learningPath,critique,curriculum,certificate,library,community,project,creator,workshop,
 'nova-path':learningPath,'nova-mentor':novaMentoring,'nova-completion':certificate,
 'atelier-curriculum':curriculum,'atelier-critique':critique,'atelier-certificate':atelierCertificate,
 'aero-workshop':workshop,'aero-community':community,'aero-replay':aeroReplay,
 'folio-project':project,'folio-creator':creator,'folio-gallery':folioGallery};
const descriptions={nova:'An illustrated lesson workspace connects discovery, practice, mentor feedback and a finished project.',atelier:'An editorial studio notebook pairs an educator with a structured programme and a finished project.',aero:'An instructor explains a three-step process on a digital whiteboard while welcoming a learner question.',folio:'A creative educator teaches from a desk surrounded by original artwork, course notes and a recording light.',path:'Four connected learning milestones lead from a first lesson to a finished project.',critique:'An educator gives specific feedback on a student project.',curriculum:'A six-week programme progresses from curiosity and foundations to feedback and a finished project.',certificate:'A sample completion certificate celebrates an earned new skill.',library:'Books, a printable workbook and practical learning resources sit together on a desk.',community:'Three educators and learners share ideas and learn together.',project:'A first sketch develops into a considered finished creative project.',creator:'An educator documents a creative process beside a project, a lesson notebook and drawing tools.',workshop:'A live workshop pairs a three-shape experiment with an instructor, an agenda and a learning goal.',
 'nova-path':'A friendly, illustrated learning path connects lessons, practice and progress.', 'nova-mentor':'An educator gives specific feedback on an original learner project.', 'nova-completion':'An illustrated completion certificate celebrates the work and the learning journey.',
 'atelier-curriculum':'An editorial curriculum maps six weeks of considered practice.', 'atelier-critique':'An educator reviews a project through specific annotations and constructive critique.', 'atelier-certificate':'A formal sample certificate records a developed practice and a finished project; not accreditation.',
 'aero-workshop':'An instructor guides a live three-shape experiment beside a clear workshop agenda.', 'aero-community':'A small learning room brings people, questions and different perspectives together.', 'aero-replay':'An illustrated replay workspace includes a worked example, chapter progress and space for notes.',
 'folio-project':'A learner develops an original project from a first sketch into a finished composition.', 'folio-creator':'An independent educator documents a creative process at a teaching desk.', 'folio-gallery':'A wall of original illustrated learner projects celebrates different points of view.'};
function wrap(body,{id='learning-art',w=800,h=640,title='A little learning changes everything',desc='',decorative=false}={}){
 const safe=id.replace(/[^a-z0-9_-]/gi,'-');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="edu-art" ${decorative?'aria-hidden="true"':`role="img" aria-labelledby="${safe}-title ${safe}-desc"`} focusable="false"><title id="${safe}-title">${esc(title)}</title><desc id="${safe}-desc">${esc(desc)}</desc>${body}</svg>`;
}
export function scene(kind='nova',options={}){
 const key=scenes[kind]?kind:'nova';
 return wrap(scenes[key](),{id:options.id||`edu-${key}`,w:key==='aero'?960:800,h:key==='folio'?800:key==='nova'?680:600,title:options.title||'Learning, beautifully illustrated',desc:descriptions[key]||descriptions.folio,...options});
}

/** Twelve small, semantically different educational objects. */
export const spotNames=['book','lesson','calendar','mentor','certificate','community','project','resources','practice','feedback','progress','creator'];
export function spot(kind='book',options={}){
 const drawings={
 book:book(69,62,1.1,-5),
 lesson:`${rect(43,44,234,150,C.white,16,'stroke="#012A5D" stroke-width="3"')}${windowHead(43,44,234,'LESSON 01')}${dot(160,126,28,C.navy)}<path d="m152 111 23 15-23 15Z" fill="${C.lime}"/>${rect(76,176,166,4,C.sky,2)}`,
 calendar:`${rect(66,35,188,176,C.white,16,'stroke="#012A5D" stroke-width="3"')}${rect(66,35,188,48,C.navy,16)}${line('M100 21v33M220 21v33',C.sky,7)}${[0,1,2,3,4,5].map((_,i)=>dot(105+(i%3)*53,112+Math.floor(i/3)*45,9,i===4?C.lime:C.ice)).join('')}${check(153,150,.9)}`,
 mentor:`${dot(155,114,88,C.white)}${educator(154,108,.9,2,'teach')}${dot(246,65,26,C.lime)}${check(235,58,1.2)}`,
 certificate:`${rect(40,48,240,147,C.white,7,'stroke="#012A5D" stroke-width="3"')}${paperLines(66,77,135,4)}${dot(235,161,29,C.lime)}${check(224,155,1.2)}${line('M67 170h95',C.navy,2)}`,
 community:`${[85,160,235].map((x,i)=>`${dot(x,104,41,C.white)}${educator(x,110,.48,i+1)}`).join('')}${line('M70 200q90-30 180 0',C.navy,3)}`,
 project:`${rect(67,34,186,176,C.white,12,'stroke="#012A5D" stroke-width="3"')}${rect(83,50,154,119,C.navy,6)}${dot(160,102,29,C.lime)}${line('M92 152q66-80 136 0',C.sky,4)}${line('M94 188h133',C.navy,3)}`,
 resources:`${rect(73,84,139,115,C.navy,8)}${rect(99,60,139,115,C.sky,8)}${rect(123,34,139,115,C.white,8,'stroke="#012A5D" stroke-width="2"')}${paperLines(145,58,90,3)}${check(152,118,1)}`,
 practice:`${book(45,80,1.1,0)}<g transform="rotate(32 245 104)">${rect(236,24,18,154,C.navy,7)}<path d="m236 178 9 22 9-22" fill="${C.lime}"/></g>`,
 feedback:`${rect(47,48,225,125,C.white,16,'stroke="#012A5D" stroke-width="3"')}<path d="m89 173-18 33 62-33" fill="${C.white}" stroke="${C.navy}" stroke-width="3"/>${paperLines(74,79,143,3)}${dot(240,163,29,C.lime)}${check(229,156,1.3)}`,
 progress:`<circle cx="160" cy="117" r="75" fill="${C.white}" stroke="${C.sky}" stroke-width="10"/><path d="M160 42a75 75 0 1 1-74 88" fill="none" stroke="${C.navy}" stroke-width="10" stroke-linecap="round"/>${dot(160,117,38,C.lime)}${check(145,109,1.8)}`,
 creator:`${rect(48,73,224,128,C.navy,14)}${rect(62,87,196,97,C.white,7)}${educator(160,138,.47,0)}${dot(263,56,25,C.lime)}${line('M255 45v22M246 56h18',C.navy,3)}`,
 };
 return wrap(`${dot(160,125,104,C.ice)}${drawings[kind]||drawings.book}`,{id:options.id||`spot-${kind}`,w:320,h:240,title:`${kind} illustration`,desc:`An original educational illustration representing ${kind}.`,...options});
}
export const stateNames=['empty','saved','upcoming','complete','download','welcome','offline','question'];
export function stateArt(name){
 const drawings={
 empty:`${rect(63,74,194,119,C.white,15,'stroke="#012A5D" stroke-width="3"')}<path d="M63 96V74q0-15 15-15h58l21 24h85q15 0 15 15" fill="${C.sky}" stroke="${C.navy}" stroke-width="3"/>${line('M111 138h98',C.sky,3,'stroke-dasharray="4 8"')}${sparkle(235,56,.65)}`,
 saved:`${book(51,81,1.1,-4)}<path d="M207 46h48v95l-24-18-24 18Z" fill="${C.lime}" stroke="${C.navy}" stroke-width="3"/>${line('M220 80l10 10 15-20',C.navy,3)}`,
 upcoming:`${rect(66,37,169,165,C.white,14,'stroke="#012A5D" stroke-width="3"')}${rect(66,37,169,45,C.navy,14)}${line('M99 25v25M201 25v25',C.sky,6)}${paperLines(87,105,99,3)}${dot(234,166,39,C.lime)}${line('M234 143v24l15 9',C.navy,3)}`,
 complete:`${rect(52,57,216,139,C.white,8,'stroke="#012A5D" stroke-width="3"')}${paperLines(75,83,136,3)}${dot(225,165,36,C.navy)}${dot(225,165,25,C.lime)}${check(214,158,1.4)}${sparkle(80,39,.5)}`,
 download:`${rect(98,31,124,144,C.white,8,'stroke="#012A5D" stroke-width="3"')}${paperLines(115,54,89,3)}${line('M160 101v84m-23-24 23 24 23-24',C.navy,5)}${line('M80 177v32h160v-32',C.navy,4)}`,
 welcome:`${rect(72,26,168,191,C.navy,14)}${rect(88,43,136,174,C.ice,8)}${educator(156,139,.65,0,'teach')}${line('M52 217h217',C.navy,3)}${sparkle(261,66,.8)}`,
 offline:`${rect(54,47,212,137,C.white,12,'stroke="#012A5D" stroke-width="3"')}${rect(67,61,186,107,C.ice,6)}${line('M128 202h65M160 185v17',C.navy,4)}${line('M123 110q37-35 74 0M135 127q25-22 50 0',C.sky,4)}${dot(160,143,5,C.navy)}${line('M113 83l94 77',C.navy,4)}`,
 question:`${rect(58,47,204,132,C.white,16,'stroke="#012A5D" stroke-width="3"')}<path d="m92 179-14 27 56-27" fill="${C.white}" stroke="${C.navy}" stroke-width="3"/>${line('M141 91q0-25 22-25 24 0 24 22 0 13-23 26v14',C.navy,6)}${dot(164,148,4,C.navy)}`,
 };
 return wrap(`${dot(160,124,105,C.ice)}${drawings[name]||drawings.empty}`,{id:`state-${name}`,w:320,h:240,title:`${name} learning state`,desc:`An original illustration for the ${name} interface state.`});
}

/** Subject-aware covers. The seed changes the composition, not the meaning. */
export function subjectCover(subject='design',variant=0,label='LEARN BY MAKING',options={}){
 const dark=options.dark||false;
 const bg=dark?C.deep:C.ice, ink=dark?C.white:C.navy;
 let art='';
 if(subject==='code') art=`${rect(160,90,480,280,C.navy,15)}${windowHead(160,90,480,'BUILD / UNDERSTAND / REPEAT',true)}${text(193,177,'const learn = (curiosity) => {',18,C.sky,500)}${text(214,215,'practice();',21,C.white,500)}${text(214,252,'makeSomething();',21,C.lime,500)}${text(214,289,'return confidence;',21,C.white,500)}${text(193,330,'};',20,C.sky,500)}${rect(670,152,39,150,C.sky,10)}${line('M688 178v91',C.navy,3)}`;
 else if(subject==='data') art=`${rect(154,82,494,296,C.white,14,'stroke="#8DB8FF"')}${text(183,120,'TURN INFORMATION INTO INSIGHT',12,C.mid,700,'letter-spacing="1"')}${[86,141,109,192,226].map((h,i)=>rect(190+i*78,339-h,38,h,i===3?C.lime:i%2?C.sky:C.navy,5)).join('')}${line('M183 339H615',C.navy,2)}${line('M206 252 284 228 362 244 440 188 518 158',C.mid,3)}`;
 else if(subject==='visual') art=`${rect(162,68,266,310,C.white,12,'stroke="#8DB8FF"')}${rect(177,84,236,232,C.navy,7)}<path d="M294 106c-52 0-75 62-27 82-51 30-12 82 27 46 40 36 78-16 27-46 47-20 25-82-27-82Z" fill="${variant%2?C.sky:C.ice}"/>${dot(294,177,20,C.lime)}${text(189,347,'MAKE YOUR MARK',17,C.navy,700)}${rect(467,125,152,190,C.sky,12)}${line('M486 275q56-151 112-49',C.navy,4)}${[0,1,2].map(i=>dot(486+i*56,275-i*24,6,C.white,'stroke="#012A5D" stroke-width="2"')).join('')}${line('M519 108l41-30',ink,3)}`;
 else if(subject==='business') art=`${rect(147,82,505,294,C.white,14,'stroke="#8DB8FF"')}${text(178,126,'MAKE YOUR PRACTICE SUSTAINABLE',13,C.mid,700)}${[0,1,2].map(i=>`${rect(177+i*148,156,128,172,i===1?C.navy:C.ice,10)}${text(195+i*148,188,['PURPOSE','VALUE','GROWTH'][i],11,i===1?C.white:C.navy,700)}${paperLines(195+i*148,211,83,3,i===1?C.sky:C.mid)}${dot(277+i*148,303,9,i===1?C.lime:C.sky)}`).join('')}`;
 else if(subject==='teaching') art=`${rect(149,73,500,301,C.white,15,'stroke="#8DB8FF"')}${windowHead(149,73,500,'THE CLASSROOM IS A CONVERSATION')}${educator(268,253,1,variant%6,'teach')}${rect(377,138,240,191,C.ice,8)}${text(397,170,'LEARN / TRY / REFLECT',12,C.navy,700)}${line('M406 239h152',C.sky,4)}${[406,481,558].map((x,i)=>`${dot(x,239,15,i===2?C.lime:C.navy)}${text(x-4,244,String(i+1),11,i===2?C.navy:C.white)}`).join('')}${paperLines(397,284,166,2)}`;
 else art=`${rect(139,75,518,301,C.white,15,'stroke="#8DB8FF"')}${windowHead(139,75,518,'DESIGN WITH INTENTION')}${rect(165,140,132,207,C.navy,9)}${rect(180,157,102,64,C.sky,6)}${paperLines(180,240,95,3,C.white)}${rect(317,140,310,94,C.ice,9)}${dot(358,186,23,C.lime)}${paperLines(399,164,185,3,C.mid)}${rect(317,252,144,95,C.sky,9)}${rect(480,252,147,95,C.navy,9)}${line('M335 317l37-34 39 27 29-31',C.navy,3)}${text(500,310,'Aa',39,C.white,500)}`;
 const courseId=options.courseId||(options.id||'').replace('cover-','');
 if(courseId==='c4') art=`${rect(146,66,509,314,C.white,8,'stroke="#8DB8FF"')}${line('M174 99H624M174 136H624M174 173H624M174 210H624M174 247H624M174 284H624M174 321H624',C.sky,1)}${text(178,202,'Aa Bb',88,C.navy,600)}${text(182,251,'Good type has a rhythm.',22,C.mid)}${text(182,293,'Scale. Measure. Leading. Space.',15,C.navy)}${text(182,338,'A well-set page makes room for the reader.',11,C.mid)}`;
 if(courseId==='c5') art=`${rect(139,68,518,314,C.white,14,'stroke="#8DB8FF"')}${text(166,108,'LISTEN / OBSERVE / FIND THE PATTERN',12,C.mid,600)}${educator(242,232,.8,2)}${rect(345,136,280,87,C.ice,8)}${text(364,165,'“What was difficult about that?”',14,C.navy)}${paperLines(364,182,225,2,C.sky)}${[0,1,2].map(i=>`${rect(345+i*94,247,81,83,i===1?C.lime:C.sky,5)}${paperLines(356+i*94,264,58,3,C.navy)}`).join('')}`;
 if(courseId==='c6'||courseId==='c16') art=`${rect(141,72,515,302,C.navy,15)}${text(168,111,courseId==='c16'?'PURPOSEFUL INTERFACE MOTION':'TIMING IS A VISUAL LANGUAGE',13,C.white,600)}${line('M181 315V151M181 315H614',C.sky,2)}${line('M181 315C290 315 404 153 614 153',C.lime,5)}${line('M181 315 291 315M614 153 508 153',C.sky,2,'stroke-dasharray="5 5"')}${dot(291,315,8,C.white)}${dot(508,153,8,C.white)}${dot(397,239,15,C.lime)}${text(432,331,courseId==='c16'?'REDUCED MOTION / BUILT IN':'EASE IN. EASE OUT.',10,C.ice)}`;
 if(courseId==='c7') art=`${rect(145,70,510,305,C.white,15,'stroke="#8DB8FF"')}${windowHead(145,70,510,'BUILT FOR EVERYONE')}${rect(181,147,172,74,C.navy,10)}${rect(174,140,186,88,'none',13,'stroke="#14427F" stroke-width="3" stroke-dasharray="5 4"')}${text(210,192,'A clear action',15,C.white,600)}${text(395,170,'TAB',18,C.navy,600)}${text(395,199,'ENTER',18,C.navy,600)}${text(395,228,'SPACE',18,C.navy,600)}${[0,1,2,3].map(i=>rect(185+i*112,277,92,46,i===1?C.lime:C.ice,8)).join('')}${text(196,306,'Ctrl',11,C.navy)}${text(310,306,'Tab',11,C.navy)}${text(420,306,'Shift',11,C.navy)}${text(532,306,'Enter',11,C.navy)}`;
 if(courseId==='c9') art=`${rect(143,72,514,304,C.white,14,'stroke="#8DB8FF"')}${windowHead(143,72,514,'A LITTLE PYTHON. A LOT OF POSSIBILITY.')}${text(169,167,'01',12,C.mid)}${rect(205,140,422,65,C.navy,6)}${text(223,178,'print("Hello, curiosity.")',20,C.lime)}${text(169,252,'02',12,C.mid)}${rect(205,224,422,113,C.ice,6)}${text(224,255,'question → small experiment → insight',15,C.navy)}${line('M225 307 294 282 360 299 432 268 507 284 597 252',C.mid,3)}`;
 if(courseId==='c12') art=`${rect(139,70,518,309,C.white,14,'stroke="#8DB8FF"')}${windowHead(139,70,518,'A PORTFOLIO IS AN ARGUMENT')}${[0,1,2].map(i=>`${rect(165+i*160,142,143,157,i===1?C.navy:C.ice,8)}${dot(236+i*160,205,34,i===1?C.lime:C.sky)}${text(178+i*160,276,['QUESTION','PROCESS','RESULT'][i],11,i===1?C.white:C.navy,600)}`).join('')}${text(168,344,'Show what changed. Explain your decisions.',17,C.navy,500)}`;
 if(courseId==='c13') art=`${rect(142,72,515,303,C.navy,15)}${text(171,111,'THINK IN THREE DIMENSIONS',13,C.white,600,'letter-spacing="1"')}<path d="m400 146 109 63-109 65-109-65Z" fill="${C.lime}"/><path d="m291 209 109 65v96l-109-62Z" fill="${C.sky}"/><path d="m400 274 109-65v99l-109 62Z" fill="${C.mid}"/>${line('M225 325l29-17M570 325l-29-17M400 130v-13',C.white,2)}${dot(231,163,14,C.white)}${line('M247 163h37M231 185v33',C.sky,2)}`;
 if(courseId==='c14') art=`${rect(138,69,521,308,C.white,14,'stroke="#8DB8FF"')}${text(167,109,'A SHARED CREATIVE DIRECTION',13,C.mid,600)}${rect(167,135,160,204,C.navy,6)}${dot(247,221,53,C.sky)}${text(182,317,'THE BIG IDEA',12,C.white,600)}${rect(347,135,141,94,C.lime,6)}${rect(506,135,124,94,C.sky,6)}${rect(347,247,283,92,C.ice,6)}${text(366,279,'BRIEF / REFERENCES / DECISIONS',10,C.navy,600)}${paperLines(366,299,236,2,C.mid)}`;
 if(courseId==='c15') art=`${rect(146,72,508,303,C.white,15,'stroke="#8DB8FF"')}${windowHead(146,72,508,'TURN A PRACTICE INTO A USEFUL LESSON')}${rect(171,139,226,153,C.navy,8)}${educator(284,223,.67,6,'teach')}${text(419,161,'YOUR FIRST LESSON',11,C.mid,600)}${[0,1,2].map(i=>`${dot(431,195+i*43,10,i===2?C.lime:C.sky)}${text(450,199+i*43,['One learning goal','One clear example','One small attempt'][i],11,C.navy)}`).join('')}${text(172,342,'Start with what the learner can do next.',17,C.navy)}`;
 return wrap(`${rect(0,0,800,500,bg,0)}${dot(721,82,50,dark?C.mid:C.white)}${dot(91,358,42,dark?C.mid:C.sky)}<g transform="translate(${variant%3*5-5} 0)">${art}</g>${line('M56 417H744',dark?C.mid:C.sky,1)}${text(58,455,label,16,ink,600,'letter-spacing="1.6"')}${text(710,455,String(variant+1).padStart(2,'0'),16,ink,500)}`,{id:options.id||`cover-${subject}-${variant}`,w:800,h:500,title:label,desc:`A subject-specific learning illustration for ${subject}.`});
}

export const themeSceneNames={nova:['nova','nova-path','nova-mentor','nova-completion'],atelier:['atelier','atelier-curriculum','atelier-critique','atelier-certificate'],aero:['aero','aero-workshop','aero-community','aero-replay'],folio:['folio','folio-project','folio-creator','folio-gallery']};
export function educationImageSet(theme='nova'){
 const out={};
 for(const kind of new Set([...themeSceneNames[theme]||themeSceneNames.nova,'path','curriculum','critique','certificate','library','community','project','creator','workshop'])) out[`edu-${kind}`]=scene(kind);
 for(const name of spotNames) out[`edu-spot-${name}`]=spot(name);
 for(const name of stateNames) out[`edu-state-${name}`]=stateArt(name);
 return out;
}
