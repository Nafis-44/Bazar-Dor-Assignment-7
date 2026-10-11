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
        পণ্যের তথ্য পাওয়া যায়নি
      </main>
    );
  }

  const productResponse = await res.json();
  const product: IProduct = productResponse.data ?? productResponse;

  const priceChange = product.today - product.yesterday;
  const changeAmount = Math.abs(priceChange);
  console.log(changeAmount);

  const minPrice =
    product.markets.length > 0
      ? Math.min(...product.markets.map((market) => market.min))
      : 0;

  const maxPrice =
    product.markets.length > 0
      ? Math.max(...product.markets.map((market) => market.max))
      : 0;

  // প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবর্তী দাম
  const averagePrice =
    product.markets.length > 0
      ? product.markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / product.markets.length
      : 0;

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.slug}`}
            className="hover:text-black"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-800">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-7">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-5xl">
            {product.image || product.categoryIcon}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি {product.unit}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              {product.categoryNameBn} · বাজারভিত্তিক আজকের দাম
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 px-6 py-4 text-center sm:min-w-28">
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-2 text-sm font-semibold ${
                priceChange > 0
                  ? "text-rose-600"
                  : priceChange < 0
                    ? "text-emerald-600"
                    : "text-gray-500"
              }`}
            >
              {priceChange > 0
                ? "▲"
                : priceChange < 0
                  ? "▼"
                  : "—"}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {minPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-rose-600">
                {maxPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বোচ্চ
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {averagePrice.toLocaleString("bn-BD", {
                  maximumFractionDigits: 2,
                })}{" "}
                টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর দামের আনুমানিক গড়
              </p>
            </div>
          </div>
        </section>

        {/* Market Prices Table */}
        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-162 border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="px-3 py-4 font-medium">
                    বাজার
                  </th>
                  <th className="px-3 py-4 font-medium">
                    বিভাগ
                  </th>
                  <th className="px-3 py-4 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-4 text-right font-medium">
                    সর্বোচ্চ
                  </th>
                  <th className="px-3 py-4 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market) => {
                  const marketAverage = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-b border-gray-100 text-sm transition-colors hover:bg-gray-50"
                    >
                      <td className="px-3 py-4 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-3 py-4 text-gray-500">
                        {market.division}
                      </td>

                      <td className="px-3 py-4 text-right text-gray-700">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-3 py-4 text-right text-gray-700">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-3 py-4 text-right font-medium text-gray-800">
                        {marketAverage.toLocaleString("bn-BD", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        টাকা
                      </td>
                    </tr>
                  );
                })}

                {product.markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-gray-500"
                    >
                      বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6">
          
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;

