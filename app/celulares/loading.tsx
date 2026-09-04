export default function LoadingCatalog() {
  return <main><section className="catalog-hero"><div className="container"><div className="skeleton" style={{height:80,maxWidth:700}} /></div></section><div className="container section"><div className="products-grid">{Array.from({length:8}).map((_,i)=><div className="skeleton" style={{height:430}} key={i}/>)}</div></div></main>;
}
