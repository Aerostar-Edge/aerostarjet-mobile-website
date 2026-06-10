import { assets } from './assets'

export type NavLink = { label: string; href: string }

export type CourseCategory = 'aviation' | 'fashion-interior' | 'hospitality' | 'tours'

export type Course = {
  id: string
  code?: string
  title: string
  badge: string
  description: string
  overview: string
  duration: string
  schedule: string
  categories: CourseCategory[]
  image: string
  programmeLabel: string
  tagline: string
  eligibility?: string
  flightTraining?: string
  groundSubjects?: string[]
}

export type WhyChooseItem = {
  title: [string, string]
  description: string
  icon: string
}

export type Testimonial = {
  name: string
  role: string
  quote: string
  initial: string
}

export type PlacementStory = {
  name: string
  role: string
}

export type FaqItem = { question: string; answer: string }

export type Branch = { city: string; address: string; phone: string }

export const site = {
  name: 'Aerostar Aviation Academy',
  phone: '+91 63579-83061',
  email: 'inquiry@aerostarjet.in',
  heroBadge: "GUJARAT'S NO.1 AIR HOSTESS & AIRPORT MANAGEMENT TRAINING INSTITUTE",
  heroLine1: "It's Time To Give",
  heroLine2: 'Your Dreams',
  heroLine2Accent: 'Wings',
  heroHashtag: '#FlyHighWithAerostar',
  heroDescription:
    'Aerostar Aviation Academy is an approved training partner of National Skill Development Corporation (NSDC), Skill India and Aerospace Sector Skill Council (ASSC).',
} as const

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Placements', href: '/placements' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'About Us', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
]

export const heroStats = [
  { value: '18+', label: 'Years of Excellence' },
  { value: '20,000+', label: 'Students Placed' },
  { value: '2,500+', label: 'Hiring Partners' },
] as const

export const contactCopy = {
  overline: 'GET IN TOUCH',
  heading: 'Get In',
  headingAccent: 'Touch',
  description:
    'Reach our admissions team or visit any of our Gujarat centres. We are here to help you start your aviation career.',
  corporateOffice:
    'Sun Grace 505, 5th Floor, Above Westside, Visat Gandhinagar Road, Chandkheda, Ahmedabad',
  phones: ['+91 90990 83787', '+91 94265 17033'] as const,
  email: 'inquiry@aerostarjet.in',
  social: {
    facebook: '/aerostarjet',
    instagram: '@aerostarofficial',
    youtube: '/UCW21WU2MSsuw8-jE6LPAkDA',
  },
} as const

export const aboutCopy = {
  overline: 'ABOUT AEROSTAR',
  title: 'Aerostar Aviation Academy',
  heading: 'Vocational Training in the fields of',
  headingAccent: 'Aviation, Hospitality and Tours & Travel.',
  paragraphs: [
    'Aerostar is a training institute that helps and trains students to build a career in aviation and hospitality. Holistic personality development and communication skills development are mostly complimentary to our courses.',
    'With exceptional quality academic programs for air hostesses, hospitality courses, cabin crew courses, and travel & tourism courses, we have the highest placement records at airlines, airports, and the hotel industry across the globe.',
    'Our alumni are highly proactive in the aviation and hospitality industries across the globe and continue to support the development of this exciting and highly rewarding center of learning.',
  ],
} as const

export const recognitionsCopy = {
  overline: "Aerostar's Recognitions",
  heading: 'Nationally Recognised & Trustworthy Organization',
} as const

export const homepageCoursesCopy = {
  overline: 'Courses',
  heading: 'Find The Best Course For You',
  categories: [
    {
      label: 'Aviation',
      description: 'Aviation Courses — Find The Best Aviation Course For You',
      href: '/courses',
    },
    {
      label: 'Hospitality',
      description: 'Hospitality Courses — Find The Best Hospitality Course For You',
      href: '/courses',
    },
    {
      label: 'Tours & Travelling',
      description: 'Tours & Travelling Courses — Find The Best Tours & Travel Course',
      href: '/courses',
    },
    {
      label: 'Fashion & Interior Designing',
      description: 'Fashion & Interior Designing Courses — Find The Best Design Course',
      href: '/courses',
    },
  ],
} as const

export const whyChooseCopy = {
  overline: 'Why Choose Aerostar?',
  heading: 'Benefits of Training with Aerostar',
} as const

