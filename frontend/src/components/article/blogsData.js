import skinCare from "../../assets/blogs-images/skincare.jpeg";
import history from "../../assets/blogs-images/history.webp";
import considerations from "../../assets/blogs-images/considerations.jpg"
import GlobalTattoo from "../../assets/global-tattoo/GlobalTatoo.webp";
import first_Tattoo from "../../assets/blogs-images/first_Tattoo.jpg"

const blogsData = [
  {
    id: "skin-care",
    img: skinCare,
    title: "Skin Care",
    description: "Learn about the best skin care practices.",
    path: "/article/skin-care",
  },
  {
    id: "tattoo-history",
    img: history,
    title: "Tattoo History",
    description: "Explore the rich history of tattoos around the world.",
    path: "/article/tattoo-history",
  },
  {
    id: "tattoo-considerations",
    img: considerations,
    title: "Things to Consider Before Getting a Tattoo",
    description: "Discover essential tips and advice before your first tattoo.",
    path: "/article/tattoo-considerations",
  },
  {
    id: "global-tattoo",
    img: GlobalTattoo,
    title:"The Art of Tattoos: Connecting Cultures Globally",
    description: "Tattoos tell stories, bridging cultures and connecting people worldwide.",
    path:"/article/global-tattoo"
  },
  {
    id: "first-tattoo-guide",
    img: first_Tattoo,
    title:"First Tattoo Guide",
    description:"Your essential guide to making your first tattoo experience unforgettable.",
    path:"/article/first-tattoo-guide"
  }
];

export default blogsData;
