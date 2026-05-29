import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
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
  Phone,
  Instagram
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [formFieldErrors, setFormFieldErrors] = useState({
    orgName: false,
    email: false,
    phone: false,
    message: false,
  });
  const t = translations[lang];
  const activityItems = [
    { id: "a1", title: t.activity1Title, text: t.activity1Text, icon: Handshake },
    { id: "a2", title: t.activity2Title, text: t.activity2Text, icon: FileCheck },
    { id: "a3", title: t.activity3Title, text: t.activity3Text, icon: Users },
    { id: "a4", title: t.activity4Title, text: t.activity4Text, icon: GraduationCap },
  ];
  const faqItems = [
    { id: "faq-1", question: t.faqQ1, answer: t.faqA1 },
    { id: "faq-2", question: t.faqQ2, answer: t.faqA2 },
    { id: "faq-3", question: t.faqQ3, answer: t.faqA3 },
    { id: "faq-4", question: t.faqQ4, answer: t.faqA4 },
  ];
  const activityBgVariants = [
    "bg-gradient-to-br from-[#cafe3c]/35 via-[#e7ff9a]/10 to-background",
    "bg-gradient-to-br from-[#9ccf2a]/30 via-[#cafe3c]/10 to-background",
    "bg-gradient-to-br from-[#7ad7ff]/25 via-[#cafe3c]/10 to-background",
    "bg-gradient-to-br from-[#ffd86b]/25 via-[#cafe3c]/10 to-background",
  ];
  const activityOffsetHigh = 0;
  const activityOffsetLow = 140;
  const activityOverlapStep = 0;

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "ru" || stored === "kz" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("sending");
    setFormError(null);
    setFormFieldErrors({ orgName: false, email: false, phone: false, message: false });

    const validationErrors: string[] = [];
    const orgNameValid = formData.orgName.trim().length >= 2;
    const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email.trim());
    const phoneValid = formData.phone.trim().length >= 6;
    const messageValid = true;

    if (!orgNameValid) {
      validationErrors.push(`- ${t.formOrgLabel}`);
    }
    if (!emailValid) {
      validationErrors.push(`- ${t.formEmailLabel}`);
    }
    if (!phoneValid) {
      validationErrors.push(`- ${t.formPhoneLabel}`);
    }
    // message is optional
    if (validationErrors.length > 0) {
      setFormStatus("error");
      setFormError(`Заполните обязательные поля:\n${validationErrors.join("\n")}`);
      setFormFieldErrors({
        orgName: !orgNameValid,
        email: !emailValid,
        phone: !phoneValid,
        message: false,
      });
      return;
    }

    try {
      const endpoint = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName: formData.orgName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send request");
      }

      setFormStatus("success");
      setFormData({ orgName: "", email: "", phone: "", message: "" });
    } catch (error) {
      setFormStatus("error");
      setFormError(error instanceof Error ? error.message : "Failed to send request");
    }
  }

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
                      <div className="flex flex-col">
                        <span>{t.heroAccreditedMinistry}</span>
                        <span>{t.heroAccreditedMinistry2}</span>
                      </div>
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
        <section id="activities" className="pt-12 pb-[30px] px-4 sm:px-6 lg:px-8 bg-background -mt-10 lg:-mt-16 min-h-[520px] lg:min-h-[720px]">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16 relative z-10">
              <div className="w-16 h-1 bg-[#cafe3c] mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t.activitiesTitle}</h2>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-6 lg:gap-0 mt-20 lg:mt-24">
              {activityItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`activity-d-${item.id}`}
                    className="relative flex items-center justify-center translate-y-0 lg:translate-y-[var(--offset)] ml-0 lg:ml-[var(--overlap)]"
                    style={{
                      ["--offset" as never]:
                        index % 2 === 0
                          ? `${activityOffsetHigh}px`
                          : `${activityOffsetLow}px`,
                      ["--overlap" as never]:
                        index === 0 ? "0px" : `-${activityOverlapStep}px`,
                      zIndex: activityItems.length - index,
                    }}
                  >
                    <div
                      className={[
                        "absolute w-20 h-20 rounded-full bg-[#cafe3c]/20 blur-2xl",
                        index % 2 === 0 ? "-top-6 -left-2" : "-bottom-6 -right-2",
                      ].join(" ")}
                    />
                    <div
                      className={[
                        "relative w-[220px] sm:w-[240px] lg:w-[260px] aspect-square shrink-0",
                        "rotate-45 rounded-[22px] border-2",
                        "shadow-[0_22px_40px_-30px_rgba(0,0,0,0.65)]",
                        index % 2 === 0 ? "border-[#cafe3c]/60 bg-background" : "border-[#9ccf2a]/60 bg-muted",
                      ].join(" ")}
                    >
                      <div className="absolute inset-0 rounded-[20px] border border-[#cafe3c]/30"></div>
                      <div className="absolute inset-0 -rotate-45 flex flex-col items-center justify-center px-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-[#cafe3c] flex items-center justify-center text-black mb-3">
                          <Icon size={20} />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wide">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-snug mt-2">{item.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
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

        {/* FAQ Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-1 bg-[#cafe3c] mx-auto mb-6"></div>
              <h2 className="text-4xl font-bold text-foreground mb-4">{t.faqTitle}</h2>
              <p className="text-muted-foreground">{t.faqIntro}</p>
            </div>

            <div className="p-6 sm:p-8">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="rounded-lg bg-muted/40 px-4">
                    <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        {t.formOrgLabel} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.orgName}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, orgName: event.target.value }))
                        }
                        className={[
                          "w-full px-4 py-3 border-2 focus:outline-none transition-colors rounded-lg",
                          formFieldErrors.orgName ? "border-red-500" : "border-border",
                          "focus:border-[#cafe3c]",
                        ].join(" ")}
                        placeholder={t.formOrgPlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        {t.formEmailLabel} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className={[
                          "w-full px-4 py-3 border-2 focus:outline-none transition-colors rounded-lg",
                          formFieldErrors.email ? "border-red-500" : "border-border",
                          "focus:border-[#cafe3c]",
                        ].join(" ")}
                        placeholder={t.formEmailPlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        {t.formPhoneLabel} <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, phone: event.target.value }))
                        }
                        className={[
                          "w-full px-4 py-3 border-2 focus:outline-none transition-colors rounded-lg",
                          formFieldErrors.phone ? "border-red-500" : "border-border",
                          "focus:border-[#cafe3c]",
                        ].join(" ")}
                        placeholder={t.formPhonePlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">
                        {t.formMsgLabel}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(event) =>
                          setFormData((prev) => ({ ...prev, message: event.target.value }))
                        }
                        className="w-full px-4 py-3 border-2 border-border focus:border-[#cafe3c] focus:outline-none transition-colors resize-none rounded-lg"
                        placeholder={t.formMsgPlaceholder}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full px-8 py-4 rounded-lg bg-[#cafe3c] text-black hover:bg-[#b8ee2c] transition-colors font-semibold"
                    >
                      {formStatus === "sending" ? "Отправка..." : t.formSubmit}
                    </button>
                    {formStatus === "success" && (
                      <p className="text-sm text-green-600">Заявка отправлена. Мы свяжемся с вами.</p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-sm text-red-600 whitespace-pre-line">
                        {formError || "Ошибка отправки"}
                      </p>
                    )}
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
                        <p className="text-muted-foreground">info@adk.kz</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#cafe3c] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Instagram size={24} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{t.contactInstagramTitle}</h4>
                        <a
                          href="https://www.instagram.com/adk_kazakhstan"
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-[#9ccf2a] transition-colors underline underline-offset-4"
                        >
                          {t.contactInstagramHandle}
                        </a>
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
            contactInstagramTitle: t.contactInstagramTitle,
            contactInstagramHandle: t.contactInstagramHandle,
            footerCopyright: t.footerCopyright,
            footerPrivacy: t.footerPrivacy,
            footerDocs: t.footerDocs,
          }}
        />
      </div>
    </div>
  );
}
