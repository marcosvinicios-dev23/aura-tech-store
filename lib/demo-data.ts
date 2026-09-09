import type { Company, Product } from "./types";

export const demoCompany: Company = {
  id: "00000000-0000-0000-0000-000000000001",
  slug: "techcell-assistencia",
  name: "TechCell Assistência",
  whatsapp: "31994474087",
  address: "Av. das Acácias, 245 — Centro",
  city: "Betim",
  state: "MG",
  business_hours: "Seg. a sex. 9h–18h • Sáb. 9h–13h",
  instagram: "@techcell.assistencia",
  facebook: "TechCell Assistência",
  description: "Celulares selecionados e assistência técnica especializada.",
  logo_url: null,
  primary_color: "#0B1D3A",
  secondary_color: "#176BFF",
  banner_url: null,
};

const now = "2026-09-01T12:00:00.000Z";
const image = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=900&q=85`;

export const demoProducts: Product[] = [
  {
    id: "10000000-0000-4000-8000-000000000001", company_id: demoCompany.id, slug: "iphone-15-pro-256gb",
    category: "Celular", brand: "Apple", model: "iPhone 15 Pro", storage: "256GB", color: "Titânio natural",
    condition: "Seminovo", price: 5699, stock: 1, battery_health: 94, warranty: "90 dias",
    description: "Aparelho de demonstração em excelente estado, com alto desempenho, câmeras avançadas e acabamento premium.",
    images: [image("1696446701796-da61225697cc"), image("1592750475338-74b7b21085ab")],
    primary_image: 0, featured: true, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000002", company_id: demoCompany.id, slug: "iphone-13-128gb",
    category: "Celular", brand: "Apple", model: "iPhone 13", storage: "128GB", color: "Meia-noite",
    condition: "Seminovo", price: 2999, stock: 2, battery_health: 89, warranty: "90 dias",
    description: "Modelo equilibrado para fotos, redes sociais e uso diário. Produto fictício para apresentação do template.",
    images: [image("1632661674596-df8be070a5c5"), image("1592286927505-1def25115558")],
    primary_image: 0, featured: true, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000003", company_id: demoCompany.id, slug: "iphone-16-128gb",
    category: "Celular", brand: "Apple", model: "iPhone 16", storage: "128GB", color: "Ultramarino",
    condition: "Novo", price: 6499, stock: 3, battery_health: 100, warranty: "12 meses",
    description: "Aparelho novo de demonstração, com excelente desempenho e recursos atuais.",
    images: [image("1603898037225-1bea09c550c0")], primary_image: 0, featured: true, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000004", company_id: demoCompany.id, slug: "samsung-galaxy-s24-256gb",
    category: "Celular", brand: "Samsung", model: "Galaxy S24", storage: "256GB", color: "Cinza",
    condition: "Novo", price: 3899, stock: 4, battery_health: null, warranty: "12 meses",
    description: "Smartphone Samsung premium com tela brilhante e ótimo conjunto de câmeras.",
    images: [image("1610945265064-0e34e5519bbf")], primary_image: 0, featured: true, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000005", company_id: demoCompany.id, slug: "samsung-galaxy-a55-128gb",
    category: "Celular", brand: "Samsung", model: "Galaxy A55", storage: "128GB", color: "Azul escuro",
    condition: "Seminovo", price: 1699, stock: 2, battery_health: null, warranty: "90 dias",
    description: "Opção intermediária para quem busca tela ampla, boa bateria e câmera versátil.",
    images: [image("1598327105666-5b89351aff97")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000006", company_id: demoCompany.id, slug: "samsung-galaxy-s23-128gb",
    category: "Celular", brand: "Samsung", model: "Galaxy S23", storage: "128GB", color: "Preto",
    condition: "Seminovo", price: 2399, stock: 1, battery_health: null, warranty: "90 dias",
    description: "Compacto, rápido e com câmeras de alto nível. Item fictício de demonstração.",
    images: [image("1592899677977-9c10ca588bbd")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000007", company_id: demoCompany.id, slug: "motorola-edge-50-256gb",
    category: "Celular", brand: "Motorola", model: "Edge 50", storage: "256GB", color: "Verde",
    condition: "Novo", price: 2799, stock: 3, battery_health: null, warranty: "12 meses",
    description: "Design fino, tela de alta qualidade e carregamento rápido.",
    images: [image("1565849904461-04a58ad377e0")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000008", company_id: demoCompany.id, slug: "motorola-moto-g84-256gb",
    category: "Celular", brand: "Motorola", model: "Moto G84", storage: "256GB", color: "Azul",
    condition: "Seminovo", price: 1299, stock: 2, battery_health: null, warranty: "90 dias",
    description: "Armazenamento amplo e boa autonomia para a rotina.",
    images: [image("1585060544812-6b45742d762f")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000009", company_id: demoCompany.id, slug: "xiaomi-redmi-note-13-256gb",
    category: "Celular", brand: "Xiaomi", model: "Redmi Note 13", storage: "256GB", color: "Preto",
    condition: "Novo", price: 1599, stock: 5, battery_health: null, warranty: "12 meses",
    description: "Tela fluida, bastante espaço e bateria de longa duração.",
    images: [image("1574944985070-8f3ebc6b79d2")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000010", company_id: demoCompany.id, slug: "xiaomi-poco-x6-256gb",
    category: "Celular", brand: "Xiaomi", model: "Poco X6", storage: "256GB", color: "Branco",
    condition: "Seminovo", price: 1899, stock: 1, battery_health: null, warranty: "90 dias",
    description: "Desempenho forte para jogos e multitarefa, em condição seminova.",
    images: [image("1556656793-08538906a9f8")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000011", company_id: demoCompany.id, slug: "macbook-air-m3-256gb",
    category: "MacBook", brand: "Apple", model: "MacBook Air M3", storage: "256GB", color: "Meia-noite",
    condition: "Seminovo", price: 7299, stock: 1, battery_health: 96, warranty: "90 dias",
    description: "MacBook demonstrativo com chip M3, design leve e excelente autonomia para trabalho e estudos.",
    images: [image("1517336714731-489689fd1ca8")], primary_image: 0, featured: true, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000012", company_id: demoCompany.id, slug: "macbook-pro-m3-512gb",
    category: "MacBook", brand: "Apple", model: "MacBook Pro M3", storage: "512GB", color: "Cinza-espacial",
    condition: "Novo", price: 11999, stock: 1, battery_health: 100, warranty: "12 meses",
    description: "MacBook demonstrativo de alto desempenho, com tela de alta definição e acabamento premium.",
    images: [image("1517336714731-489689fd1ca8")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000013", company_id: demoCompany.id, slug: "notebook-dell-inspiron-15-512gb",
    category: "Notebook", brand: "Dell", model: "Inspiron 15", storage: "512GB", color: "Prata",
    condition: "Novo", price: 3899, stock: 2, battery_health: null, warranty: "12 meses",
    description: "Notebook demonstrativo com SSD rápido, tela ampla e configuração equilibrada para a rotina.",
    images: [image("1496181133206-80ce9b88a853")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
  {
    id: "10000000-0000-4000-8000-000000000014", company_id: demoCompany.id, slug: "notebook-lenovo-ideapad-3-256gb",
    category: "Notebook", brand: "Lenovo", model: "IdeaPad 3", storage: "256GB", color: "Cinza",
    condition: "Seminovo", price: 2499, stock: 1, battery_health: null, warranty: "90 dias",
    description: "Notebook demonstrativo revisado, indicado para estudos, navegação e tarefas profissionais.",
    images: [image("1496181133206-80ce9b88a853")], primary_image: 0, featured: false, hidden: false, created_at: now, updated_at: now,
  },
];
