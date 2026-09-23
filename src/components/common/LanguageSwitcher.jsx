import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { isUrdu, setLanguage, t } = useLanguage();

  return (
    <button type="button" className="language-switcher" role="switch" aria-checked={isUrdu} aria-label={t("common.languageSwitch")} onClick={() => setLanguage(isUrdu ? "en" : "ur")}>
      <span className="language-switcher__label">EN</span>
      <span className="language-switcher__label" lang="ur">اردو</span>
      <span className="language-switcher__thumb" aria-hidden="true" />
    </button>
  );
}
