import React, { useState, useEffect, useRef } from 'react';

const GymWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    plan: 'basic'
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const animationRefs = useRef([]);

  // Gym images
  const gymImages = {
    facility: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
    personalTraining: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop',
    weightRoom: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=1200&h=800&fit=crop',
    cardioArea: 'https://images.unsplash.com/photo-1549060279-7e168fce7090?w=1200&h=800&fit=crop',
    yogaClass: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop',
    poolArea: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    crossfit: 'https://images.unsplash.com/photo-1596357395217-80de13130e92?w=1200&h=800&fit=crop',
    boxing: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
    lockerRoom: 'https://images.unsplash.com/photo-1590488358256-9f99db6c2a6c?w=1200&h=800&fit=crop',
    sauna: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=800&fit=crop',
    cafe: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
    reception: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=800&fit=crop'
  };

  // Gallery images
  const galleryImages = [
    { id: 1, url: gymImages.facility, category: 'مرافق', title: 'الصالة الرئيسية' },
    { id: 2, url: gymImages.weightRoom, category: 'قوة', title: 'منطقة الأوزان' },
    { id: 3, url: gymImages.cardioArea, category: 'كارديو', title: 'منطقة الكارديو' },
    { id: 4, url: gymImages.yogaClass, category: 'يوغا', title: 'استوديو اليوغا' },
    { id: 5, url: gymImages.poolArea, category: 'سباحة', title: 'المسبح الأولمبي' },
    { id: 6, url: gymImages.crossfit, category: 'كروس فت', title: 'منطقة الكروس فت' },
    { id: 7, url: gymImages.boxing, category: 'ملاكمة', title: 'حلبة الملاكمة' },
    { id: 8, url: gymImages.lockerRoom, category: 'مرافق', title: 'غرفة الملابس الفاخرة' },
    { id: 9, url: gymImages.sauna, category: 'استجمام', title: 'غرفة الساونا' }
  ];

  // Trainers
  const trainers = [
    { 
      name: 'أحمد المنصوري', 
      specialization: 'مدرب قوة', 
      img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500&h=500&fit=crop&crop=face',
      experience: '15+ سنة خبرة'
    },
    { 
      name: 'نورة الحسن', 
      specialization: 'خبيرة يوجا', 
      img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&h=500&fit=crop&crop=face',
      experience: 'RYT 500 معتمد'
    },
    { 
      name: 'خالد الرشيد', 
      specialization: 'مدرب كروس فت', 
      img: 'https://images.unsplash.com/photo-1563122870-6b0b48a0af09?w=500&h=500&fit=crop&crop=face',
      experience: 'بطل إقليمي 5 مرات'
    }
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      animationRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8;
          if (isVisible) {
            ref.classList.add('animate-in');
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم إرسال استمارتك بنجاح! سنتواصل معك قريباً.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      plan: 'basic'
    });
  };

  // Navigation
  const renderNavigation = () => (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ق</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">قوة اللياقة</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">تميز منذ 2010</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['الرئيسية', 'من نحن', 'الخدمات', 'المدربون', 'المعرض', 'اتصل بنا'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item === 'الرئيسية' ? 'home' : item === 'من نحن' ? 'about' : 
                  item === 'الخدمات' ? 'services' : item === 'المدربون' ? 'trainers' : 
                  item === 'المعرض' ? 'gallery' : 'contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition-colors"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage('join')}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all text-sm font-medium"
            >
              انضم الآن
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-600"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="space-y-4">
              {['الرئيسية', 'من نحن', 'الخدمات', 'المدربون', 'المعرض', 'اتصل بنا'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCurrentPage(item === 'الرئيسية' ? 'home' : item === 'من نحن' ? 'about' : 
                      item === 'الخدمات' ? 'services' : item === 'المدربون' ? 'trainers' : 
                      item === 'المعرض' ? 'gallery' : 'contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-right py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentPage('join');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg"
              >
                انضم الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

// Home Page - Luxury Fitness Club
// Home Page - Luxury Fitness Club
const renderHomePage = () => (
  <div>
    {/* Hero Section - Executive Fitness Experience */}
    <section className="relative min-h-screen flex items-center justify-end overflow-hidden">
      {/* Background with professional gym image */}
      <div className="absolute inset-0">
        <img
          src={gymImages.executiveFacility || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"}
          alt="Executive Fitness Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/85 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      
      {/* Luxury Accent Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-xl ml-auto">
          {/* Executive Badge */}
          <div className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg px-6 py-3 rounded-full mb-10 border border-red-700/30 shadow-2xl">
            <div className="relative flex h-3 w-3">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></div>
            </div>
            <span className="text-red-100 font-semibold tracking-wider text-sm uppercase">
              Private Access 24/7
            </span>
          </div>
          
          {/* Main Heading */}
          <div className="mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Executive Fitness
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                Redefined
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              A sanctuary for high-performance individuals seeking unparalleled 
              fitness excellence. Where state-of-the-art facilities meet 
              bespoke wellness programming for those who demand the best.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="space-y-6 mb-16">
            <button
              onClick={() => setCurrentPage('membership')}
              className="group relative w-full bg-gradient-to-r from-gray-900 to-black text-white px-10 py-5 rounded-xl border border-gray-700 hover:border-red-600 transition-all duration-300 text-lg font-semibold shadow-2xl hover:shadow-red-900/30 hover:scale-[1.02] transform flex items-center justify-center gap-4"
            >
              <span className="relative z-10">Schedule Executive Tour</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300 text-red-400">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white px-10 py-5 rounded-xl hover:from-red-800 hover:to-red-950 transition-all duration-300 text-lg font-semibold shadow-2xl hover:shadow-red-900/50 hover:scale-[1.02] transform flex items-center justify-center gap-4"
            >
              <span>Request Membership Portfolio</span>
              <span className="text-lg">📋</span>
            </button>
          </div>
          
          {/* Trust Indicators with Icons */}
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl text-red-400 font-bold mb-2">Forbes</div>
              <div className="text-sm text-gray-400">Top 5 Luxury Gyms 2024</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-red-400 font-bold mb-2">AAA</div>
              <div className="text-sm text-gray-400">5 Diamond Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side Luxury Panel with Image */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3">
        <div className="relative h-full">
          <img
            src={gymImages.premiumEquipment || "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
            alt="Premium Equipment"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-12">
            <div className="text-white mb-8">
              <div className="text-2xl font-light mb-2">EST. 2010</div>
              <div className="text-sm text-gray-400">Years of Excellence</div>
            </div>
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-red-600 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Value Proposition Section */}
    <section className="py-28 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #dc2626 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block px-6 py-2 bg-red-900/20 rounded-full border border-red-900/50 mb-8">
            <span className="text-red-300 text-sm font-semibold tracking-wider">EXCLUSIVE OFFERING</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            A New Standard in
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Premium Wellness
            </span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Our executive fitness environment combines cutting-edge technology with 
            personalized service to deliver measurable results for discerning clients.
          </p>
        </div>

        {/* Services Grid with Images */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Executive Wellness Programs",
              description: "Comprehensive health assessments and custom fitness protocols designed for high-performance professionals.",
              image: gymImages.healthAssessment || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              features: ["Biometric Analysis", "Lifestyle Integration", "Progress Tracking"],
              color: "from-red-900/20 to-red-900/5"
            },
            {
              title: "Private Training Suites",
              description: "Exclusively appointed training spaces with dedicated coaching teams for uninterrupted sessions.",
              image: gymImages.privateTraining || "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              features: ["1:1 Coaching", "Advanced Equipment", "Video Analysis"],
              color: "from-gray-900/20 to-gray-900/5"
            },
            {
              title: "Corporate Wellness Solutions",
              description: "Tailored programs for organizations seeking to optimize team performance and wellbeing.",
              image: gymImages.corporateWellness || "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              features: ["Team Assessments", "On-site Services", "ROI Reporting"],
              color: "from-red-900/20 to-red-900/5"
            }
          ].map((service, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl transform group-hover:scale-105 transition-transform duration-500`}></div>
              <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-800 group-hover:border-red-700/50 transition-all duration-300 h-full overflow-hidden">
                {/* Service Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <div className="text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-500 inline-block p-3 bg-gradient-to-br from-gray-800 to-black rounded-xl">
                    {idx === 0 ? "📊" : idx === 1 ? "🏋️‍♂️" : "💼"}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">{service.title}</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-gray-800">
                    <button className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-2">
                      Learn More
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Metrics with Icons */}
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-2xl p-12 border border-gray-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                metric: "92%", 
                label: "Member Retention Rate", 
                desc: "Industry-leading satisfaction",
                icon: "📈"
              },
              { 
                metric: "48", 
                label: "Certified Professionals", 
                desc: "Average 15+ years experience",
                icon: "👨‍🏫"
              },
              { 
                metric: "98%", 
                label: "Goal Achievement", 
                desc: "Based on annual member surveys",
                icon: "🎯"
              },
              { 
                metric: "24/7", 
                label: "Concierge Service", 
                desc: "Dedicated support team",
                icon: "🛎️"
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                  {item.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-2">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Technology & Innovation Section with Image Showcase */}
    <section className="py-28 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="text-red-400 font-semibold tracking-widest text-sm uppercase mb-6">
              Advanced Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Intelligent Fitness
              <br />
              <span className="text-gray-400">Powered by Innovation</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Our proprietary systems and advanced equipment provide data-driven insights 
              for optimized performance tracking and measurable results.
            </p>
            
            {/* Tech Features */}
            <div className="space-y-10">
              {[
                {
                  title: "Smart Performance Tracking",
                  description: "Real-time biometric monitoring and AI-powered analysis for precision training adjustments.",
                  icon: "📈",
                  image: gymImages.smartTracking || "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Virtual Reality Integration",
                  description: "Immersive training environments and technique analysis through VR technology.",
                  icon: "👓",
                  image: gymImages.vrTraining || "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                },
                {
                  title: "Recovery Optimization",
                  description: "Advanced recovery protocols utilizing cryotherapy, PEMF, and compression therapy.",
                  icon: "🔄",
                  image: gymImages.recovery || "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
              ].map((tech, idx) => (
                <div key={idx} className="group flex items-start gap-6 p-4 rounded-xl hover:bg-gray-900/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="text-3xl p-4 bg-gradient-to-br from-gray-800 to-black rounded-xl">
                      {tech.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                    <p className="text-gray-400 mb-4">{tech.description}</p>
                    <button className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-2">
                      View Technology
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technology Showcase Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1">
              <div className="bg-black rounded-3xl overflow-hidden">
                <div className="relative h-96">
                  <img
                    src={gymImages.techShowcase || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                    alt="Technology Showcase"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <div className="p-12">
                  <h3 className="text-2xl font-bold text-white mb-6">Technology Partnership Program</h3>
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    {['Technogym', 'Myzone', 'Whoop'].map((brand, idx) => (
                      <div key={idx} className="text-center p-4 bg-gray-900/50 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer">
                        <div className="text-lg font-semibold text-gray-300">{brand}</div>
                        <div className="text-xs text-gray-500 mt-2">Official Partner</div>
                      </div>
                    ))}
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-sm font-semibold">
                    View Technology Specifications →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Corporate Partnerships Section with Client Images */}
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-red-900/5"></div>
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="network" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#dc2626" />
                <path d="M20,0 V40 M0,20 H40" stroke="#dc2626" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">Trusted by Industry Leaders</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Partnering with forward-thinking organizations committed to excellence in health and performance.
          </p>
        </div>

        {/* Enhanced Client Showcase with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              company: "Microsoft",
              role: "Corporate Partner Since 2018",
              image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              testimonial: "Transformed our corporate wellness program"
            },
            {
              company: "Samsung",
              role: "Wellness Alliance Member",
              image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              testimonial: "Exceptional executive fitness solutions"
            },
            {
              company: "EY",
              role: "Strategic Partner",
              image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              testimonial: "Premium service, outstanding results"
            },
            {
              company: "PwC",
              role: "Corporate Wellness Partner",
              image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              testimonial: "Setting new standards in fitness"
            }
          ].map((partner, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-red-700/50 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={partner.image}
                  alt={partner.company}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xl font-bold text-white">{partner.company}</div>
                  <div className="text-sm text-gray-300">{partner.role}</div>
                </div>
              </div>
              <div className="p-6 bg-gray-900/50">
                <p className="text-gray-400 text-sm italic">"{partner.testimonial}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA with Background Image */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-gray-800">
            {/* CTA Background Image */}
            <div className="absolute inset-0">
              <img
                src={gymImages.ctaBackground || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"}
                alt="Executive Fitness Experience"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60"></div>
            </div>
            
            <div className="relative p-16 text-center">
              <h3 className="text-3xl font-bold text-white mb-6">
                Experience the Difference
              </h3>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Schedule a private tour and discover how our executive fitness solutions 
                can elevate your personal and organizational performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="group px-12 py-4 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-xl font-semibold hover:from-red-800 hover:to-red-950 transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                >
                  <span>Request Private Consultation</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={() => setCurrentPage('membership')}
                  className="px-12 py-4 bg-gray-900/80 backdrop-blur-sm text-white rounded-xl font-semibold border border-gray-700 hover:border-red-600 transition-all hover:scale-105"
                >
                  Download Membership Brochure
                </button>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-800/50">
                <div className="text-sm text-gray-400">
                  For immediate inquiries: <span className="text-red-400 font-semibold">+1 (555) 123-4567</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Monday - Friday: 8:00 AM - 8:00 PM EST
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials Carousel */}
    <section className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Executive Testimonials</h2>
          <p className="text-gray-400">Hear from our distinguished members</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Chen",
              role: "CEO, TechVision",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              quote: "The personalized attention and data-driven approach have transformed my fitness journey."
            },
            {
              name: "Michael Rodriguez",
              role: "Managing Partner, Capital Ventures",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              quote: "More than a gym - it's a strategic investment in my professional performance."
            },
            {
              name: "Aisha Patel",
              role: "COO, Global Innovations",
              image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
              quote: "The corporate wellness program has significantly improved our team's productivity."
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-red-600/50"
                />
                <div className="ml-4">
                  <div className="text-lg font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 italic border-r-4 border-red-600 pr-4">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer Contact */}
    <div className="bg-black border-t border-gray-900 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">EF</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Executive Fitness Club. All rights reserved.
            </div>
          </div>
          <div className="flex gap-8">
            <button className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</button>
            <button className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</button>
            <button className="text-gray-400 hover:text-white text-sm transition-colors">Careers</button>
            <button className="text-gray-400 hover:text-white text-sm transition-colors">Investors</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
  // About Page
  const renderAboutPage = () => (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">قصتنا</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              منذ تأسيسنا في عام 2010، كنا روادًا في مجال اللياقة البدنية في المنطقة. 
              نحن نؤمن بأن اللياقة البدنية ليست مجرد تمرين، بل هي رحلة حياة نحو الصحة والعافية.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              مهمتنا هي تمكين كل فرد من تحقيق أقصى إمكاناته من خلال تقديم مرافق عالمية 
              المستوى وخدمات استشارية متميزة في بيئة محفزة وآمنة.
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all">
              انضم إلينا
            </button>
          </div>
          <div className="relative">
            <img
              src={gymImages.reception}
              alt="قوة اللياقة"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold text-red-600">13+</div>
              <div className="text-gray-600 dark:text-gray-400">سنة من التميز</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Services Page
  const renderServicesPage = () => (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">خدماتنا</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">حلول شاملة لجميع أهداف اللياقة البدنية</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: 'تدريب شخصي', 
              desc: 'برامج تدريب فردية مع مدرب خاص', 
              price: 'من 250 درهم/جلسة',
              features: ['تقييم شامل', 'خطط مخصصة', 'متابعة أسبوعية']
            },
            { 
              title: 'فصول جماعية', 
              desc: 'يوغا، كروس فت، سبين، ومزيد', 
              price: '120 درهم/شهر',
              features: ['جدول متنوع', 'مدربون معتمدون', 'جميع المستويات']
            },
            { 
              title: 'تغذية واستشارات', 
              desc: 'خطط تغذية شخصية واستشارات صحية', 
              price: 'من 200 درهم/جلسة',
              features: ['تحليل الجسم', 'خطط وجبات', 'تعديلات دورية']
            },
            { 
              title: 'تدريب متخصص', 
              desc: 'ملاكمة، كروس فت، وتدريب رياضي', 
              price: 'من 300 درهم/شهر',
              features: ['معدات متخصصة', 'تدريب تقني', 'تحضير مسابقات']
            },
            { 
              title: 'برامج جماعية', 
              desc: 'تحول 90 يوم، بناء العضلات، فقدان الوزن', 
              price: '400 درهم/برنامج',
              features: ['متابعة جماعية', 'تحديات', 'جوائز']
            },
            { 
              title: 'استشارات افتراضية', 
              desc: 'تدريب وتغذية عبر الإنترنت', 
              price: '150 درهم/جلسة',
              features: ['جلسات عبر الفيديو', 'تطبيق مخصص', 'دعم متواصل']
            }
          ].map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
              <div className="text-red-600 font-bold text-lg mb-6">{service.price}</div>
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-red-600 rounded-full ml-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                احجز الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Trainers Page
  const renderTrainersPage = () => (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">فريق المدربين</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">خبراء معتمدون لتحقيق أقصى استفادة من تدريبك</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 overflow-hidden">
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{trainer.name}</h3>
                <div className="text-red-600 font-medium mb-3">{trainer.specialization}</div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{trainer.experience}</p>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                  احجز جلسة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Gallery Page
  const renderGalleryPage = () => (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">معرض الصور</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">استكشف مرافقنا العالمية</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-xl">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <div className="text-white font-bold text-lg mb-1">{image.title}</div>
                  <div className="text-red-400 text-sm">{image.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Contact Page
  const renderContactPage = () => (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">اتصل بنا</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              نحن هنا لمساعدتك في بدء رحلتك. تواصل معنا لأي استفسار.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: '📍', title: 'العنوان', desc: 'شارع اللياقة 123، دبي مارينا، دبي' },
                { icon: '📞', title: 'الهاتف', desc: '+971 4 123 4567' },
                { icon: '✉️', title: 'البريد الإلكتروني', desc: 'info@qowat-al-leeqa.com' },
                { icon: '🕒', title: 'ساعات العمل', desc: '24/7 للأعضاء | 6 صباحاً - 10 مساءً للموظفين' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="text-2xl ml-4 text-red-600">{item.icon}</div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{item.title}</div>
                    <div className="text-gray-600 dark:text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الموضوع</label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600">
                    <option>استفسار عام</option>
                    <option>عضوية</option>
                    <option>تدريب شخصي</option>
                    <option>فصول جماعية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">الرسالة</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all"
                >
                  إرسال الرسالة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // Join Page
  const renderJoinPage = () => (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">انضم إلينا</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">اختر الخطة المناسبة لرحلتك في اللياقة البدنية</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { 
              name: 'أساسي', 
              price: '299', 
              period: 'شهرياً',
              features: ['دخول الجيم 24/7', 'منطقة الأوزان', 'غرفة الملابس', 'معدات أساسية'],
              recommended: false
            },
            { 
              name: 'برو', 
              price: '499', 
              period: 'شهرياً',
              features: ['جميع ميزات الأساسي', 'جميع الفصول الجماعية', 'ساونا وغرفة بخار', 'تذكرة ضيف (2/شهر)'],
              recommended: true
            },
            { 
              name: 'المتميز', 
              price: '799', 
              period: 'شهرياً',
              features: ['جميع ميزات البرو', 'مدرب شخصي (4 جلسات)', 'خطة تغذية', 'خدمة المناشف', 'حجز بأولوية'],
              recommended: false
            }
          ].map((plan, idx) => (
            <div key={idx} className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg ${plan.recommended ? 'border-2 border-red-600' : 'border border-gray-200 dark:border-gray-700'}`}>
              {plan.recommended && (
                <div className="bg-red-600 text-white text-center py-2 rounded-lg mb-6">
                  الأكثر شعبية
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400"> درهم/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setFormData({...formData, plan: plan.name.toLowerCase()})}
                className={`w-full py-4 rounded-lg font-bold transition-all ${
                  plan.recommended 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-red-600 hover:text-white'
                }`}
              >
                {plan.recommended ? 'ابدأ الآن' : 'اختر الخطة'}
              </button>
            </div>
          ))}
        </div>
        
        {/* Signup Form */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">سجل الآن</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">الاسم الأول</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">اسم العائلة</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all"
            >
              أكمل التسجيل
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Footer
  const renderFooter = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ق</span>
              </div>
              <div>
                <div className="text-xl font-bold">قوة اللياقة</div>
                <div className="text-gray-400 text-sm">تميز منذ 2010</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              أكثر من مجرد نادي رياضي. مجتمع من المتحمسين لللياقة البدنية.
            </p>
            <div className="flex space-x-4">
              {['📘', '📷', '🐦', '📺'].map((icon, idx) => (
                <button key={idx} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {['الرئيسية', 'من نحن', 'الخدمات', 'المدربون', 'المعرض', 'اتصل بنا'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-red-400 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">ساعات العمل</h4>
            <ul className="space-y-3 text-gray-400">
              <li>الأحد - الخميس: 6 ص - 10 م</li>
              <li>الجمعة - السبت: 7 ص - 8 م</li>
              <li>دخول الأعضاء: 24/7</li>
              <li>العطل الرسمية: 8 ص - 6 م</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">النشرة الإخبارية</h4>
            <p className="text-gray-400 mb-4">اشترك للحصول على أحدث العروض والنصائح</p>
            <div className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-gray-800 rounded-l-lg focus:outline-none"
              />
              <button className="px-6 bg-red-600 rounded-r-lg hover:bg-red-700 transition-colors">
                اشترك
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} قوة اللياقة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );

  // Page Content
  const renderPageContent = () => {
    switch(currentPage) {
      case 'about': return renderAboutPage();
      case 'services': return renderServicesPage();
      case 'trainers': return renderTrainersPage();
      case 'gallery': return renderGalleryPage();
      case 'contact': return renderContactPage();
      case 'join': return renderJoinPage();
      default: return renderHomePage();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {renderNavigation()}
      <main className="pt-16">
        {renderPageContent()}
      </main>
      {renderFooter()}
    </div>
  );
};

export default GymWebsite;