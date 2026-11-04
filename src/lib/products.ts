import type { LucideIcon } from "lucide-react";
import {
  Car,
  HeartPulse,
  Shield,
  Activity,
  Plane,
  Home,
  GraduationCap,
  Briefcase,
  Flower2,
  Users,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

export type Field = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  help?: string;
};

export type Product = {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** Optional real photo, e.g. "/products/motor.jpg" (file in /public). Replaces the illustration when set. */
  image?: string;
  tagline: string;
  description: string;
  /** Specific Britam products/plans in this category, from the agent's supplied services & products guide. */
  includes?: { name: string; text: string }[];
  /** Extra regulatory/risk notice shown on the product page. */
  notice?: string;
  /** General considerations. Exact benefits, limits and exclusions are defined only in Britam's policy wording. */
  highlights: string[];
  suitableFor: string[];
  needed: string[];
  /** Questions that help the advisor prepare a quotation request. No premiums are ever shown. */
  fields: Field[];
  /**
   * Britam-authorised online purchase URL for this product, if one has been approved
   * for this agent. Set NEXT_PUBLIC_PURCHASE_URL_<SLUG_UPPERCASE> (dashes → underscores).
   */
  purchaseUrl?: string;
};

// Static references so Next.js can inline them into client bundles.
const purchaseUrls: Record<string, string | undefined> = {
  "motor-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_MOTOR_INSURANCE,
  "medical-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_MEDICAL_INSURANCE,
  "life-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_LIFE_INSURANCE,
  "personal-accident-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_PERSONAL_ACCIDENT_INSURANCE,
  "travel-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_TRAVEL_INSURANCE,
  "home-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_HOME_INSURANCE,
  "education-and-investment-plans": process.env.NEXT_PUBLIC_PURCHASE_URL_EDUCATION_AND_INVESTMENT_PLANS,
  "business-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_BUSINESS_INSURANCE,
  "last-expense-cover": process.env.NEXT_PUBLIC_PURCHASE_URL_LAST_EXPENSE_COVER,
  "group-insurance": process.env.NEXT_PUBLIC_PURCHASE_URL_GROUP_INSURANCE,
  "retirement-and-pension": process.env.NEXT_PUBLIC_PURCHASE_URL_RETIREMENT_AND_PENSION,
  "investments-and-trust": process.env.NEXT_PUBLIC_PURCHASE_URL_INVESTMENTS_AND_TRUST,
};
const envUrl = (slug: string) => purchaseUrls[slug] || undefined;

