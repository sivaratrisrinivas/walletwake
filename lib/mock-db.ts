export const MOCK_PRODUCTS = [
    {
        itemId: "v1|123456789|0",
        title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
        price: { value: "249.00", currency: "USD" },
        image: { imageUrl: "https://i.ebayimg.com/images/g/c~8AAOSw~xJj3~2~/s-l1600.jpg" },
        itemWebUrl: "https://www.ebay.com/itm/123456789"
    },
    {
        itemId: "v1|987654321|0",
        title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
        price: { value: "348.00", currency: "USD" },
        image: { imageUrl: "https://i.ebayimg.com/images/g/-McAAOSwDCRj~3~4/s-l1600.jpg" },
        itemWebUrl: "https://www.ebay.com/itm/987654321"
    },
    {
        itemId: "v1|555555555|0",
        title: "Nintendo Switch OLED Model - White",
        price: { value: "349.99", currency: "USD" },
        image: { imageUrl: "https://i.ebayimg.com/images/g/J~gAAOSw~xJj3~2~/s-l1600.jpg" },
        itemWebUrl: "https://www.ebay.com/itm/555555555"
    },
    {
        itemId: "v1|111111111|0",
        title: "Instant Ramen Noodle Value Pack (24 Count)",
        price: { value: "12.50", currency: "USD" },
        image: { imageUrl: "https://i.ebayimg.com/images/g/K~gAAOSw~xJj3~2~/s-l1600.jpg" },
        itemWebUrl: "https://www.ebay.com/itm/111111111"
    }
];

export async function searchMockProducts(query: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        lowerQuery === "all"
    );
}