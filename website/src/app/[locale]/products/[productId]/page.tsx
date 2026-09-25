import { ProductDetailsWithCart } from "./product-details-with-cart";

export default async function ProductDetailsRoute({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ProductDetailsWithCart productId={productId} />;
}
