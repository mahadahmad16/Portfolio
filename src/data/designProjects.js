import splashScreen from "../assets/Life OS App Design/01 Splash.png";
import loginScreen from "../assets/Life OS App Design/01 Login.png";
import signupScreen from "../assets/Life OS App Design/01 signup.png";
import onboardingOne from "../assets/Life OS App Design/02 Onboarding 1.png";
import onboardingTwo from "../assets/Life OS App Design/03 Onboarding 2.png";
import onboardingThree from "../assets/Life OS App Design/04 Onboarding 3.png";
import taskList from "../assets/Life OS App Design/07 Task List.png";
import taskDetails from "../assets/Life OS App Design/08 Task Details.png";
import createTask from "../assets/Life OS App Design/09 Create Task.png";
import homeDashboard from "../assets/Life OS App Design/Life OS - Home Dashboard.png";
import containerOne from "../assets/Life OS App Design/Container.png";
import containerTwo from "../assets/Life OS App Design/Container-1.png";
import sectionOne from "../assets/Life OS App Design/Section.png";
import sectionTwo from "../assets/Life OS App Design/Section-1.png";
import sectionThree from "../assets/Life OS App Design/Section-2.png";
import atelierFragnance from "../assets/Landing Pages/AtelierFragrances.jpg";
import digitalAgency from "../assets/Landing Pages/DigitalAgency.jpg";
import restaurantLanding from "../assets/Landing Pages/Restaurant.jpg";
import digitalDashboard from "../assets/Landing Pages/CurrencyDashboard.png";
import travelAgencyCover from "../assets/TravelAgency/..png";
import travelAgencyScreen1 from "../assets/TravelAgency/.-1.png";
import travelAgencyScreen2 from "../assets/TravelAgency/.-2.png";
import coffeeShopCover1 from "../assets/CoffeeShop/OnBoarding_01.png";
import coffeeShopCover2 from "../assets/CoffeeShop/OnBoarding_02.png";
import coffeeShopCover3 from "../assets/CoffeeShop/OnBoarding_03.png";
import coffeShopHome from "../assets/CoffeeShop/Home_01.png";

export const DESIGN_PROJECTS = [
  {
    id: "life-os",
    name: "Life OS",
    description:
      "A mobile productivity app concept for managing tasks, habits, goals, and daily schedules in one focused workspace.",
    tools: ["Figma", "UI/UX Design", "Mobile App"],
    cover: splashScreen,
    coverAlt: "Life OS splash screen design",
    screenshots: [
      { id: "onboarding-1", title: "Onboarding: Welcome", image: onboardingOne },
      { id: "onboarding-2", title: "Onboarding: Planning", image: onboardingTwo },
      { id: "onboarding-3", title: "Onboarding: Habits", image: onboardingThree },
      { id: "login", title: "Login", image: loginScreen },
      { id: "signup", title: "Sign up", image: signupScreen },
      { id: "homeDashboard", title: "Home dashboard", image: homeDashboard },
      { id: "task-list", title: "Task list", image: taskList },
      { id: "task-details", title: "Task details", image: taskDetails },
      { id: "create-task", title: "Create task", image: createTask },
      { id: "home-dashboard", title: "Home dashboard", image: homeDashboard },
      { id: "container-1", title: "Life OS app screen", image: containerOne },
      { id: "container-2", title: "Life OS app screen", image: containerTwo },
      { id: "section-1", title: "Life OS app screen", image: sectionOne },
      { id: "section-2", title: "Life OS app screen", image: sectionTwo },
      { id: "section-3", title: "Life OS app screen", image: sectionThree },
    ],
  },
  {
    id: "LandingPages",
    name: "Landing Pages",
    description:
      "A collection of landing page designs created for various projects, showcasing different styles and layouts.",
    tools: ["Figma", "UI/UX Design", "Web Design"],
    cover: atelierFragnance,
    coverAlt: "Atelier Fragnance landing page design",
    screenshots: [
      { id: "digital-agency", title: "Digital Agency", image: digitalAgency },
      { id: "restaurant-landing", title: "Restaurant", image: restaurantLanding },
      { id: "digital-dashboard", title: "Digital Dashboard", image: digitalDashboard },
    ],
  },

  {
    id: "Travel-Agency",
    name: "Travel Agency",
    description:
      "A travel agency website design concept, focusing on user experience and visual appeal to attract potential travelers.",
    tools: ["Figma", "UI/UX Design", "App Design"],
    cover: travelAgencyCover,
    coverAlt: "Travel Agency landing page design",
    screenshots: [
      { id: "travel-agency-2", title: "Travel Agency", image: travelAgencyScreen2 },
      { id: "travel-agency-1", title: "Travel Agency", image: travelAgencyScreen1 },
    ],
  },

  {
    id: "Coffee-Shop",
    name: "Coffee Shop",
    description:
      "A coffee shop app design concept, providing a seamless and visually appealing experience for coffee enthusiasts.",
    tools: ["Figma", "UI/UX Design", "Mobile App"],
    cover: coffeeShopCover1,
    coverAlt: "Coffee Shop app design",
    screenshots: [
      { id: "coffee-shop-2", title: "Coffee Shop Onboarding 2", image: coffeeShopCover2 },
      { id: "coffee-shop-3", title: "Coffee Shop Onboarding 3", image: coffeeShopCover3 },
      { id: "coffee-shop-home", title: "Coffee Shop Home", image: coffeShopHome },
      { id: "coffee-shop-home", title: "Coffee Shop Home", image: coffeShopHome },
    ],
  }
];
