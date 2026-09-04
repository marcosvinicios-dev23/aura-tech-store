"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return <div><div className="gallery-main"><Image src={images[active] || images[0]} alt={name} fill sizes="(max-width: 760px) 100vw, 52vw" priority /></div><div className="thumbnails">{images.map((image,index)=><button className={`thumbnail ${active===index?"active":""}`} onClick={()=>setActive(index)} key={image} aria-label={`Ver foto ${index+1}`}><Image src={image} alt="" fill sizes="82px" /></button>)}</div></div>;
}
