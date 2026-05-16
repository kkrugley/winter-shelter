import type { ProductMaterialsConfig } from '@/data/materials';

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
  materialsConfig?: ProductMaterialsConfig;
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
      { variant: "3mm", label: "Фанера 3 мм", file: "/files/SafePawsCozyShelter.zip", size: "2.4 MB", recommended: true },
      { variant: "6mm", label: "Фанера 6 мм", file: "/files/SafePawsCozyShelter.zip", size: "2.1 MB" },
    ],
    tags: ["укрытие", "фанера", "лазерная резка"],
    materials: ["wood"],
    images: [
      "/images/products/cozy-shelter/img1.jpg",
      "/images/products/cozy-shelter/img2.jpg",
      "/images/products/cozy-shelter/img3.jpg",
      "/images/products/cozy-shelter/img4.jpg",
    ],
    materialsConfig: {
      qtyMax: 10,
      supportsThickness: true,
      defaultThickness: '6',
      timePerUnit: 2,
      items: [
        { id: 'sheet',      label: 'Лист фанеры',        spec: '1525×1525 мм',             unit: 'лист', perUnit: 1,   priceByThickness: { '3': 32, '6': 56 }, scrapFactor: 4 },
        { id: 'screws',     label: 'Саморезы по дереву', spec: '3.5 × 25 мм',              unit: 'шт',   perUnit: 24,  price: 0.45 },
        { id: 'glue',       label: 'Клей ПВА столярный', spec: 'класс D3',                 unit: 'мл',   perUnit: 100, price: 0.045 },
        { id: 'insulation', label: 'Утеплитель',         spec: 'газеты / синтепон',        unit: 'м²',   perUnit: 0.5, price: 6,    optional: true, defaultOn: true },
        { id: 'paint',      label: 'Пропитка',           spec: 'водоотталк. для дерева',   unit: 'мл',   perUnit: 150, price: 0.04, optional: true, defaultOn: false },
        { kind: 'service', id: 'cnc', label: 'Лазерная резка', spec: 'раскрой деталей в мастерской', unit: 'изд.', perUnit: 1, price: 15, optional: true, defaultOn: false },
      ],
    },
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
      { variant: "3mm", label: "Фанера 3 мм", file: "/files/SafePawsFamilyShelter.zip", size: "3.1 MB", recommended: true },
      { variant: "6mm", label: "Фанера 6 мм", file: "/files/SafePawsFamilyShelter.zip", size: "2.8 MB" },
    ],
    tags: ["укрытие", "фанера", "лазерная резка"],
    materials: ["wood"],
    images: [
      "/images/products/family-shelter/img1.jpg",
      "/images/products/family-shelter/img2.jpg",
      "/images/products/family-shelter/img3.jpg",
      "/images/products/family-shelter/img4.jpg",
    ],
    materialsConfig: {
      qtyMax: 8,
      supportsThickness: true,
      defaultThickness: '6',
      timePerUnit: 2,
      items: [
        { id: 'sheet',      label: 'Лист фанеры',        spec: '1525×1525 мм',             unit: 'лист', perUnit: 2,   priceByThickness: { '3': 32, '6': 56 }, scrapFactor: 3 },
        { id: 'screws',     label: 'Саморезы по дереву', spec: '3.5 × 25 мм',              unit: 'шт',   perUnit: 40,  price: 0.45 },
        { id: 'glue',       label: 'Клей ПВА столярный', spec: 'класс D3',                 unit: 'мл',   perUnit: 180, price: 0.045 },
        { id: 'insulation', label: 'Утеплитель',         spec: 'газеты / синтепон',        unit: 'м²',   perUnit: 1.2, price: 6,    optional: true, defaultOn: true },
        { id: 'paint',      label: 'Пропитка',           spec: 'водоотталк. для дерева',   unit: 'мл',   perUnit: 250, price: 0.04, optional: true, defaultOn: false },
        { kind: 'service', id: 'cnc', label: 'Лазерная резка', spec: 'раскрой деталей в мастерской', unit: 'изд.', perUnit: 1, price: 25, optional: true, defaultOn: false },
      ],
    },
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
      { variant: "pdf", label: "Инструкция PDF", file: "/files/SafePawsAssemblyManual.pdf", size: "0.8 MB", recommended: true },
    ],
    tags: ["поилка", "бутылка", "3Д печать"],
    materials: ["plastic"],
    images: [
      "/images/products/purrtap/img1.jpg",
      "/images/products/purrtap/img2.jpg",
      "/images/products/purrtap/img3.jpg",
      "/images/products/purrtap/img4.jpg",
    ],
    materialsConfig: {
      qtyMax: 12,
      supportsThickness: false,
      timePerUnit: 3,
      items: [
        { id: 'filament', label: 'Филамент PETG',      spec: '1.75 мм',             unit: 'г',   perUnit: 80,  price: 0.14 },
        { id: 'bottle',   label: 'Бутылка ПЭТ',        spec: '1.5 л · можно б/у',  unit: 'шт',  perUnit: 1,   price: 0 },
        { id: 'bolt',     label: 'Винты М3',            spec: 'М3 × 20 + гайки',    unit: 'шт',  perUnit: 4,   price: 0.35 },
        { id: 'paint',    label: 'УФ-стойкая краска',  spec: 'для двора',           unit: 'мл',  perUnit: 30,  price: 0.08, optional: true, defaultOn: false },
        { kind: 'service', id: 'print', label: '3D-печать', spec: 'услуга в мастерской', unit: 'изд.', perUnit: 1, price: 12, optional: true, defaultOn: false },
      ],
    },
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
    materialsConfig: {
      qtyMax: 12,
      supportsThickness: false,
      timePerUnit: 3,
      items: [
        { id: 'filament', label: 'Филамент PETG / ABS', spec: '1.75 мм',       unit: 'г',   perUnit: 120, price: 0.14 },
        { id: 'bolt',     label: 'Винты М3',             spec: 'М3 × 16 + гайки', unit: 'шт', perUnit: 6,   price: 0.35 },
        { id: 'magnet',   label: 'Магниты неодим.',      spec: '∅ 8 × 3 мм',   unit: 'шт',  perUnit: 2,   price: 1.2,  optional: true, defaultOn: true },
        { kind: 'service', id: 'print', label: '3D-печать', spec: 'услуга в мастерской', unit: 'изд.', perUnit: 1, price: 18, optional: true, defaultOn: false },
      ],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.status === "available");
}
