import { Mail, Phone, MapPin } from "lucide-react";
import whiteLogo from "@/public/whitefull.svg";

type FooterProps = {
  labels: {
    headerTitle: string;
    headerSubtitle: string;
    footerLinksTitle: string;
    footerAbout: string;
    footerAboutText: string;
    footerGoals: string;
    footerActivities: string;
    footerPartnership: string;
    footerContacts: string;
    contactAddress: string;
    footerCopyright: string;
    footerPrivacy: string;
    footerDocs: string;
  };
};

export function Footer({ labels }: FooterProps) {
  return (
    <footer className="bg-[#121a10] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img
                src={whiteLogo}
                alt={labels.headerTitle}
                className="h-15 w-30 object-contain"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {labels.footerAboutText}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6">{labels.footerLinksTitle}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  {labels.footerAbout}
                </a>
              </li>
              <li>
                <a
                  href="#goals"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  {labels.footerGoals}
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  {labels.footerActivities}
                </a>
              </li>
              <li>
                <a
                  href="#partnership"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  {labels.footerPartnership}
                </a>
              </li>
              <li>
                <a
                  href="#contacts"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  {labels.footerContacts}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">{labels.footerContacts}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#9ccf2a] mt-1 flex-shrink-0" />
                <p className="text-sm text-white/70">
                  {labels.contactAddress}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#9ccf2a] mt-1 flex-shrink-0" />
                <a
                  href="mailto:info@adkk.kz"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  info@adkk.kz
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#9ccf2a] mt-1 flex-shrink-0" />
                <a
                  href="tel:+77000000000"
                  className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
                >
                  +7 (700) 000-00-00
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              {labels.footerCopyright}
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
              >
                {labels.footerPrivacy}
              </a>
              <a
                href="#"
                className="text-sm text-white/70 hover:text-[#9ccf2a] transition-colors"
              >
                {labels.footerDocs}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
