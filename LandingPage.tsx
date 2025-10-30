import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 text-white overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-[10%] w-72 h-72 bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div>
        <div className="absolute bottom-24 left-[5%] w-48 h-48 bg-white/10 rounded-full backdrop-blur-sm animate-pulse delay-1000"></div>
        
        <div className="max-w-[1440px] mx-auto px-5 py-32 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              Welcome to TicketFlow
            </h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              The ultimate solution for seamless ticket management. 
              Track, manage, and resolve tickets with ease and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="!bg-transparent !hover:bg-transparent border-white text-white hover:bg-white/10 font-semibold px-8">
                <Link to="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wavy SVG Background */}
        <svg className="absolute bottom-0 left-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Choose TicketFlow?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor all your tickets in one centralized dashboard with real-time updates.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quick Resolution</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamline your workflow and resolve tickets faster than ever before.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Insightful Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed insights into ticket trends and team performance.
              </p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with industry-standard security measures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-5">
          <Card className="p-16 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of teams already using TicketFlow to manage their tickets efficiently.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
              <Link to="/auth/signup">Create Free Account</Link>
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;