export type ProductStatus = "available" | "coming-soon";
export type ProductCategory = "shelter" | "hydration" | "feeding";
export type ProductMaterial = "wood" | "plastic" | "metal" | "recycled";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDownload {
  variant: string;
  label: string;
  file: string;
  size: string;
  recommended?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  capacity: string;
  subtitle: string;
  specs: ProductSpec[];
  downloads: ProductDownload[];
  tags: string[];
  images: string[];
  materials: ProductMaterial[];
}

export const products: Product[] = [
  {
    slug: "cozy-shelter",
    name: "Cozy Shelter",
    description: "Тёплое убежище из листа фанеры. Два входа, защита от ветра, минимальный набор инструмента.",
    category: "shelter",
    status: "available",
    capacity: "1–2 кота",
    subtitle: "Компактный домик с утепленными стенками для нескольких котов",
    specs: [
      { label: "Размер", value: "40 × 40 × 30 см" },
      { label: "Материал", value: "Фанера / Оргстекло" },
      { label: "Время сборки", value: "~ 2 часа" },
      { label: "Стоимость изготовления", value: "~100 BYN" },
    ],
    downloads: [
      {
        variant: "3mm",
        label: "Фанера 3 мм",
        file: "/files/SafePawsCozyShelter.zip",
        size: "2.4 MB",
        recommended: true,
      },
      {
        variant: "6mm",
        label: "Фанера 6 мм",
        file: "/files/SafePawsCozyShelter.zip",
        size: "2.1 MB",
      },
    ],
    tags: ["укрытие", "фанера", "open source"],
    materials: ["wood"],
    images: [
      "/images/products/cozy-shelter/img1.jpg",
      "/images/products/cozy-shelter/img2.jpg",
      "/images/products/cozy-shelter/img3.jpg",
      "/images/products/cozy-shelter/img4.jpg",
    ],
  },
  {
    slug: "family-shelter",
    name: "Family Shelter",
    description: "Большое укрытие для целой колонии. Отдельные отсеки, утеплённые стены, удобный доступ для чистки.",
    category: "shelter",
    status: "available",
    capacity: "3–5 котов",
    subtitle: "Вместитетльный домик для кошачей семьи с защитой от ветра и холода",
    specs: [
      { label: "Размер", value: "80 × 50 × 45 см" },
      { label: "Материал", value: "Фанера / Оргстекло" },
      { label: "Время сборки", value: "~ 2 часа" },
      { label: "Стоимость изготовления", value: "~150 BYN" },
    ],
    downloads: [
      {
        variant: "3mm",
        label: "Фанера 3 мм",
        file: "/files/SafePawsFamilyShelter.zip",
        size: "3.1 MB",
        recommended: true,
      },
      {
        variant: "6mm",
        label: "Фанера 6 мм",
        file: "/files/SafePawsFamilyShelter.zip",
        size: "2.8 MB",
      },
    ],
    tags: ["укрытие", "фанера", "open source"],
    materials: ["wood"],
    images: [
      "/images/products/family-shelter/img1.jpg",
      "/images/products/family-shelter/img2.jpg",
      "/images/products/family-shelter/img3.jpg",
      "/images/products/family-shelter/img4.jpg",
    ],
  },
  {
    slug: "purrtap",
    name: "PurrTap",
    description: "Простая поилка из бутылки. Инструкция на 1 страницу. Можно собрать за 20 минут.",
    category: "hydration",
    status: "coming-soon",
    capacity: "много котов",
    subtitle: "Уличная поилка из 3Д-печатного основания и бутылки",
    specs: [
      { label: "Время сборки", value: "10 минут" },
      { label: "Материалы", value: "PETG/ABS пластик" },
      { label: "Инструмент", value: "3Д-принтер" },
      { label: "Стоимость изготовления", value: "~40 BYN" },
    ],
    downloads: [
      {
        variant: "pdf",
        label: "Инструкция PDF",
        file: "/files/SafePawsAssemblyManual.pdf",
        size: "0.8 MB",
        recommended: true,
      },
    ],
    tags: ["поилка", "бутылка", "быстро"],
    materials: ["plastic"],
    images: [
      "/images/products/purrtap/img1.jpg",
      "/images/products/purrtap/img2.jpg",
      "/images/products/purrtap/img3.jpg",
      "/images/products/purrtap/img4.jpg",
    ],
  },
  {
    slug: "edc-feeder",
    name: "EDC Feeder",
    description: "Компактная кормушка для разовой выкладки корма. Печатается на обычном FDM-принтере.",
    category: "feeding",
    status: "coming-soon",
    capacity: "много котов",
    subtitle: "Карманная кормушка-дозатор для корма",
    specs: [
      { label: "Материал", value: "PETG / ABS" },
      { label: "Время печати", value: "~ 3 часа" },
      { label: "Инструмент", value: "3D-принтер" },
      { label: "Стоимость изготовления", value: "~40 BYN" },
    ],
    downloads: [],
    tags: ["кормление", "3D-печать", "скоро"],
    materials: ["plastic"],
    images: [
      "/images/products/edc-feeder/img1.jpg",
      "/images/products/edc-feeder/img2.jpg",
      "/images/products/edc-feeder/img3.jpg",
      "/images/products/edc-feeder/img4.jpg",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.status === "available");
}