export const infrastructureCopy = {
  heading: 'Our Exclusive Infrastructure',
  pageHeading: 'Aerostar Infrastructure',
  paragraphs: [
    'At Aerostar, we highly focus on training our students for the real-life aviation industry. We have built all our aviation academy centers uniformly with the best professional infrastructure that is conceptually designed under the supervision of renowned architects and interior designers.',
    'Our academy centers are centrally air-conditioned with modernized computers and projectors for the audio-visual learning process. We conduct our practices and training in mock aircraft to create an actual aircraft-like ambience for the best experience of learning.',
    'We have grooming rooms and computer labs, equipped with the latest technology that gets your hands on different important software like Galileo.',
  ],
  cta: 'Infrastructure',
  gallery: [
    { src: assets.aboutImage, alt: 'Aerostar academy training centre' },
    { src: assets.heroStudent, alt: 'Aviation training at Aerostar' },
    { src: assets.courseCchm, alt: 'Cabin crew mock aircraft training' },
    { src: assets.courseAam, alt: 'Aviation and hospitality classroom' },
    { src: assets.courseTtm, alt: 'Travel and tourism training lab' },
    { src: assets.aboutImage, alt: 'Professional academy infrastructure' },
    { src: assets.courseAam, alt: 'Computer lab and learning facilities' },
    { src: assets.heroStudent, alt: 'Mock aircraft training environment' },
    { src: assets.courseTtm, alt: 'Grooming and personality development room' },
  ],
} as const

export const homepageNewsCopy = {
  overline: 'Aerostar News',
  heading: 'Latest News From Us',
} as const

export const blogsCopy = {
  heading: 'Our Blogs',
  subheading: 'Insights, guides, and career advice from the Aerostar team.',
} as const

export const homepageAdmissionCopy = {
  overline: 'Admission Open',
  heading: 'Enquiry Form',
  nearestAcademyOptions: [
    'Rajkot',
    'Surat',
    'Vadodara',
    'Ahmedabad-Chandkheda',
    'Ahmedabad-Maninagar',
    'Online Academy',
  ],
  qualificationOptions: ["High School", 'Diploma', "Bachelor's Degree", "Master's Degree", 'PhD', 'Other'],
  courseOptions: ['Aviation', 'Hospitality', 'Tours & Travelling', 'Fashion & Interior Designing'],
  submitLabel: 'Get In Touch',
} as const

export const courseCategories: { id: 'all' | CourseCategory; label: string }[] = [
  { id: 'all', label: 'All courses' },
  { id: 'aviation', label: 'Aviation' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'tours', label: 'Tours & Travelling' },
  { id: 'fashion-interior', label: 'Fashion & Interior Designing' },
]

