export const MOCK_PRODUCTS = [
  // TECH
  {
    itemId: "v1|1234567890|0",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: { value: "348.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|ps5-console|0",
    title: "Sony PlayStation 5 Console (Disc Edition)",
    price: { value: "499.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|macbook-pro|0",
    title: "Apple MacBook Pro 14-inch M3 Max",
    price: { value: "3199.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|rtx-4090|0",
    title: "NVIDIA GeForce RTX 4090 Graphics Card",
    price: { value: "1599.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },

  // LUXURY
  {
    itemId: "v1|gucci-slides|0",
    title: "Gucci Men's Web Slide Sandal",
    price: { value: "450.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|rolex-sub|0",
    title: "Rolex Submariner Date 41mm",
    price: { value: "14500.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },

  // IMPULSE SNACKS / ALTERNATIVES
  {
    itemId: "v1|ramen-bulk|0",
    title: "Maruchan Instant Lunch (Pack of 24)",
    price: { value: "12.50", currency: "USD" },
    // Use a clear image of noodles
    image: { imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|airfryer|0",
    title: "Ninja Air Fryer, 4 Qt",
    price: { value: "89.95", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1626162976698-466d62d04a6e?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|lego-falcon|0",
    title: "LEGO Star Wars Millennium Falcon",
    price: { value: "849.99", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  },
  {
    itemId: "v1|fender-strat|0",
    title: "Fender Player Stratocaster Electric Guitar",
    price: { value: "799.00", currency: "USD" },
    image: { imageUrl: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=500&q=80" },
    itemWebUrl: "#"
  }
];

export async function searchMockProducts(query: string) {
  const lowerQuery = query.toLowerCase();

  if (query === 'all' || query === '') {
    return MOCK_PRODUCTS;
  }

  return MOCK_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(lowerQuery)
  );
}