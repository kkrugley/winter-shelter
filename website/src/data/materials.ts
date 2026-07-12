export type MaterialUnit = 'лист' | 'шт' | 'мл' | 'г' | 'м²' | 'изд.';
export type LineKind = 'material' | 'service';

export interface LineItem {
  kind?: LineKind;          // defaults to 'material'
  id: string;
  label: string;
  spec: string;
  unit: MaterialUnit;
  perUnit: number;          // qty per 1 unit built
  price?: number;           // price per unit (BYN)
  priceByThickness?: { '3': number; '6': number };
  scrapFactor?: number;     // +1 spare per every N units (for sheet)
  optional?: boolean;
  defaultOn?: boolean;
}

export interface ProductMaterialsConfig {
  qtyMax: number;
  supportsThickness: boolean;
  thicknessOptions?: ('3' | '6')[];
  defaultThickness?: '3' | '6';
  timePerUnit: number;      // hours per unit built
  items: LineItem[];
}
