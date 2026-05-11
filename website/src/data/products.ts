export type ProductStatus = "available" | "new" | "coming-soon" | "prototype";
export type ProductCategory = "shelter" | "hydration" | "feeding";

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
  tagline: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  capacity: string;
  subtitle: string;
  specs: ProductSpec[];
  downloads: ProductDownload[];
  tags: string[];
}

export const products: Product[] = [
  {
    slug: "cozy-shelter",
    name: "Cozy Shelter",
    tagline: "«Уютный» — компактный домик на 1–2 кота",
    description:
      "Тёплое убежище из листа фанеры. Два входа, защита от ветра, минимальный набор инструмента.",
    category: "shelter",
    status: "available",
    capacity: "1–2 кота",
    subtitle: "Фанера 3 / 6 мм · DXF + PDF",
    specs: [
      { label: "размер", value: "40 × 40 × 30 см" },
      { label: "материал", value: "фанера 3 или 6 мм" },
      { label: "время сборки", value: "~ 2 часа" },
      { label: "инструмент", value: "лобзик или CNC" },
    ],
    downloads: [
      {
        variant: "6mm",
        label: "Фанера 6 мм",
        file: "/files/SafePawsCozyShelter.zip",
        size: "2.4 MB",
        recommended: true,
      },
      {
        variant: "3mm",
        label: "Фанера 3 мм",
        file: "/files/SafePawsCozyShelter.zip",
        size: "2.1 MB",
      },
    ],
    tags: ["укрытие", "фанера", "open source"],
  },
  {
    slug: "family-shelter",
    name: "Family Shelter",
    tagline: "«Семейный» — просторный дом на 4–5 котов",
    description:
      "Большое укрытие для целой колонии. Отдельные отсеки, утеплённые стены, удобный доступ для чистки.",
    category: "shelter",
    status: "available",
    capacity: "4–5 котов",
    subtitle: "Фанера 3 / 6 мм · DXF + PDF",
    specs: [
      { label: "размер", value: "80 × 50 × 45 см" },
      { label: "материал", value: "фанера 6 мм" },
      { label: "время сборки", value: "~ 4 часа" },
      { label: "инструмент", value: "CNC рекомендован" },
    ],
    downloads: [
      {
        variant: "6mm",
        label: "Фанера 6 мм",
        file: "/files/SafePawsFamilyShelter.zip",
        size: "3.1 MB",
        recommended: true,
      },
      {
        variant: "3mm",
        label: "Фанера 3 мм",
        file: "/files/SafePawsFamilyShelter.zip",
        size: "2.8 MB",
      },
    ],
    tags: ["укрытие", "фанера", "open source"],
  },
  {
    slug: "purrtap",
    name: "PurrTap",
    tagline: "Незамерзающая поилка из пластиковой бутылки",
    description:
      "Простая поилка из бутылки. Инструкция на 1 страницу. Можно собрать за 20 минут.",
    category: "hydration",
    status: "new",
    capacity: "1–5 котов",
    subtitle: "Поилка для двора · инструкция",
    specs: [
      { label: "время сборки", value: "20 минут" },
      { label: "материал", value: "бутылка + крепёж" },
      { label: "инструмент", value: "нож, дрель" },
      { label: "стоимость", value: "< 100 руб." },
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
  },
  {
    slug: "edc-feeder",
    name: "EDC Feeder",
    tagline: "Портативная кормушка (3D-печать)",
    description:
      "Компактная кормушка для разовой выкладки корма. Печатается на обычном FDM-принтере.",
    category: "feeding",
    status: "coming-soon",
    capacity: "1–3 кота",
    subtitle: "Портативная кормушка",
    specs: [
      { label: "материал", value: "PETG / ABS" },
      { label: "время печати", value: "~ 3 часа" },
      { label: "инструмент", value: "3D-принтер" },
      { label: "статус", value: "в разработке" },
    ],
    downloads: [],
    tags: ["кормление", "3D-печать", "скоро"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.status === "available" || p.status === "new");
}
