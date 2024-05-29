import dynamic from "next/dynamic";

export const Logo = dynamic(() => import("./logo"), { ssr: false });
export const Header = dynamic(() => import("./Header"), { ssr: false });
export const Footer = dynamic(() => import("./Footer"), { ssr: false });
export const SearchBar = dynamic(() => import("./SearchBar"), { ssr: false });
export const ProductCard = dynamic(() => import("./ProductCard"), {
  ssr: false,
});

export const EmptyPlaceholder = dynamic(() => import("./EmptyPlaceholder"), {
  ssr: false,
});
