import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listProducts } from "@/lib/core/admin-data";
import { setProductActiveAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="space-y-8">
      <div>
        <Badge>Products</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">
          Product directory
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          Product records define what exists. Entitlements define who can use it.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <Card
            key={product.id}
            className="border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_46px_rgba(15,23,42,0.06)]"
          >
            <CardHeader>
              <CardDescription className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                {product.product_kind}
              </CardDescription>
              <CardTitle className="text-2xl tracking-[-0.05em]">
                {product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm leading-7 text-slate-600">
                {product.description || "No description yet."}
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                <span>{product.entitlementCount} entitlements</span>
                <span>{product.activeClientCount} active clients</span>
                <span>{product.is_active ? "Enabled" : "Disabled"}</span>
                <span>
                  {product.productConnection?.app_url
                    ? "Connection linked"
                    : "Connection not set"}
                </span>
              </div>
              <div className="rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-600">
                App URL: {product.productConnection?.app_url ?? "not configured yet"}
                <br />
                API URL: {product.productConnection?.api_url ?? "not configured yet"}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin/infrastructure"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200"
                >
                  Manage runtime links
                </Link>
                <form action={setProductActiveAction}>
                  <input type="hidden" name="productId" value={product.id} />
                  <input type="hidden" name="isActive" value={product.is_active ? "false" : "true"} />
                  <button className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    {product.is_active ? "Disable product" : "Enable product"}
                  </button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
