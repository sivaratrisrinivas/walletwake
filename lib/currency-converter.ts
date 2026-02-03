export interface Conversion {
    item: string;
    count: number;
    emoji: string;
}

const PRESETS = [
    { name: "Instant Ramen Packs", cost: 0.50, emoji: "🍜" },
    { name: "Large Coffees", cost: 5.50, emoji: "☕" },
    { name: "Hours of Min Wage Work", cost: 7.25, emoji: "👷" },
    { name: "Netflix Months", cost: 15.49, emoji: "📺" }
];

export function getConversions(price: number): Conversion[] {
    return PRESETS.map(preset => ({
        item: preset.name,
        count: Math.floor(price / preset.cost),
        emoji: preset.emoji
    }));
}