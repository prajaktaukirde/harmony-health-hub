import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { doctors, departments } from "@/utils/mockData";
import {
  Heart, Shield, Clock, Phone, Star, ChevronRight,
  Stethoscope, Brain, Bone, Baby, Activity, Microscope,
} from "lucide-react";

const services = [
  { icon: Heart, label: "Cardiology", desc: "Heart care & diagnostics" },
  { icon: Brain, label: "Neurology", desc: "Brain & nervous system" },
  { icon: Bone, label: "Orthopedics", desc: "Bones, joints & muscles" },
  { icon: Baby, label: "Pediatrics", desc: "Children's healthcare" },
  { icon: Activity, label: "General Medicine", desc: "Primary care services" },
  { icon: Microscope, label: "Pathology", desc: "Lab tests & reports" },
];

const stats = [
  { label: "Patients Served", value: "50,000+" },
  { label: "Expert Doctors", value: "120+" },
  { label: "Departments", value: "25+" },
  { label: "Years of Excellence", value: "30+" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">MediCare HMS</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#doctors" className="hover:text-foreground transition-colors">Doctors</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient py-24 px-4">
        <div className="container">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              ✦ Trusted Healthcare Provider
            </Badge>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Your Health,<br />Our Priority
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Access world-class healthcare services with ease. Book appointments, 
              manage your records, and connect with expert doctors — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
                <Link to="/register">Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
                <Link to="/login">Patient Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border py-10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-accent-foreground">Our Services</Badge>
            <h2 className="text-3xl font-bold mb-3">Comprehensive Healthcare</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We offer a wide range of medical specialties to serve all your healthcare needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, label, desc }) => (
              <Card key={label} className="p-6 card-hover cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section id="doctors" className="py-20 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-accent-foreground">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-3">Meet Our Expert Doctors</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Highly qualified specialists dedicated to your wellbeing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doc) => (
              <Card key={doc.id} className="p-6 card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {doc.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-hospital-amber font-medium">
                    <Star className="w-4 h-4 fill-current" /> {doc.rating}
                  </span>
                  <span className="text-muted-foreground">{doc.experience} yrs exp.</span>
                  <Badge
                    variant={doc.available ? "default" : "secondary"}
                    className={doc.available ? "bg-hospital-green/10 text-hospital-green border-hospital-green/20" : ""}
                  >
                    {doc.available ? "Available" : "Busy"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/login">View All Doctors <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-20 px-4">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure & Private", desc: "Your health data is encrypted and completely confidential." },
              { icon: Clock, title: "24/7 Support", desc: "Our emergency services and support team are always available." },
              { icon: Phone, title: "Easy Access", desc: "Book appointments and access records from any device, anywhere." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16 px-4 text-center">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8">Join thousands of patients who trust MediCare for their healthcare needs.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t border-border py-10 px-4">
        <div className="container text-center text-muted-foreground text-sm">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">MediCare HMS</span>
          </div>
          <p>© 2025 MediCare Hospital Management System. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
