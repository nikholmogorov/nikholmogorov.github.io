import {
  CATEGORIES,
  PARAM_LABELS,
  PARAM_VALUE_LABELS,
} from "../model/constants";
import type { Item, ItemCategory } from "../model/item";
import { ITEM_CONFIG } from "../model/schemas";

export function getItemRevisionFields(item: Item): string[] {
  const fields = new Set<string>();
  if (!item.description?.trim()) fields.add("description");
  const schema = ITEM_CONFIG[item.category];
  const result = schema.safeParse(item.params);
  if (!result.success) {
    const knownKeys = new Set(Object.keys(schema.shape));
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && knownKeys.has(key)) {
        fields.add(key);
      }
    }
  }
  return [...fields];
}

export function doesItemNeedRevision(item: Item): boolean {
  return getItemRevisionFields(item).length > 0;
}

export function getCategoryLabel(category: string): string {
  return CATEGORIES[category as ItemCategory] ?? `Другое`;
}

type AnyFunction = (...args: never[]) => unknown;

export function debounce<T extends AnyFunction>(
  fn: T,
  ms: number,
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

const pluralRules = new Intl.PluralRules("ru-RU");
const numberFormatter = new Intl.NumberFormat("ru-RU");

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Europe/Moscow",
});

export function formatAnnouncementCount(count: number): string {
  const pluralForm = pluralRules.select(count);
  const noun =
    pluralForm === "one"
      ? "объявление"
      : pluralForm === "few"
        ? "объявления"
        : "объявлений";
  return `${numberFormatter.format(count)} ${noun}`;
}

export function formatDate(dateString: string): string {
  const parts = dateFormatter.formatToParts(new Date(dateString));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("hour")}:${get("minute")}`;
}

export function getParamLabel(category: ItemCategory, key: string): string {
  return PARAM_LABELS[category][key] ?? key;
}

export function getParamValueLabel(
  category: ItemCategory,
  key: string,
  value: string | number,
) {
  const stringValue = String(value);
  return PARAM_VALUE_LABELS[category][key]?.[stringValue] ?? stringValue;
}
