/* ==========================================================================
   NASA Web Portal — Curated Mission, Story, Event, Social & Tech Data
   All imagery sourced from official public-domain NASA Image & Video Library
   ========================================================================== */

(function () {
  'use strict';

  const IMAGES = {
    heroEarth: 'https://images-assets.nasa.gov/image/iss058e005282/iss058e005282~medium.jpg',
    asteroidBennu: 'https://images-assets.nasa.gov/image/PIA17480/PIA17480~medium.jpg',
    jetEngine: 'https://images-assets.nasa.gov/image/GRC-2025-C-07467/GRC-2025-C-07467~large.jpg',
    issOrbit: 'https://images-assets.nasa.gov/image/iss074e0301064/iss074e0301064~large.jpg',
    modernFigures: 'https://images-assets.nasa.gov/image/LRC-1966-B701_P-06717/LRC-1966-B701_P-06717~medium.jpg',
    timedAurora: 'https://images-assets.nasa.gov/image/iss052e004998/iss052e004998~medium.jpg',
    cassiniSaturn: 'https://images-assets.nasa.gov/image/PIA06193/PIA06193~medium.jpg',
    curiosityMars: 'https://images-assets.nasa.gov/image/PIA20602/PIA20602~medium.jpg',
    spaceTrailer: 'https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg',
    italyNight: 'https://images-assets.nasa.gov/image/iss047e141893/iss047e141893~medium.jpg',
    hubble: 'https://images-assets.nasa.gov/image/sts061-57-021/sts061-57-021~medium.jpg',
    juno: 'https://images-assets.nasa.gov/image/PIA21772/PIA21772~medium.jpg',
    newHorizons: 'https://images-assets.nasa.gov/image/PIA19956/PIA19956~medium.jpg',
    webb: 'https://images-assets.nasa.gov/image/NHQ202207120010/NHQ202207120010~medium.jpg',
    artemis: 'https://images-assets.nasa.gov/image/NHQ202211160009/NHQ202211160009~medium.jpg',
    launchFooter: 'https://images-assets.nasa.gov/image/NHQ202211160208/NHQ202211160208~medium.jpg',
    perseverance: 'https://images-assets.nasa.gov/image/PIA23962/PIA23962~medium.jpg',
    voyager: 'https://images-assets.nasa.gov/image/PIA17462/PIA17462~medium.jpg',
    europa: 'https://images-assets.nasa.gov/image/PIA26443/PIA26443~medium.jpg',
    ionDrive: 'https://images-assets.nasa.gov/image/PIA04247/PIA04247~medium.jpg',
    x59: 'https://images-assets.nasa.gov/image/AFRC2023-0031-11/AFRC2023-0031-11~medium.jpg',
    earthScience: 'https://images-assets.nasa.gov/image/iss065e045974/iss065e045974~medium.jpg',
    issLab: 'https://images-assets.nasa.gov/image/iss063e052528/iss063e052528~medium.jpg',
    astronautEva: 'https://images-assets.nasa.gov/image/iss059e002710/iss059e002710~medium.jpg',
    christinaKoch: 'https://images-assets.nasa.gov/image/iss059e001095/iss059e001095~medium.jpg',
    ksc: 'https://images-assets.nasa.gov/image/NHQ202211160002/NHQ202211160002~medium.jpg',
    jsc: 'https://images-assets.nasa.gov/image/NHQ20260115_admin_0001/NHQ20260115_admin_0001~large.jpg',
    jpl: 'https://images-assets.nasa.gov/image/PIA23151/PIA23151~medium.jpg',
    goddard: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001653/GSFC_20171208_Archive_e001653~medium.jpg',
    dsn: 'https://images-assets.nasa.gov/image/PIA26717/PIA26717~large.jpg'
  };

  const BENTO_ARTICLES = {
    asteroid: {
      id: 'asteroid',
      category: 'SOLAR SYSTEM • OSIRIS-REX',
      date: 'Featured Story',
      title: 'NASA Scientists See Asteroid Through Robotic Eyes',
      image: IMAGES.asteroidBennu,
      tags: ['OSIRIS-REx', 'Asteroid Bennu', 'Planetary Defense'],
      body: [
        'Using precision optical navigation cameras and laser altimeters aboard NASA’s OSIRIS-REx spacecraft, mission scientists mapped the boulder-strewn surface of near-Earth asteroid Bennu down to centimeter-scale resolution.',
        'These robotic observations revealed active particle ejection plumes and carbon-rich hydrated minerals preserved since the dawn of the solar system 4.5 billion years ago—guiding the spacecraft to collect and return pristine regolith samples to Earth.'
      ]
    },
    jetEngine: {
      id: 'jetEngine',
      category: 'AERONAUTICS • GLENN RESEARCH CENTER',
      date: 'Propulsion Lab',
      title: 'NASA Runs First-Ever Test of New Jet Engine Tech',
      image: IMAGES.jetEngine,
      tags: ['Sustainable Aviation', 'Aeronautics', 'Turbine Tech'],
      body: [
        'Engineers at NASA’s Glenn Research Center completed inaugural full-scale ground runs of next-generation hybrid-electric and ultra-high-bypass jet propulsion architectures inside specialized aero-acoustic test cells.',
        'By combining lightweight ceramic matrix composites with adaptive airflow inlets, the propulsion demonstrator targets double-digit reductions in fuel burn, carbon emissions, and acoustic footprint for future commercial aircraft.'
      ]
    },
    esaStation: {
      id: 'esaStation',
      category: 'INTERNATIONAL SPACE STATION',
      date: 'Leadership Statement',
      title: "NASA Administrator Statement on ESA's Commitment to Space Station",
      image: IMAGES.issOrbit,
      tags: ['International Partners', 'ESA', 'Orbital Outpost'],
      body: [
        'NASA welcomed the European Space Agency’s reaffirmed long-term commitment to operating the International Space Station and expanding international cooperation aboard the Gateway lunar outpost.',
        'Together with ESA, JAXA, and CSA, crews continue conducting breakthroughs in orbital biomedicine, CubeSat deployment, Earth observation, and closed-loop life support technologies required for human journeys to Mars.'
      ]
    },
    modernFigures: {
      id: 'modernFigures',
      category: 'NASA HERITAGE & INNOVATION',
      date: 'Legacy Feature',
      title: "Modern Figures: NASA's Past and Future",
      image: IMAGES.modernFigures,
      tags: ['Katherine Johnson', 'Langley Research Center', 'STEM'],
      body: [
        'Decades before modern flight computers, pioneering mathematicians at NASA Langley Research Center—including Katherine Johnson, Dorothy Vaughan, and Mary Jackson—calculated the orbital mechanics that carried Mercury, Gemini, and Apollo astronauts safely home.',
        'Today, NASA’s Modern Figures initiative spotlights diverse engineers, flight directors, and planetary scientists designing autonomous Mars landing algorithms, deep-space optical communications, and Artemis lunar habitats.'
      ]
    },
    timed: {
      id: 'timed',
      category: 'HELIOPHYSICS • EARTH UPPER ATMOSPHERE',
      date: '15-Year Milestone',
      title: 'TIMED: 15 Years Exploring Our Interface to Space',
      image: IMAGES.timedAurora,
      tags: ['TIMED Mission', 'Thermosphere', 'Space Weather'],
      body: [
        'For more than fifteen years in low-Earth orbit, NASA’s TIMED (Thermosphere Ionosphere Mesosphere Energetics and Dynamics) spacecraft has monitored the dynamic gateway between Earth’s upper atmosphere and the vacuum of space.',
        'Data from TIMED’s four science instruments revealed how solar flares and geomagnetic storms heat and expand the upper atmosphere—knowledge essential for predicting orbital drag on satellites and protecting communications grids.'
      ]
    },
    cassini: {
      id: 'cassini',
      category: 'PLANETARY SCIENCE • SATURN',
      date: 'Ring-Grazing Orbit',
      title: 'Cassini Sends Back First Images from New Orbit',
      image: IMAGES.cassiniSaturn,
      tags: ['Cassini-Huygens', 'Saturn Rings', 'JPL'],
      body: [
        'Diving past the outer edge of Saturn’s main ring system, NASA’s Cassini spacecraft transmitted crystal-clear raw images capturing the planet’s swirling hexagonal jet stream and razor-sharp ring structures.',
        'The ring-grazing trajectory allowed Cassini’s cameras and dust analyzers to sample icy ring particles up close before its dramatic Grand Finale plunges between Saturn and its innermost rings.'
      ]
    },
    curiosity: {
      id: 'curiosity',
      category: 'MARS EXPLORATION • GALE CRATER',
      date: 'Rover Engineering Update',
      title: 'Curiosity Rover Team Examining New Drill Hiatus',
      image: IMAGES.curiosityMars,
      tags: ['Curiosity Rover', 'Mount Sharp', 'Mars'],
      body: [
        'Rover flight software engineers at NASA’s Jet Propulsion Laboratory ran diagnostic telemetry checks on Curiosity’s percussive rock drill feed mechanism while the rover analyzed layered mudstones along Mount Sharp.',
        'Using innovative rotary-percussion workarounds developed by the team, Curiosity continued extracting powdered rock samples to study ancient Martian lakes and habitable chemical signatures.'
      ]
    },
    trailer: {
      id: 'trailer',
      category: 'NASA+ FEATURED VIDEO',
      date: '4K Orbital Film',
      title: 'Space Exploration Trailer',
      image: IMAGES.spaceTrailer,
      videoEmbed: 'https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&rel=0',
      tags: ['Artemis', 'Webb', 'Space Exploration'],
      body: [
        'Experience humanity’s next giant leap across the cosmos—from Artemis Moon rockets lighting up the Florida coast to the James Webb Space Telescope peering into the earliest galaxies of the universe.'
      ]
    }
  };

  const MORE_STORIES = [
    {
      id: 'webbCliffs',
      category: 'ASTROPHYSICS • JWST',
      date: 'Deep Space Dispatch',
      title: 'Webb Reveals Cosmic Cliffs of the Carina Nebula in Infrared',
      image: IMAGES.spaceTrailer,
      tags: ['James Webb', 'Star Formation', 'NIRCam'],
      body: [
        'Peering through thick blankets of cosmic dust, NASA’s James Webb Space Telescope captured towering peaks and glowing valleys of star birth inside NGC 3324—revealing hundreds of previously hidden young stars.'
      ]
    },
    {
      id: 'artemisNight',
      category: 'ARTEMIS • MOON TO MARS',
      date: 'Launch Complex 39B',
      title: 'Space Launch System Ignites Night Sky on Path to the Moon',
      image: IMAGES.artemis,
      tags: ['Artemis', 'SLS Rocket', 'Orion'],
      body: [
        'Generating 8.8 million pounds of thrust, NASA’s Space Launch System illuminated the Atlantic coast during liftoff, propelling the Orion spacecraft toward distant retrograde lunar orbit.'
      ]
    },
    {
      id: 'europaClipperStory',
      category: 'OCEAN WORLDS • JUPITER',
      date: 'Outer Solar System',
      title: 'Europa Clipper Prepares to Probe Subsurface Ocean of Jupiter’s Moon',
      image: IMAGES.europa,
      tags: ['Europa Clipper', 'Astrobiology', 'JPL'],
      body: [
        'Equipped with ice-penetrating radar and thermal imagers, Europa Clipper is designed to perform nearly 50 close flybys of Europa to assess whether its salty subsurface ocean can support life.'
      ]
    },
    {
      id: 'perseveranceStory',
      category: 'MARS 2020 • JEZERO CRATER',
      date: 'Sample Caching',
      title: 'Perseverance Rover Seals Core Samples of Ancient Martian Delta',
      image: IMAGES.perseverance,
      tags: ['Perseverance', 'Ingenuity', 'Mars 2020'],
      body: [
        'Working alongside the historic Ingenuity Mars Helicopter, Perseverance explored an ancient river delta in Jezero Crater, sealing titanium sample tubes for future Mars Sample Return.'
      ]
    }
  ];

  const NASA_EVENTS = [
    {
      id: 'ev-iss-eva',
      date: 'NOV 28 • 13:00 UTC',
      type: 'Launch / Ops',
      title: 'ISS Spacewalk — Power Channel Upgrade',
      desc: 'Expedition crew exits Quest airlock for solar array structural prep.',
      detail: 'Two astronauts conduct a 6.5-hour extravehicular activity outside the International Space Station to install mounting brackets for next-generation Roll-Out Solar Arrays (iROSA).'
    },
    {
      id: 'ev-artemis-brief',
      date: 'DEC 04 • 18:00 UTC',
      type: 'Calendar',
      title: 'Artemis II Crew Readiness Briefing',
      desc: 'Live mission briefing from Johnson Space Center on Orion crew systems.',
      detail: 'Flight directors and Artemis II astronauts walk through lunar flyby trajectory milestones, optical communications tests, and life support verification at JSC.'
    },
    {
      id: 'ev-clps-launch',
      date: 'DEC 12 • 06:15 UTC',
      type: 'Launch',
      title: 'CLPS Lunar South Pole Lander Launch',
      desc: 'Commercial Lunar Payload Services rocket liftoff from Cape Canaveral.',
      detail: 'Carrying NASA science instruments to measure lunar regolith volatiles and radiation environment near the lunar south pole ahead of human landings.'
    },
    {
      id: 'ev-jwst-symposium',
      date: 'DEC 19 • 16:30 UTC',
      type: 'Calendar',
      title: 'Webb Exoplanet Atmosphere Colloquium',
      desc: 'New transmission spectroscopy findings on temperate rocky worlds.',
      detail: 'Astrophysicists at Goddard and STScI present Cycle spectroscopy results examining carbon-bearing molecules in nearby exoplanet atmospheres.'
    },
    {
      id: 'ev-x59-flight',
      date: 'JAN 09 • 15:00 UTC',
      type: 'Launch',
      title: 'X-59 Quiet Supersonic Flight Test',
      desc: 'Acoustic thump verification flight over Armstrong Flight Research Center.',
      detail: 'NASA’s X-59 QueSST research aircraft conducts supersonic acoustic mapping runs to validate quiet sonic-thump noise modeling for future commercial flight.'
    }
  ];

  const TWEETS = [
    {
      id: 't1',
      handle: '@NASA',
      time: '2h',
      text: 'Looking down on home from 250 miles up. Expedition crew captured Earth’s curved atmospheric blue rim just before orbital sunrise.',
      thumb: IMAGES.heroEarth,
      likes: 18420,
      reposts: 3290
    },
    {
      id: 't2',
      handle: '@NASAWebb',
      time: '5h',
      text: 'Cosmic Cliffs in infrared ✨ Webb’s NIRCam peered through stellar nurseries inside the Carina Nebula, revealing newborn stars once hidden from view.',
      thumb: IMAGES.spaceTrailer,
      likes: 24910,
      reposts: 5110
    },
    {
      id: 't3',
      handle: '@NASAArtemis',
      time: '9h',
      text: 'Rollout complete at Kennedy Space Center. Our Space Launch System rocket and Orion spacecraft stand ready on Launch Pad 39B.',
      thumb: IMAGES.ksc,
      likes: 15600,
      reposts: 2840
    },
    {
      id: 't4',
      handle: '@NASAPersevere',
      time: '1d',
      text: 'Another core sealed in Jezero Crater! Inspecting ancient sedimentary rock layers that once sat beneath a Martian lake billions of years ago.',
      thumb: '',
      likes: 11340,
      reposts: 1790
    }
  ];

  const MISSIONS = [
    {
      id: 'hubble',
      name: 'Hubble',
      fullName: 'Hubble Space Telescope',
      status: 'Active',
      domain: 'Deep Space',
      tags: ['Active', 'Deep Space'],
      target: 'Deep Universe • LEO',
      launchDate: 'April 24, 1990',
      center: 'Goddard Space Flight Center',
      image: IMAGES.hubble,
      shortDesc: '35+ years unlocking deep-field galaxies, nebulae, and cosmic expansion.',
      description: 'Launched aboard Space Shuttle Discovery in 1990, the Hubble Space Telescope revolutionized modern astronomy—pinpointing the age of the universe, capturing the Hubble Ultra Deep Field, and observing exoplanet atmospheres in ultraviolet and visible light.',
      objectives: [
        'Measure the expansion rate of the universe (Hubble constant) with high precision.',
        'Study galaxy evolution across 13 billion years of cosmic history.',
        'Work in synergy with the James Webb Space Telescope across UV and infrared bands.'
      ],
      instruments: ['WFC3 Camera', 'COS Spectrograph', 'ACS Camera', 'STIS'],
      milestones: [
        { date: '1990', event: 'Deployed into low-Earth orbit by Space Shuttle Discovery (STS-31).' },
        { date: '1995', event: 'Captured the landmark Hubble Deep Field image.' },
        { date: '2009', event: 'Final Shuttle Servicing Mission (STS-125) installed WFC3 & COS.' }
      ]
    },
    {
      id: 'juno',
      name: 'Juno',
      fullName: 'Juno Jupiter Explorer',
      status: 'Active',
      domain: 'Deep Space',
      tags: ['Active', 'Deep Space'],
      target: 'Jupiter & Galilean Moons',
      launchDate: 'August 5, 2011',
      center: 'Jet Propulsion Laboratory',
      image: IMAGES.juno,
      shortDesc: 'Peering beneath Jupiter’s dense cloud bands and swirling polar cyclones.',
      description: 'Solar-powered spacecraft Juno orbits Jupiter on polar trajectories that skim above the gas giant’s violent cloud tops, mapping its deep gravitational and magnetic fields as well as flying closely past Ganymede, Europa, and Io.',
      objectives: [
        'Determine water abundance and core structure inside Jupiter’s deep interior.',
        'Map Jupiter’s intense auroras and magnetosphere.',
        'Capture close-range imagery of Io’s volcanic plumes and Europa’s icy crust.'
      ],
      instruments: ['JunoCam', 'Microwave Radiometer', 'JIRAM Infrared', 'Magnetometer'],
      milestones: [
        { date: '2011', event: 'Launched aboard Atlas V 551 from Cape Canaveral.' },
        { date: '2016', event: 'Entered polar orbit around Jupiter after 5-year cruise.' },
        { date: '2021–2025', event: 'Extended mission flybys of Ganymede, Europa, and Io.' }
      ]
    },
    {
      id: 'new-horizons',
      name: 'New Horizons',
      fullName: 'New Horizons Kuiper Belt Mission',
      status: 'Active',
      domain: 'Deep Space',
      tags: ['Active', 'Deep Space'],
      target: 'Pluto & Kuiper Belt',
      launchDate: 'January 19, 2006',
      center: 'APL / Marshall Space Flight Center',
      image: IMAGES.newHorizons,
      shortDesc: 'First reconnaissance of Pluto’s nitrogen glaciers and the Kuiper Belt.',
      description: 'As the fastest spacecraft ever launched from Earth at the time of liftoff, New Horizons transformed Pluto from a distant pixel into a geologically active world of nitrogen ice plains and water-ice mountains before visiting Kuiper Belt object Arrokoth.',
      objectives: [
        'Map the surface geology and tenuous atmosphere of Pluto and Charon.',
        'Explore pristine planetesimals within the outer Kuiper Belt.',
        'Measure heliospheric dust and solar wind particles beyond 55 AU.'
      ],
      instruments: ['LORRI Imager', 'Ralph Multispectral', 'Alice UV Spectrograph', 'SWAP'],
      milestones: [
        { date: '2015', event: 'Historic flyby of the Pluto-Charon system.' },
        { date: '2019', event: 'Most distant planetary flyby in history at Arrokoth.' },
        { date: '2025+', event: 'Continued heliophysics and Kuiper Belt observations.' }
      ]
    },
    {
      id: 'cassini',
      name: 'Cassini',
      fullName: 'Cassini-Huygens Saturn Orbiter',
      status: 'Historic',
      domain: 'Deep Space',
      tags: ['Historic', 'Deep Space'],
      target: 'Saturn, Rings & Titan',
      launchDate: 'October 15, 1997',
      center: 'Jet Propulsion Laboratory',
      image: IMAGES.cassiniSaturn,
      shortDesc: '13 years orbiting Saturn—discovering Enceladus plumes and Titan lakes.',
      description: 'A joint NASA, ESA, and ASI flagship mission, Cassini spent thirteen years transforming our understanding of the Saturnian system—releasing the Huygens probe onto Titan’s surface and discovering subsurface ocean geysers erupting from Enceladus.',
      objectives: [
        'Investigate the three-dimensional dynamics and chemistry of Saturn’s rings.',
        'Explore Titan’s methane lakes and thick nitrogen atmosphere.',
        'Sample active water-ice plumes jetting from Enceladus.'
      ],
      instruments: ['ISS Camera', 'VIMS Spectrometer', 'INMS Mass Spectrometer', 'Titan Radar'],
      milestones: [
        { date: '2004', event: 'Saturn Orbit Insertion after 7-year interplanetary voyage.' },
        { date: '2005', event: 'Huygens probe successfully landed on Titan.' },
        { date: '2017', event: 'Grand Finale dives inside Saturn’s rings concluded mission.' }
      ]
    },
    {
      id: 'jwst',
      name: 'James Webb',
      fullName: 'James Webb Space Telescope',
      status: 'Active',
      domain: 'Deep Space',
      tags: ['Active', 'Deep Space'],
      target: 'Sun–Earth L2 Point',
      launchDate: 'December 25, 2021',
      center: 'Goddard Space Flight Center',
      image: IMAGES.webb,
      shortDesc: '6.5-meter gold-coated infrared mirror peering into cosmic dawn.',
      description: 'Positioned 1.5 million kilometers from Earth at the Sun–Earth L2 Lagrange point, Webb’s segmented beryllium-gold mirror and five-layer sunshield detect faint infrared light from the universe’s first galaxies and analyze exoplanet atmospheres.',
      objectives: [
        'Observe the first luminous stars and galaxies formed after the Big Bang.',
        'Examine star birth inside dusty nebulae like Carina and Eagle.',
        'Characterize atmospheric biosignatures on distant exoplanets.'
      ],
      instruments: ['NIRCam', 'NIRSpec', 'MIRI Mid-Infrared', 'FGS/NIRISS'],
      milestones: [
        { date: 'Dec 2021', event: 'Launched aboard Ariane 5 from Kourou, French Guiana.' },
        { date: 'Jan 2022', event: 'Completed mirror deployment and reached L2 halo orbit.' },
        { date: 'Jul 2022', event: 'Released first deep-field and Carina Nebula full-color images.' }
      ]
    },
    {
      id: 'artemis',
      name: 'Artemis',
      fullName: 'Artemis Lunar Exploration Program',
      status: 'Active',
      domain: 'Lunar',
      tags: ['Active', 'Upcoming', 'Lunar'],
      target: 'Moon & Lunar South Pole',
      launchDate: 'November 16, 2022 (Artemis I)',
      center: 'Kennedy & Johnson Space Centers',
      image: IMAGES.artemis,
      shortDesc: 'Returning astronauts to the Moon to establish sustainable lunar science.',
      description: 'Powered by the Space Launch System rocket and Orion spacecraft, NASA’s Artemis campaign will land the first astronauts near the Moon’s water-ice-rich south pole, assemble the Gateway lunar station, and test technologies for Mars.',
      objectives: [
        'Demonstrate deep-space crewed flight around the Moon with Artemis II.',
        'Explore permanently shadowed south polar craters for lunar water ice.',
        'Build sustainable surface habitats and Gateway orbital infrastructure.'
      ],
      instruments: ['SLS Heavy Lift', 'Orion Crew Capsule', 'Gateway Station', 'xEVA Suits'],
      milestones: [
        { date: 'Nov 2022', event: 'Artemis I uncrewed Orion spacecraft orbited the Moon and returned.' },
        { date: '2026', event: 'Artemis II crewed lunar flyby preparations underway at KSC.' },
        { date: '2027+', event: 'Artemis III crewed landing near Lunar South Pole.' }
      ]
    },
    {
      id: 'perseverance',
      name: 'Perseverance',
      fullName: 'Mars 2020 Perseverance Rover',
      status: 'Active',
      domain: 'Mars',
      tags: ['Active', 'Mars'],
      target: 'Jezero Crater, Mars',
      launchDate: 'July 30, 2020',
      center: 'Jet Propulsion Laboratory',
      image: IMAGES.perseverance,
      shortDesc: 'Seeking signs of ancient Martian life and caching core samples.',
      description: 'Landing in Jezero Crater—an ancient river delta—Perseverance searches for biosignatures, produces breathable oxygen via MOXIE, and partnered with the Ingenuity Mars Helicopter for 72 historic powered flights on another planet.',
      objectives: [
        'Characterize Martian geology and past habitable lake environments.',
        'Collect and seal high-priority core samples for future return to Earth.',
        'Demonstrate in-situ oxygen generation from Mars’s CO₂ atmosphere.'
      ],
      instruments: ['SHERLOC', 'PIXL', 'SuperCam', 'MOXIE', 'Mastcam-Z'],
      milestones: [
        { date: 'Feb 2021', event: 'Sky-crane touchdown in Jezero Crater.' },
        { date: 'Apr 2021', event: 'Ingenuity achieved first powered flight on another planet.' },
        { date: '2023–2025', event: 'Ascended Jezero delta rim and cached 20+ rock cores.' }
      ]
    },
    {
      id: 'voyager',
      name: 'Voyager 1 & 2',
      fullName: 'Voyager Interstellar Mission',
      status: 'Active',
      domain: 'Deep Space',
      tags: ['Active', 'Deep Space'],
      target: 'Interstellar Medium (>24B km)',
      launchDate: 'August / September 1977',
      center: 'Jet Propulsion Laboratory',
      image: IMAGES.voyager,
      shortDesc: 'Humanity’s farthest emissaries sampling interstellar space beyond the heliosphere.',
      description: 'Launched in 1977 on a Grand Tour of Jupiter, Saturn, Uranus, and Neptune, both Voyager spacecraft have crossed the heliopause into interstellar space—still transmitting plasma and magnetic field readings across more than 20 billion kilometers.',
      objectives: [
        'Sample cosmic rays and interstellar plasma outside the Sun’s magnetic bubble.',
        'Carry the Golden Record time capsule representing Earth’s life and culture.',
        'Maintain Deep Space Network telemetry into their fifth decade of flight.'
      ],
      instruments: ['Plasma Wave Subsystem', 'Cosmic Ray Subsystem', 'Magnetometer', 'Golden Record'],
      milestones: [
        { date: '1979–1989', event: 'Completed Grand Tour flybys of all four giant outer planets.' },
        { date: '1990', event: 'Voyager 1 captured the iconic Pale Blue Dot portrait of Earth.' },
        { date: '2012 & 2018', event: 'Voyager 1 & 2 crossed the heliopause into interstellar space.' }
      ]
    },
    {
      id: 'europa-clipper',
      name: 'Europa Clipper',
      fullName: 'Europa Clipper Ocean World Probe',
      status: 'Upcoming',
      domain: 'Deep Space',
      tags: ['Upcoming', 'Deep Space'],
      target: 'Jupiter’s Moon Europa',
      launchDate: 'October 14, 2024',
      center: 'Jet Propulsion Laboratory / APL',
      image: IMAGES.europa,
      shortDesc: 'En route to Jupiter for 49 close flybys probing Europa’s hidden ocean.',
      description: 'Now cruising toward the Jovian system with arrival scheduled for 2030, Europa Clipper carries NASA’s largest planetary science suite to measure ice-shell thickness, subsurface ocean salinity, and potential habitable chemistry beneath Europa’s crust.',
      objectives: [
        'Confirm ice shell thickness and characterize the global subsurface ocean.',
        'Analyze surface composition and search for active water vapor plumes.',
        'Map potential future landing sites on Europa’s fractured ice terrain.'
      ],
      instruments: ['REASON Ice Radar', 'EIS Imagers', 'MASPEX Spectrometer', 'SUDA Dust Analyzer'],
      milestones: [
        { date: 'Oct 2024', event: 'Launched atop Falcon Heavy from Kennedy Space Center LC-39A.' },
        { date: '2025–2026', event: 'Mars & Earth gravity-assist trajectories en route to Jupiter.' },
        { date: 'April 2030', event: 'Upcoming Jovian orbit insertion and 49 Europa science flybys.' }
      ]
    }
  ];

  const FEATURES_TECH = [
    {
      id: 'tech-propulsion',
      category: 'Propulsion',
      wide: true,
      title: 'Deep Space Propulsion — SLS & Solar Electric Ion Drives',
      image: IMAGES.ionDrive,
      desc: 'From the 8.8-million-pound thrust of the Space Launch System (SLS) core stage and solid rocket boosters to high-efficiency Xenon and Hall-effect ion thrusters powering deep-space probes for years on minimal propellant.',
      specs: ['8.8M lbf Liftoff Thrust', '3,000+ sec Ion Isp', 'Liquid Hydrogen / LOX']
    },
    {
      id: 'tech-robotics',
      category: 'Robotics',
      wide: false,
      title: 'Autonomous Planetary Rovers & Rotorcraft',
      image: IMAGES.perseverance,
      desc: 'Terrain Relative Navigation, autonomous hazard-avoidance driving, and ultra-lightweight coaxial rotorcraft engineering enabling powered flight inside Mars’s 1% atmospheric density.',
      specs: ['Perseverance', 'Ingenuity 72 Flights', 'Autonomous NavCam']
    },
    {
      id: 'tech-observatories',
      category: 'Observatories',
      wide: false,
      title: 'Segmented Cryogenic Infrared Observatories',
      image: IMAGES.webb,
      desc: '18 gold-coated hexagonal beryllium mirror segments actuated to nanometer precision, shielded behind a tennis-court-sized five-layer Kapton sunshield maintaining 40 Kelvin cryogenic optics.',
      specs: ['6.5m Primary Mirror', '5-Layer Sunshield', 'L2 Halo Orbit']
    },
    {
      id: 'tech-earth',
      category: 'Earth Science',
      wide: false,
      title: 'Global Climate & Earth-Observing Satellites',
      image: IMAGES.earthScience,
      desc: 'More than two dozen Earth-observing satellites track sea-level rise, atmospheric carbon, hurricane intensification, ice-sheet mass balance, and wildfire aerosols in real time.',
      specs: ['25+ Active Satellites', 'SWOT Surface Water', 'PACE Ocean Color']
    },
    {
      id: 'tech-iss',
      category: 'Human Spaceflight',
      wide: false,
      title: 'ISS Microgravity Laboratories & ECLSS',
      image: IMAGES.issLab,
      desc: 'Closed-loop Environmental Control and Life Support Systems recovering over 98% of crew water, alongside microgravity protein crystal growth, 3D bioprinting, and cold-atom physics labs.',
      specs: ['98% Water Recovery', '408 km LEO Lab', 'International Crew']
    },
    {
      id: 'tech-x59',
      category: 'Propulsion',
      wide: true,
      title: 'Quiet Supersonic Flight — X-59 QueSST',
      image: IMAGES.x59,
      desc: 'Shaped with an elongated needle nose and dorsal-mounted turbofan engine to prevent shockwaves from coalescing—reducing sonic booms to a gentle sonic thump over populated communities.',
      specs: ['Mach 1.4 Cruise', '55,000 ft Altitude', '75 PLdB Quiet Thump']
    }
  ];

  const FAQS = [
    {
      q: 'Can the public visit NASA centers and launch complexes?',
      a: 'Yes. NASA’s Kennedy Space Center Visitor Complex, Space Center Houston (Johnson Space Center), U.S. Space & Rocket Center (Marshall), and several center visitor facilities offer public tours, astronaut exhibits, and launch-viewing passes throughout the year.'
    },
    {
      q: 'What are the basic requirements to apply as a NASA Astronaut Candidate?',
      a: 'Applicants must hold U.S. citizenship, possess a master’s degree in a STEM field (engineering, biological science, physical science, computer science, or mathematics) from an accredited institution, and have at least three years of related professional experience or 1,000 hours of pilot-in-command time in jet aircraft, plus pass NASA’s long-duration spaceflight physical.'
    },
    {
      q: 'Are NASA photographs, audio, and videos free to use in public or creative projects?',
      a: 'NASA content—including high-resolution photography, mission imagery, audio recordings, and animations—is generally in the public domain and not subject to copyright in the United States, provided it is not used to imply NASA endorsement of commercial products or services.'
    },
    {
      q: 'How can I track the International Space Station flying over my city?',
      a: 'NASA’s Spot The Station service calculates visible twilight flyover windows for over 6,700 locations worldwide, alerting you to the exact azimuth, elevation angle, and duration when the orbiting outpost shines brightly overhead.'
    }
  ];

  function getSearchIndex() {
    const pages = [
      { title: 'Home — NASA Mission Portal', subtitle: 'Main dashboard, live ISS stream, news bento & missions', type: 'Page', action: 'url', href: 'index.html' },
      { title: 'Features — Space Technologies & Capabilities', subtitle: 'Propulsion, JWST optics, rovers, Earth satellites & telemetry', type: 'Page', action: 'url', href: 'features.html' },
      { title: 'Projects — Missions & Exploration Directory', subtitle: 'Filter active, upcoming & historic planetary missions', type: 'Page', action: 'url', href: 'projects.html' },
      { title: 'About Us — Vision, Timeline & Field Centers', subtitle: '1958 to Artemis timeline, KSC, JSC, JPL & Goddard', type: 'Page', action: 'url', href: 'about-us.html' },
      { title: 'Contact Us — Mission Control & Public Inquiries', subtitle: 'Inquiries form, NASA HQ address & FAQs', type: 'Page', action: 'url', href: 'contact-us.html' },
      { title: 'Watch Live — International Space Station', subtitle: 'Real-time HD orbital downlink & ISS telemetry', type: 'Live Feed', action: 'iss' }
    ];

    const articles = [...Object.values(BENTO_ARTICLES), ...MORE_STORIES].map((a) => ({
      title: a.title,
      subtitle: `${a.category} • ${a.date}`,
      type: 'Story',
      action: 'article',
      payload: a
    }));

    const missions = MISSIONS.map((m) => ({
      title: m.fullName,
      subtitle: `${m.status} • ${m.target}`,
      type: 'Mission',
      action: 'mission',
      payload: m
    }));

    return [...missions, ...articles, ...pages];
  }

  window.NASAData = {
    IMAGES,
    BENTO_ARTICLES,
    MORE_STORIES,
    NASA_EVENTS,
    TWEETS,
    MISSIONS,
    FEATURES_TECH,
    FAQS,
    getSearchIndex
  };
})();
