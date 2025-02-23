import React, { useState, useEffect } from 'react';
import { Home, Moon, Sun, Zap, Shield, Brain, ChevronRight, Mail, Phone, MapPin, Menu, X } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check visibility of sections for animations
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight * 0.7;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        setIsVisible(prev => ({
          ...prev,
          [section.id]: scrollPosition > sectionTop
        }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon className="h-8 w-8 text-purple-600 animate-pulse" />
            <span className="text-2xl font-bold text-gray-800">LunaSync</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
          </div>
          <button className="hidden md:block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white`}>
          <div className="px-4 py-2 space-y-4">
            <a href="#features" className="block text-gray-600 hover:text-purple-600 transition-colors py-2">Features</a>
            <a href="#pricing" className="block text-gray-600 hover:text-purple-600 transition-colors py-2">Pricing</a>
            <a href="#contact" className="block text-gray-600 hover:text-purple-600 transition-colors py-2">Contact</a>
            <button className="w-full bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Your Home, <span className="text-purple-600 animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">Intelligently</span> Connected
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up">
            LunaSync learns your lifestyle and automatically adjusts your home's environment for perfect comfort, security, and energy efficiency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Start Free Trial <ChevronRight className="ml-2 h-5 w-5 animate-bounce" />
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80"
            alt="Smart Home Dashboard"
            className="rounded-xl shadow-2xl mx-auto max-w-4xl w-full transform hover:scale-[1.02] transition-transform duration-500 animate-fade-in"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 bg-white transition-opacity duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Intelligent Features</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description: "Adapts to your routines and preferences automatically for a truly personalized experience."
              },
              {
                icon: Zap,
                title: "Energy Optimization",
                description: "Smart algorithms reduce energy consumption while maintaining optimal comfort levels."
              },
              {
                icon: Shield,
                title: "Advanced Security",
                description: "24/7 monitoring with intelligent threat detection and instant notifications."
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-6 rounded-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                  <feature.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 bg-gray-50 transition-opacity duration-1000 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '29',
                features: ['Basic AI automation', '5 smart devices', 'Energy monitoring', 'Mobile app access']
              },
              {
                name: 'Professional',
                price: '79',
                features: ['Advanced AI learning', 'Unlimited devices', 'Energy optimization', 'Priority support']
              },
              {
                name: 'Enterprise',
                price: '199',
                features: ['Custom AI models', 'API access', 'Dedicated support', 'Custom integrations']
              }
            ].map((plan, index) => (
              <div 
                key={plan.name}
                className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-lg text-gray-500">/mo</span></div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-purple-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 bg-white transition-opacity duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center group">
                  <Mail className="h-6 w-6 text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-purple-600 transition-colors">contact@lunasync.com</span>
                </div>
                <div className="flex items-center group">
                  <Phone className="h-6 w-6 text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-purple-600 transition-colors">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center group">
                  <MapPin className="h-6 w-6 text-purple-600 mr-4 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-purple-600 transition-colors">123 Innovation Drive, Tech City, TC 12345</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 transform hover:scale-105 transition-transform duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none transition-all duration-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0 transform hover:scale-105 transition-transform">
              <Moon className="h-8 w-8 text-purple-400 animate-pulse" />
              <span className="text-2xl font-bold">LunaSync</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-6">
              <a href="#" className="hover:text-purple-400 transition-colors transform hover:scale-105">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors transform hover:scale-105">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors transform hover:scale-105">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © {new Date().getFullYear()} LunaSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;