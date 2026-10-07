import Link from "next/link";

export function Logo({ inverse = false, name = "TechCell Assistência" }: { inverse?: boolean; name?: string; image?: string | null }) {
  const [first, ...rest] = name.split(" ");
  return (
    <Link className={`logo ${inverse ? "logo-inverse" : ""}`} href="/" aria-label={`${name}, página inicial`}>
      
      <span><b>{first}</b><small>{rest.join(" ") || "Assistência"}</small></span>
    </Link>
  );
}
