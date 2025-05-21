import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  LineChart,
  Brain,
  Clock,
  BarChart2,
  CheckCircle2,
  TrendingUp,
  Users,
  Globe,
  Award,
  ChevronRight,
  Star,
} from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section with Animation */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-[#32AE4C] mb-2 flex items-center justify-center gap-2">
                  {stat.value}
                  {stat.trend && (
                    <TrendingUp className="h-5 w-5 text-[#32AE4C]" />
                  )}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section with Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#32AE4C] font-semibold mb-2 block">AI-Powered Platform</span>
            <h2 className="text-4xl font-bold mb-4">Intelligent Financial Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Leverage advanced AI to gain deeper insights into your financial data and make smarter decisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4 pt-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-[#32AE4C]" />
                </div>
                <h3 className="text-xl font-semibold">Smart Analysis</h3>
                <p className="text-gray-600">AI-driven insights into spending patterns and financial trends</p>
                <div className="pt-4">
                  <Link href="/features/ai-analysis" className="text-[#32AE4C] flex items-center gap-2 hover:gap-3 transition-all">
                    Learn more <ChevronRight className="h-4 w-4 text-[#32AE4C]" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4 pt-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-[#32AE4C]" />
                </div>
                <h3 className="text-xl font-semibold">Predictive Analytics</h3>
                <p className="text-gray-600">Forecast future financial scenarios and plan accordingly</p>
                <div className="pt-4">
                  <Link href="/features/analytics" className="text-[#32AE4C] flex items-center gap-2 hover:gap-3 transition-all">
                    Learn more <ChevronRight className="h-4 w-4 text-[#32AE4C]" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4 pt-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#32AE4C]" />
                </div>
                <h3 className="text-xl font-semibold">Risk Assessment</h3>
                <p className="text-gray-600">Identify potential financial risks and get proactive alerts</p>
                <div className="pt-4">
                  <Link href="/features/risk" className="text-[#32AE4C] flex items-center gap-2 hover:gap-3 transition-all">
                    Learn more <ChevronRight className="h-4 w-4 text-[#32AE4C]" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="space-y-4 pt-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[#32AE4C]" />
                </div>
                <h3 className="text-xl font-semibold">Smart Automation</h3>
                <p className="text-gray-600">Automate routine financial tasks and save time</p>
                <div className="pt-4">
                  <Link href="/features/automation" className="text-[#32AE4C] flex items-center gap-2 hover:gap-3 transition-all">
                    Learn more <ChevronRight className="h-4 w-4 text-[#32AE4C]" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Elements */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-green-50 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="text-[#32AE4C] font-semibold mb-2 block">Comprehensive Features</span>
            <h2 className="text-4xl font-bold mb-4">Everything you need to manage your finances</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive tools and features to help you take control of your financial future
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="space-y-4 pt-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    {React.cloneElement(feature.icon, { className: "h-6 w-6 text-[#32AE4C]" })}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <ul className="space-y-2 pt-4">
                    {feature.benefits?.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-[#32AE4C]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Analytics Preview with Interactive Demo */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#32AE4C] font-semibold mb-2 block">Live Analytics</span>
              <h2 className="text-4xl font-bold mb-6">Real-time Financial Analytics</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <Clock className="h-6 w-6 text-[#32AE4C]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Live Monitoring</h3>
                    <p className="text-gray-600">Track your financial metrics in real-time with instant updates</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <BarChart2 className="h-6 w-6 text-[#32AE4C]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Interactive Dashboards</h3>
                    <p className="text-gray-600">Customizable views of your most important financial data</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <Sparkles className="h-6 w-6 text-[#32AE4C]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
                    <p className="text-gray-600">AI-powered recommendations and trend analysis</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-[#32AE4C] hover:bg-green-600 text-white">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#32AE4C]" />
              </div>
              <div className="text-4xl font-bold text-[#32AE4C] mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-[#32AE4C]" />
              </div>
              <div className="text-4xl font-bold text-[#32AE4C] mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#32AE4C]" />
              </div>
              <div className="text-4xl font-bold text-[#32AE4C] mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Enhanced Cards */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#32AE4C] font-semibold mb-2 block">Testimonials</span>
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied users who have transformed their financial management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-[#32AE4C]" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#32AE4C] to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Financial Management?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of users who are already managing their finances
            smarter with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-[#32AE4C] hover:bg-green-50 px-8"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 text-[#32AE4C]" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-green-500 px-8"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-green-100 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