const base: Omit<Product, "purchaseUrl">[] = [
  {
    slug: "motor-insurance",
    name: "Motor Insurance",
    icon: Car,
    tagline: "Cover for your vehicle and your liability on the road.",
    description:
      "Motor insurance protects you financially if your vehicle is damaged, stolen, or involved in an accident that affects other people or property. In Kenya, third-party cover is a legal requirement for vehicles on the road.",
    highlights: [
      "Options range from third-party only to broader cover for your own vehicle",
      "Private and commercial vehicles are treated differently",
      "Cover terms and exclusions are set out in the policy wording",
    ],
    suitableFor: ["Private car owners", "Business and commercial vehicle owners", "Anyone renewing or switching a motor policy"],
    needed: ["Vehicle registration number", "Logbook or proof of ownership", "ID and KRA PIN", "Previous policy details, if any"],
    fields: [
      { name: "vehicleReg", label: "Vehicle registration", type: "text", placeholder: "e.g. KXX 000X", required: true },
      { name: "vehicleMake", label: "Make and model", type: "text", placeholder: "e.g. Toyota Axio", required: true },
      { name: "vehicleYear", label: "Year of manufacture", type: "number", placeholder: "e.g. 2018" },
      { name: "vehicleUse", label: "Use of vehicle", type: "select", options: ["Private", "Commercial", "Not sure"], required: true },
      { name: "coverType", label: "Cover you are interested in", type: "select", options: ["Third party only", "Comprehensive", "Not sure, advise me"], required: true },
    ],
  },
  {
    slug: "medical-insurance",
    name: "Medical Insurance",
    icon: HeartPulse,
    tagline: "Help with the cost of healthcare for you and your family.",
    description:
      "Medical insurance helps pay for treatment so that a health emergency does not become a financial one. Plans differ in who they cover, which hospitals you can use and what is included.",
    highlights: [
      "Individual, family and group arrangements may be available",
      "Inpatient and outpatient needs are considered separately",
      "Waiting periods and exclusions apply and are stated in the policy wording",
    ],
    suitableFor: ["Individuals", "Families", "Employers looking at staff cover"],
    needed: ["ID or birth certificates of those to be covered", "Dates of birth", "Relevant medical history for the application"],
    fields: [
      { name: "whoCovered", label: "Who needs cover?", type: "select", options: ["Just me", "Me and spouse", "Family", "Parents"], required: true },
      { name: "people", label: "Number of people", type: "number", placeholder: "e.g. 4", required: true },
      { name: "ages", label: "Ages of those to be covered", type: "text", placeholder: "e.g. 34, 32, 6, 3" },
      { name: "priority", label: "Main priority", type: "select", options: ["Inpatient (hospital stays)", "Inpatient and outpatient", "Not sure, advise me"] },
    ],
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    icon: Shield,
    tagline: "Financial security for the people who depend on you.",
    description:
      "Life insurance is designed to provide a financial benefit to your dependants if you pass away, helping them keep up with expenses such as living costs, debts and school fees.",
    highlights: [
      "Designed around the needs of dependants",
      "Different structures exist, from protection-only to plans with savings elements",
      "Eligibility and benefits depend on the specific plan and underwriting",
    ],
    suitableFor: ["Parents and guardians", "Breadwinners", "People with loans or dependants"],
    needed: ["ID and KRA PIN", "Date of birth", "Beneficiary details", "Health and lifestyle information for underwriting"],
    fields: [
      { name: "dob", label: "Date of birth", type: "text", placeholder: "DD/MM/YYYY", required: true },
      { name: "dependants", label: "Number of dependants", type: "number", placeholder: "e.g. 3" },
      { name: "goal", label: "What matters most?", type: "select", options: ["Family protection", "Protection plus savings", "Covering a loan", "Not sure, advise me"], required: true },
    ],
  },
  {
    slug: "personal-accident-insurance",
    name: "Personal Accident Insurance",
    icon: Activity,
    tagline: "Support if an accident affects your health or income.",
    description:
      "Personal accident cover is intended to provide a benefit if you are injured in an accident. It is often chosen as an affordable add-on to other cover.",
    highlights: [
      "Focused on accident-related events",
      "Available for individuals and groups",
      "Definitions and exclusions are set out in the policy wording",
    ],
    suitableFor: ["Active individuals", "Drivers and frequent travellers", "Employers and organisations"],
    needed: ["ID and KRA PIN", "Occupation", "Names of those to be covered"],
    fields: [
      { name: "occupation", label: "Occupation", type: "text", required: true },
      { name: "people", label: "Number of people to cover", type: "number", placeholder: "e.g. 1" },
    ],
  },
  {
    slug: "travel-insurance",
    name: "Travel Insurance",
    icon: Plane,
    tagline: "Be prepared for the unexpected when you travel.",
    description:
      "Travel insurance can help with certain costs that arise while you are away, depending on the plan. Many visa applications also require proof of cover.",
    highlights: [
      "Plans vary by destination and trip length",
      "May be needed for some visa applications",
      "Covered events and limits are defined in the policy wording",
    ],
    suitableFor: ["Holiday and business travellers", "Students going abroad", "Visa applicants"],
    needed: ["Passport details", "Travel dates", "Destination country"],
    fields: [
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "departDate", label: "Departure date", type: "text", placeholder: "DD/MM/YYYY", required: true },
      { name: "returnDate", label: "Return date", type: "text", placeholder: "DD/MM/YYYY", required: true },
      { name: "travellers", label: "Number of travellers", type: "number", placeholder: "e.g. 2" },
    ],
  },
  {
    slug: "home-insurance",
    name: "Home Insurance",
    icon: Home,
    tagline: "Protect your home and what is inside it.",
    description:
      "Home insurance helps protect your property and belongings against specified risks, so that damage or loss does not lead to a heavy financial burden.",
    highlights: [
      "Can relate to the building, its contents, or both",
      "Suitable for owners and, in some cases, tenants",
      "Insured risks and exclusions are set out in the policy wording",
    ],
    suitableFor: ["Home owners", "Landlords", "Tenants with valuable contents"],
    needed: ["Property location", "Type of building and construction", "List or estimate of contents to be covered"],
    fields: [
      { name: "propertyLocation", label: "Property location", type: "text", required: true },
      { name: "ownership", label: "You are the…", type: "select", options: ["Owner-occupier", "Landlord", "Tenant"], required: true },
      { name: "coverFor", label: "What to cover", type: "select", options: ["Building", "Contents", "Both", "Not sure, advise me"] },
    ],
  },
  {
    slug: "education-and-investment-plans",
    name: "Education & Savings Plans",
    icon: GraduationCap,
    tagline: "Plan ahead for school fees and long-term goals.",
    description:
      "Education and investment plans combine saving with protection to help you work towards future goals such as a child's education. Returns and benefits depend on the specific plan; none are guaranteed unless the plan states so.",
    highlights: [
      "Structured around a goal and a time horizon",
      "May include a protection element",
      "Investment-linked values can go down as well as up",
    ],
    suitableFor: ["Parents planning for school fees", "Long-term savers"],
    needed: ["ID and KRA PIN", "Your age and the child's age", "Target goal and timeframe"],
    fields: [
      { name: "goal", label: "Goal", type: "select", options: ["Child's education", "Long-term savings", "Retirement", "Not sure, advise me"], required: true },
      { name: "horizon", label: "Timeframe (years)", type: "number", placeholder: "e.g. 10" },
    ],
  },
  {
    slug: "business-insurance",
    name: "Business Insurance",
    icon: Briefcase,
    tagline: "Cover for the assets and risks of your business.",
    description:
      "Business insurance helps protect premises, stock, equipment and certain liabilities. The right mix depends on what your business does and where it operates.",
    highlights: [
      "Tailored to your type of business",
      "Can address property and liability risks",
      "Terms and exclusions are set out in the policy wording",
    ],
    suitableFor: ["Shop and office owners", "Small and medium enterprises", "Contractors and service businesses"],
    needed: ["Business name and registration details", "Nature of business", "Location and assets to be covered"],
    fields: [
      { name: "businessName", label: "Business name", type: "text", required: true },
      { name: "businessType", label: "Nature of business", type: "text", placeholder: "e.g. Retail shop", required: true },
      { name: "employees", label: "Number of employees", type: "number" },
    ],
  },
  {
    slug: "last-expense-cover",
    name: "Last Expense Cover",
    icon: Flower2,
    tagline: "Ease the financial burden on loved ones at a difficult time.",
    description:
      "Last expense (funeral) cover is intended to help your family meet funeral costs so they are not left to raise money at short notice.",
    highlights: [
      "Designed to help with funeral-related costs",
      "Can often be arranged for a family",
      "Eligibility, waiting periods and benefits are stated in the policy wording",
    ],
    suitableFor: ["Individuals", "Families", "Those supporting elderly parents"],
    needed: ["ID", "Dates of birth of those to be covered", "Beneficiary details"],
    fields: [
      { name: "whoCovered", label: "Who is to be covered?", type: "select", options: ["Just me", "Me and spouse", "Family", "Parents"], required: true },
      { name: "people", label: "Number of people", type: "number" },
    ],
  },
  {
    slug: "group-insurance",
    name: "Group Insurance",
    icon: Users,
    tagline: "Cover for employees, members or organisations.",
    description:
      "Group insurance lets an employer or organisation arrange cover, such as life or medical, for a group of people under one scheme.",
    highlights: [
      "Arranged by an employer or organisation",
      "Terms depend on group size and profile",
      "Scheme details are set out in the policy documents",
    ],
    suitableFor: ["Employers", "Saccos and associations", "Schools and institutions"],
    needed: ["Organisation details", "Number of members", "Type of cover required"],
    fields: [
      { name: "organisation", label: "Organisation", type: "text", required: true },
      { name: "members", label: "Number of members", type: "number", required: true },
      { name: "coverWanted", label: "Cover of interest", type: "select", options: ["Group life", "Group medical", "Group personal accident", "More than one / not sure"] },
    ],
  },
];

