import Location from "../assets/location.svg";
import Phone from "../assets/phone.svg";
import Email from "../assets/mail.svg";

import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaClock,
  FaRocket,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-700 text-white w-full flex flex-col items-center pt-16 pb-8 px-4 relative mt-20 shadow-xl">
      {/* Decorative bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 opacity-30" />

      {/* Brand */}
      <div className="w-full max-w-6xl mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent">
          HireMe
        </h2>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
          Revolutionizing workforce management through AI-powered solutions,
          seamless integration, and predictive analytics.
        </p>
      </div>

      {/* Main Links */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Company */}
        <FooterColumn title="Company" icon={<FaRocket />}>
          <FooterLink href="/#about" text="About Us" />
          <FooterLink href="/#vision" text="Our Vision" />
          <FooterLink href="/#partners" text="Partners" />
          <FooterLink href="#" text="Careers" />
          <FooterLink href="#" text="Press & Media" />
        </FooterColumn>

        {/* Services */}
        <FooterColumn title="Services" icon={<FaUsers />}>
          <FooterLink href="#" text="Employee Management" />
          <FooterLink href="#" text="Workforce Analytics" />
          <FooterLink href="#" text="HirePay Payroll" />
          <FooterLink href="#" text="Performance Tracking" />
          <FooterLink href="#" text="Compliance Management" />
        </FooterColumn>

        {/* Resources */}
        <FooterColumn title="Resources" icon={<FaChartLine />}>
          <FooterLink href="#" text="Help Center" />
          <FooterLink href="#" text="Documentation" />
          <FooterLink href="#" text="API Reference" />
          <FooterLink href="#" text="Tutorials" />
          <FooterLink href="#" text="Webinars" />
        </FooterColumn>

        {/* Legal */}
        <FooterColumn title="Support & Legal" icon={<FaShieldAlt />}>
          <FooterLink href="/contact" text="Contact Support" />
          <FooterLink href="#" text="Terms & Conditions" />
          <FooterLink href="#" text="Privacy Policy" />
          <FooterLink href="#" text="Cookie Policy" />
          <FooterLink href="#" text="Security" />
        </FooterColumn>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-blue-100 mb-6 text-center">
            Get In Touch
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address */}
            <ContactCard
              icon={Location}
              title="Head Office"
              lines={[
                "Hire Me HQ, Sector 5",
                "Salt Lake, Kolkata - 700091",
                "West Bengal, India",
              ]}
            />

            {/* Phone */}
            <ContactCard
              icon={Phone}
              title="Phone Support"
              lines={["+91 90000 12345", "+91 80000 67890"]}
              footer={
                <div className="flex items-center gap-1 mt-2 text-xs text-blue-300">
                  <FaClock />
                  Mon - Sat, 10:00 AM - 7:00 PM
                </div>
              }
            />

            {/* Email */}
            <ContactCard
              icon={Email}
              title="Email Support"
              lines={[
                "info@hiremeplatform.com",
                "support@hiremeplatform.com",
                "partnerships@hiremeplatform.com",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full max-w-6xl border-t border-white/20 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-center lg:text-left">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} HireMe Platform. All rights reserved.
          </p>
          <p className="text-xs text-blue-300">
            Empowering businesses since 2024.
          </p>
        </div>

        {/* Social */}
        <div className="flex gap-4">
          <SocialIcon icon={<FaFacebook />} />
          <SocialIcon icon={<FaTwitter />} />
          <SocialIcon icon={<FaLinkedin />} />
          <SocialIcon icon={<FaInstagram />} />
          <SocialIcon icon={<FaYoutube />} />
          <SocialIcon icon={<FaGithub />} />
        </div>

        <div className="text-xs text-blue-300 text-center lg:text-right">
          Version 2.1.0 <br />
          Made with ❤️ in India
        </div>
      </div>
    </footer>
  );
}

/* ---------- Reusable Components ---------- */

function FooterColumn({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold text-blue-100 flex items-center gap-2">
        <span className="text-blue-300">{icon}</span>
        {title}
      </h4>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium hover:text-blue-200 transition-all flex items-center"
    >
      <span className="w-2 h-2 bg-blue-300 rounded-full mr-3" />
      {text}
    </a>
  );
}

function ContactCard({
  icon,
  title,
  lines,
  footer,
}: {
  icon: string;
  title: string;
  lines: string[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
      <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mb-3">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
      <h4 className="font-semibold text-blue-100 mb-2">{title}</h4>
      {lines.map((line, i) => (
        <p key={i} className="text-sm text-blue-200">
          {line}
        </p>
      ))}
      {footer}
    </div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-600 transition hover:scale-110 cursor-pointer">
      {icon}
    </div>
  );
}
