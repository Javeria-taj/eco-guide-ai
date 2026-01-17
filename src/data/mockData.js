// src/data/mockData.js

export const THEME = {
  primary: '#00a88c',
  bgLight: '#f5f8f8',
  bgDark: '#0f2320',
};

export const KNOWLEDGE_BASE = [
  // --- NEW RICH DATA ENTRIES (Supports new features) ---
  {
    id: "ewaste",
    category: "E-Waste",
    keywords: ["e-waste", "electronics", "battery", "charger", "mobile", "laptop", "wire"],
    answer: "E-waste must NEVER be mixed with regular trash or burnt. It must be handed over to authorized recyclers.",
    examples: [
      "Mobile phones",
      "Chargers and cables",
      "Laptops",
      "Batteries",
      "Headphones",
    ],
    bin: "No household bin – use authorized e-waste collection points",
    penalty: "₹5,000 fine under E-Waste Management Rules 2022",
    steps: [
      "Store separately from other waste",
      "Do not break, crush, or burn",
      "Hand over to authorized recycler or drop at collection kiosk",
    ],
    source: "E-Waste Management Rules 2022",
    explanation: "Electronics contain heavy metals like Lead and Mercury which leach into groundwater if dumped in landfills."
  },
  {
    id: "paper",
    category: "Dry Waste",
    keywords: ["paper", "newspaper", "book", "magazine", "cardboard"],
    answer: "Clean paper is considered dry waste and is recyclable.",
    examples: [
      "Newspapers",
      "Office paper",
      "Magazines",
      "Books",
      "Cardboard boxes"
    ],
    bin: "Blue Bin",
    steps: [
      "Ensure paper is clean and dry",
      "Remove food contamination (oil/grease)",
      "Place in blue bin",
    ],
    source: "BBMP Solid Waste Guidelines",
    explanation: "Soiled or wet paper cannot be recycled and turns into pulp, ruining the batch."
  },

  // --- EXISTING ENTRIES ---
  
  // --- BURNING & PROHIBITIONS ---
  {
    id: 'burning-waste',
    keywords: ['burn', 'burning', 'fire', 'incinerate', 'smoke', 'bonfire'],
    answer: "⚠️ **STRICTLY PROHIBITED.** Burning any kind of waste (garbage, leaves, or e-waste) is illegal under the Air Act 1981 and BBMP Bye-laws.",
    explanation: "Burning waste releases toxic carcinogens (cancer-causing agents) like Dioxins and Furans. It attracts heavy spot fines and potential legal action.",
    source: "NGT Orders & Air Act 1981",
    contextSnippet: "Burning is a non-bailable offense in certain jurisdictions."
  },

  // --- SEGREGATION BASICS ---
  {
    id: 'wet-waste-def',
    keywords: ['wet', 'kitchen', 'food', 'organic', 'compost', 'vegetable', 'fruit', 'peel', 'coffee', 'tea'],
    answer: "All organic, biodegradable waste goes into the **Green Bin** (Wet Waste). This includes cooked food, vegetable peels, fruits, flower waste, and coffee/tea grounds.",
    explanation: "Wet waste is sent to composting plants or bio-methanation facilities. Mixing plastic with this ruins the compost quality.",
    source: "BBMP SWM Bye-Laws 2019, Schedule I",
    contextSnippet: "Wet waste must be handed over daily to collection vehicles."
  },
  {
    id: 'dry-waste-def',
    keywords: ['dry', 'recyclable', 'plastic', 'metal', 'glass', 'carton', 'wrapper', 'bottle'],
    answer: "Clean, dry recyclables go into the **Blue Bin** (Dry Waste). This includes plastic, metal, and glass.",
    explanation: "Dry waste is sent to Dry Waste Collection Centres (DWCC) for sorting and recycling. It must be moisture-free to prevent foul smell and degradation.",
    source: "BBMP SWM Bye-Laws 2019, Schedule II",
    contextSnippet: "Dry waste is typically collected twice a week in most zones."
  },
  {
    id: 'sanitary-waste',
    keywords: ['sanitary', 'diaper', 'napkin', 'pad', 'condom', 'tampon'],
    answer: "Sanitary waste must be wrapped in newspaper, marked with a **Red Cross**, and handed over separately.",
    explanation: "This helps sanitary workers identify hazardous waste and prevents disease transmission. Do not mix with wet/dry bins.",
    source: "SWM Rules 2016",
    contextSnippet: "Classified as Domestic Hazardous Waste."
  },
  {
    id: 'medical-waste',
    keywords: ['medical', 'medicine', 'pill', 'syringe', 'injection', 'needle', 'bandage', 'blood'],
    answer: "Medical waste (syringes, bandages, medicines) is **Biomedical Waste**. Do not put it in regular bins.",
    explanation: "It must be handed over in a separate Yellow bag or Red container to specific collectors to prevent infection spread.",
    source: "Biomedical Waste Rules 2016",
    contextSnippet: "Never mix biomedical waste with domestic waste."
  },

  // --- SPECIFIC ITEMS ---
  {
    id: 'pizza-box',
    keywords: ['pizza', 'box', 'grease', 'oil', 'stain'],
    answer: "Greasy/soiled pizza boxes are **Wet Waste** (Reject). Only the clean top lid can be torn off and put in Dry Waste.",
    explanation: "Oil and grease contaminate the paper fibers, making them impossible to recycle into new paper.",
    source: "Recycling Protocols v2",
    contextSnippet: "Food-contaminated paper is non-recyclable."
  },
  {
    id: 'tetra-pack',
    keywords: ['tetra', 'pack', 'juice', 'milk', 'carton', 'box'],
    answer: "Tetra packs are **Dry Waste**. They must be rinsed, flattened, and put in the Blue Bin.",
    explanation: "Tetra packs are composite materials (Paper + Plastic + Aluminum). They are recycled by separating these layers at specialized facilities.",
    source: "Carton Council of India Guidelines",
    contextSnippet: "Rinse and flatten to save space and prevent odors."
  },
  {
    id: 'milk-packet',
    keywords: ['milk', 'packet', 'sachet', 'pouch'],
    answer: "Milk packets are high-value **Dry Waste**. Rinse them, dry them, and put them in the Blue Bin.",
    explanation: "Milk packets are made of LDPE (Low-Density Polyethylene) which is highly recyclable if clean.",
    source: "BBMP Dry Waste Guidelines",
    contextSnippet: "Cut the packet fully open to wash it properly."
  },
  {
    id: 'styrofoam',
    keywords: ['styrofoam', 'thermocol', 'packaging', 'foam'],
    answer: "Styrofoam (Thermocol) is generally **Reject Waste** or requires special drop-off.",
    explanation: "Expanded Polystyrene (EPS) is difficult to recycle and takes up massive space. Avoid usage where possible.",
    source: "Plastic Waste Management Rules",
    contextSnippet: "Do not crush thermocol into small pieces as it spreads easily."
  },
  {
    id: 'glass-broken',
    keywords: ['glass', 'broken', 'mirror', 'shard', 'sharp'],
    answer: "Broken glass must be wrapped securely in newspaper, marked 'SHARPS', and kept separate from other dry waste.",
    explanation: "This prevents injury to the Pourakarmikas (sanitary workers) who handle the waste manually.",
    source: "Worker Safety Protocol 2024",
    contextSnippet: "Never throw loose broken glass into a plastic bag."
  },
  {
    id: 'coconut',
    keywords: ['coconut', 'shell', 'husk', 'tender'],
    answer: "Coconut shells and tender coconut shells are **Garden/Green Waste**.",
    explanation: "They take longer to compost than kitchen waste, so they are often shredded separately.",
    source: "Garden Waste Management",
    contextSnippet: "Do not mix large quantities of coconut shells with daily wet waste."
  },
  {
    id: 'garden-waste',
    keywords: ['garden', 'leaf', 'leaves', 'branch', 'twig', 'trimming', 'grass'],
    answer: "Garden litter should be composted on-site or handed over to specific garden waste collection drives.",
    explanation: "Burning garden waste is strictly prohibited and attracts fines.",
    source: "NGT Order on Leaf Burning",
    contextSnippet: "Leaf litter is valuable carbon for composting."
  },
  {
    id: 'cfl-bulbs',
    keywords: ['bulb', 'light', 'cfl', 'tube', 'led'],
    answer: "Tube lights and CFL bulbs are **Hazardous Waste**. Handle with care to prevent breakage.",
    explanation: "They contain mercury vapor which is toxic when inhaled. If broken, ventilate the room immediately.",
    source: "Mercury Waste Handling Protocol",
    contextSnippet: "Keep in original packaging if possible for disposal."
  },

  // --- CONSTRUCTION (C&D) ---
  {
    id: 'construction',
    keywords: ['construction', 'debris', 'cement', 'rubble', 'brick', 'tile', 'paint', 'renovation'],
    answer: "Construction & Demolition (C&D) waste cannot be given to regular trucks. You must book a specialized 'Prahari' pickup.",
    explanation: "Dumping C&D waste on roadsides or lakes creates flooding risks and attracts heavy penalties.",
    source: "BBMP C&D Waste Policy 2023",
    contextSnippet: "Call the zonal helpline for pickups > 1 ton."
  },

  // --- POLICY & FINES ---
  {
    id: 'fines-spot',
    keywords: ['fine', 'penalty', 'cost', 'charge', 'money', 'violation'],
    answer: "Spot fines range from **₹500** (households) to **₹25,000** (bulk generators) for non-segregation or littering.",
    explanation: "Fines increase for repeated offenses. Marshals utilize handheld devices to issue challans immediately.",
    source: "BBMP Penalty Schedule 2025",
    contextSnippet: "Section 33 empowers marshals to levy fines."
  },
  {
    id: 'bulk-generator',
    keywords: ['bulk', 'apartment', 'complex', 'society', 'hotel', 'restaurant'],
    answer: "Entities generating >100kg waste/day are **Bulk Generators**. They must process wet waste in-situ (on-site) or hire authorized vendors.",
    explanation: "The municipality does not collect wet waste from bulk generators; they must be self-reliant.",
    source: "SWM Rules 2016, Rule 4",
    contextSnippet: "Apartments with >50 units are automatically Bulk Generators."
  }
];

export const DOCUMENTS = [
  { title: "BBMP Solid Waste Management Bye-Laws 2019", type: "PDF", size: "2.4 MB", date: "Jan 12, 2024" },
  { title: "Plastic Waste Management Rules 2016 (Amended)", type: "PDF", size: "1.8 MB", date: "Feb 05, 2024" },
  { title: "E-Waste Management Rules 2022", type: "PDF", size: "1.5 MB", date: "Mar 10, 2024" },
  { title: "Hazardous Waste Handling Guidelines v2.0", type: "DOCX", size: "850 KB", date: "Mar 10, 2024" },
  { title: "Bulk Generator Compliance Checklist", type: "XLSX", size: "45 KB", date: "Mar 12, 2024" },
  { title: "Color Coding Standards for Bins (ISO)", type: "PDF", size: "1.2 MB", date: "Jan 20, 2024" },
  { title: "Penalties and Fines Schedule 2025", type: "PDF", size: "900 KB", date: "Apr 01, 2024" },
];

export const RECENT_SCANS = [
  { title: "PET Plastic Bottle", time: "2 hours ago", thumbnail: "bottle" },
  { title: "Aluminum Can", time: "Yesterday", thumbnail: "can" }
];