base.push(
  {
    slug: "retirement-and-pension",
    name: "Retirement & Pension",
    icon: PiggyBank,
    tagline: "Build a retirement income you can rely on.",
    description:
      "Retirement and pension solutions help individuals and employers set money aside over time and turn it into income later, under the applicable retirement-benefits rules.",
    highlights: [
      "Options for individuals, self-employed people and employers",
      "Both the saving phase and the post-retirement income phase are covered",
      "Scheme rules and retirement-benefits regulations apply",
    ],
    suitableFor: ["Employees and the self-employed", "Employers setting up a scheme", "People approaching retirement"],
    needed: ["ID and KRA PIN", "Date of birth", "Employer details, for employer schemes"],
    fields: [
      { name: "interest", label: "What are you looking for?", type: "select", options: ["Individual pension plan", "Employer / umbrella scheme", "Provident fund", "Income drawdown or annuity", "NSSF Tier II", "Not sure, advise me"], required: true },
      { name: "age", label: "Your age", type: "number", placeholder: "e.g. 35" },
    ],
  },
  {
    slug: "investments-and-trust",
    name: "Investments & Trust Services",
    icon: TrendingUp,
    tagline: "Grow wealth and plan for the people you will leave it to.",
    description:
      "Britam offers unit trusts and fixed-income options for investors with different goals and risk appetites, as well as trust services for setting aside and managing funds for beneficiaries.",
    highlights: [
      "Options range from short-term, lower-risk funds to long-term growth funds",
      "Trust services support planning for beneficiaries and wealth transfer",
      "Returns are not guaranteed and values can fluctuate",
    ],
    suitableFor: ["Investors with a clear goal and timeframe", "Families planning wealth transfer"],
    needed: ["ID and KRA PIN", "Your investment goal and timeframe", "Amount you are considering"],
    fields: [
      { name: "interest", label: "What are you looking for?", type: "select", options: ["Money market fund", "Bond / fixed income fund", "Balanced fund", "Equity fund", "USD fixed income fund", "Trust services", "Not sure, advise me"], required: true },
      { name: "horizon", label: "Timeframe (years)", type: "number", placeholder: "e.g. 5" },
    ],
    notice:
      "Investment values and returns can go down as well as up, and past performance is not a guarantee of future results. Please read the current fund documents and request a personalised illustration before deciding.",
  },
);

