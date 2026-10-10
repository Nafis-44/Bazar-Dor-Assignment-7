import Link from "next/link";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: IMarket[];
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const allRes = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!allRes.ok) {
    return (
      <main className="min-h-screen bg-white px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">
          পণ্যের তথ্য পাওয়া যায়নি
        </h1>

        <Link
          href="/"
          className="mt-5 inline-block rounded-full bg-black px-5 py-2 text-white"
        >
          হোমে ফিরে যান
        </Link>
      </main>
    );
  }

  const allResponse = await allRes.json();

  const allProducts: { id: number; slug: string }[] =
    Array.isArray(allResponse)
      ? allResponse
      : allResponse.data ?? [];

  const selectedProduct = allProducts.find(
    (product) => product.slug === slug
  );

  if (!selectedProduct) {
    return (
      <main className="min-h-screen bg-white px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">
          পণ্য পাওয়া যায়নি
        </h1>

        <Link
          href="/"
          className="mt-5 inline-block rounded-full bg-black px-5 py-2 text-white"
        >
          হোমে ফিরে যান
        </Link>
      </main>
    );
  }

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${selectedProduct.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="py-20 text-center">
        Product data পাওয়া যায়নি
      </main>
    );
  }

  const productResponse = await res.json();
  const product: IProduct = productResponse.data ?? productResponse;

  const priceChange = product.today - product.yesterday;
  const changeAmount = Math.abs(priceChange);

  const minPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maxPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  return (
    <main className="min-h-screen bg-white px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-black">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${slug}`}
            className="hover:text-black"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-600">
            {product.nameBn}
          </span>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center text-5xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              প্রতি {product.unit}
            </p>

            <p
              className={`mt-4 text-sm ${
                priceChange > 0
                  ? "text-pink-500"
                  : priceChange < 0
                  ? "text-teal-500"
                  : "text-gray-400"
              }`}
            >
              {priceChange > 0
                ? `গতকালের তুলনায় আজ দাম বেড়েছে ${changeAmount.toLocaleString(
                    "bn-BD"
                  )} টাকা`
                : priceChange < 0
                ? `গতকালের তুলনায় আজ দাম কমেছে ${changeAmount.toLocaleString(
                    "bn-BD"
                  )} টাকা`
                : "গতকালের তুলনায় আজ দাম পরিবর্তন হয়নি"}
            </p>
          </div>

          <div className="sm:ml-auto sm:text-right">
            <p className="text-xs text-gray-400">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-bold">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>

            <p
              className={`mt-1 text-sm ${
                priceChange > 0
                  ? "text-pink-500"
                  : priceChange < 0
                  ? "text-teal-500"
                  : "text-gray-400"
              }`}
            >
              {priceChange > 0 ? "▲" : priceChange < 0 ? "▼" : "▼"}{" "}
              {product.change.pct}%
            </p>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-400">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-bold">
                {minPrice.toLocaleString("bn-BD")} টাকা
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-2xl font-bold">
                {maxPrice.toLocaleString("bn-BD")} টাকা
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                আজকের দাম
              </p>

              <p className="mt-2 text-2xl font-bold">
                {product.today.toLocaleString("bn-BD")} টাকা
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-163">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm text-gray-400">
                  <th className="pb-4 font-normal">
                    বাজার
                  </th>

                  <th className="pb-4 font-normal">
                    বিভাগ
                  </th>

                  <th className="pb-4 font-normal">
                    সর্বনিম্ন
                  </th>

                  <th className="pb-4 font-normal">
                    সর্বোচ্চ
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market) => (
                  <tr
                    key={market.market}
                    className="border-b border-gray-100 text-sm"
                  >
                    <td className="py-4">
                      {market.market}
                    </td>

                    <td className="py-4 text-gray-500">
                      {market.division}
                    </td>

                    <td className="py-4">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="py-4">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
