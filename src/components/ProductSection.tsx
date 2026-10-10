// import Link from "next/link";

// interface IProduct {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon: string;
//   unit: string;
//   image: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: {
//     dir: "up" | "down";
//     pct: number;
//   };
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

// const ProductCard = ({ product }: { product: IProduct }) => {
//   const isUp = product.change.dir === "up";

//   return (
//     <Link
//       href={`/product/${product.slug}`}
//       className="group block"
//     >
//       <div className="relative min-h-38 rounded-2xl bg-white px-5 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-md">

        
//         <div className="flex items-start gap-3">

          
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center">
//             <span className="text-2xl">
//               {product.image || product.categoryIcon}
//             </span>
//           </div>

//           <div className="min-w-0">
//             <h3 className="truncate text-base font-bold text-[#172033]">
//               {product.nameBn}
//             </h3>

//             <p className="mt-0.5 text-xs text-gray-400">
//               {getUnitText(product.unit)}
//             </p>
//           </div>
//         </div>

        
//         <div className="mt-7 flex items-end justify-between gap-3">

          
//           <div>
//             <p className="text-xs text-gray-400">
//               আজকের দাম
//             </p>

//             <p className="mt-1 text-xl font-bold text-[#172033] sm:text-2xl">
//               {product.today.toLocaleString("bn-BD")}
//               <span className="ml-1 text-sm font-medium">
//                 টাকা
//               </span>
//             </p>
//           </div>

          
//           <div
//             className={`mb-1 flex shrink-0 items-center gap-1 text-xs font-semibold ${
//               isUp ? "text-[#D14A68]" : "text-[#238A8A]"
//             }`}
//           >
//             <span>
//               {isUp ? "▲" : "▼"}
//             </span>

//             <span>
//               {product.change.pct.toLocaleString("bn-BD")}%
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// const ProductGrid = ({ products }: { products: IProduct[] }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//         />
//       ))}
//     </div>
//   );
// };

// const ProductSections = async () => {
//   const res = await fetch(
//     "https://api.api-store.workers.dev/api/bazardor/products",
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Products data fetch failed");
//   }

//   const products: IProduct[] = await res.json();



//   const risingProducts = products
//     .filter((product) => product.change.dir === "up")
//     .sort((a, b) => b.change.pct - a.change.pct)
//     .slice(0, 6);

  

//   const fallingProducts = products
//     .filter((product) => product.change.dir === "down")
//     .sort((a, b) => b.change.pct - a.change.pct)
//     .slice(0, 6);

//   return (
//     <section className="w-full bg-[#F7F7F3] py-10 sm:py-12 lg:py-14">

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      

//         <section className="mb-12">

//           {/* Section title */}
//           <div className="mb-5 flex items-center gap-2">

//             <span className="text-sm text-[#D14A68]">
//               ▲
//             </span>

//             <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
//               আজ দাম বেড়েছে
//             </h2>

//           </div>

//           <ProductGrid products={risingProducts} />

//         </section>


        

//         <section className="mb-12">

//           {/* Section title */}
//           <div className="mb-5 flex items-center gap-2">

//             <span className="text-sm text-[#238A8A]">
//               ▼
//             </span>

//             <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
//               আজ দাম কমেছে
//             </h2>

//           </div>

//           {/* Product cards */}
//           <ProductGrid products={fallingProducts} />

//         </section>


  

//         <section id="সব-পণ্য">

      
//           <div className="mb-5">

//             <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
//               সব পণ্য
//             </h2>

//             <p className="mt-1 text-sm text-gray-400">
//               বাজারের সব পণ্যের আজকের সর্বশেষ দাম
//             </p>

//           </div>

         
//           <ProductGrid products={products} />

//         </section>

//       </div>

//     </section>
//   );
// };

// export default ProductSections;
















import Link from "next/link";

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
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

const ProductCard = ({ product }: { product: IProduct }) => {
  const isUp = product.change?.dir === "up";

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative min-h-38 rounded-2xl bg-white px-5 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <span className="text-2xl">
              {product.image || product.categoryIcon}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-[#172033]">
              {product.nameBn}
            </h3>

            <p className="mt-0.5 text-xs text-gray-400">
              {getUnitText(product.unit)}
            </p>
          </div>
        </div>

        <div className="mt-7 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">আজকের দাম</p>

            <p className="mt-1 text-xl font-bold text-[#172033] sm:text-2xl">
              {product.today.toLocaleString("bn-BD")}
              <span className="ml-1 text-sm font-medium">টাকা</span>
            </p>
          </div>

          <div
            className={`mb-1 flex shrink-0 items-center gap-1 text-xs font-semibold ${
              isUp ? "text-[#D14A68]" : "text-[#238A8A]"
            }`}
          >
            <span>{isUp ? "▲" : "▼"}</span>
            <span>
              {product.change?.pct.toLocaleString("bn-BD") ?? "০"}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductGrid = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductSections = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Products data fetch failed");
  }

  const response = await res.json();

  const products: IProduct[] = Array.isArray(response)
    ? response
    : response.data ?? [];

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="w-full bg-[#F7F7F3] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-sm text-[#D14A68]">▲</span>
            <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <ProductGrid products={risingProducts} />
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-sm text-[#238A8A]">▼</span>
            <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
              আজ দাম কমেছে
            </h2>
          </div>

          <ProductGrid products={fallingProducts} />
        </section>

        <section id="সব-পণ্য">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#172033] sm:text-xl">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              বাজারের সব পণ্যের আজকের সর্বশেষ দাম
            </p>
          </div>

          <ProductGrid products={products} />
        </section>
      </div>
    </section>
  );
};

export default ProductSections;
