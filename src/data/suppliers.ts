export type OrderLevel = "Primary" | "Secondary" | "Adhoc";

export type SupplierCategory =
  | "Chemicals & PPPs"
  | "Fertilisers"
  | "Grass Seed"
  | "Top Dressing"
  | "Machinery & Equipment"
  | "Waste Management"
  | "Fleet & Vehicles"
  | "Training & Certification"
  | "IT & Digital"
  | "Workwear"
  | "Courier & Logistics";

export interface Supplier {
  id: string;
  name: string;
  category: SupplierCategory;
  orderLevel: OrderLevel;
  contact?: string;
  telephone?: string;
  email?: string;
  service: string;
  paymentTerms?: number;
  address?: string;
}

export const suppliers: Supplier[] = [
  // Chemicals & PPPs
  {
    id: "agrigem",
    name: "Agrigem",
    category: "Chemicals & PPPs",
    orderLevel: "Primary",
    contact: "Millie Wilkinson",
    telephone: "07718 931909",
    email: "millie.wilkinson@agrigem.co.uk",
    service: "PPPs / Sprayers",
    paymentTerms: 60,
    address: "Gem House, Riverside Enterprise Park, Lincoln, LN1 2FU",
  },
  {
    id: "origin",
    name: "Origin Amenity Solutions",
    category: "Chemicals & PPPs",
    orderLevel: "Primary",
    contact: "Mark De'Ath",
    telephone: "07774 263 557",
    email: "mark.de_ath@originamenity.com",
    service: "Fertilisers / PPPs",
    paymentTerms: 60,
  },

  // Fertilisers
  {
    id: "gbr",
    name: "GBR Amenity",
    category: "Fertilisers",
    orderLevel: "Primary",
    contact: "Ian Lane",
    telephone: "07824 903 547",
    email: "ian@gbrtech.co.uk",
    service: "Fertilisers",
    paymentTerms: 75,
    address: "Unit 42 Easter Park, Benyon Road, Silchester, Reading RG7 2PQ",
  },
  {
    id: "icl",
    name: "ICL",
    category: "Fertilisers",
    orderLevel: "Primary",
    contact: "Allan Wainwright",
    telephone: "07552 269 138",
    email: "allan.wainwright@icl-group.com",
    service: "Fertilisers",
    paymentTerms: 60,
    address: "Epsilon House, West Road, Ipswich IP3 9FJ",
  },
  {
    id: "agrovista",
    name: "Agrovista",
    category: "Fertilisers",
    orderLevel: "Secondary",
    contact: "Jack Fishman",
    telephone: "01902 440264",
    email: "jack.fishman@agrovista.co.uk",
    service: "Fertilisers",
    paymentTerms: 60,
    address: "Rutherford House, Nottingham Science & Technology Park, NG7 2PZ",
  },
  {
    id: "greenbest",
    name: "GreenBest",
    category: "Fertilisers",
    orderLevel: "Secondary",
    contact: "Jack Baxter",
    telephone: "07498 911 175",
    email: "jack.baxter@greenbest.co.uk",
    service: "Fertilisers",
    paymentTerms: 30,
    address: "Unit 2, The Marsh, Henstridge, Templecombe BA8 0TF",
  },

  // Grass Seed
  {
    id: "dlf",
    name: "DLF",
    category: "Grass Seed",
    orderLevel: "Primary",
    telephone: "01386 791102",
    email: "amenity@dlf.co.uk",
    service: "Grass Seed",
    paymentTerms: 28,
    address: "Thorn Farm, Evesham Road, Inkberrow, Worcestershire WR7 4LJ",
  },
  {
    id: "hurrells",
    name: "Hurrells Seeds",
    category: "Grass Seed",
    orderLevel: "Primary",
    telephone: "01377 271400",
    email: "info@hmseeds.com",
    service: "Grass Seed",
    paymentTerms: 28,
    address: "Beverley Road, Cranswick, Driffield, East Yorkshire YO25 9PF",
  },

  // Top Dressing
  {
    id: "shorts",
    name: "Shorts",
    category: "Top Dressing",
    orderLevel: "Primary",
    contact: "Cameron Brown",
    telephone: "01344 379700",
    email: "cameron.brown@shorts-group.co.uk",
    service: "Top Dressing",
    paymentTerms: 30,
    address: "London Court, London Road, Bracknell, Berkshire RG12 2UT",
  },
  {
    id: "holm",
    name: "Holm Products",
    category: "Top Dressing",
    orderLevel: "Adhoc",
    contact: "Colin / Kay",
    telephone: "01962 882 020",
    email: "sales@holm-products.com",
    service: "Top Dressing",
    paymentTerms: 30,
    address: "The Nursery, Littleton Lane, Winchester SO21 2LS",
  },
  {
    id: "woodhorn",
    name: "Woodhorn Group",
    category: "Top Dressing",
    orderLevel: "Adhoc",
    contact: "Tom Nicholls",
    telephone: "07523 909158",
    email: "tom.nicholls@woodhorngroup.co.uk",
    service: "Top Dressing",
    paymentTerms: 30,
    address: "Unit 6, Woodhorn Business Centre, Oving PO20 2BX",
  },
  {
    id: "fargro",
    name: "Fargro",
    category: "Top Dressing",
    orderLevel: "Adhoc",
    contact: "Phoenix",
    telephone: "01903 712869",
    service: "Top Dressing",
  },
  {
    id: "eurogreen",
    name: "Eurogreen Environmental",
    category: "Top Dressing",
    orderLevel: "Adhoc",
    contact: "Stuart Card",
    telephone: "01903 700678",
    email: "stuart.card@eurogreen-uk.com",
    service: "Top Dressing",
    address: "North Barn Farm, Titnore Lane, Worthing, West Sussex BN12 6NZ",
  },

  // Machinery & Equipment
  {
    id: "tracmaster",
    name: "Tracmaster",
    category: "Machinery & Equipment",
    orderLevel: "Primary",
    telephone: "01444 247689",
    email: "info@tracmaster.co.uk",
    service: "Camon Spares",
    paymentTerms: 28,
    address: "Units 6–7 Winterpick Business Park, Wineham BN5 9BJ",
  },
  {
    id: "blade",
    name: "Blade Machinery",
    category: "Machinery & Equipment",
    orderLevel: "Secondary",
    contact: "David",
    telephone: "07530 951 009",
    email: "accounts@blademachinery.co.uk",
    service: "Bannerman Spares",
    address: "Congleton, Cheshire CW12 4PH",
  },
  {
    id: "mowtrac",
    name: "MowTrac",
    category: "Machinery & Equipment",
    orderLevel: "Secondary",
    contact: "Joe Popperwell",
    telephone: "07366 435 435",
    email: "joe@mowtrac.co.uk",
    service: "Large Machinery Hire",
    address: "Goose Acre Barn, Puxton, Weston-super-Mare BS24 6TH",
  },
  {
    id: "autocut",
    name: "Autocut",
    category: "Machinery & Equipment",
    orderLevel: "Adhoc",
    contact: "Luke Bateman",
    telephone: "07837 132499",
    service: "Robotic Mower Maintenance",
    address: "Torr Trade Park, East Allington, Totnes TQ9 7FA",
  },
  {
    id: "henton",
    name: "Henton & Chattell",
    category: "Machinery & Equipment",
    orderLevel: "Adhoc",
    contact: "Nicholas Wain",
    telephone: "0115 986 2161",
    email: "nw@hentonsuk.com",
    service: "Billy Goat Spares",
    address: "London Road, Nottingham NG2 3HW",
  },
  {
    id: "merry-mower",
    name: "Merry Mower Services",
    category: "Machinery & Equipment",
    orderLevel: "Adhoc",
    telephone: "01329 236538",
    service: "Machinery Servicing",
    address: "Unit 11, The Boatyard Industrial Estate, Fareham PO16 0TA",
  },
  {
    id: "mower-doctor",
    name: "The Mower Doctor",
    category: "Machinery & Equipment",
    orderLevel: "Adhoc",
    contact: "Trevor",
    telephone: "07778 547 521",
    email: "trevor@mowerdoctor.co.uk",
    service: "Machinery Servicing",
    address: "39 Mortimers Lane, Fair Oak SO50 7BH",
  },
  {
    id: "techneat",
    name: "Techneat",
    category: "Machinery & Equipment",
    orderLevel: "Adhoc",
    service: "Boom Sprayers",
    paymentTerms: 28,
  },

  // Waste Management
  {
    id: "junkaway",
    name: "Junkaway Southampton",
    category: "Waste Management",
    orderLevel: "Secondary",
    contact: "Lauren",
    telephone: "07437 566861",
    service: "Waste Removal",
    paymentTerms: 30,
    address: "Unit 104 Solent Business Centre, 343 Millbrook Road West, Southampton SO15 0HW",
  },
  {
    id: "wasteking",
    name: "WasteKing",
    category: "Waste Management",
    orderLevel: "Secondary",
    contact: "Ross Howl",
    telephone: "03300 558 315",
    email: "ross.howl@wasteking.co.uk",
    service: "Waste Removal",
  },

  // Fleet & Vehicles
  {
    id: "alresford",
    name: "Alresford Bodyshop",
    category: "Fleet & Vehicles",
    orderLevel: "Primary",
    contact: "Wayne Dunford",
    telephone: "01962 733821",
    service: "Vehicle Repair",
    address: "Unit 3, Shelf House, New Farm Rd, Alresford SO24 9QP",
  },
  {
    id: "signsexpress",
    name: "SignsExpress",
    category: "Fleet & Vehicles",
    orderLevel: "Secondary",
    contact: "Mark Wheeler",
    telephone: "023 8022 7676",
    service: "Van Livery",
    address: "Unit 38, City Ind. Park, Southern Road, Southampton SO15 1HA",
  },
  {
    id: "warsash",
    name: "Warsash Glazing",
    category: "Fleet & Vehicles",
    orderLevel: "Adhoc",
    contact: "Ben Stockley",
    telephone: "07502 036717",
    email: "warsashglazing@gmail.com",
    service: "Window Repairs",
    address: "31 Meadcroft Close, Warsash, Southampton SO31 9GE",
  },

  // Training & Certification
  {
    id: "sparsholt",
    name: "Sparsholt College",
    category: "Training & Certification",
    orderLevel: "Secondary",
    telephone: "01962 776441",
    email: "parttimecourses@sparsholt.ac.uk",
    service: "PA1 / PA6 Certification",
  },

  // IT & Digital
  {
    id: "realgreen",
    name: "RealGreen",
    category: "IT & Digital",
    orderLevel: "Primary",
    email: "support@realgreen.com",
    service: "CRM",
  },
  {
    id: "invoco",
    name: "Invoco",
    category: "IT & Digital",
    orderLevel: "Primary",
    contact: "Dominic Pearce",
    telephone: "01527 306 001",
    email: "support@invoco.net",
    service: "VoIP",
  },
  {
    id: "webtaylor",
    name: "thewebtaylor",
    category: "IT & Digital",
    orderLevel: "Primary",
    contact: "Stuart Taylor",
    telephone: "02392 123 538",
    email: "stuart.taylor@thewebtaylor.com",
    service: "Website Design",
    address: "138 Hazleton Way, Waterlooville",
  },
  {
    id: "netvisibility",
    name: "NetVisibility",
    category: "IT & Digital",
    orderLevel: "Primary",
    contact: "John Thompson",
    telephone: "07507 694532",
    email: "john.thompson@netvisibility.co.uk",
    service: "Digital Marketing",
    paymentTerms: 28,
    address: "Jubilee House, Smalley Place, Kenilworth CV8 1QG",
  },
  {
    id: "worksmarter",
    name: "WorkSmarter",
    category: "IT & Digital",
    orderLevel: "Secondary",
    contact: "Luke Barton",
    email: "luke@worksmarter.co.uk",
    service: "Annual Leave Tracker",
    address: "74 The Close, Norwich NR1 4DR",
  },
  {
    id: "sharpcat",
    name: "SharpCat",
    category: "IT & Digital",
    orderLevel: "Secondary",
    contact: "Alan Laville",
    telephone: "0333 772 0946",
    email: "alan.laville@sharpcat.co.uk",
    service: "Direct Mail",
    address: "Elizabeth House, Greywell Road, Basingstoke RG27 9PR",
  },
  {
    id: "computer-repair",
    name: "Computer Repair Centre",
    category: "IT & Digital",
    orderLevel: "Adhoc",
    telephone: "023 8027 0271",
    service: "Printer Repair",
    address: "101 Winchester Rd, Chandler's Ford, Eastleigh SO53 2GG",
  },

  // Workwear
  {
    id: "skoolkit",
    name: "Skoolkit",
    category: "Workwear",
    orderLevel: "Adhoc",
    contact: "Helen",
    telephone: "023 8062 9156",
    email: "sales@skoolkit.co.uk",
    service: "Workwear",
    address: "Phoenix Ind Park, Chicken Hall Ln, Eastleigh SO50 6PQ",
  },

  // Courier
  {
    id: "dpd",
    name: "DPD",
    category: "Courier & Logistics",
    orderLevel: "Adhoc",
    contact: "Bonnie Pugh",
    telephone: "01213 364 973",
    email: "bonnie.pugh@dpd.uk",
    service: "Courier",
  },
];

export const supplierCategories: SupplierCategory[] = [
  "Chemicals & PPPs",
  "Fertilisers",
  "Grass Seed",
  "Top Dressing",
  "Machinery & Equipment",
  "Waste Management",
  "Fleet & Vehicles",
  "Training & Certification",
  "IT & Digital",
  "Workwear",
  "Courier & Logistics",
];
