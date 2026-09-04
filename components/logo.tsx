import Link from "next/link";
import Image from "next/image";

export function Logo({ inverse = false, name = "TechCell Assistência", image }: { inverse?: boolean; name?: string; image?: string | null }) {
  const [first, ...rest] = name.split(" ");
  return (
    <Link className={`logo ${inverse ? "logo-inverse" : ""}`} href="/" aria-label="TechCell Assistência, página inicial">
      {image ? <Image className="logo-image" src={image} alt="" width={39} height={39} /> : <span className="logo-mark">{name.charAt(0)}</span>}
      <span><b>{first}</b><small>{rest.join(" ") || "Assistência"}</small></span>
    </Link>
  );
}