export const courses: Course[] = [
  {
    id: 'ahtm',
    code: 'AHTM',
    title: 'Aviation, Hospitality & Travel Management',
    badge: 'Aviation',
    description:
      'Blends airport operations, in-flight services, hospitality management and travel coordination for industry-ready careers.',
    overview:
      'The Aviation, Hospitality & Travel Management (AHTM) course is designed to prepare students for dynamic careers in the fast-growing aviation and travel industry. This program blends essential training in airport operations, in-flight services, hospitality management, and travel coordination. Along with practical exposure, the course emphasizes grooming, soft skills, and global customer service standards. Our expert-led sessions and real-world internship opportunities ensure students are industry-ready. Graduates from this program find successful placements at leading airlines, international airports, travel agencies, and premium hotels around the world.',
    duration: '14 Months',
    schedule: '5 days a week',
    categories: ['aviation', 'hospitality', 'tours'],
    image: assets.courseAam,
    programmeLabel: 'Aviation Programme',
    tagline: 'Your gateway to aviation, hospitality and global travel careers',
  },
  {
    id: 'attm',
    code: 'ATTM',
    title: 'Aviation, Tours & Travel Management',
    badge: 'Aviation',
    description:
      'Covers airline operations, ticketing, tourism management and customer service with industry-led training modules.',
    overview:
      'The Aviation, Tour & Travel Management (ATTM) program equips students with essential skills to thrive in both aviation and travel industries. It offers a balanced curriculum covering airline operations, ticketing, tourism management, and customer service excellence. Special focus is given to grooming, spoken English, and international travel protocols. With real-time training modules and faculty from the industry, students gain exposure to both ground and air service environments. Our placement cell supports students in securing roles with reputed airlines, tour operators, and global travel brands.',
    duration: '12 Months',
    schedule: '5 days a week',
    categories: ['aviation', 'tours'],
    image: assets.courseTtm,
    programmeLabel: 'Aviation Programme',
    tagline: 'Master aviation operations and global travel management',
  },
  {
    id: 'cchm',
    code: 'CCHM',
    title: 'Cabin Crew & Hospitality Management',
    badge: 'Cabin Crew',
    description:
      'Specialised training in in-flight safety, passenger handling, hospitality protocols and crisis management.',
    overview:
      'The Cabin Crew & Hospitality Management (CCHM) course is tailored for individuals aiming to build a rewarding career in the skies and high-end service industries. It offers specialized training in in-flight safety, passenger handling, hospitality protocols, and crisis management. Alongside technical skills, students are groomed in communication, appearance, and service etiquette to meet international standards. The course combines theory with hands-on experience to prepare students for roles in both aviation and luxury hospitality sectors. Our trainees are successfully placed with leading airlines, hotel chains, and travel service providers globally.',
    duration: '6 Months',
    schedule: '5 days a week',
    categories: ['aviation', 'hospitality'],
    image: assets.courseCchm,
    programmeLabel: 'Cabin Crew Programme',
    tagline: 'Training for excellence in air and hospitality service',
  },
  {
    id: 'gstm',
    code: 'GSTM',
    title: 'Ground Staff & Travel Management',
    badge: 'Ground Staff',
    description:
      'Prepares students for on-ground airport roles — check-in, baggage handling, ticketing and travel coordination.',
    overview:
      'The Ground Staff & Travel Management (GSTM) course is designed to prepare students for essential on-ground roles at airports and within the travel industry. It covers key areas such as check-in procedures, baggage handling, customer service, ticketing, and travel coordination. Along with technical know-how, students develop soft skills, grooming standards, and communication abilities required for high-pressure environments. Practical training and industry insights make our learners job-ready from day one. Graduates often secure positions with domestic and international airlines, airports, and renowned travel companies.',
    duration: '6 Months',
    schedule: '5 days a week',
    categories: ['aviation', 'tours'],
    image: assets.courseAam,
    programmeLabel: 'Ground Staff Programme',
    tagline: 'Build a career in airport operations and travel services',
  },
  {
    id: 'cpl',
    code: 'CPL',
    title: 'Commercial Pilot License',
    badge: 'Pilot Training',
    description:
      'DGCA-approved commercial pilot training — qualify to act as a paid pilot of an aircraft.',
    overview:
      'A Commercial Pilot License (CPL) is a qualification that permits the holder to act as a pilot of an aircraft and be paid for his/her work. Aircraft: Cessna 152 / Cessna 172 / Tecnam P2006T. Age: 18 Years (Completed). Medical: Class I & Class II. Note: The student should be proficient in English.',
    duration: '18 Months',
    schedule: 'Contact admissions for schedule',
    categories: ['aviation'],
    image: assets.courseAam,
    programmeLabel: 'Pilot Training Programme',
    tagline: 'Train to become a commercial airline pilot',
    eligibility: 'A Pass in 12th Std. (Physics, Mathematics & English)',
    flightTraining: 'Total 200 Hours — 185 Hours + 15 Hours (Single and Multi Engine respectively)',
    groundSubjects: [
      'Air Regulations — Aerodrome Search & Rescue, Rules & Regulations, Customs & Health, Knowledge of Communication and Navigational Facilities.',
      'Air Navigation — Theoretical and Practical Navigation.',
      'Aviation Meteorology — Basic knowledge of Aviation, Weather Codes & Plotting, Elementary Synoptic Meteorology including simple interpretation of Weather Charts and Meteorological Procedures relating to Aviation.',
      'Technical General (Aircraft and Engines) — General Principles and Elementary Knowledge of Design, Construction, Maintenance and Operation of Aircraft, Engine and Instruments, Ancillary Systems, Emergency Systems, Installations & Equipment, Basic Knowledge of Fuel and Lubricants, Loading of Aircraft, Weight Distribution and its effect on Flight Characteristics.',
      'Aircraft Specific — Cessna 172 / Piper Seneca III / Tecnam P2006T: Limitations, Aircraft Engines, Systems Weight & Balance Performance.',
      'Radio Telephony Restricted (Aero) — Including Transmission and Interpretation of Aural Signals and Operations of Radio Telephony Apparatus On Board the Aircraft.',
    ],
  },
  {
    id: 'ppl',
    code: 'PPL',
    title: 'Private Pilot License',
    badge: 'Pilot Training',
    description:
      'DGCA-approved private pilot training — qualify to fly as a hobby pilot (non-commercial).',
    overview:
      'A Private Pilot License (PPL) is a qualification that permits the holder to act as a hobby pilot of an aircraft and he/she cannot be paid for his/her work. Flying Hours: 40 in Single Engine + 10 hours in Simulator. Aircraft: Cessna 172. Medical: Class II. Note: The student should be proficient in English.',
    duration: '6 Months',
    schedule: 'Contact admissions for schedule',
    categories: ['aviation'],
    image: assets.courseAam,
    programmeLabel: 'Pilot Training Programme',
    tagline: 'Take your first step into the cockpit',
    eligibility: 'A pass in Class 10 STD',
    flightTraining: 'Total Flying: 50 Hours (approx). Solo Flying: 20 Hours minimum.',
    groundSubjects: [
      'Air Regulations — Aerodrome Search & Rescue, Rules & Regulations, Customs & Health, Knowledge of Communication and Navigational Facilities.',
      'Air Navigation — Theoretical and Practical Navigation.',
      'Aviation Meteorology — Basic knowledge of Aviation, Weather Codes & Plotting, Elementary Synoptic Meteorology including simple interpretation of Weather Charts and Meteorological Procedures relating to Aviation.',
      'Technical General (Aircraft and Engines) — General Principles and Elementary Knowledge of Design, Construction, Maintenance and Operation of Aircraft, Engine and Instruments, Ancillary Systems, Emergency Systems, Installations & Equipment, Basic Knowledge of Fuel and Lubricants, Loading of Aircraft, Weight Distribution and its effect on Flight Characteristics.',
      'Specific Paper (Cessna-172) — Limitations, Aircraft Engines, Systems Weight & Balance Performance.',
    ],
  },
  {
    id: 'htcs',
    code: 'HTCS',
    title: 'Hospitality, Travel & Customer Service',
    badge: 'Hospitality',
    description:
      'Training for guest relations, travel assistance and service-oriented roles to global industry standards.',
    overview:
      'The Hospitality, Travel & Customer Service (HTCS) course offers comprehensive training for students aiming to work in guest relations, travel assistance, and service-oriented roles. The curriculum blends hospitality operations, travel management, and customer service techniques to meet global industry standards. Students also receive grooming, communication, and personality development sessions to enhance their professionalism. With a focus on real-world applications and industry exposure, this course opens doors to exciting roles in hotels, travel agencies, cruise lines, and tourism departments. Our placement support ensures a smooth transition into the workforce.',
    duration: '6 Months',
    schedule: '5 days a week',
    categories: ['hospitality', 'tours'],
    image: assets.courseTtm,
    programmeLabel: 'Hospitality Programme',
    tagline: 'Excel in hospitality, travel and customer service',
  },
  {
    id: 'interior-designing',
    title: 'Professional in Interior Designing',
    badge: 'Interior',
    description:
      'Develop creative and technical skills in space planning, materials, colour theory and design software.',
    overview:
      'The Professional in Interior Designing course is structured to develop creative and technical skills required to shape modern interior spaces. The program includes modules on space planning, material knowledge, color theory, furniture design, and software tools like AutoCAD and SketchUp. Students are encouraged to think innovatively while learning practical applications of design principles. The course also emphasizes portfolio development and client communication. With experienced faculty and project-based learning, our students are prepared for successful careers in residential, commercial, and institutional interior design firms.',
    duration: '14 Months',
    schedule: '5 days a week',
    categories: ['fashion-interior'],
    image: assets.courseAam,
    programmeLabel: 'Interior Designing Programme',
    tagline: 'Design functional and beautiful interior spaces',
  },
  {
    id: 'fashion-designing',
    title: 'Professional in Fashion Designing',
    badge: 'Fashion',
    description:
      'Nurture creativity in garment construction, textile science, fashion illustration and pattern making.',
    overview:
      'The Professional in Fashion Designing course is designed to nurture creativity and technical proficiency in the world of fashion. It covers essential aspects like garment construction, textile science, fashion illustration, pattern making, and design concepts. Students also gain exposure to industry-relevant software and trend forecasting techniques. Emphasis is placed on portfolio development and runway presentation skills to build confidence and professionalism. With expert guidance and hands-on training, our learners are well-prepared for careers in fashion houses, boutiques, export firms, and independent design ventures.',
    duration: '14 Months',
    schedule: '5 days a week',
    categories: ['fashion-interior'],
    image: assets.courseCchm,
    programmeLabel: 'Fashion Designing Programme',
    tagline: 'Build a creative career in fashion design',
  },
]