/** Specific plans per category, taken from Naomi's Britam Services & Products guide. */
const includesBySlug: Record<string, Product["includes"]> = {
  "life-insurance": [
    { name: "Whole Life Insurance", text: "Lifetime protection designed to support wealth preservation and provide a benefit to nominated beneficiaries. Optional benefits may include disability, critical illness and funeral expense cover." },
    { name: "Term & Family Protection", text: "Can help provide financial support to loved ones if the insured person dies during the cover period. Product features and underwriting apply." },
    { name: "Critical Illness & Income Support", text: "Selected plans provide benefits on diagnosis of specified illnesses or help support a family financially. Covered conditions and exclusions vary." },
  ],
  "last-expense-cover": [
    { name: "Last Expense / Funeral Cover", text: "Helps beneficiaries meet funeral-related expenses and reduces the immediate financial burden on a family." },
  ],
  "personal-accident-insurance": [
    { name: "Personal Accident", text: "Protection against specified accidental events, which may include accidental death, disability and medical expenses, depending on the plan." },
  ],
  "education-and-investment-plans": [
    { name: "Education Plans: Msingi Poa, Super E-Plus & Elimu Bora", text: "Structured plans to help prepare for future school fees. Choose a contribution pattern and term that suits the child's education timeline." },
    { name: "Nawiri", text: "A goal-oriented savings solution for young professionals and growing families, with life cover features subject to policy terms." },
    { name: "Akiba", text: "An endowment-style savings plan designed to build a fund over a selected term, with a maturity benefit and specified protection features." },
    { name: "Dhamana", text: "A life assurance savings product combining regular saving with life cover and stated guaranteed-return features for qualifying continuing policies." },
    { name: "Imarika Plus", text: "An insurance-linked wealth-growth solution for eligible individual investors, with lump-sum deposits and top-ups subject to product rules." },
  ],
  "medical-insurance": [
    { name: "Individual & Family Medical", text: "Depending on the selected plan, benefits may include inpatient, outpatient, dental, optical, maternity or other services." },
    { name: "Milele Health", text: "Options designed to support healthcare needs at different life stages. Benefits, limits, provider networks and eligibility depend on the chosen plan." },
    { name: "Other Health Solutions", text: "Britam also lists solutions such as Hospicash and Afya Tele. Benefit limits, waiting periods and exclusions apply." },
  ],
  "group-insurance": [
    { name: "Group Medical", text: "Employer and organisation medical schemes that can be tailored to eligible employee groups and their dependants." },
    { name: "Employer / Umbrella Pension Schemes", text: "Retirement benefit arrangements for employers and groups of employees. Scheme design depends on the employer's requirements." },
  ],
  "motor-insurance": [
    { name: "Private & commercial vehicles", text: "Cover options include comprehensive and third-party. Add-ons and excesses vary by policy." },
  ],
  "travel-insurance": [
    { name: "Travel Insurance", text: "Protection for eligible unexpected events while travelling, subject to destination, duration and policy terms." },
  ],
  "home-insurance": [
    { name: "Home & Property Insurance", text: "Options for homes, household contents, buildings and business property against specified insured risks." },
  ],
  "business-insurance": [
    { name: "Business covers", text: "May include fire and special perils, theft, money, goods in transit, marine, engineering, electronic equipment and liability covers." },
    { name: "Professional & Public Liability", text: "Selected liability covers help protect businesses and professionals against specified legal liabilities arising from their operations or services." },
    { name: "Agriculture Insurance", text: "Crop and livestock insurance options designed to help manage specified agricultural risks." },
  ],
  "retirement-and-pension": [
    { name: "Individual Pension Plan", text: "A personal retirement savings arrangement to build retirement benefits over time, including for self-employed individuals and employees." },
    { name: "Employer / Umbrella Pension Schemes", text: "Retirement benefit arrangements for employers and groups of employees." },
    { name: "Provident Funds", text: "Retirement savings arrangements that provide benefits according to scheme rules and applicable regulations." },
    { name: "Income Drawdown", text: "A post-retirement option that allows eligible members to draw income from accumulated retirement savings under the applicable rules." },
    { name: "Annuity", text: "Can convert eligible retirement savings into a regular income for life or a selected guaranteed period, depending on the option." },
    { name: "NSSF Tier II", text: "Employers may explore transferring eligible Tier II contributions to an approved retirement benefits arrangement, subject to regulatory requirements." },
  ],
  "investments-and-trust": [
    { name: "Money Market Fund", text: "A unit trust investing mainly in short-term, interest-bearing instruments. Returns are not guaranteed." },
    { name: "Bond Plus / Fixed Income Funds", text: "Funds investing primarily in government and corporate bonds. Values and returns can fluctuate." },
    { name: "Balanced Fund", text: "A diversified fund across asset classes such as fixed income and equities, generally for medium- to long-term goals." },
    { name: "Equity Fund", text: "Invests mainly in listed shares, for long-term capital growth while accepting higher market risk." },
    { name: "USD Fixed Income Fund", text: "A dollar-denominated fixed-income option for eligible investors. Currency and market risks apply." },
    { name: "Trust Services", text: "Britam Trust Services includes cash trust and family/private trust solutions for beneficiaries, managing assets and intergenerational wealth transfer." },
  ],
};

/**
 * PORTFOLIO CHECK: confirm each product is part of the agent's authorised Britam
 * portfolio. Remove any slug from this list that is not authorised and it disappears
 * from the whole site (cards, detail pages, forms, sitemap).
 */
const authorisedSlugs = base.map((p) => p.slug);

export const products: Product[] = base
  .filter((p) => authorisedSlugs.includes(p.slug))
  .map((p) => ({ ...p, image: `/products/${p.slug}.webp`, includes: includesBySlug[p.slug], purchaseUrl: envUrl(p.slug) }));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
