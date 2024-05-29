import dynamic from "next/dynamic";

export const Logo = dynamic(() => import("./logo"), { ssr: true });
export const Header = dynamic(() => import("./Header"), { ssr: true });
export const Footer = dynamic(() => import("./Footer"), { ssr: true });
export const SearchBar = dynamic(() => import("./SearchBar"), { ssr: true });
export const ProductCard = dynamic(() => import("./ProductCard"), {
  ssr: true,
});

export const EmptyPlaceholder = dynamic(() => import("./EmptyPlaceholder"), {
  ssr: true,
});
