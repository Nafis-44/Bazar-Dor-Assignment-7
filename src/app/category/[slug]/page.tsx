// import Link from "next/link";

// interface IProduct {
//   id: number;
//   slug: string;
//   nameBn: string;
//   unit: string;
//   image: string;
//   today: number;
//   change: {
//     dir: "up" | "down" | "same";
//     pct: number;
//   };
// }

// interface ICategory {
//   nameBn: string;
//   icon: string;
// }

// const getUnitText = (unit: string) => {
//   switch (unit.toLowerCase()) {
//     case "kg":
//       return "প্রতি কেজি";
//     case "g":
//       return "প্রতি গ্রাম";
//     case "liter":
//     case "litre":
//     case "l":
//       return "প্রতি লিটার";
//     case "dozen":
//       return "প্রতি ডজন";
//     case "piece":
//     case "pcs":
//       return "প্রতি পিস";
//     default:
//       return `প্রতি ${unit}`;
//   }
// };

// const CategoryPage = async ({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) => {
//   const { slug } = await params;

//   const categoryRes = await fetch(
//     `https://api.api-store.workers.dev/api/bazardor/categories/${slug}`,
//     { cache: "no-store" }
//   );

//   const productRes = await fetch(
//     `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`,
//     { cache: "no-store" }
//   );

//   if (!categoryRes.ok || !productRes.ok) {
//     return (
//       <main className="min-h-screen bg-white px-5 py-20 text-center">
//         <h1 className="text-2xl font-bold">ক্যাটাগরি পাওয়া যায়নি</h1>

//         <Link
//           href="/"
//           className="mt-5 inline-block rounded-full bg-black px-5 py-2 text-white"
//         >
//           হোমে ফিরে যান
//         </Link>
//       </main>
//     );
//   }

//   const category: ICategory = await categoryRes.json();
//   const products: IProduct[] = await productRes.json();

//   return (
//     <main className="min-h-screen bg-white py-10">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         <div className="mb-8">
//           <div className="flex items-center gap-3">
//             <span className="text-4xl">{category.icon}</span>

//             <div>
//               <h1 className="text-2xl font-bold text-[#172033] sm:text-3xl">
//                 {category.nameBn}
//               </h1>

//               <p className="mt-1 text-sm text-gray-400">
//                 {category.nameBn} বিভাগের সব পণ্যের আজকের দাম
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6 flex items-center justify-between">
//           <p className="text-sm text-gray-400">
//             মোট {products.length}টি পণ্য
//           </p>

//           <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#172033] outline-none">
//             <option>সাজানো: ডিফল্ট</option>
//             <option>দাম: কম থেকে বেশি</option>
//             <option>দাম: বেশি থেকে কম</option>
//           </select>
//         </div>

        
//         {products.length === 0 ? (
//           <div className="rounded-2xl bg-[#F7F7F3] px-6 py-16 text-center">
//             <p className="text-sm text-gray-400">
//               এই ক্যাটাগরিতে কোনো পণ্য নেই
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

//             {products.map((product) => {
//               const isUp = product.change.dir === "up";
//               const isSame = product.change.dir === "same";

//               return (
//                 <Link
//                   key={product.id}
//                   href={`/product/${product.slug}`}
//                   className="group block"
//                 >
//                   <div className="relative min-h-39 rounded-2xl bg-[#F7F7F3] px-5 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-md">

              
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex items-start gap-3">
//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center text-3xl">
//                           {product.image}
//                         </div>

//                         <div>
//                           <h3 className="text-base font-bold text-[#172033]">
//                             {product.nameBn}
//                           </h3>

//                           <p className="mt-0.5 text-xs text-gray-400">
//                             {getUnitText(product.unit)}
//                           </p>
//                         </div>
//                       </div>

                     
//                       <div
//                         className={`flex shrink-0 items-center gap-1 text-xs font-semibold ${
//                           isSame
//                             ? "text-gray-400"
//                             : isUp
//                             ? "text-[#D14A68]"
//                             : "text-[#238A8A]"
//                         }`}
//                       >
//                         <span>{isSame ? "▼" : isUp ? "▲" : "▼"}</span>
//                         <span>
//                           {product.change.pct.toLocaleString("bn-BD")}%
//                         </span>
//                       </div>
//                     </div>

//                     <div className="mt-7 flex items-end justify-between gap-3">
//                       <div>
//                         <p className="text-xs text-gray-400">
//                           আজকের দাম
//                         </p>

//                         <p className="mt-1 text-xl font-bold text-[#172033] sm:text-2xl">
//                           {product.today.toLocaleString("bn-BD")}
//                           <span className="ml-1 text-sm font-medium">
//                             টাকা
//                           </span>
//                         </p>
//                       </div>
//                     </div>

//                   </div>
//                 </Link>
//               );
//             })}

//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default CategoryPage;













import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

interface ICategory {
  nameBn: string;
  icon: string;
}

const getUnitText = (unit: string) => {
  switch (unit.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "g":
      return "প্রতি গ্রাম";
    case "liter":
    case "litre":
    case "l":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pcs":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
};

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const categoryRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
    { cache: "no-store" }
  );

  const productRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
    { cache: "no-store" }
  );

  if (!categoryRes.ok || !productRes.ok) {
    return (
      <main className="min-h-screen bg-white px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">
          ক্যাটাগরি পাওয়া যায়নি
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

  const category: ICategory = await categoryRes.json();
  const products: IProduct[] = await productRes.json();

  return (
    <main className="min-h-screen bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>

            <div>
              <h1 className="text-2xl font-bold text-[#172033] sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                {category.nameBn} বিভাগের সব পণ্যের আজকের দাম
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            মোট {products.length}টি পণ্য
          </p>

          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#172033] outline-none">
            <option>সাজানো: ডিফল্ট</option>
            <option>দাম: কম থেকে বেশি</option>
            <option>দাম: বেশি থেকে কম</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-[#F7F7F3] px-6 py-16 text-center">
            <p className="text-sm text-gray-400">
              এই ক্যাটাগরিতে কোনো পণ্য নেই
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const isUp = product.change.dir === "up";
              const isSame = product.change.dir === "same";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group block"
                >
                  <div className="relative min-h-39 rounded-2xl bg-[#F7F7F3] px-5 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-3xl">
                          {product.image}
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-[#172033]">
                            {product.nameBn}
                          </h3>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {getUnitText(product.unit)}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex shrink-0 items-center gap-1 text-xs font-semibold ${
                          isSame
                            ? "text-gray-400"
                            : isUp
                            ? "text-[#D14A68]"
                            : "text-[#238A8A]"
                        }`}
                      >
                        <span>{isSame ? "▼" : isUp ? "▲" : "▼"}</span>
                        <span>
                          {product.change.pct.toLocaleString("bn-BD")}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-7 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-400">
                          আজকের দাম
                        </p>

                        <p className="mt-1 text-xl font-bold text-[#172033] sm:text-2xl">
                          {product.today.toLocaleString("bn-BD")}
                          <span className="ml-1 text-sm font-medium">
                            টাকা
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;











