"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useRef, useState, ReactNode } from "react";
import { Code2, Video, Calendar, ArrowRight, ShieldCheck, Sparkles, Terminal, ChevronLeft, ChevronRight, UserPlus, LogIn } from "lucide-react";
import { useTheme } from "next-themes";

// Custom component for scroll reveal animations
function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
      }`}
    >
      {children}
    </div>
  );
}

// Custom 3D Tilt Card component
function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const maxTilt = 10;
    const tiltX = (0.5 - x) * maxTilt * 2;
    const tiltY = (y - 0.5) * maxTilt * 2;

    setTransform(`perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const { openSignUp, openSignIn } = useClerk();
  const [email, setEmail] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isPinkTheme = mounted && (theme === "pink" || resolvedTheme === "pink");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      openSignUp({ initialValues: { emailAddress: email } });
    }
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-accent/30 overflow-x-hidden relative">

      {/* SECTION 1: HERO HOME */}
      <section className="home-layout grid grid-cols-1 lg:grid-cols-[45%_50%] gap-12 place-items-center bg-gradient-to-b from-background via-muted/20 to-background py-24 px-6 md:px-20 overflow-hidden border-b border-border/30">
        
        {/* DESCRIPTION SIDE */}
        <div className="description z-10 text-left w-full max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/70 text-primary text-xs font-semibold mb-8 tracking-wider shadow-sm backdrop-blur-sm">
            <Sparkles className="size-3 text-accent animate-pulse" />
            LIVE CODING & INTERVIEWS
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight text-foreground">
            <span className="text-primary">
              Grow Professionally
            </span>{" "}
            with the Best
          </h1>

          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-8">
            In a world filled with opportunities, having a mentor or structured interview code evaluation can make all the difference. Explore how CodeSync helps you unlock your technical potential.
          </p>

          {/* EMAIL SUBMIT FORM (Prefills Clerk Sign-Up) */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full" autoComplete="off">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="email address"
              placeholder="Enter your email to get started"
              required
              className="px-4 py-3.5 bg-card/85 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-xl text-foreground text-base flex-1 shadow-sm backdrop-blur-sm transition-all placeholder:text-muted-foreground/85"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
            >
              <span>Get Started</span>
              <ArrowRight className="size-4" />
            </button>
          </form>

          {/* QUICK LOGIN ACCESS */}
          <div className="flex gap-4 mt-6 text-sm text-muted-foreground/90">
            <span>Already registered?</span>
            <button
              onClick={() => openSignIn()}
              className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
            >
              <LogIn className="size-4" /> Login here
            </button>
          </div>
        </div>

        {/* MOSAIC COLOR GRAPHIC CONTAINER */}
        <div className="users-color-container grid grid-cols-4 gap-4 max-w-lg w-full aspect-square p-2">
          
          <span className="item bg-accent rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[50%] shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]" style={{ animationDelay: "0.2s" }} />
          
          <img
            className="item rounded-tl-[50%] rounded-tr-[50%] object-cover size-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]"
            style={{ animationDelay: "0.4s" }}
            src={isPinkTheme ? "https://i.pinimg.com/736x/26/53/6a/26536ae3e96d932c39c01822fd0df432.jpg" : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/274f29ce-0d3f-4ac2-a2aa-f9b7bd188b2a"}
            alt="Candidate avatar"
          />
          
          <span className="item bg-secondary rounded-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]" style={{ animationDelay: "0.6s" }} />
          
          <img
            className="item rounded-bl-[50%] object-cover size-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]"
            style={{ animationDelay: "0.8s" }}
            src={isPinkTheme ? "https://i.pinimg.com/736x/33/91/34/3391347b646db808bed41a97c9cc66ec.jpg" : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8a14493-3d9f-4b9b-b93a-56d0bc7243e9"}
            alt="Interviewer avatar"
          />
 
          <img
            className="item rounded-full object-cover size-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]"
            style={{ animationDelay: "2.0s" }}
            src={isPinkTheme ? "https://i.pinimg.com/736x/71/16/b0/7116b0e94146f6b497998e9bdafaa949.jpg" : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/03e51e1e-9750-45a5-b75e-a1e341d4562a"}
            alt="Developer avatar"
          />
          
          <span className="item bg-muted rounded-tl-[50%] rounded-bl-[50%] rounded-br-[50%] shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]" style={{ animationDelay: "2.2s" }} />
          
          <img
            className="item rounded-tl-[50%] object-cover size-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]"
            style={{ animationDelay: "2.4s" }}
            src={isPinkTheme ? "https://i.pinimg.com/736x/ee/e2/3c/eee23ccd5ade872642aa882530fa4d1e.jpg" : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5eb50f89-3e5a-480e-860c-8d40d3ba9ffe"}
            alt="Tech lead avatar"
          />
          
          <span className={`item rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards] ${isPinkTheme ? "bg-accent" : "bg-chart-5"}`} style={{ animationDelay: "1.0s" }} />
 
          <span className="item bg-accent rounded-tr-[50%] rounded-br-[50%] shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]" style={{ animationDelay: "1.8s" }} />
          
          <img
            className="item rounded-tl-[50%] rounded-bl-[50%] object-cover size-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]"
            style={{ animationDelay: "1.6s" }}
            src={isPinkTheme ? "https://i.pinimg.com/736x/bb/14/e5/bb14e5582d2d8eb2380a57fa71ce5a61.jpg" : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/86c71a79-2efe-4567-8665-b1e5a1fd9735"}
            alt="Engineer avatar"
          />
          
          <span className={`item rounded-tl-[50%] rounded-tr-[50%] rounded-bl-[50%] shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards] ${isPinkTheme ? "bg-accent" : "bg-primary"}`} style={{ animationDelay: "1.4s" }} />
          
          <img
            className="item rounded-tl-[50%] rounded-tr-[50%] rounded-br-[50%] object-cover size-full shadow-md opacity-0 animate-[fadeIn_0.5s_linear_1_forwards]"
            style={{ animationDelay: "1.2s" }}
            src={isPinkTheme ? "https://i.pinimg.com/736x/b8/34/a7/b834a75dfb4777a76e5506892cc063e7.jpg" : "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/97ef9643-5202-41aa-80f0-ceeabccdd099"}
            alt="Senior engineer avatar"
          />
        </div>
      </section>

      {/* SECTION 2: SLIDER CARD CONTAINER */}
      <section className="card-container-layout flex flex-col justify-center items-center gap-10 w-full py-24 px-6 md:px-12 bg-muted/30 border-b border-border/30">
        
        <ScrollReveal className="text-center max-w-2xl">
          <h2 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">Platform Overview</h2>
          <p className="text-3xl sm:text-5xl font-black text-foreground">Everything you need to sync & succeed</p>
        </ScrollReveal>

        {/* CAROUSEL WRAPPER */}
        <div className="relative w-full max-w-6xl mt-6">
          
          {/* SLIDER VIEWPORT */}
          <div
            ref={sliderRef}
            className="slider flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-6 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* CARD 1 */}
            <div className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TiltCard className="card-outer bg-gradient-glow p-[2px] rounded-[18px] shadow-lg transition-transform duration-300">
                <div className="content bg-card/95 backdrop-blur-md rounded-[16px] p-6 h-full flex flex-col justify-between items-center text-center">
                  <img
                    className="w-full h-44 object-cover rounded-xl shadow-sm mb-6"
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/10088b1a-c0aa-42a9-8dff-1a692eb597d6"
                    alt="Collaboration illustration"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3">Real-Time Collaboration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    Work side-by-side with candidates in an interactive coding sandbox. Write, execute, and compile code instantly in a shared multiplayer workspace.
                  </p>
                  <button onClick={() => openSignUp()} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    <span>Learn More</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* CARD 2 */}
            <div className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TiltCard className="card-outer bg-gradient-glow p-[2px] rounded-[18px] shadow-lg transition-transform duration-300">
                <div className="content bg-card/95 backdrop-blur-md rounded-[16px] p-6 h-full flex flex-col justify-between items-center text-center">
                  <img
                    className="w-full h-44 object-cover rounded-xl shadow-sm mb-6"
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/69fb8584-66a0-4ecd-bae5-dd00015a1ad5"
                    alt="Video calling illustration"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3">HD Video Calling</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    Crystal-clear audio and video streams powered by Stream-io. Communicate seamlessly with candidates without leaving your editor.
                  </p>
                  <button onClick={() => openSignUp()} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    <span>Learn More</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* CARD 3 */}
            <div className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TiltCard className="card-outer bg-gradient-glow p-[2px] rounded-[18px] shadow-lg transition-transform duration-300">
                <div className="content bg-card/95 backdrop-blur-md rounded-[16px] p-6 h-full flex flex-col justify-between items-center text-center">
                  <img
                    className="w-full h-44 object-cover rounded-xl shadow-sm mb-6"
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d49bdb0f-c717-4063-abe4-869cb3bc8b4e"
                    alt="Compiler illustration"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3">Compiler Sandbox</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    Secure and isolated code execution environment. Run and test algorithmic solutions across major programming languages instantly.
                  </p>
                  <button onClick={() => openSignUp()} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    <span>Learn More</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* CARD 4 */}
            <div className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TiltCard className="card-outer bg-gradient-glow p-[2px] rounded-[18px] shadow-lg transition-transform duration-300">
                <div className="content bg-card/95 backdrop-blur-md rounded-[16px] p-6 h-full flex flex-col justify-between items-center text-center">
                  <img
                    className="w-full h-44 object-cover rounded-xl shadow-sm mb-6"
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fd1d57e3-de8a-438a-9e9a-952ae65a776e"
                    alt="Scheduling illustration"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3">Smart Scheduling</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    Automate calendars and interview bookings. Set availability, sync calendar links, and invite external candidates hassle-free.
                  </p>
                  <button onClick={() => openSignUp()} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    <span>Learn More</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* CARD 5 */}
            <div className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TiltCard className="card-outer bg-gradient-glow p-[2px] rounded-[18px] shadow-lg transition-transform duration-300">
                <div className="content bg-card/95 backdrop-blur-md rounded-[16px] p-6 h-full flex flex-col justify-between items-center text-center">
                  <img
                    className="w-full h-44 object-cover rounded-xl shadow-sm mb-6"
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/331836c0-0d28-48d1-a1c2-b5f5db87fe17"
                    alt="Insights illustration"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3">Expert Insights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    Securely record interview sessions and candidate progress. Review coding submissions and replay calls to align candidate evaluation.
                  </p>
                  <button onClick={() => openSignUp()} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    <span>Learn More</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TiltCard>
            </div>

            {/* CARD 6 */}
            <div className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <TiltCard className="card-outer bg-gradient-glow p-[2px] rounded-[18px] shadow-lg transition-transform duration-300">
                <div className="content bg-card/95 backdrop-blur-md rounded-[16px] p-6 h-full flex flex-col justify-between items-center text-center">
                  <img
                    className="w-full h-44 object-cover rounded-xl shadow-sm mb-6"
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2d022825-47f9-4e6a-bc97-14b47dc3242f"
                    alt="Feedback illustration"
                  />
                  <h3 className="text-xl font-bold text-foreground mb-3">Feedback Reports</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    Equip interviewers to score performances, write comments, and compile comprehensive review reports to align interview feedback.
                  </p>
                  <button onClick={() => openSignUp()} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                    <span>Learn More</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </TiltCard>
            </div>

          </div>

          {/* CONTROL ARROWS */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => scrollSlider("left")}
              className="flex justify-center items-center bg-primary hover:bg-primary/90 text-primary-foreground p-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous cards"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={() => scrollSlider("right")}
              className="flex justify-center items-center bg-primary hover:bg-primary/90 text-primary-foreground p-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next cards"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: BOTTOM TRUST */}
      <section className="py-24 px-6 bg-gradient-to-t from-muted/30 to-background">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-6">Ready to Build Your Engineering Dream?</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Start structuring your technical screening today. Sync calendars, invite candidates, and evaluate code with our collaborative playground.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => openSignUp()} 
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                <UserPlus className="size-4" /> Sign Up Free
              </button>
              <button 
                onClick={() => openSignIn()} 
                className="flex items-center justify-center gap-2 border border-border/60 bg-card/60 hover:bg-card text-foreground font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>
          </ScrollReveal>

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/80">
            <ShieldCheck className="size-4 text-primary" />
            <span>Secured with enterprise-grade authentication and data encryption.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12 bg-card/30 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-secondary/40 text-primary flex items-center justify-center font-mono font-bold text-xs shadow-inner">CS</div>
            <span>© {new Date().getFullYear()} CodeSync. All rights reserved.</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
