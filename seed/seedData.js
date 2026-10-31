const seedData = {
  profile: {
    name: "Mohamed Shahid",
    title: "Full-Stack MERN Developer",
    roles: [
      "MERN Stack Developer",
      "React.js Specialist",
      "Full-Stack Engineer",
      "AI & Python Enthusiast"
    ],
    bioShort: "Crafting elegant digital experiences with clean code, modern architecture, and thoughtful design.",
    bioFull: "Computer Science graduate (2026) and aspiring Full Stack Developer with hands-on experience building responsive, user-friendly web applications using React.js, JavaScript (ES6+), Node.js, MongoDB, and Python. Experienced in developing real-world projects using modern web technologies and writing clean, maintainable code. Seeking an entry-level Full Stack Developer or Software Developer position to apply my technical skills and contribute to innovative projects.",
    email: "moh.shahid2004@gmail.com",
    phone: "+91 73391 10968",
    location: "Nagercoil, Tamil Nadu, India",
    resumeUrl: "/ShahidResume.pdf",
    avatarUrl: "/avatar.jpg",
    socials: {
      github: "https://github.com/Shahid-cs22",
      linkedin: "https://www.linkedin.com/in/infoshahid",
      twitter: "https://x.com/mohd_shahid04"
    },
    stats: {
      projectsCount: 10,
      experienceYears: "2+",
      commitsCount: "500+",
      satisfactionRate: "100%"
    }
  },

  skills: [
    // Frontend
    { name: "React.js", category: "Frontend", proficiency: 92, icon: "React", popular: true },
    { name: "JavaScript (ES6+)", category: "Frontend", proficiency: 90, icon: "FileCode", popular: true },
    { name: "TypeScript", category: "Frontend", proficiency: 82, icon: "FileCode2", popular: true },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 94, icon: "Palette", popular: true },
    { name: "Next.js", category: "Frontend", proficiency: 80, icon: "Globe", popular: false },
    { name: "Redux / Toolkit", category: "Frontend", proficiency: 84, icon: "Layers", popular: false },
    { name: "HTML5 / CSS3", category: "Frontend", proficiency: 95, icon: "Code", popular: false },
    { name: "Material UI (MUI)", category: "Frontend", proficiency: 85, icon: "Layout", popular: false },
    { name: "Bootstrap 5", category: "Frontend", proficiency: 90, icon: "LayoutGrid", popular: false },

    // Backend
    { name: "Node.js", category: "Backend", proficiency: 88, icon: "Server", popular: true },
    { name: "Express.js", category: "Backend", proficiency: 89, icon: "Cpu", popular: true },
    { name: "REST APIs", category: "Backend", proficiency: 92, icon: "Network", popular: true },
    { name: "Python", category: "Backend", proficiency: 82, icon: "Terminal", popular: true },
    { name: "Flask", category: "Backend", proficiency: 78, icon: "Cpu", popular: false },
    { name: "PHP", category: "Backend", proficiency: 70, icon: "Code2", popular: false },

    // Database
    { name: "MongoDB", category: "Database", proficiency: 88, icon: "Database", popular: true },
    { name: "Mongoose ODM", category: "Database", proficiency: 86, icon: "HardDrive", popular: true },
    { name: "JSON Server", category: "Database", proficiency: 90, icon: "FileJson", popular: false },

    // Tools & Ecosystem
    { name: "Git & GitHub", category: "Tools", proficiency: 90, icon: "GitBranch", popular: true },
    { name: "Postman / Thunder Client", category: "Tools", proficiency: 88, icon: "Send", popular: false },
    { name: "Vite & Webpack", category: "Tools", proficiency: 85, icon: "Zap", popular: false },
    { name: "Axios", category: "Tools", proficiency: 92, icon: "ArrowLeftRight", popular: false },
    { name: "Yup Validation", category: "Tools", proficiency: 85, icon: "CheckCircle", popular: false }
  ],

  experiences: [
    {
      role: "Final Year Project Lead & Developer",
      company: "AI Multilingual Crop Recommendation & Pest Detection System",
      period: "2026",
      type: "Capstone / Research",
      description: "Architected and built an end-to-end AI-driven multilingual agricultural decision platform that recommends optimum crops based on environmental parameters, detects crop pests from uploaded photographs using computer vision, and informs farmers regarding active government schemes.",
      highlights: [
        "Implemented Machine Learning models for crop recommendation & pest image detection",
        "Developed full-stack web interface with Python Flask, Bootstrap, JavaScript, and REST APIs",
        "Integrated multilingual support for regional farmers to maximize accessibility"
      ],
      skillsUsed: ["Python", "Machine Learning", "Flask", "JavaScript", "Bootstrap", "REST APIs"],
      order: 1
    },
    {
      role: "MERN Stack Developer",
      company: "JClick Solution, Nagercoil",
      period: "2025 — 2026",
      type: "Work Experience",
      description: "Gained comprehensive industry experience developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Focused on responsive UI design, backend API architecture, and database performance.",
      highlights: [
        "Engineered scalable REST APIs with Express and Mongoose schemas",
        "Built responsive client portals with React and modern state management",
        "Participated in Agile sprints, code reviews, and production deployments"
      ],
      skillsUsed: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Tailwind CSS"],
      order: 2
    },
    {
      role: "React Developer",
      company: "AK Infopark, Nagercoil",
      period: "2024",
      type: "Work Experience",
      description: "Built and maintained dynamic, interactive web applications using React.js. Implemented component-based architectures, managed application state efficiently, and enhanced overall cross-device UI performance.",
      highlights: [
        "Developed modular, reusable UI components adhering to modern React design patterns",
        "Improved page load performance and fluid responsive layouts across mobile & desktop",
        "Integrated external RESTful endpoints with error handling and loading indicators"
      ],
      skillsUsed: ["React.js", "JavaScript (ES6+)", "CSS3", "Bootstrap", "Git", "API Integration"],
      order: 3
    }
  ],

  education: [
    {
      degree: "B.E. in Computer Science & Engineering",
      school: "Stella Mary's College of Engineering, Kanyakumari",
      period: "2022 — 2026",
      details: "Graduated with honors in Computer Science and Engineering. Active member of the ACM student chapter, hackathon organizer, and contributor to engineering technical symposiums.",
      score: "Graduated with Honors",
      order: 1
    },
    {
      degree: "Higher Secondary Certificate (HSC - 12th)",
      school: "Government Higher Secondary School (GHSS), Eathamozhi",
      period: "2021 — 2022",
      details: "Specialization in Computer Science & Mathematics. Completed public examinations with outstanding academic distinction.",
      score: "390 / 600 Marks",
      order: 2
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC - 10th)",
      school: "Government Higher Secondary School (GHSS), Eathamozhi",
      period: "2019 — 2020",
      details: "Comprehensive foundational secondary education with strong emphasis on Science and Mathematics.",
      score: "340 / 500 Marks",
      order: 3
    }
  ],

  projects: [
    {
      title: "AI Crop & Pest Detection Platform",
      tagline: "Multilingual AI Agricultural Decision Platform",
      description: "An AI-powered multilingual web platform designed to support farmers by recommending high-yield crops based on soil and climate attributes, detecting plant pests via image classification, and presenting updated government agro-schemes.",
      tech: ["Python", "Flask", "Machine Learning", "JavaScript", "Bootstrap", "REST API"],
      category: "AI & Python",
      github: "https://github.com/Shahid-cs22",
      live: "https://shahidinfo.vercel.app/",
      featured: true,
      highlights: [
        "AI Pest Image Classifier with actionable pesticide advice",
        "Soil & climate based crop recommendation algorithm",
        "Multilingual interface catering to rural language preferences"
      ],
      order: 1
    },
    {
      title: "CakeKart",
      tagline: "Modern E-Commerce Bakery Web Application",
      description: "Full-featured cake ordering e-commerce application built with React and Redux. Features dynamic product filtering, cart persistence, secure authentication flows, and automated form validation with Yup and Axios.",
      tech: ["React.js", "Redux Toolkit", "Material UI", "Axios", "Yup", "JSON Server"],
      category: "Full Stack",
      github: "https://github.com/Shahid-cs22/CakeKart",
      live: "https://cakekart.netlify.app/",
      featured: true,
      highlights: [
        "Redux centralized state store for cart, wishlists, and orders",
        "Form validation with Yup schema integration",
        "Responsive checkout flow with simulated payment gateway"
      ],
      order: 2
    },
    {
      title: "Elite Car Shop & Detailing",
      tagline: "Automotive Client Web Portal",
      description: "A commercial responsive web portal developed for a real automotive detailing client using React. Utilizes reusable components, sleek UI animations, and service catalog showcase to boost customer bookings.",
      tech: ["React.js", "Material UI", "Tailwind CSS", "REST APIs"],
      category: "Frontend",
      github: "https://github.com/Shahid-cs22/Elite-Shine",
      live: "https://elite-shine-carwash.vercel.app/",
      featured: true,
      highlights: [
        "Real client project deployed with high mobile responsiveness",
        "Interactive service tier comparisons and booking quotes",
        "Clean, high-contrast dark aesthetic for automotive branding"
      ],
      order: 3
    },
    {
      title: "FoodHub",
      tagline: "Interactive Food Ordering & Delivery Web App",
      description: "A dynamic restaurant and food delivery web application that enables users to browse categorized menus, filter food items by dietary preferences, manage cart items in real time, and navigate seamlessly across views.",
      tech: ["React.js", "React Router DOM", "Hooks", "Tailwind CSS"],
      category: "Frontend",
      github: "https://github.com/Shahid-cs22/FoodHUB_React",
      live: "https://food-hub-react-ten.vercel.app",
      featured: false,
      highlights: [
        "Multi-view navigation with React Router DOM v6",
        "Custom React hooks for real-time shopping cart calculation",
        "Instant live search filter across dishes and categories"
      ],
      order: 4
    },
    {
      title: "Eathamozhi Masjid Community Portal",
      tagline: "Community Information & Prayer Times Portal",
      description: "A community portal created for the Eathamozhi Muslim community, providing accurate automated daily prayer schedules, community announcements, event calendars, Islamic knowledge resources, and photo galleries.",
      tech: ["HTML5", "CSS3", "JavaScript (ES6)", "Bootstrap 5", "REST APIs"],
      category: "Frontend",
      github: "https://github.com/Shahid-cs22",
      live: "https://masjid-ety.vercel.app/",
      featured: false,
      highlights: [
        "Automated prayer timetable calculation based on geographical coordinates",
        "Live announcement banner and photo archive",
        "Lightweight, 100% mobile-friendly responsive design"
      ],
      order: 5
    }
  ]
};

module.exports = seedData;

