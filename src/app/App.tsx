import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import atamekenLogo from "../public/atameken.png";
import gerbLogo from "../public/gerb.png";
import greenMini from "@/public/greenmini.svg";
import { translations, type Lang } from "@/app/i18n";
import {
  Target,
  Users,
  Building2,
  GraduationCap,
  FileCheck,
  FileText,
  Handshake,
  ChevronRight,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = translations[lang];

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "ru" || stored === "kz" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="relative z-10">
        <Header
          lang={lang}
          onLangChange={setLang}
          labels={{
            langLabel: t.langLabel,
            themeLabel: t.themeLabel,
            headerTitle: t.headerTitle,
            headerSubtitle: t.headerSubtitle,
            navAbout: t.navAbout,
            navGoals: t.navGoals,
            navActivities: t.navActivities,
            navPartnership: t.navPartnership,
            navContacts: t.navContacts,
          }}
        />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
          <img
            src={greenMini}
            alt=""
            aria-hidden="true"
            className="opacity-45 dark:opacity-15 absolute top-20 right-0 w-48 sm:w-96 h-48 sm:h-96 rotate-45"
          />
          <img
            src={greenMini}
            alt=""
            aria-hidden="true"
            className="opacity-35 dark:opacity-15 absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cafe3c] text-black text-sm mb-6">
                  <CheckCircle2 size={16} className="text-black" />
                  <span>{t.heroBadge}</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  {t.heroTitle}
                </h1>
                <div className="text-lg text-muted-foreground leading-relaxed mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <p>{t.heroAccredited}</p>
                  </div>
                  <div className="space-y-3 text-base">
                    <div className="flex px-2 items-center gap-5">
                      <img
                        src={atamekenLogo}
                        alt={t.heroAccreditedAtameken}
                        className="h-10 w-10 object-contain"
                        loading="lazy"
                      />
                      <span>{t.heroAccreditedAtameken}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={gerbLogo}
                        alt={t.heroAccreditedMinistry}
                        className="h-14 w-14 object-contain"
                        loading="lazy"
                      />
                      <span>{t.heroAccreditedMinistry}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contacts" className="px-8 py-4 rounded-lg bg-[#cafe3c] text-black hover:bg-[#b8ee2c] transition-colors text-center">
                    {t.ctaContact}
                  </a>
                  <a href="#about" className="px-8 py-4 rounded-lg border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors text-center">
                    {t.ctaLearn}
                  </a>
                </div>
              </div>

              <div className="relative lg:pt-8"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#cafe3c] rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Building2 size={40} className="text-black" />
                </div>
                <h3 className="text-4xl font-bold mb-2">100+</h3>
                <p className="text-background/70">{t.stats1}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#cafe3c] rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Users size={40} className="text-black" />
                </div>
                <h3 className="text-4xl font-bold mb-2">500+</h3>
                <p className="text-background/70">{t.stats2}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-[#cafe3c] rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap size={40} className="text-black" />
                </div>
                <h3 className="text-4xl font-bold mb-2">1000+</h3>
                <p className="text-background/70">{t.stats3}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-16 h-1 bg-[#cafe3c] mb-6"></div>
                <h2 className="text-4xl font-bold text-foreground mb-6">{t.aboutTitle}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.aboutText1}
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.aboutText2}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <span>{t.heroAccredited}</span>
                  <img
                    src={atamekenLogo}
                    alt={t.heroAccreditedAtameken}
                    className="inline-block h-12 w-12 object-contain"
                    loading="lazy"
                  />
                  <img
                    src={gerbLogo}
                    alt={t.heroAccreditedMinistry}
                    className="inline-block h-15 w-15 object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-6 border-2 border-border hover:border-[#cafe3c] transition-colors rounded-lg">
                    <CheckCircle2 className="text-[#9ccf2a] mb-3" size={32} />
                    <p className="text-sm font-semibold">{t.aboutBadge1}</p>
                  </div>
                  <div className="p-6 border-2 border-border hover:border-[#cafe3c] transition-colors rounded-lg">
                    <CheckCircle2 className="text-[#9ccf2a] mb-3" size={32} />
                    <p className="text-sm font-semibold">{t.aboutBadge2}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute -top-8 right-0 w-24 sm:w-32 h-24 sm:h-32"
                />
                <div className="relative bg-neutral-100 p-12 rounded-lg mt-8 mr-8 text-black">
                  <h3 className="text-2xl font-bold mb-6">{t.aboutForWhom}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0" />
                      <span>{t.aboutForWhom1}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0" />
                      <span>{t.aboutForWhom2}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0" />
                      <span>{t.aboutForWhom3}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0" />
                      <span>{t.aboutForWhom4}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="flex-shrink-0" />
                      <span>{t.aboutForWhom5}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-16 h-1 bg-[#cafe3c] mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t.goalsTitle}</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {t.goalsIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 group-hover:opacity-20 transition-opacity w-16 sm:w-24 h-16 sm:h-24"
                />
                <Target className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.goal1Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.goal1Text}
                </p>
              </div>

              <div className="bg-background p-8 rounded-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 group-hover:opacity-20 transition-opacity w-16 sm:w-24 h-16 sm:h-24"
                />
                <FileCheck className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.goal2Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.goal2Text}
                </p>
              </div>

              <div className="bg-background p-8 rounded-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 group-hover:opacity-20 transition-opacity w-16 sm:w-24 h-16 sm:h-24"
                />
                <Users className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.goal3Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.goal3Text}
                </p>
              </div>

              <div className="bg-background p-8 rounded-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 group-hover:opacity-20 transition-opacity w-16 sm:w-24 h-16 sm:h-24"
                />
                <FileText className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.goal4Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.goal4Text}
                </p>
              </div>

              <div className="bg-background p-8 rounded-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 group-hover:opacity-20 transition-opacity w-16 sm:w-24 h-16 sm:h-24"
                />
                <GraduationCap className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.goal5Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.goal5Text}
                </p>
              </div>

              <div className="bg-background p-8 rounded-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 group-hover:opacity-20 transition-opacity w-16 sm:w-24 h-16 sm:h-24"
                />
                <Handshake className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.goal6Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.goal6Text}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16 relative z-10">
              <div className="w-16 h-1 bg-[#cafe3c] mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t.activitiesTitle}</h2>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="border-l-4 border-[#cafe3c] pl-8 py-6 hover:bg-muted transition-colors">
                <h3 className="text-xl font-bold mb-3">{t.activity1Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.activity1Text}
                </p>
              </div>

              <div className="border-l-4 border-[#cafe3c] pl-8 py-6 hover:bg-muted transition-colors">
                <h3 className="text-xl font-bold mb-3">{t.activity2Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.activity2Text}
                </p>
              </div>

              <div className="border-l-4 border-[#cafe3c] pl-8 py-6 hover:bg-muted transition-colors">
                <h3 className="text-xl font-bold mb-3">{t.activity3Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.activity3Text}
                </p>
              </div>

              <div className="border-l-4 border-[#cafe3c] pl-8 py-6 hover:bg-muted transition-colors">
                <h3 className="text-xl font-bold mb-3">{t.activity4Title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.activity4Text}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Center Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted to-background relative overflow-hidden">
          <img
            src={greenMini}
            alt=""
            aria-hidden="true"
            className="opacity-45 dark:opacity-15 absolute top-0 right-0 rotate-45 w-40 sm:w-64 h-40 sm:h-64"
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-background p-12 rounded-lg relative">
                  <div className="absolute top-0 left-0 w-4 h-full bg-[#cafe3c]"></div>
                  <GraduationCap className="text-[#9ccf2a] mb-6" size={48} />
                  <h3 className="text-2xl font-bold mb-4">{t.eduBlockTitle}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {t.eduBlockText}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                      <span className="text-muted-foreground">{t.eduBullet1}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                      <span className="text-muted-foreground">{t.eduBullet2}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                      <span className="text-muted-foreground">{t.eduBullet3}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-16 h-1 bg-[#cafe3c] mb-6"></div>
                <h2 className="text-4xl font-bold text-foreground mb-6">{t.eduTitle}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t.eduText}
                </p>
                <div className="p-6 rounded-lg border-2 border-[#cafe3c] text-foreground">
                  <p className="font-semibold">
                    {t.eduNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Licensing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background relative overflow-hidden">
          <img
            src={greenMini}
            alt=""
            aria-hidden="true"
            className="absolute top-3 right-2 opacity-45 dark:opacity-55 w-24 sm:w-36 h-24 sm:h-36"
          />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-1 bg-[#cafe3c] mb-6"></div>
                <h2 className="text-4xl font-bold mb-6">{t.licenseTitle}</h2>
                <p className="text-background/70 mb-6 leading-relaxed">
                  {t.licenseText1}
                </p>
                <p className="text-background/70 mb-8 leading-relaxed">
                  {t.licenseText2}
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#cafe3c] rounded-lg flex-shrink-0 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-black" />
                    </div>
                    <span className="text-background/70">{t.licenseBullet1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#cafe3c] rounded-lg flex-shrink-0 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-black" />
                    </div>
                    <span className="text-background/70">{t.licenseBullet2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#cafe3c] rounded-lg flex-shrink-0 flex items-center justify-center">
                      <CheckCircle2 size={20} className="text-black" />
                    </div>
                    <span className="text-background/70">{t.licenseBullet3}</span>
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="bg-background p-12 rounded-lg relative">
                  <FileCheck className="text-[#9ccf2a] mb-6" size={48} />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{t.docsTitle}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t.docsText}
                  </p>
                  <a href="#contacts" className="inline-block px-6 py-3 rounded-lg bg-[#cafe3c] text-black hover:bg-[#b8ee2c] transition-colors">
                    {t.docsCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section id="partnership" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-16 h-1 bg-[#cafe3c] mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t.partnershipTitle}</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {t.partnershipIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-muted p-8 rounded-lg relative overflow-hidden">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-65 dark:opacity-15 absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32"
                />
                <Handshake className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.partnershipOpenTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipOpen1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipOpen2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipOpen3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipOpen4}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-8 rounded-lg relative overflow-hidden">
                <img
                  src={greenMini}
                  alt=""
                  aria-hidden="true"
                  className="opacity-65 dark:opacity-15 absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32"
                />
                <Building2 className="text-[#9ccf2a] mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{t.partnershipGovTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipGov1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipGov2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="text-[#9ccf2a] mt-1 flex-shrink-0" size={20} />
                    <span>{t.partnershipGov3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacts" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted to-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-16 h-1 bg-[#cafe3c] mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t.contactsTitle}</h2>
              <p className="text-muted-foreground">
                {t.contactsIntro}
              </p>
            </div>

            <div className="bg-background p-12 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#cafe3c]"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6">{t.formTitle}</h3>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        {t.formOrgLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border-2 border-border focus:border-[#cafe3c] focus:outline-none transition-colors rounded-lg"
                        placeholder={t.formOrgPlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        {t.formEmailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border-2 border-border focus:border-[#cafe3c] focus:outline-none transition-colors rounded-lg"
                        placeholder={t.formEmailPlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        {t.formPhoneLabel}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 border-2 border-border focus:border-[#cafe3c] focus:outline-none transition-colors rounded-lg"
                        placeholder={t.formPhonePlaceholder}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">
                        {t.formMsgLabel}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-border focus:border-[#cafe3c] focus:outline-none transition-colors resize-none rounded-lg"
                        placeholder={t.formMsgPlaceholder}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-8 py-4 rounded-lg bg-[#cafe3c] text-black hover:bg-[#b8ee2c] transition-colors font-semibold"
                    >
                      {t.formSubmit}
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6">{t.contactInfoTitle}</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#cafe3c] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 size={24} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contactAddressTitle}</h4>
                        <p className="text-muted-foreground">{t.contactAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#cafe3c] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={24} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contactPhoneTitle}</h4>
                        <p className="text-muted-foreground">+7 (700) 000-00-00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#cafe3c] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={24} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contactEmailTitle}</h4>
                        <p className="text-muted-foreground">info@adkk.kz</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 rounded-lg border-2 border-[#cafe3c] text-foreground">
                    <p className="font-semibold mb-2">{t.infoTitle}</p>
                    <p className="text-sm">{t.infoText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer
          labels={{
            headerTitle: t.headerTitle,
            headerSubtitle: t.headerSubtitle,
            footerLinksTitle: t.footerLinksTitle,
            footerAbout: t.footerAbout,
            footerAboutText: t.footerAboutText,
            footerGoals: t.footerGoals,
            footerActivities: t.footerActivities,
            footerPartnership: t.footerPartnership,
            footerContacts: t.footerContacts,
            contactAddress: t.contactAddress,
            footerCopyright: t.footerCopyright,
            footerPrivacy: t.footerPrivacy,
            footerDocs: t.footerDocs,
          }}
        />
      </div>
    </div>
  );
}
