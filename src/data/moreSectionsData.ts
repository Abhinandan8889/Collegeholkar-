import { BookCatalogItem } from '../types';

export const CENTRAL_LIBRARY_INFO = {
  totalVolumes: '1,25,000+',
  referenceBooks: '18,500+',
  scientificJournals: '45+ National & International Subscriptions',
  eJournals: '6,000+ through INFLIBNET N-LIST & e-ShodhSindhu',
  eBooks: '1,99,500+ digital titles',
  timings: 'Monday to Saturday: 08:00 AM to 08:00 PM (Reading Room 24x7 during exams)',
  librarian: 'Dr. Sanjay Vyas',
  facilities: [
    'Automated RFID circulation kiosk for instant borrow & return',
    'Dedicated Digital Library Section with 40 high-speed computers',
    'INFLIBNET N-LIST remote student access via institutional email',
    'Braille display and audio synthesizer software for visually impaired scholars',
    'Rare Manuscripts Archive dating back to 1891 Holkar Dynasty era',
  ],
};

export const SAMPLE_BOOKS_CATALOG: BookCatalogItem[] = [
  {
    id: 'bk-01',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    accessionNo: 'CS-ACC-10492',
    isbn: '978-0262033848',
    subject: 'Computer Science',
    publisher: 'MIT Press',
    edition: '3rd Edition',
    shelfLocation: 'Stack Room B, Shelf 4',
    isAvailable: true,
  },
  {
    id: 'bk-02',
    title: 'Inorganic Chemistry: Principles of Structure and Reactivity',
    author: 'James E. Huheey, Ellen A. Keiter, Richard L. Keiter',
    accessionNo: 'CHE-ACC-08192',
    isbn: '978-0060429959',
    subject: 'Chemistry',
    publisher: 'Pearson Education',
    edition: '4th Edition',
    shelfLocation: 'Stack Room A, Shelf 12',
    isAvailable: true,
  },
  {
    id: 'bk-03',
    title: 'Molecular Biology of the Cell',
    author: 'Bruce Alberts, Alexander Johnson, Julian Lewis, David Morgan',
    accessionNo: 'BIO-ACC-06411',
    isbn: '978-0815344322',
    subject: 'Biotechnology',
    publisher: 'Garland Science',
    edition: '6th Edition',
    shelfLocation: 'Stack Room C, Shelf 2',
    isAvailable: false,
  },
  {
    id: 'bk-04',
    title: 'Classical Mechanics',
    author: 'Herbert Goldstein, Charles P. Poole, John L. Safko',
    accessionNo: 'PHY-ACC-11204',
    isbn: '978-0201657029',
    subject: 'Physics',
    publisher: 'Addison Wesley',
    edition: '3rd Edition',
    shelfLocation: 'Stack Room A, Shelf 7',
    isAvailable: true,
  },
  {
    id: 'bk-05',
    title: 'Principles of Mathematical Analysis',
    author: 'Walter Rudin',
    accessionNo: 'MAT-ACC-05189',
    isbn: '978-0070542358',
    subject: 'Mathematics',
    publisher: 'McGraw Hill',
    edition: '3rd Edition',
    shelfLocation: 'Stack Room B, Shelf 9',
    isAvailable: true,
  },
];

export const GOVERNANCE_COUNCILS = {
  governingBody: {
    chairperson: 'Principal Secretary, Higher Education Department, Govt. of MP',
    memberSecretary: 'Prof. (Dr.) Suresh T. Silawat (Principal, Holkar Science College)',
    ugcNominee: 'Eminent Educationist nominated by University Grants Commission, New Delhi',
    stateGovtNominee: 'Additional Director, Higher Education Indore Division',
    universityNominee: 'Senior Dean of Science Faculty, Devi Ahilya Vishwavidyalaya (DAVV)',
    industryExpert: 'President, Association of Industries Madhya Pradesh (AIMP)',
  },
  academicCouncil: {
    head: 'Principal Prof. (Dr.) Suresh T. Silawat (Ex-Officio Chairman)',
    headsOfDepts: 'HODs of all 15+ Science & Computing Departments',
    universityExperts: '3 Professors nominated by DAVV Indore',
    expertsFromOutside: '4 distinguished experts from Medicine, Engineering, Law and Commerce',
  },
  iqac: {
    coordinator: 'Dr. Vivek Sathe (Professor of Chemistry)',
    objective: 'Institutional Quality Assurance, NAAC re-accreditation documentation and NEP-2020 curriculum benchmarks.',
  },
};