export const hiringPartners = [
  'Air India', 'IndiGo', 'Akasa Air', 'SpiceJet', 'Vistara', 'TAJ', 'The Oberoi',
  'ITC Hotels', 'Marriott', 'Hyatt', 'Radisson', 'Lemon Tree', 'Royal Orchid',
] as const

export const whyChoose: WhyChooseItem[] = [
  {
    title: ['Free Placement', 'Assistance'],
    description:
      'Free Placement Assistance with Domestic Airports, Airlines, Hotels & Travel Companies after your successful completion of course.',
    icon: assets.whyChooseIcon1,
  },
  {
    title: ['Highly Qualified &', 'Experienced Faculties'],
    description:
      'Get trained from the most qualified and experienced faculties for the realistic training.',
    icon: assets.whyChooseIcon2,
  },
  {
    title: ['Personality', 'Development'],
    description: 'Extensive makeover session for according personality development.',
    icon: assets.whyChooseIcon3,
  },
  {
    title: ['Communication Skill', 'Development'],
    description:
      'Strongly focused on communication skill development for the betterment of your career.',
    icon: assets.whyChooseIcon4,
  },
  {
    title: ['Academy', 'Location'],
    description: 'Aerostar Aviation Academy is located at major cities of Gujarat.',
    icon: assets.whyChooseIcon1,
  },
  {
    title: ['Professional', 'Courses'],
    description:
      'Air hostess training course, Airline courses, Aviation courses, Cabin crew courses, Hospitality courses.',
    icon: assets.whyChooseIcon2,
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'The communication skill development must be the best training I needed. Aerostar Academy is the best training academy I could have joined to start off with my career. I am thankful for everyone over there, for getting me ready for the real-life.',
    name: 'Stuti Upadhyay',
    role: 'Ahmedabad International Airport',
    initial: 'S',
  },
  {
    quote:
      'The experienced and knowledgeable faculty members of Aerostar have helped the most for the real life of aviation industry. The mock-aircraft training and experience of our faculties trained me in the best way for the professional career.',
    name: 'Mausin Sharfi',
    role: 'Spice Jet',
    initial: 'M',
  },
  {
    quote:
      'The Aerostar aviation academy certificate and real-life training experience is helping me a lot in standing out from other candidates. The training helped me get prepared for the aviation industry from start, which is why I could successfully achieve my goal faster.',
    name: 'Ashok Sen',
    role: 'Ahmedabad International Airport',
    initial: 'A',
  },
]

