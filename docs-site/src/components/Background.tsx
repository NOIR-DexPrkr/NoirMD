import type { CSSProperties } from 'react';

const Background = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    style={{ opacity: 1 }}
    aria-hidden="true"
  >
    <svg
      className="block h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0, 230, 168, 0.15)" />
          <stop offset="50%" stopColor="rgba(0, 204, 255, 0.05)" />
          <stop offset="100%" stopColor="rgba(5, 5, 5, 0)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="30" fill="url(#coreGlow)" style={{ animation: 'nr-core-pulse 8s ease-in-out infinite' }} />
        <g className="orbit" style={{ '--dur': '12s', '--delay': '-5.5s', '--a0': '240deg', '--a1': '760deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '22px 0px', '--r0': '22px', '--r1': '1.2px', '--peak': '0.36' } as CSSProperties}>
        <line x1="22" y1="0" x2="22" y2="-2.5" stroke="#e8edf5" strokeWidth="0.43" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16s', '--delay': '-6.7s', '--a0': '62deg', '--a1': '582deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '41px 0px', '--r0': '41px', '--r1': '1.2px', '--peak': '0.26' } as CSSProperties}>
        <line x1="41" y1="0" x2="41" y2="-2.9" stroke="#00e6a8" strokeWidth="0.34" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.7s', '--delay': '-3.1s', '--a0': '186deg', '--a1': '706deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '19px 0px', '--r0': '19px', '--r1': '1.2px', '--peak': '0.17' } as CSSProperties}>
        <line x1="19" y1="0" x2="19" y2="-5.2" stroke="#8f9bb3" strokeWidth="0.45" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.7s', '--delay': '-19s', '--a0': '293deg', '--a1': '813deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '34px 0px', '--r0': '34px', '--r1': '1.2px', '--peak': '0.35' } as CSSProperties}>
        <line x1="34" y1="0" x2="34" y2="-2.1" stroke="#e8edf5" strokeWidth="0.49" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '19.8s', '--delay': '0s', '--a0': '67deg', '--a1': '587deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '19px 0px', '--r0': '19px', '--r1': '1.2px', '--peak': '0.31' } as CSSProperties}>
        <line x1="19" y1="0" x2="19" y2="-3.2" stroke="#8f9bb3" strokeWidth="0.45" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '10.6s', '--delay': '-16.4s', '--a0': '269deg', '--a1': '789deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '29px 0px', '--r0': '29px', '--r1': '1.2px', '--peak': '0.33' } as CSSProperties}>
        <line x1="29" y1="0" x2="29" y2="-2.5" stroke="#00ccff" strokeWidth="0.25" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.7s', '--delay': '-0.9s', '--a0': '89deg', '--a1': '609deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '41px 0px', '--r0': '41px', '--r1': '1.2px', '--peak': '0.33' } as CSSProperties}>
        <line x1="41" y1="0" x2="41" y2="-3.1" stroke="#e8edf5" strokeWidth="0.47" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '12.6s', '--delay': '-0.2s', '--a0': '18deg', '--a1': '538deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '31px 0px', '--r0': '31px', '--r1': '1.2px', '--peak': '0.25' } as CSSProperties}>
        <line x1="31" y1="0" x2="31" y2="-4.8" stroke="#00e6a8" strokeWidth="0.46" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '10.1s', '--delay': '-16.7s', '--a0': '24deg', '--a1': '544deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '40px 0px', '--r0': '40px', '--r1': '1.2px', '--peak': '0.28' } as CSSProperties}>
        <line x1="40" y1="0" x2="40" y2="-2.2" stroke="#e8edf5" strokeWidth="0.41" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '10s', '--delay': '-1.3s', '--a0': '179deg', '--a1': '699deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '18px 0px', '--r0': '18px', '--r1': '1.2px', '--peak': '0.34' } as CSSProperties}>
        <line x1="18" y1="0" x2="18" y2="-5.3" stroke="#00ccff" strokeWidth="0.25" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.3s', '--delay': '-0.9s', '--a0': '328deg', '--a1': '848deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '46px 0px', '--r0': '46px', '--r1': '1.2px', '--peak': '0.26' } as CSSProperties}>
        <line x1="46" y1="0" x2="46" y2="-3.8" stroke="#00ccff" strokeWidth="0.38" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '13.5s', '--delay': '-19s', '--a0': '157deg', '--a1': '677deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '42px 0px', '--r0': '42px', '--r1': '1.2px', '--peak': '0.32' } as CSSProperties}>
        <line x1="42" y1="0" x2="42" y2="-4.1" stroke="#8f9bb3" strokeWidth="0.39" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '18.5s', '--delay': '-3.4s', '--a0': '6deg', '--a1': '526deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '45px 0px', '--r0': '45px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="45" y1="0" x2="45" y2="-5.8" stroke="#00b8e0" strokeWidth="0.36" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '12.5s', '--delay': '-12.4s', '--a0': '119deg', '--a1': '639deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '42px 0px', '--r0': '42px', '--r1': '1.2px', '--peak': '0.3' } as CSSProperties}>
        <line x1="42" y1="0" x2="42" y2="-2.5" stroke="#00d68f" strokeWidth="0.29" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.6s', '--delay': '-20.7s', '--a0': '275deg', '--a1': '795deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '38px 0px', '--r0': '38px', '--r1': '1.2px', '--peak': '0.34' } as CSSProperties}>
        <line x1="38" y1="0" x2="38" y2="-4.8" stroke="#00ccff" strokeWidth="0.35" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '13.1s', '--delay': '-0.8s', '--a0': '124deg', '--a1': '644deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '46px 0px', '--r0': '46px', '--r1': '1.2px', '--peak': '0.21' } as CSSProperties}>
        <line x1="46" y1="0" x2="46" y2="-2.1" stroke="#e8edf5" strokeWidth="0.32" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.2s', '--delay': '-6.7s', '--a0': '151deg', '--a1': '671deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '20px 0px', '--r0': '20px', '--r1': '1.2px', '--peak': '0.24' } as CSSProperties}>
        <line x1="20" y1="0" x2="20" y2="-5.9" stroke="#8f9bb3" strokeWidth="0.29" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20.7s', '--delay': '-4.9s', '--a0': '297deg', '--a1': '817deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '18px 0px', '--r0': '18px', '--r1': '1.2px', '--peak': '0.42' } as CSSProperties}>
        <line x1="18" y1="0" x2="18" y2="-2.1" stroke="#00d68f" strokeWidth="0.54" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '12.3s', '--delay': '-6.2s', '--a0': '100deg', '--a1': '620deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '34px 0px', '--r0': '34px', '--r1': '1.2px', '--peak': '0.2' } as CSSProperties}>
        <line x1="34" y1="0" x2="34" y2="-4.5" stroke="#00ccff" strokeWidth="0.46" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.6s', '--delay': '-18.5s', '--a0': '83deg', '--a1': '603deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '46px 0px', '--r0': '46px', '--r1': '1.2px', '--peak': '0.2' } as CSSProperties}>
        <line x1="46" y1="0" x2="46" y2="-5.9" stroke="#00e6a8" strokeWidth="0.52" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.1s', '--delay': '-8.2s', '--a0': '201deg', '--a1': '721deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '35px 0px', '--r0': '35px', '--r1': '1.2px', '--peak': '0.41' } as CSSProperties}>
        <line x1="35" y1="0" x2="35" y2="-4.8" stroke="#00b8e0" strokeWidth="0.29" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '21.3s', '--delay': '-17s', '--a0': '125deg', '--a1': '645deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '47px 0px', '--r0': '47px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="47" y1="0" x2="47" y2="-3.8" stroke="#00ccff" strokeWidth="0.44" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.8s', '--delay': '-12.4s', '--a0': '1deg', '--a1': '521deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '23px 0px', '--r0': '23px', '--r1': '1.2px', '--peak': '0.27' } as CSSProperties}>
        <line x1="23" y1="0" x2="23" y2="-5.7" stroke="#00ccff" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14s', '--delay': '-11.3s', '--a0': '327deg', '--a1': '847deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '47px 0px', '--r0': '47px', '--r1': '1.2px', '--peak': '0.33' } as CSSProperties}>
        <line x1="47" y1="0" x2="47" y2="-5.5" stroke="#00d68f" strokeWidth="0.31" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.3s', '--delay': '-16.8s', '--a0': '296deg', '--a1': '816deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '41px 0px', '--r0': '41px', '--r1': '1.2px', '--peak': '0.22' } as CSSProperties}>
        <line x1="41" y1="0" x2="41" y2="-3.1" stroke="#00d68f" strokeWidth="0.36" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20s', '--delay': '-13.4s', '--a0': '239deg', '--a1': '759deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '23px 0px', '--r0': '23px', '--r1': '1.2px', '--peak': '0.17' } as CSSProperties}>
        <line x1="23" y1="0" x2="23" y2="-3.1" stroke="#00b8e0" strokeWidth="0.32" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '21.3s', '--delay': '-9.7s', '--a0': '289deg', '--a1': '809deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '45px 0px', '--r0': '45px', '--r1': '1.2px', '--peak': '0.41' } as CSSProperties}>
        <line x1="45" y1="0" x2="45" y2="-5.1" stroke="#00d68f" strokeWidth="0.58" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16s', '--delay': '-14.8s', '--a0': '56deg', '--a1': '576deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '36px 0px', '--r0': '36px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="36" y1="0" x2="36" y2="-2.8" stroke="#8f9bb3" strokeWidth="0.47" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.3s', '--delay': '-16.5s', '--a0': '125deg', '--a1': '645deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '34px 0px', '--r0': '34px', '--r1': '1.2px', '--peak': '0.32' } as CSSProperties}>
        <line x1="34" y1="0" x2="34" y2="-4.8" stroke="#00e6a8" strokeWidth="0.32" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '13.7s', '--delay': '-3.6s', '--a0': '336deg', '--a1': '856deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '19px 0px', '--r0': '19px', '--r1': '1.2px', '--peak': '0.23' } as CSSProperties}>
        <line x1="19" y1="0" x2="19" y2="-2.2" stroke="#00e6a8" strokeWidth="0.32" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '19.1s', '--delay': '-13.9s', '--a0': '317deg', '--a1': '837deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '32px 0px', '--r0': '32px', '--r1': '1.2px', '--peak': '0.44' } as CSSProperties}>
        <line x1="32" y1="0" x2="32" y2="-3.4" stroke="#00b8e0" strokeWidth="0.4" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.1s', '--delay': '-12.8s', '--a0': '308deg', '--a1': '828deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '27px 0px', '--r0': '27px', '--r1': '1.2px', '--peak': '0.26' } as CSSProperties}>
        <line x1="27" y1="0" x2="27" y2="-2.7" stroke="#00d68f" strokeWidth="0.57" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '21s', '--delay': '-18.5s', '--a0': '28deg', '--a1': '548deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '32px 0px', '--r0': '32px', '--r1': '1.2px', '--peak': '0.41' } as CSSProperties}>
        <line x1="32" y1="0" x2="32" y2="-5.5" stroke="#00ccff" strokeWidth="0.35" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.9s', '--delay': '-14.2s', '--a0': '107deg', '--a1': '627deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '35px 0px', '--r0': '35px', '--r1': '1.2px', '--peak': '0.34' } as CSSProperties}>
        <line x1="35" y1="0" x2="35" y2="-2" stroke="#00d68f" strokeWidth="0.56" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14s', '--delay': '-13.8s', '--a0': '106deg', '--a1': '626deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '47px 0px', '--r0': '47px', '--r1': '1.2px', '--peak': '0.16' } as CSSProperties}>
        <line x1="47" y1="0" x2="47" y2="-5" stroke="#8f9bb3" strokeWidth="0.26" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.2s', '--delay': '-13.5s', '--a0': '187deg', '--a1': '707deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '29px 0px', '--r0': '29px', '--r1': '1.2px', '--peak': '0.33' } as CSSProperties}>
        <line x1="29" y1="0" x2="29" y2="-3.3" stroke="#00e6a8" strokeWidth="0.32" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '13.4s', '--delay': '-20.5s', '--a0': '239deg', '--a1': '759deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '21px 0px', '--r0': '21px', '--r1': '1.2px', '--peak': '0.25' } as CSSProperties}>
        <line x1="21" y1="0" x2="21" y2="-2.5" stroke="#00ccff" strokeWidth="0.54" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.7s', '--delay': '-2.2s', '--a0': '208deg', '--a1': '728deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '28px 0px', '--r0': '28px', '--r1': '1.2px', '--peak': '0.43' } as CSSProperties}>
        <line x1="28" y1="0" x2="28" y2="-2.6" stroke="#00e6a8" strokeWidth="0.31" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20.3s', '--delay': '-7.4s', '--a0': '236deg', '--a1': '756deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '24px 0px', '--r0': '24px', '--r1': '1.2px', '--peak': '0.33' } as CSSProperties}>
        <line x1="24" y1="0" x2="24" y2="-4.5" stroke="#00b8e0" strokeWidth="0.47" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.4s', '--delay': '-14.1s', '--a0': '154deg', '--a1': '674deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '24px 0px', '--r0': '24px', '--r1': '1.2px', '--peak': '0.27' } as CSSProperties}>
        <line x1="24" y1="0" x2="24" y2="-5.1" stroke="#e8edf5" strokeWidth="0.44" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.4s', '--delay': '-17s', '--a0': '350deg', '--a1': '870deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '39px 0px', '--r0': '39px', '--r1': '1.2px', '--peak': '0.35' } as CSSProperties}>
        <line x1="39" y1="0" x2="39" y2="-2.9" stroke="#00e6a8" strokeWidth="0.35" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16s', '--delay': '-18s', '--a0': '212deg', '--a1': '732deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '41px 0px', '--r0': '41px', '--r1': '1.2px', '--peak': '0.16' } as CSSProperties}>
        <line x1="41" y1="0" x2="41" y2="-3.8" stroke="#00b8e0" strokeWidth="0.59" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '10s', '--delay': '-20s', '--a0': '151deg', '--a1': '671deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '23px 0px', '--r0': '23px', '--r1': '1.2px', '--peak': '0.28' } as CSSProperties}>
        <line x1="23" y1="0" x2="23" y2="-4.2" stroke="#00e6a8" strokeWidth="0.39" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '12.2s', '--delay': '-16.7s', '--a0': '174deg', '--a1': '694deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '40px 0px', '--r0': '40px', '--r1': '1.2px', '--peak': '0.28' } as CSSProperties}>
        <line x1="40" y1="0" x2="40" y2="-3.6" stroke="#00d68f" strokeWidth="0.28" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20.5s', '--delay': '-13.3s', '--a0': '338deg', '--a1': '858deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '33px 0px', '--r0': '33px', '--r1': '1.2px', '--peak': '0.34' } as CSSProperties}>
        <line x1="33" y1="0" x2="33" y2="-2.8" stroke="#00d68f" strokeWidth="0.58" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20.8s', '--delay': '-13.1s', '--a0': '181deg', '--a1': '701deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '28px 0px', '--r0': '28px', '--r1': '1.2px', '--peak': '0.42' } as CSSProperties}>
        <line x1="28" y1="0" x2="28" y2="-2.2" stroke="#e8edf5" strokeWidth="0.28" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.3s', '--delay': '-0.1s', '--a0': '55deg', '--a1': '575deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '29px 0px', '--r0': '29px', '--r1': '1.2px', '--peak': '0.34' } as CSSProperties}>
        <line x1="29" y1="0" x2="29" y2="-2.5" stroke="#00ccff" strokeWidth="0.38" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.7s', '--delay': '-12.5s', '--a0': '84deg', '--a1': '604deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '46px 0px', '--r0': '46px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="46" y1="0" x2="46" y2="-5.3" stroke="#8f9bb3" strokeWidth="0.53" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.8s', '--delay': '-1.9s', '--a0': '103deg', '--a1': '623deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '34px 0px', '--r0': '34px', '--r1': '1.2px', '--peak': '0.3' } as CSSProperties}>
        <line x1="34" y1="0" x2="34" y2="-2.2" stroke="#8f9bb3" strokeWidth="0.25" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20.6s', '--delay': '-7.3s', '--a0': '188deg', '--a1': '708deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '40px 0px', '--r0': '40px', '--r1': '1.2px', '--peak': '0.27' } as CSSProperties}>
        <line x1="40" y1="0" x2="40" y2="-5.6" stroke="#00d68f" strokeWidth="0.48" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.9s', '--delay': '-1.8s', '--a0': '286deg', '--a1': '806deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '44px 0px', '--r0': '44px', '--r1': '1.2px', '--peak': '0.38' } as CSSProperties}>
        <line x1="44" y1="0" x2="44" y2="-5.7" stroke="#00d68f" strokeWidth="0.53" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '19.6s', '--delay': '-17s', '--a0': '305deg', '--a1': '825deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '23px 0px', '--r0': '23px', '--r1': '1.2px', '--peak': '0.28' } as CSSProperties}>
        <line x1="23" y1="0" x2="23" y2="-4.8" stroke="#00d68f" strokeWidth="0.58" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.9s', '--delay': '-19.2s', '--a0': '70deg', '--a1': '590deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '26px 0px', '--r0': '26px', '--r1': '1.2px', '--peak': '0.42' } as CSSProperties}>
        <line x1="26" y1="0" x2="26" y2="-5.2" stroke="#00ccff" strokeWidth="0.37" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.2s', '--delay': '-20.4s', '--a0': '304deg', '--a1': '824deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '28px 0px', '--r0': '28px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="28" y1="0" x2="28" y2="-5.4" stroke="#00d68f" strokeWidth="0.38" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.8s', '--delay': '-6.6s', '--a0': '184deg', '--a1': '704deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '48px 0px', '--r0': '48px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="48" y1="0" x2="48" y2="-2.1" stroke="#00e6a8" strokeWidth="0.44" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.5s', '--delay': '-11.8s', '--a0': '268deg', '--a1': '788deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '21px 0px', '--r0': '21px', '--r1': '1.2px', '--peak': '0.44' } as CSSProperties}>
        <line x1="21" y1="0" x2="21" y2="-2.6" stroke="#8f9bb3" strokeWidth="0.41" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '16.3s', '--delay': '-0.9s', '--a0': '99deg', '--a1': '619deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '48px 0px', '--r0': '48px', '--r1': '1.2px', '--peak': '0.23' } as CSSProperties}>
        <line x1="48" y1="0" x2="48" y2="-3.9" stroke="#00d68f" strokeWidth="0.46" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '12.8s', '--delay': '-8.5s', '--a0': '333deg', '--a1': '853deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '45px 0px', '--r0': '45px', '--r1': '1.2px', '--peak': '0.39' } as CSSProperties}>
        <line x1="45" y1="0" x2="45" y2="-5.8" stroke="#00d68f" strokeWidth="0.36" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '19.4s', '--delay': '-18.6s', '--a0': '19deg', '--a1': '539deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '43px 0px', '--r0': '43px', '--r1': '1.2px', '--peak': '0.22' } as CSSProperties}>
        <line x1="43" y1="0" x2="43" y2="-3.8" stroke="#00d68f" strokeWidth="0.54" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '19.1s', '--delay': '-9.5s', '--a0': '50deg', '--a1': '570deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '37px 0px', '--r0': '37px', '--r1': '1.2px', '--peak': '0.35' } as CSSProperties}>
        <line x1="37" y1="0" x2="37" y2="-4.4" stroke="#00e6a8" strokeWidth="0.41" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '15.9s', '--delay': '-10.7s', '--a0': '132deg', '--a1': '652deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '22px 0px', '--r0': '22px', '--r1': '1.2px', '--peak': '0.25' } as CSSProperties}>
        <line x1="22" y1="0" x2="22" y2="-2.4" stroke="#00b8e0" strokeWidth="0.28" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.2s', '--delay': '-17.1s', '--a0': '246deg', '--a1': '766deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '22px 0px', '--r0': '22px', '--r1': '1.2px', '--peak': '0.43' } as CSSProperties}>
        <line x1="22" y1="0" x2="22" y2="-4.5" stroke="#00b8e0" strokeWidth="0.52" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '11.3s', '--delay': '-2.9s', '--a0': '102deg', '--a1': '622deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '26px 0px', '--r0': '26px', '--r1': '1.2px', '--peak': '0.42' } as CSSProperties}>
        <line x1="26" y1="0" x2="26" y2="-3.6" stroke="#00b8e0" strokeWidth="0.44" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '15.1s', '--delay': '-17.2s', '--a0': '267deg', '--a1': '787deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '36px 0px', '--r0': '36px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="36" y1="0" x2="36" y2="-3.9" stroke="#00b8e0" strokeWidth="0.56" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '13.5s', '--delay': '-15.1s', '--a0': '73deg', '--a1': '593deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '39px 0px', '--r0': '39px', '--r1': '1.2px', '--peak': '0.26' } as CSSProperties}>
        <line x1="39" y1="0" x2="39" y2="-5.7" stroke="#e8edf5" strokeWidth="0.28" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '13.1s', '--delay': '-9.9s', '--a0': '171deg', '--a1': '691deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '48px 0px', '--r0': '48px', '--r1': '1.2px', '--peak': '0.3' } as CSSProperties}>
        <line x1="48" y1="0" x2="48" y2="-2.6" stroke="#00e6a8" strokeWidth="0.47" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '10.5s', '--delay': '-2.6s', '--a0': '238deg', '--a1': '758deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '26px 0px', '--r0': '26px', '--r1': '1.2px', '--peak': '0.2' } as CSSProperties}>
        <line x1="26" y1="0" x2="26" y2="-2.6" stroke="#00e6a8" strokeWidth="0.41" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '10.4s', '--delay': '-9.2s', '--a0': '77deg', '--a1': '597deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '40px 0px', '--r0': '40px', '--r1': '1.2px', '--peak': '0.16' } as CSSProperties}>
        <line x1="40" y1="0" x2="40" y2="-3.4" stroke="#00d68f" strokeWidth="0.56" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '20.3s', '--delay': '-18s', '--a0': '15deg', '--a1': '535deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '22px 0px', '--r0': '22px', '--r1': '1.2px', '--peak': '0.16' } as CSSProperties}>
        <line x1="22" y1="0" x2="22" y2="-4.2" stroke="#e8edf5" strokeWidth="0.48" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '21.8s', '--delay': '-6.2s', '--a0': '325deg', '--a1': '845deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '44px 0px', '--r0': '44px', '--r1': '1.2px', '--peak': '0.18' } as CSSProperties}>
        <line x1="44" y1="0" x2="44" y2="-2.3" stroke="#00e6a8" strokeWidth="0.29" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '17.7s', '--delay': '-13.1s', '--a0': '28deg', '--a1': '548deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '22px 0px', '--r0': '22px', '--r1': '1.2px', '--peak': '0.27' } as CSSProperties}>
        <line x1="22" y1="0" x2="22" y2="-2.9" stroke="#00ccff" strokeWidth="0.3" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
        <g className="orbit" style={{ '--dur': '14.2s', '--delay': '-10.2s', '--a0': '183deg', '--a1': '703deg' } as CSSProperties}>
        <g className="comet" style={{ '--origin': '40px 0px', '--r0': '40px', '--r1': '1.2px', '--peak': '0.3' } as CSSProperties}>
        <line x1="40" y1="0" x2="40" y2="-5.5" stroke="#00ccff" strokeWidth="0.44" strokeLinecap="round" opacity="0.6" />
        </g>
        </g>
    </svg>
  </div>
);

export default Background;
