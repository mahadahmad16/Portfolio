import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);
const STORAGE_KEY = "portfolio-language";

const translations = {
  en: {
    title: "Portfolio - Mahad Ahmad",
    common: {
      languageSwitch: "Switch to Urdu", themeSwitch: "Choose color theme", openNavigation: "Open navigation menu", closeNavigation: "Close navigation menu", close: "Close", downloadResume: "Download Resume", liveDemo: "Live Demo", videoDemo: "Video Demo", github: "GitHub",
    },
    nav: { about: "About Me", qualifications: "Qualifications", skills: "My Skills", contact: "Contact", resume: "Resume", certificates: "Certificates", projects: "My Projects", games: "Games", snake: "Snake Game", ticTacToe: "Tic-Tac-Toe", rockPaperScissors: "Rock-Paper-Scissors" },
    splash: { welcome: "Welcome to my portfolio" },
    hero: { roles: ["MERN Stack Developer", "UI/UX Designer"], tagline: "I build modern web applications and intuitive digital experiences.", viewWork: "View My Work", contactMe: "Contact Me" },
    about: { eyebrow: "About", title: "A bit about me", bioOne: "I'm Mahad Ahmad, a BS Computer Science student at GIFT University, currently in my 7th semester. I enjoy working across the frontend stack — HTML, CSS, JavaScript, and React — alongside tools like Git & GitHub and Figma.", bioTwo: "My goal is to grow into a Frontend Developer who builds modern, thoughtful web applications, and I'm currently expanding into full-stack development as the next step in that journey." },
    contact: { eyebrow: "Get in touch", title: "Contact", description: "Reach out about internships, freelance work, or collaboration — I'll get back to you as soon as I can.", email: "Email", phone: "Phone", location: "Location", elsewhere: "Elsewhere" },
    skills: { eyebrow: "Skills", title: "My Skills", description: "Technologies and tools I work with, grouped by area.", frontend: "Frontend", backend: "Backend", database: "Database", tools: "Tools" },
    qualifications: {
      eyebrow: "Qualifications", title: "Education & Experience", description: "A quick look at where I've studied and worked so far.", education: "Education", experience: "Experience", marks: "Marks: {{value}}", cgpa: "Current CGPA: {{value}}",
      educationEntries: [
        { institution: "A+ School System, Gujranwala, Pakistan", degree: "Matriculation in Computer Science", duration: "2019–2021", marks: "936/1100" },
        { institution: "Punjab College, Gujranwala, Pakistan", degree: "Intermediate in Computer Science", duration: "2021–2023", marks: "715/1100" },
        { institution: "GIFT University, Gujranwala, Pakistan", degree: "BS Computer Science", duration: "2023–2027", cgpa: "3.17" },
      ],
      experienceEntries: [
        { role: "Frontend Developer Intern", company: "Web Era Solutions PK", duration: "6 Weeks", description: "Completed two development tasks, built professional-looking websites, and prepared weekly progress reports." },
        { role: "Frontend Developer Intern", company: "Progree", duration: "4 Weeks", description: "Completed three development tasks, built professional-looking responsive websites including a weather app." },
      ],
    },
    projects: {
      eyebrow: "Work", title: "My Projects", description: "A few things I've built recently.", preview: "{{name}} preview",
      quickbite: { description: "A Food Delivery Dashboard where users can browse restaurants, view menus, manage their cart, and place orders.", imageAlt: "Restaurant table with plated food" },
      fitmember: { description: "A frontend website for a gym reception where staff can register users and easily manage their subscriptions.", imageAlt: "Modern gym with fitness equipment" },
      alDhawAlWahaj: { description: "A website where users can easily explore different fan companies and their products and discover available fan products.", imageAlt: "Industrial fan and ventilation equipment" },
      codesync: { description: "A real-time collaborative code editor where users can write and edit code together in a shared environment.", imageAlt: "Laptop with code editor open" },
    },
    certificates: { eyebrow: "Recognition", title: "Certificates", description: "Certifications and project recognitions I've earned so far.", viewImage: "View larger image of {{title}}", closePreview: "Close certificate preview" },
    resume: { eyebrow: "Resume", title: "Resume", description: "View it below, or download a copy to keep.", frameTitle: "Mahad Ahmad's resume" },
    games: { eyebrow: "Just for fun", title: "Games", description: "A few small games I built alongside the portfolio.", choose: "Choose a game" },
    footer: { copyright: "© {{year}} Mahad Ahmad. Built with React." },
  },
  ur: {
    title: "پورٹ فولیو - مہاد احمد",
    common: { languageSwitch: "انگریزی میں تبدیل کریں", themeSwitch: "رنگ کا تھیم منتخب کریں", openNavigation: "نیویگیشن مینو کھولیں", closeNavigation: "نیویگیشن مینو بند کریں", close: "بند کریں", downloadResume: "ریزیومے ڈاؤن لوڈ کریں", liveDemo: "لائیو ڈیمو", videoDemo: "ویڈیو ڈیمو", github: "گٹ ہب" },
    nav: { about: "میرے بارے میں", qualifications: "تعلیمی و پیشہ ورانہ پس منظر", skills: "میری مہارتیں", contact: "رابطہ", resume: "ریزیومے", certificates: "سرٹیفکیٹس", projects: "میرے منصوبے", games: "گیمز", snake: "اسنیک گیم", ticTacToe: "ٹک ٹیک ٹو", rockPaperScissors: "راکٹ پیپر سیزرز" },
    splash: { welcome: "میرے پورٹ فولیو میں خوش آمدید" },
    hero: { roles: ["مرن اسٹیک ڈویلپر", "یو آئی / یو ایکس ڈیزائنر"], tagline: "میں جدید ویب ایپلی کیشنز اور آسان ڈیجیٹل تجربات تیار کرتا ہوں۔", viewWork: "میرا کام دیکھیں", contactMe: "رابطہ کریں" },
    about: { eyebrow: "تعارف", title: "میرے بارے میں کچھ باتیں", bioOne: "میں مہاد احمد ہوں، گفٹ یونیورسٹی میں بی ایس کمپیوٹر سائنس کا طالب علم ہوں اور اس وقت ساتویں سمسٹر میں ہوں۔ مجھے فرنٹ اینڈ اسٹیک — HTML، CSS، JavaScript اور React — کے ساتھ ساتھ Git، GitHub اور Figma جیسے ٹولز پر کام کرنا پسند ہے۔", bioTwo: "میرا مقصد ایک ایسا فرنٹ اینڈ ڈویلپر بننا ہے جو جدید اور سوچ سمجھ کر ویب ایپلی کیشنز بنائے۔ اسی سفر کے اگلے مرحلے کے طور پر میں فل اسٹیک ڈیویلپمنٹ بھی سیکھ رہا ہوں۔" },
    contact: { eyebrow: "رابطے میں رہیں", title: "رابطہ", description: "انٹرن شپ، فری لانس کام یا اشتراک کے لیے رابطہ کریں — میں جلد از جلد جواب دوں گا۔", email: "ای میل", phone: "فون", location: "مقام", elsewhere: "دیگر پلیٹ فارمز" },
    skills: { eyebrow: "مہارتیں", title: "میری مہارتیں", description: "وہ ٹیکنالوجیز اور ٹولز جن پر میں کام کرتا ہوں، شعبے کے لحاظ سے ترتیب دیے گئے ہیں۔", frontend: "فرنٹ اینڈ", backend: "بیک اینڈ", database: "ڈیٹابیس", tools: "ٹولز" },
    qualifications: {
      eyebrow: "قابلیتیں", title: "تعلیم اور تجربہ", description: "میری اب تک کی تعلیم اور کام کا ایک مختصر جائزہ۔", education: "تعلیم", experience: "تجربہ", marks: "نمبر: {{value}}", cgpa: "موجودہ سی جی پی اے: {{value}}",
      educationEntries: [
        { institution: "اے پلس اسکول سسٹم، گوجرانوالہ، پاکستان", degree: "کمپیوٹر سائنس میں میٹرک", duration: "۲۰۱۹–۲۰۲۱", marks: "936/1100" },
        { institution: "پنجاب کالج، گوجرانوالہ، پاکستان", degree: "کمپیوٹر سائنس میں انٹرمیڈیٹ", duration: "۲۰۲۱–۲۰۲۳", marks: "715/1100" },
        { institution: "گفٹ یونیورسٹی، گوجرانوالہ، پاکستان", degree: "بی ایس کمپیوٹر سائنس", duration: "۲۰۲۳–۲۰۲۷", cgpa: "3.17" },
      ],
      experienceEntries: [
        { role: "فرنٹ اینڈ ڈویلپر انٹرن", company: "ویب ایرا سلوشنز پی کے", duration: "۶ ہفتے", description: "دو ڈیویلپمنٹ ٹاسک مکمل کیے، پیشہ ورانہ ویب سائٹس بنائیں اور ہفتہ وار پیش رفت کی رپورٹس تیار کیں۔" },
        { role: "فرنٹ اینڈ ڈویلپر انٹرن", company: "پروگری", duration: "۴ ہفتے", description: "تین ڈیویلپمنٹ ٹاسک مکمل کیے اور موسم کی ایپ سمیت پیشہ ورانہ، ریسپانسیو ویب سائٹس بنائیں۔" },
      ],
    },
    projects: {
      eyebrow: "کام", title: "میرے منصوبے", description: "چند چیزیں جو میں نے حال ہی میں بنائی ہیں۔", preview: "{{name}} کا پیش نظارہ",
      quickbite: { description: "فوڈ ڈیلیوری ڈیش بورڈ جہاں صارف ریسٹورنٹس دیکھ سکتے، مینیو براؤز کر سکتے، کارٹ سنبھال سکتے اور آرڈر دے سکتے ہیں۔", imageAlt: "کھانے سے سجی ریسٹورنٹ کی میز" },
      fitmember: { description: "جم ریسپشن کے لیے ایک فرنٹ اینڈ ویب سائٹ جہاں عملہ صارفین کو رجسٹر اور ان کی سبسکرپشنز آسانی سے سنبھال سکتا ہے۔", imageAlt: "فٹنس آلات کے ساتھ جدید جم" },
      alDhawAlWahaj: { description: "ایسی ویب سائٹ جہاں صارف مختلف پنکھا کمپنیوں، ان کی مصنوعات اور دستیاب فین پروڈکٹس کو آسانی سے دیکھ سکتے ہیں۔", imageAlt: "صنعتی پنکھا اور وینٹیلیشن کا سامان" },
      codesync: { description: "حقیقی وقت کا باہمی کوڈ ایڈیٹر جہاں صارف مشترکہ ماحول میں مل کر کوڈ لکھ اور تبدیل کر سکتے ہیں۔", imageAlt: "کوڈ ایڈیٹر کھلا ہوا لیپ ٹاپ" },
    },
    certificates: { eyebrow: "اعزاز", title: "سرٹیفکیٹس", description: "وہ سرٹیفکیٹس اور منصوبوں کے اعزازات جو میں نے اب تک حاصل کیے ہیں۔", viewImage: "{{title}} کی بڑی تصویر دیکھیں", closePreview: "سرٹیفکیٹ کا پیش نظارہ بند کریں" },
    resume: { eyebrow: "ریزیومے", title: "ریزیومے", description: "نیچے دیکھیں یا اپنی کاپی ڈاؤن لوڈ کریں۔", frameTitle: "مہاد احمد کا ریزیومے" },
    games: { eyebrow: "تفریح کے لیے", title: "گیمز", description: "چند چھوٹی گیمز جو میں نے پورٹ فولیو کے ساتھ بنائی ہیں۔", choose: "گیم منتخب کریں" },
    footer: { copyright: "© {{year}} مہاد احمد۔ React کے ساتھ بنایا گیا۔" },
  },
};

function getValue(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) === "ur" ? "ur" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    document.title = translations[language].title;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const t = useCallback((path, values = {}) => {
    const value = getValue(translations[language], path) ?? getValue(translations.en, path) ?? path;
    if (typeof value !== "string") return value;
    return value.replace(/{{(\w+)}}/g, (_, key) => values[key] ?? "");
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t, isUrdu: language === "ur" }), [language, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