export const placements: PlacementStory[] = [
  { name: 'Mili Kandachiya', role: 'Ahmedabad International Airport' },
  { name: 'Mausin Sharfi', role: 'Spice Jet' },
  { name: 'Stuti Upadhyay', role: 'Ahmedabad International Airport' },
  { name: 'Ashok Sen', role: 'Ahmedabad International Airport' },
  { name: 'Hussain Sabuwala', role: 'Indigo' },
  { name: 'Sameer Rana', role: 'Ahmedabad International Airport' },
]

export const faqs: FaqItem[] = [
  {
    question: 'Why should I choose Aerostar for aviation career training?',
    answer:
      'Aerostar prepares you with practical training complemented with theoretical knowledge. We make you industry-ready professionals and offer professional courses & certificates that have high demand in the industry.',
  },
  {
    question: 'Where are Aerostar Academy Centres Located?',
    answer:
      'Aerostar Academy centres are located in all major cities of Gujarat. Click on Contact Us to know more about the academy and courses.',
  },
  {
    question: 'What are the eligibility criteria to get admission in Aerostar training academy?',
    answer:
      'To get admission in Aerostar training Academy, one must be minimum 18 years of age and must be at least either pursuing or passed the Std. 12th. However, there are different eligibility criteria for some courses, which is discussed during the personal career counseling sessions at Aerostar.',
  },
  {
    question: 'Are Aerostar certificate courses valid for getting a job in airlines, hotel and travel industries?',
    answer:
      'Yes, Aerostar certificate courses are valid to get a job in airlines, hotels and travel industry.',
  },
  {
    question: 'Will I get a job after completing the course from the Aerostar Academy?',
    answer:
      'Aerostar Aviation Academy offers free placement assistance after your successful completion of the course here. We have the highest placement records in various airports, airlines and hotel industries.',
  },
  {
    question: 'Can I join the Aerostar training course while studying or working?',
    answer:
      'Aerostar Academy courses are part-time courses. You have to attend the classes 5 days a week and 2 hours a day. Thus, you can continue your study/work while pursuing a course here.',
  },
]

