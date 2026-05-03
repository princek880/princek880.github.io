/**
 * Central project data store.
 * All project pages and the Projects section pull from here.
 * Factually aligned with CV and BTech Thesis.
 */

export const PROJECTS = [
  {
    id: 'fusionnet-vgae',
    title: 'Graph ML & Jet Substructure',
    subtitle: 'GNN Track Classifier and VGAE Clustering (CMS Experiment)',
    status: 'published',
    year: 'Jun 2025 – Aug 2025',
    category: 'ML · Physics',
    institution: 'LLR, École Polytechnique, France',
    color: '#5c88c4', // Elegant Blue
    emoji: '🔬',
    links: [
      { label: 'CMS Public Note', url: 'https://cds.cern.ch/record/2937581', type: 'paper' },
    ],
    tech: ['PyTorch', 'PyTorch Geometric', 'GNN', 'VGAE', 'ROOT'],
    tagline: 'Engineered a novel GNN track classifier (FusionNet) and led the development of a VGAE-based contrastive clustering algorithm for jet substructure analysis.',
    overview: `During my summer research internship at LLR, École Polytechnique, I worked on advanced Graph Machine Learning techniques for the CMS Experiment. The project involved two main components: engineering FusionNet, a GNN track classifier with auxiliary b-jet tagging, and developing a Variational Graph Autoencoder (VGAE)-based contrastive clustering algorithm to analyze jet substructure in pp collisions using physics-informed constraints.`,
    details: [
      {
        heading: 'FusionNet GNN Track Classifier',
        body: `Engineered FusionNet, a novel graph neural network (GNN) track classifier. The model was designed for track classification with auxiliary b-jet tagging. It outperformed traditional Boosted Decision Trees (BDTs) by ~5–15% in high signal-efficiency regions and was published as a CMS Detector Performance Summary (DPS).`,
      },
      {
        heading: 'VGAE Contrastive Clustering',
        body: `Led the development of a variational graph autoencoder (VGAE)-based contrastive clustering algorithm. This approach was used to analyze jet substructure in pp collisions, embedding physics-informed constraints to generate meaningful latent representations.`,
      },
      {
        heading: 'Model Diagnostics',
        body: `Diagnosed model limitations via extensive performance plots and score distributions. Identified irreducible errors stemming from track-matching inefficiencies, which directly guided refinements in the data representation and overall network architecture.`,
      },
    ],
    highlights: [
      'Published FusionNet track classifier in a CMS DPS (CMS-DP-2025-035).',
      'FusionNet outperformed Boosted Decision Trees by ~5–15% at high signal-efficiency.',
      'Led development of a VGAE-based contrastive clustering algorithm for jet substructure.',
      'Diagnosed model limitations and identified irreducible errors from track-matching inefficiencies.',
    ],
    metrics: [
      { label: 'Improvement', value: '5-15%', sub: 'over BDTs' },
      { label: 'Publication', value: '1',     sub: 'CMS DPS' },
      { label: 'Framework',   value: 'PyTorch', sub: 'Geometric' },
      { label: 'Algorithm',   value: 'VGAE',    sub: 'Contrastive' },
    ],
  },

  {
    id: 'speed-payload',
    title: 'SPEED Payload (IITMSAT)',
    subtitle: 'Space-based Proton Electron Energy Detector',
    status: 'ongoing',
    year: 'Aug 2025 – Present',
    category: 'Instrumentation · Space',
    institution: 'Space Lab, IIT Madras',
    color: '#6b9e78', // Sage Green
    emoji: '🛰️',
    links: [
      { label: 'B.Tech Thesis', url: '/EP22B045_BTP_Thesis.pdf', type: 'paper' }
    ],
    tech: ['Geant4', 'C', 'Tiva Microcontroller', 'MC² Analyzer', 'Python'],
    tagline: 'Contributed to simulation, data acquisition, and bare-metal C firmware for a scintillator-based charged particle detector payload for an ISRO satellite launch.',
    overview: `SPEED is a scintillator-based charged particle detector designed to measure the flux and energy spectrum of protons and electrons precipitating from the Van-Allen radiation belts. My contributions spanned three critical areas: Geant4 physics simulations to characterise the detector, laboratory data acquisition and analysis, and embedded C firmware development for the readout electronics on a Tiva microcontroller.`,
    details: [
      {
        heading: 'Geant4 Simulations',
        body: `Modernised the Geant4 simulation framework and performed simulations to model detector efficiency and its response to cosmic muons and a P-32 source, obtaining an energy spectrum for calibration. Additional noise modelling studies quantified the effect of ambient gamma radiation and WLS fibre reflectivity on the detector response.`,
      },
      {
        heading: 'Data Acquisition & Analysis',
        body: `Executed Data Acquisition (DAQ) workflows using a CAEN MC² Analyzer for signal readout and monitoring with digitizers. Analysed the collected cosmic muon data using combined Gaussian and Landau fitting in Python to extract detector characterisation parameters.`,
      },
      {
        heading: 'Microcontroller Firmware',
        body: `Co-led bare-metal C firmware development for real-time charged-particle flux monitoring. Resolved critical bugs including timer configuration mismatches (science timer fix), extended High Voltage Ramping Timer limits using software overflow counters, and debugged ADC-to-energy bin mapping for accurate data accumulation.`,
      },
    ],
    highlights: [
      'Performed Geant4 detector simulations for efficiency, cosmic muons, and P-32 sources.',
      'Executed DAQ workflows using a CAEN MC² Analyzer and analyzed data in Python.',
      'Co-led bare-metal C firmware development on a Tiva TM4C123GH6PM microcontroller.',
      'Fixed critical firmware issues: timer type mismatches, HV ramp timer overflows, and ADC-to-bin mapping.',
    ],
    metrics: [
      { label: 'Microcontroller', value: 'Tiva', sub: 'TM4C123GH6PM' },
      { label: 'Simulation',  value: 'Geant4', sub: 'Detector modelling' },
      { label: 'DAQ System',  value: 'CAEN', sub: 'MC² Analyzer' },
      { label: 'Target',      value: 'LEO', sub: 'Low Earth Orbit' },
    ],
  },

  {
    id: 'heavy-ion-physics',
    title: 'Heavy Ion & Dead Cone Effect',
    subtitle: 'GNN-based Track Classification in pp and PbPb Collisions',
    status: 'completed',
    year: 'Jun 2024 – May 2025',
    category: 'ML · QCD Physics',
    institution: 'EHEP Lab, IIT Madras',
    color: '#c96a6a', // Muted Rose
    emoji: '⚛️',
    links: [],
    tech: ['PyTorch Geometric', 'uproot', 'awkward-array', 'pandas', 'CMSSW', 'CRAB3'],
    tagline: 'Explored track classification from b-hadron decays investigating the dead cone effect using an end-to-end GNN framework and custom CMS data pipelines.',
    overview: `Working as a Young Research Fellow and Undergraduate Researcher at the EHEP Lab, I investigated the dead cone effect and b-flavor physics in pp and PbPb collisions at sqrt(s) = 5.02 TeV in the CMS experiment. The project involved building large-scale data preprocessing pipelines, performing Monte Carlo productions, and developing an end-to-end GNN framework for track classification.`,
    details: [
      {
        heading: 'GNN Deep Learning Framework',
        body: `Developed an end-to-end framework for graph-based track classification from b-hadron decays. This included dataset construction, model training using PyTorch and torch-geometric, and the evaluation of physics-motivated performance metrics to study the dead cone effect.`,
      },
      {
        heading: 'Data Preprocessing Pipeline',
        body: `Engineered a highly scalable preprocessing pipeline utilizing uproot and awkward-array to process 50 GB of ROOT data. The pipeline applied physics cuts, matched events-jets-tracks using pandas, and serialized the processed data into HDF5 batches for scalable GNN training.`,
      },
      {
        heading: 'Monte Carlo Production',
        body: `Developed a custom generator fragment for rare Lambda_b decays in PbPb collisions, achieving a filter efficiency of 1.3 × 10^-6. Performed full Monte Carlo production from generator-level to miniAOD using CMSSW. Designed and deployed a CRAB3 configuration optimized for large-scale production, generating over 1 million rare events.`,
      },
    ],
    highlights: [
      'Developed an end-to-end GNN framework for graph-based track classification.',
      'Engineered a scalable data pipeline with uproot and awkward-array for 50GB of ROOT data.',
      'Created a custom generator fragment for Lambda_b decays in PbPb collisions.',
      'Deployed a CRAB3 configuration to generate >1 million rare events in CMSSW.',
    ],
    metrics: [
      { label: 'Data Volume', value: '50GB', sub: 'ROOT to HDF5' },
      { label: 'Energy',      value: '5.02 TeV', sub: 'pp and PbPb' },
      { label: 'MC Events',   value: '>1M', sub: 'Generated rare events' },
      { label: 'Efficiency',  value: '1.3e-6', sub: 'Filter efficiency' },
    ],
  },

  {
    id: 'atlas-firmware',
    title: 'ATLAS Phase-II Firmware',
    subtitle: 'MALTA-to-FPGA Communication for Next-Gen Readout Chain',
    status: 'completed',
    year: 'Nov 2024 – May 2025',
    category: 'Hardware · FPGA',
    institution: 'Detector Development Lab, IIT Madras',
    color: '#818cf8',
    emoji: '⚡',
    links: [],
    tech: ['Verilog', 'Vivado', 'Kintex Ultrascale', 'Wireshark', 'MAC-PHY'],
    tagline: 'Executed end-to-end FPGA workflows and ported MALTA-to-FPGA communication firmware for the ATLAS experiment readout chain.',
    overview: `This hardware project involved developing and porting MALTA-to-FPGA communication firmware for the next-generation readout chain for the ATLAS experiment. I worked on executing complete FPGA deployment workflows, conducting network packet analysis, and adapting firmware for newer FPGA architectures.`,
    details: [
      {
        heading: 'FPGA Workflow & Deployment',
        body: `Executed end-to-end FPGA workflows on an ALINX board, encompassing simulation, synthesis, and physical deployment using the Vivado design suite.`,
      },
      {
        heading: 'Firmware Porting',
        body: `Successfully ported existing firmware from a KC705 evaluation board (Kintex7) to an AXKU040 board (Kintex Ultrascale FPGA). This required adapting the MAC-PHY Ethernet communication interfaces from SGMII to RGMII protocols.`,
      },
      {
        heading: 'Network Packet Analysis',
        body: `Conducted detailed packet analysis between the PC and the FPGA board using loopback configurations. Wireshark was extensively utilized for effective network-level debugging of the communication firmware.`,
      },
    ],
    highlights: [
      'Executed end-to-end FPGA workflow (simulation, synthesis, deployment) via Vivado.',
      'Ported firmware from KC705 (Kintex7) to AXKU040 (Kintex Ultrascale).',
      'Adapted MAC-PHY Ethernet communication from SGMII to RGMII.',
      'Conducted extensive packet analysis and loopback debugging using Wireshark.',
    ],
    metrics: [
      { label: 'FPGA Target', value: 'AXKU040', sub: 'Kintex Ultrascale' },
      { label: 'Ethernet',    value: 'RGMII', sub: 'Adapted from SGMII' },
      { label: 'Toolchain',   value: 'Vivado', sub: 'Synthesis & Impl' },
      { label: 'Experiment',  value: 'ATLAS', sub: 'Readout chain' },
    ],
  },

  {
    id: 'flare-removal-gan',
    title: 'Lens Flare Artifact Removal',
    subtitle: 'GAN-based UNET Architecture for Image/Video Restoration',
    status: 'completed',
    year: 'Jan 2024 – May 2024',
    category: 'Computer Vision',
    institution: 'Computational Imaging Lab, IIT Madras',
    color: '#907bc4', // Amethyst
    emoji: '📸',
    links: [],
    tech: ['PyTorch', 'GAN', 'UNET', 'Restormer', 'Uformer', 'Retinexformer'],
    tagline: 'Developed a robust GAN-based UNET model integrated with state-of-the-art transformer blocks to remove lens flare artifacts from images and videos.',
    overview: `Lens flare artifacts severely degrade image quality in computational photography. Working as an Undergraduate Researcher, I developed robust Generative Adversarial Network (GAN) models using a UNET architecture to identify and eliminate these flares. By leveraging synthetic datasets and integrating advanced restoration blocks, the model achieved high-quality flare removal for both single images and videos.`,
    details: [
      {
        heading: 'Architecture & Modeling',
        body: `The core restoration model relies on a GAN-based UNET structure. To capture both local textures and global illumination changes, advanced blocks such as Uformer, Restormer, NAFNet, Mamba blocks, and Retinexformer were successfully integrated into the codebase.`,
      },
      {
        heading: 'Data Generation & Training',
        body: `Utilized synthetically generated flare images combining data from the flare7kpp and Flickr24 datasets. This synthetic pipeline created highly realistic training pairs for robust model training and testing.`,
      },
      {
        heading: 'Performance Results',
        body: `The developed models achieved a Peak Signal-to-Noise Ratio (PSNR) of 23.52 and a Structural Similarity Index (SSIM) of 0.66. The architecture was also extended to handle temporal consistencies for flare removal in videos.`,
      },
    ],
    highlights: [
      'Developed GAN-based UNET models for flare artifact removal using restoration techniques.',
      'Integrated Uformer, Restormer, NAFNet, Mamba blocks, and Retinexformer into the codebase.',
      'Trained using synthetically generated flare images from flare7kpp and Flickr24 datasets.',
      'Achieved PSNR of 23.52 and SSIM of 0.66, and extended capabilities to video restoration.',
    ],
    metrics: [
      { label: 'PSNR',        value: '23.52', sub: 'Signal-to-Noise Ratio' },
      { label: 'SSIM',        value: '0.66',  sub: 'Structural Similarity' },
      { label: 'Architecture',value: 'GAN',   sub: 'UNET backbone' },
      { label: 'Datasets',    value: '2',     sub: 'flare7kpp & Flickr24' },
    ],
  },

  {
    id: 'nbody-simulation',
    title: '3D N-Body Gravitational Simulation',
    subtitle: 'High-Performance Galaxy Collision Modeling',
    status: 'completed',
    year: 'Jun 2023 – Mar 2024',
    category: 'Computational Physics',
    institution: 'AstroStellar Team (CFI), IIT Madras',
    color: '#d49a5b', // Amber Gold
    emoji: '🌌',
    links: [],
    tech: ['C++', 'MATLAB', 'Leapfrog', 'Runge-Kutta', 'Parallelization'],
    tagline: 'Generated and evolved initial galaxy conditions using a custom parallelized 3D N-body engine for massive particle interactions.',
    overview: `Modeling the gravitational interaction of massive stellar clusters requires numerically solving the N-body problem. As a member of the AstroStellar Team at the Centre for Innovation, I developed a custom simulation engine to study galaxy collisions, implementing advanced numerical integrators and parallel computing to handle over 1 million interacting particles.`,
    details: [
      {
        heading: 'Initialization',
        body: `Initial galaxy conditions were procedurally generated using grid-based, angular, and radial Gaussian mass distributions to accurately represent typical galactic density profiles before a collision event.`,
      },
      {
        heading: 'Dynamics Integration',
        body: `The core physics engine utilized Leapfrog and Runge-Kutta numerical integrators to solve Hamiltonian dynamics, ensuring energy conservation and accurate numerical evolution during complex collision scenarios.`,
      },
      {
        heading: 'Parallelization & Rendering',
        body: `The simulation code was parallelized to efficiently handle the computational load of simulating more than 1 million particles. The resulting galaxy collision outcomes were visualized and analyzed using MATLAB.`,
      },
    ],
    highlights: [
      'Generated initial galaxy conditions using grid-based, angular, and radial Gaussian mass distributions.',
      'Solved Hamiltonian dynamics utilizing Leapfrog and Runge-Kutta integrators.',
      'Parallelized the codebase to simulate more than 1 million interacting particles.',
      'Visualized complex simulation results in MATLAB.',
    ],
    metrics: [
      { label: 'Particles',    value: '>1M',    sub: 'Simulated bodies' },
      { label: 'Integrator',   value: 'Leapfrog', sub: 'and Runge-Kutta' },
      { label: 'Dimensions',   value: '3D',     sub: 'Spatial evolution' },
      { label: 'Optimization', value: 'Parallel', sub: 'Multi-threading' },
    ],
  },

  {
    id: 'analog-composite-system',
    title: 'Speaker & LED Composite System',
    subtitle: 'Synchronized Light & Sound Analog Design',
    status: 'completed',
    year: 'Jan 2024 – May 2024',
    category: 'Hardware · Analog',
    institution: 'EE2019 Analog Systems, IIT Madras',
    color: '#5f9ea0', // Cadet Teal
    emoji: '🎛️',
    links: [],
    tech: ['LTSpice', 'DC-DC Converter', 'Bandpass Filters', 'Class-D Amplifier'],
    tagline: 'Designed and demonstrated a composite analog system to synchronize light and sound with real-world functionality.',
    overview: `As part of the EE2019 Analog Systems course, I designed and physically demonstrated a comprehensive analog electronic system capable of driving synchronized lighting and audio based on frequency content. The project required deep analysis and resolution of real-world circuit non-idealities to achieve clean signal processing.`,
    details: [
      {
        heading: 'System Architecture',
        body: `Integrated multiple custom-designed stages: a DC-DC converter-based LED driver, precision bandpass filters for frequency separation, an adder, a peak detector, and a highly efficient Class-D audio amplifier.`,
      },
      {
        heading: 'Design & Validation',
        body: `Extensively simulated and validated the entire system dynamics using LTSpice. Successfully analyzed and resolved complex circuit non-idealities to realize clean signal filtering and modulation in the physical demonstration.`,
      },
    ],
    highlights: [
      'Designed and demonstrated a composite analog system to synchronize light and sound.',
      'Integrated a DC-DC LED driver, bandpass filters, peak detector, and Class-D amplifier.',
      'Analyzed and resolved circuit non-idealities for clean signal filtering and modulation.',
      'Simulated and validated the system in LTSpice, achieving the highest grade in the course.',
    ],
    metrics: [
      { label: 'Amplifier',  value: 'Class-D',  sub: 'Audio amplification' },
      { label: 'Modulation', value: 'DC-DC',    sub: 'LED driver control' },
      { label: 'Simulation', value: 'LTSpice',  sub: 'Analog modeling' },
      { label: 'Award',      value: 'Top Grade',sub: 'Course performance' },
    ],
  },
];

export const getProject = (id) => PROJECTS.find(p => p.id === id);