export const RESEARCH_CELL_INFO = {
  recognition: '8 Recognized Doctoral Research Centres under Devi Ahilya Vishwavidyalaya',
  fundingAgencies: 'DST-FIST (Level-I & Level-II), UGC Major Projects, MPCST Bhopal, CSIR',
  patentsCount: '14 Published / Granted Patents in Green Synthesis & Nanotechnology',
  cifEquipments: [
    { name: 'X-Ray Powder Diffractometer (XRD)', utility: 'Crystalline structure analysis of synthesized nanomaterials and geological minerals.' },
    { name: 'Fourier Transform Infrared Spectrophotometer (FT-IR)', utility: 'Functional group determination in organic molecules and drug formulations.' },
    { name: 'High-Performance Liquid Chromatography (HPLC)', utility: 'Quantitative separation and purity estimation of pharmaceutical and herbal extracts.' },
    { name: 'Gas Chromatography-Mass Spectrometry (GC-MS)', utility: 'Volatile compound profiling and forensic toxicology analysis.' },
    { name: 'Scanning Electron Microscope (SEM with EDS)', utility: 'High-resolution surface morphology and elemental composition mapping.' },
  ],
};

export const PLACEMENT_CELL_INFO = {
  head: 'Dr. Nagesh Dagaonkar (Training & Placement Officer)',
  highestPackage: '₹12.5 LPA (TCS Digital & Multinational Pharma R&D)',
  averagePackage: '₹4.2 LPA',
  recruiters: [
    'Tata Consultancy Services (TCS)',
    'Infosys Technologies',
    'Wipro Technologies',
    'Cipla Pharmaceuticals',
    'Lupin Pharmaceuticals',
    'Sun Pharmaceutical Industries',
    'Ranbaxy Laboratories',
    'Deloitte USI (Data Analytics)',
    'Cognizant',
    'Alembic Pharmaceuticals',
  ],
  supportProvided: [
    'Aptitude & Reasoning Bootcamps for campus placement exams',
    'Hands-on Mock Technical & HR Interviews by corporate alumni',
    'Summer Research Internships at IISER Bhopal, IIT Indore & RRCAT',
    'Soft Skills & Professional Resume Building Workshops',
  ],
};

export const ANTI_RAGGING_INFO = {
  nationalHelpline: '1800-180-5522 (Toll Free 24x7 National Anti-Ragging Helpline)',
  collegeHelpline: '+91 731 2464074 / +91 94250 12345',
  email: 'antiragging@collegeholkar.org',
  squadMembers: [
    { name: 'Prof. (Dr.) Suresh T. Silawat', role: 'Chairman (Principal)' },
    { name: 'Dr. R.C. Dixit', role: 'Convener (Controller of Examinations)' },
    { name: 'Dr. Anamika Jain', role: 'Member (Women Grievance Cell)' },
    { name: 'SHO, Bhawarkuan Police Station', role: 'Police Administration Representative' },
  ],
  rulesSummary: 'Ragging in any form (verbal, physical, psychological) is strictly prohibited as per Supreme Court of India directives and UGC Regulations. Violation leads to immediate suspension, FIR registration, and cancellation of admission.',
};

export const CAMPUS_TOUR_LANDMARKS = [
  {
    title: 'Main Heritage Red Brick Building (Estd. 1891)',
    titleHi: 'मुख्य हेरिटेज लाल ईंट भवन (स्थापना 1891)',
    description: 'Designed in colonial Indo-Saracenic architecture with majestic arches and stone masonry, founded by Maharaja Shivaji Rao Holkar.',
    imageUrl: '/assets/aistudio/front_ghsc_new.jpg',
    tag: 'Heritage Landmark',
  },
  {
    title: 'Yashwant Hall & Central Convocation Lawns',
    titleHi: 'यशवंत हॉल एवं केंद्रीय दीक्षांत लॉन',
    description: 'Historical assembly hall with acoustic timber paneling, host to national colloquiums and prestigious academic convocations.',
    imageUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80',
    tag: 'Auditorium',
  },
  {
    title: 'Holkar Botanical Garden & Herbal Arboretum',
    titleHi: 'होल्कर वानस्पतिक उद्यान एवं हर्बल आर्बोरेटम',
    description: 'Over 5 acres of medicinal flora, green-houses, and specimen cultivation for advanced botanical taxonomic research.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    tag: 'Botanical Reserve',
  },
  {
    title: 'C.V. Raman Science & Research Block',
    titleHi: 'सी.वी. रमन विज्ञान एवं शोध ब्लॉक',
    description: 'State-of-the-art multi-storey research complex housing DST-FIST instrumentation, robotics and computational data labs.',
    imageUrl: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80',
    tag: 'Research Complex',
  },
];
