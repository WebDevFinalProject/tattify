import { connectToDatabase } from "./database/database.js";
import User from "./model/user.js";
import ArtistProfile from "./model/profile.js";

connectToDatabase();

// Customers

const customers = [
  {
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown@example.com",
    password: "CustomerPass123!",
    role: "customer",
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733737638/hkaXQLHr_ku6olh.jpg",
  },
  {
    firstName: "Bob",
    lastName: "Green",
    email: "bob.green@example.com",
    password: "SecureBob2024!",
    role: "customer",
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733737642/lL-XGn7q_gt4bg6.jpg",
  },
  {
    firstName: "Charlie",
    lastName: "Johnson",
    email: "charlie.johnson@example.com",
    password: "CharlieSecure123!",
    role: "customer",
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733737641/m7cDMGlK_xtxn4e.jpg",
  },
  {
    firstName: "Diana",
    lastName: "Lee",
    email: "diana.lee@example.com",
    password: "DianaPass2024!",
    role: "customer",
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733737639/ubPgH8k8_pwqqk9.jpg",
  },
  {
    firstName: "Edward",
    lastName: "Clark",
    email: "edward.clark@example.com",
    password: "EdwardPass2024!",
    role: "customer",
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733737639/wxQhkc_V_r8kz6c.jpg",
  },
];

// ARTISTS