export const branches: Branch[] = [
  {
    city: 'Maninagar — Ahmedabad',
    address:
      'Prism Rudra 306, 3rd Floor, Shah Alam Toll Naka, Nr Kankaria Telephone Exchange, Maninagar, Ahmedabad',
    phone: '+91 97274 88828',
  },
  {
    city: 'Chandkheda — Ahmedabad',
    address: 'Sun Grace 505, 5th Floor, Above Westside, Visat Gandhinagar Road, Chandkheda, Ahmedabad',
    phone: '+91 95120 24092',
  },
  {
    city: 'Baroda',
    address: 'K P Infinity 402, 4th Floor, Near Natubhai Circle, Race Course Road, Baroda',
    phone: '+91 99790 71119',
  },
  {
    city: 'Rajkot',
    address: 'The Emporia 26/27, 2nd Floor, AG Chowk, Kalawad Road, Rajkot',
    phone: '+91 94265 17033',
  },
  {
    city: 'Surat',
    address:
      'Om Arcade 201, 2nd Floor, Nr Varun Circle, Anand Mahal Road, Adajan, Surat',
    phone: '+91 99798 55568',
  },
]

export const franchiseCopy = {
  hero: {
    title: 'Franchise',
    subCopy:
      'Aerostar Aviation Academy, as the Franchisor, offers expertise and know-how in its area of operation. Aerostar has a proven track record and has achieved a reputation for being a successful business model.',
    cta: 'Enquire Now',
  },
  overview: {
    paragraphs: [
      'Aerostar Aviation Academy, as the Franchisor, offers expertise and know-how in its area of operation. Aerostar has a proven track record and has achieved a reputation for being a successful business model. The growth of franchising is unstoppable. Franchising distinctly offers aspiring new business owners the best possible chance of success with the least amount of risk.',
      'Join our chain and become one of our franchisors for success in the Aviation Education industry!',
    ],
    stats: [
      { value: '18+', label: 'Years Experience' },
      { value: '5', label: 'Branches Across Gujarat' },
      { value: '₹30–50L', label: 'Investment Range' },
    ],
  },
  investmentDetails: [
    { label: 'Approximate Investment', value: '30 to 50 Lakhs' },
    { label: 'Industry', value: 'Aviation, Hospitality & Tours Education' },
    { label: 'Business Model', value: 'Franchise (Training Institute)' },
  ],
  availableStates: [
    'Gujarat',
    'Assam',
    'Haryana',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Himachal Pradesh',
    'Karnataka',
    'Kerala',
    'Maharashtra',
    'Madhya Pradesh',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Tamil Nadu',
    'Uttar Pradesh',
    'West Bengal',
  ],
  formIntro: 'Fill in the details below to register your interest in an Aerostar franchise.',
  branches: [
    {
      name: 'Maninagar, Ahmedabad',
      address:
        'Prism Rudra 306, 3rd Floor, Shah Alam Toll Naka, Nr Kankaria Telephone Exchange, Maninagar',
      phone: '+91 97274 88828',
    },
    {
      name: 'Chandkheda, Ahmedabad',
      address: 'Sun Grace 505, 5th Floor, Above Westside, Visat Gandhinagar Road, Chandkheda',
      phone: '+91 95120 24092',
    },
    {
      name: 'Baroda',
      address: 'K P Infinity 402, 4th Floor, Near Natubhai Circle, Race Course Road, Baroda',
      phone: '+91 99790 71119',
    },
    {
      name: 'Rajkot',
      address: 'The Emporia 26/27, 2nd Floor, AG Chowk, Kalawad Road, Rajkot',
      phone: '+91 94265 17033',
    },
    {
      name: 'Surat',
      address:
        'Om Arcade 201, 2nd Floor, Nr Varun Circle, Anand Mahal Road, Opp Green Elina Building, Adajan, Surat',
      phone: '+91 99798 55568',
    },
  ],
} as const

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

export function getCourseCountByCategory(category: 'all' | CourseCategory): number {
  if (category === 'all') return courses.length
  return courses.filter((course) => course.categories.includes(category)).length
}

export { blogPosts, getBlogBySlug, getBlogListingPosts } from './blogs'
export type { BlogPost } from './blogs'