const artists = [
  {
    firstName: "Liam",
    lastName: "Clark",
    email: "liam.clark@example.com",
    password: "P@ssw0rd123",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739047/LErjuUOf_du05re.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739045/xQ27Hiso_io1xhc.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739044/jtUnj8Dr_m55oy5.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739703/5o4gdu9k_z1k1oh.jpg",
    artistProfile: {
      bio: "Specializes in Portraits and Abstract art.",
      specialties: ["Portraits", "Abstract"],
      experience: "5 years",
      certifications: ["Certified Portrait Artist"],
      languagesSpoken: ["English", "Spanish"],
      city: "New York",
      country: "USA",
      basePrice: 150,
      pricingDetails: "Rates start from $150 per session.",
      socialLinks: ["https://instagram.com/liamclark"],
    },
  },
  {
    firstName: "Emma",
    lastName: "Martinez",
    email: "emma.martinez@example.com",
    password: "TattooR0cks!",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738974/86Woj7cE_aru0ne.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738973/KfsY-cl8_ydey1q.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738971/JgNBK1Km_xcahe6.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739698/fbNjexhe_zdq2yk.jpg",
    artistProfile: {
      bio: "Tattoo artist with a passion for sketching.",
      specialties: ["Tattooing", "Sketching"],
      experience: "7 years",
      certifications: ["Licensed Tattoo Artist"],
      languagesSpoken: ["English"],
      city: "Los Angeles",
      country: "USA",
      basePrice: 200,
      pricingDetails: "Pricing depends on design complexity.",
      socialLinks: ["https://instagram.com/emmatattoos"],
    },
  },
  {
    firstName: "Sophia",
    lastName: "Schmidt",
    email: "sophia.schmidt@example.com",
    password: "Artistic!2024",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738970/Cry7Ez4X_rwesx3.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738968/NpZdNybU_k93y1b.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738968/-n7OfHtW_j1n7et.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739702/1kmxydF__lwjhz2.jpg",
    artistProfile: {
      bio: "Contemporary artist specializing in mixed media.",
      specialties: ["Mixed Media", "Collage Art"],
      experience: "6 years",
      certifications: ["Contemporary Art Certification"],
      languagesSpoken: ["German", "English"],
      city: "Berlin",
      country: "Germany",
      basePrice: 180,
      pricingDetails: "Pricing varies by project size and complexity.",
      socialLinks: ["https://instagram.com/sophia.schmidt"],
    },
  },
  {
    firstName: "Lucas",
    lastName: "Silva",
    email: "lucas.silva@example.com",
    password: "Br@silArt2023",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738966/48x7dNeW_wzkv7x.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738965/Nm16Ydgu_rnnynx.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738963/2TLdx3C5_lirpzv.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739707/k-GCS_bM_vljlyt.jpg",
    artistProfile: {
      bio: "Brazilian street artist specializing in graffiti.",
      specialties: ["Graffiti", "Street Art"],
      experience: "8 years",
      certifications: ["Urban Art Certification"],
      languagesSpoken: ["Portuguese", "English"],
      city: "São Paulo",
      country: "Brazil",
      basePrice: 250,
      pricingDetails: "Murals start at $250 per project.",
      socialLinks: ["https://instagram.com/lucasgraffiti"],
    },
  },
  {
    firstName: "Ava",
    lastName: "Li",
    email: "ava.li@example.com",
    password: "Modern@Art123",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738962/7OL3AcZA_o3yypp.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738957/PgA4VDtd_wqqpyk.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738957/0oEaou8Y_squwd1.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739691/y4Snflxw_hosmrd.jpg",
    artistProfile: {
      bio: "Chinese artist blending traditional art with modern design.",
      specialties: ["Calligraphy", "Modern Art"],
      experience: "6 years",
      certifications: ["Art Master Degree"],
      languagesSpoken: ["Chinese", "English"],
      city: "Beijing",
      country: "China",
      basePrice: 200,
      pricingDetails: "Starting price for art pieces is $200.",
      socialLinks: ["https://instagram.com/avaart"],
    },
  },
  {
    firstName: "Elena",
    lastName: "Garcia",
    email: "elena.garcia@example.com",
    password: "Surreal#Art2024",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738954/-WGmWY4K_qqo8nu.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738954/q96EuA0C_wada8b.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738952/2JphKgey_xsiufn.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739700/AkPlGCaH_xcew3z.jpg",
    artistProfile: {
      bio: "Spanish artist exploring surrealism in digital mediums.",
      specialties: ["Surrealism", "Digital Art"],
      experience: "6 years",
      certifications: ["Digital Surrealism Specialist"],
      languagesSpoken: ["Spanish", "English"],
      city: "Madrid",
      country: "Spain",
      basePrice: 240,
      pricingDetails: "Surrealistic art starts at $240.",
      socialLinks: ["https://instagram.com/elenagarciadigital"],
    },
  },
  {
    firstName: "Amara",
    lastName: "Okafor",
    email: "amara.okafor@example.com",
    password: "Culture4Life!",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738951/piUPxAqP_fwovon.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738950/NGyrFMcf_lsdptp.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738948/aELs-h0a_uuaxix.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739694/l4S42v3G_atmmil.jpg",
    artistProfile: {
      bio: "Nigerian artist exploring African heritage through sculpture.",
      specialties: ["Sculpture", "Cultural Art"],
      experience: "10 years",
      certifications: ["Cultural Arts Specialist"],
      languagesSpoken: ["English", "Igbo"],
      city: "Lagos",
      country: "Nigeria",
      basePrice: 400,
      pricingDetails: "Custom sculptures start at $400.",
      socialLinks: ["https://instagram.com/amaraokafor"],
    },
  },
  {
    firstName: "Fatima",
    lastName: "Hassan",
    email: "fatima.hassan@example.com",
    password: "Calligraphy@2024",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738947/IiqxXjyW_tk0vlh.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738945/5jsBz0iz_u4rqbl.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738945/_pkoqGin_q06ptz.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739690/OHrtJsNU_fzbkip.jpg",
    artistProfile: {
      bio: "Middle Eastern artist combining traditional and modern themes.",
      specialties: ["Arabic Calligraphy", "Mixed Media"],
      experience: "8 years",
      certifications: ["Calligraphy and Design"],
      languagesSpoken: ["Arabic", "English"],
      city: "Dubai",
      country: "UAE",
      basePrice: 300,
      pricingDetails: "Custom calligraphy pieces start at $300.",
      socialLinks: ["https://instagram.com/fatimahassan"],
    },
  },
  {
    firstName: "Maya",
    lastName: "Patel",
    email: "maya.patel@example.com",
    password: "Textiles@Rangoli!",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738943/9c-MzT2r_i764qc.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738941/_QnRsP3v_gmwbo1.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738940/hBPJQqQt_dmzvoq.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733739702/1kmxydF__lwjhz2.jpg",
    artistProfile: {
      bio: "Indian artist passionate about Rangoli and textile art.",
      specialties: ["Rangoli", "Textile Art"],
      experience: "6 years",
      certifications: ["Art Institute Diploma"],
      languagesSpoken: ["Hindi", "English"],
      city: "Mumbai",
      country: "India",
      basePrice: 100,
      pricingDetails: "Textile patterns start at $100.",
      socialLinks: ["https://instagram.com/mayapatelart"],
    },
  },
  {
    firstName: "Yuki",
    lastName: "Takahashi",
    email: "yuki.takahashi@example.com",
    password: "Origami@2024",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738939/t4SmUdaf_dhyvym.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738936/jowJZEAm_u06liu.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738935/3mm6OZhQ_cqaibs.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741989/reYbwp9L_bb07kx.jpg",
    artistProfile: {
      bio: "Japanese artist specializing in origami and minimalist design.",
      specialties: ["Origami", "Minimalist Design"],
      experience: "9 years",
      certifications: ["Certified Origami Artist"],
      languagesSpoken: ["Japanese", "English"],
      city: "Tokyo",
      country: "Japan",
      basePrice: 150,
      pricingDetails: "Custom origami pieces start at $150.",
      socialLinks: ["https://instagram.com/yuki.origami"],
    },
  },
  {
    firstName: "Noah",
    lastName: "Smith",
    email: "noah.smith@example.com",
    password: "ArtLover@456",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738934/hHYEjpWQ_chrbjp.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738932/ecQm7yhv_uegkbc.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738932/dIADxfRr_b0sdlw.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741986/UUK9GG_t_hpuytz.jpg",
    artistProfile: {
      bio: "Mixed-media artist with a focus on sustainable art.",
      specialties: ["Sustainable Art", "Collage"],
      experience: "5 years",
      certifications: ["Green Art Initiative"],
      languagesSpoken: ["English"],
      city: "London",
      country: "UK",
      basePrice: 180,
      pricingDetails: "Sustainable pieces start at $180.",
      socialLinks: ["https://instagram.com/noahsmithart"],
    },
  },
  {
    firstName: "Hanna",
    lastName: "Bjorn",
    email: "hanna.bjorn@example.com",
    password: "NordicArt2024!",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738931/2ZbxcqzU_nrszec.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738928/LtT46Iqq_hao1ax.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738928/1tXK2luw_dzygbt.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741987/5fHATZNu_x0f7xg.jpg",
    artistProfile: {
      bio: "Scandinavian artist inspired by Nordic mythology.",
      specialties: ["Mythology Art", "Illustration"],
      experience: "7 years",
      certifications: ["Nordic Mythology Studies"],
      languagesSpoken: ["Swedish", "English"],
      city: "Stockholm",
      country: "Sweden",
      basePrice: 220,
      pricingDetails: "Custom mythology illustrations start at $220.",
      socialLinks: ["https://instagram.com/hannabjorn"],
    },
  },
  {
    firstName: "Carlos",
    lastName: "Vargas",
    email: "carlos.vargas@example.com",
    password: "StreetArt@789",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738925/hPq8kx28_dqkdtv.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738924/spcx2VBo_q0o87p.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738924/mAuq7ANN_ii1h3e.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741985/f-qdTHeA_lpxbhz.jpg",
    artistProfile: {
      bio: "Venezuelan artist specializing in murals and urban art.",
      specialties: ["Murals", "Urban Art"],
      experience: "10 years",
      certifications: ["Urban Art Certification"],
      languagesSpoken: ["Spanish", "English"],
      city: "Caracas",
      country: "Venezuela",
      basePrice: 300,
      pricingDetails: "Murals start at $300 per project.",
      socialLinks: ["https://instagram.com/carlosvargasart"],
    },
  },
  {
    firstName: "Meera",
    lastName: "Raman",
    email: "meera.raman@example.com",
    password: "Colors@Heart!",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733736957/afba666b-f199-49e8-8117-157a6571967d_jaz7xd.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733736955/ed47bf07-1673-4b33-80fd-5f69a4cc809d_uhiree.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733736955/8131bb9c-bc65-45d9-af7d-9949471d2b4f_n3zvsj.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741992/Vxz5rsxk_ppv9tn.jpg",
    artistProfile: {
      bio: "Indian painter blending traditional and modern techniques.",
      specialties: ["Painting", "Mixed Media"],
      experience: "8 years",
      certifications: ["Fine Arts Degree"],
      languagesSpoken: ["Hindi", "English"],
      city: "Chennai",
      country: "India",
      basePrice: 120,
      pricingDetails: "Paintings start at $120.",
      socialLinks: ["https://instagram.com/meeraraman"],
    },
  },
  {
    firstName: "Ethan",
    lastName: "Nguyen",
    email: "ethan.nguyen@example.com",
    password: "ArtStudio@456",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733736923/20_tattoo_arts_l6rfao.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741997/xQ27Hiso_z8zktg.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741997/LErjuUOf_lxamun.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741983/ipKo6h3l_qfql3q.jpg",
    artistProfile: {
      bio: "Vietnamese artist creating captivating landscapes.",
      specialties: ["Landscape Art", "Oil Painting"],
      experience: "6 years",
      certifications: ["Oil Painting Specialist"],
      languagesSpoken: ["Vietnamese", "English"],
      city: "Hanoi",
      country: "Vietnam",
      basePrice: 160,
      pricingDetails: "Custom landscapes start at $160.",
      socialLinks: ["https://instagram.com/ethannguyen"],
    },
  },
  {
    firstName: "Nia",
    lastName: "Jenkins",
    email: "nia.jenkins@example.com",
    password: "DigitalArt@987",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741993/jtUnj8Dr_eygjzz.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741977/aYcrMRDC_vzk757.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741976/8qj0-xmj_qghahv.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733747233/ANOoQF7E_zruf39.jpg",
    artistProfile: {
      bio: "Digital artist creating futuristic illustrations.",
      specialties: ["Digital Art", "Concept Design"],
      experience: "4 years",
      certifications: ["Digital Design Certification"],
      languagesSpoken: ["English"],
      city: "San Francisco",
      country: "USA",
      basePrice: 200,
      pricingDetails: "Digital art commissions start at $200.",
      socialLinks: ["https://instagram.com/niajenkins"],
    },
  },
  {
    firstName: "Ahmed",
    lastName: "El-Sayed",
    email: "ahmed.elsayed@example.com",
    password: "Calligraphy#2023",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738968/NpZdNybU_k93y1b.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738970/Cry7Ez4X_rwesx3.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733738971/JgNBK1Km_xcahe6.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733741981/YEghzb0q_ey7hgc.jpg",
    artistProfile: {
      bio: "Egyptian artist specializing in Islamic calligraphy.",
      specialties: ["Islamic Calligraphy", "Pattern Design"],
      experience: "12 years",
      certifications: ["Calligraphy and Art Degree"],
      languagesSpoken: ["Arabic", "English"],
      city: "Cairo",
      country: "Egypt",
      basePrice: 250,
      pricingDetails: "Calligraphy pieces start at $250.",
      socialLinks: ["https://instagram.com/ahmedelsayed"],
    },
  },
  {
    firstName: "Chloe",
    lastName: "Dubois",
    email: "chloe.dubois@example.com",
    password: "ElegantArt@2024",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733746857/4lS7wByh_on2qsg.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733746854/I14OTXjT_zw3bgv.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733746853/VtuXrswi_x6poyu.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733747231/LVj9RA00_dz5zyg.jpg",
    artistProfile: {
      bio: "French artist specializing in fine art and realism.",
      specialties: ["Fine Art", "Realism"],
      experience: "10 years",
      certifications: ["Fine Arts Degree"],
      languagesSpoken: ["French", "English"],
      city: "Paris",
      country: "France",
      basePrice: 300,
      pricingDetails: "Realistic paintings start at $300.",
      socialLinks: ["https://instagram.com/chloedubois"],
    },
  },
  {
    firstName: "Aliya",
    lastName: "Karimov",
    email: "aliya.karimov@example.com",
    password: "CulturalArt!2024",
    role: "artist",
    portfolio: [
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733746851/hwx7nKlD_ky5vjx.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733746843/cryFdQOz_g6ltwx.jpg",
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733746846/7fdenAuX_hktjpb.jpg",
    ],
    profileImage:
      "https://res.cloudinary.com/dfgid3dy3/image/upload/v1733747227/jVF4IEyk_gmzkrn.jpg",
    artistProfile: {
      bio: "Kazakh artist inspired by nomadic culture.",
      specialties: ["Cultural Art", "Textile Design"],
      experience: "5 years",
      certifications: ["Cultural Heritage Certification"],
      languagesSpoken: ["Kazakh", "Russian", "English"],
      city: "Almaty",
      country: "Kazakhstan",
      basePrice: 180,
      pricingDetails: "Cultural pieces start at $180.",
      socialLinks: ["https://instagram.com/aliyakarimov"],
    },
  },
];

const seedToDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await ArtistProfile.deleteMany({});

    for (const artist of artists) {
      const { artistProfile, ...userData } = artist;

      //Create User Document

      const user = await User.create(userData);

      // Create ArtistProfile document associated with the User

      await ArtistProfile.create({
        ...artistProfile,
        user: user._id,
      });
    }

    // Seed Customer Data

    for (const customer of customers) {
      await User.create(customer);
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.log("Error seeding the database!", error.message);
  }
};

seedToDatabase();
