"use client";

import { useCallback, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  width?: string;
}

interface createButtonsLabelsObject {
  path: string;
  label: string;
  color?: string;
}

interface FilterConfig {
  key: string;
  label: string;
  type: "text" | "select";
  options?: { value: string; label: string }[];
}

interface GenericListPageProps<T extends { id?: string }> {
  title: string;
  queryParams?: Record<string, string>;
  endpoint: string;
  columns: Column<T>[];
  createButtonsLabels?: createButtonsLabelsObject[] | string;
  filtersConfig?: FilterConfig[];
  createButtonLabel?: string;
  rowActions?: (item: T, reload: () => void) => ReactNode;
}

export default function GenericListPage<T extends { id?: string }>({
  title,
  endpoint,
  queryParams = {},
  columns,
  createButtonsLabels,
  filtersConfig = [],
  createButtonLabel,
  rowActions,
}: GenericListPageProps<T>) {
  const router = useRouter();
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  // estado dos filtros dinâmicos
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...filters,
      }).toString();

      const extraParams = new URLSearchParams(queryParams).toString();
      const fullQuery = [query, extraParams].filter(Boolean).join("&");
      const res = await fetch(`${endpoint}?${fullQuery}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setItems(data.data || data || []);
      setTotal(data.pagination?.total || data.length || 0);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  }, [endpoint, page, limit, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (key: string, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Botões de criação
  const createButtons = Array.isArray(createButtonsLabels) ? (
    <div className="flex gap-2">
      {(createButtonsLabels as createButtonsLabelsObject[]).map((bp, idx) => (
        <Button
          key={idx}
          onClick={() => router.push(`${bp.path}/criar`)}
          className={bp.color ? bp.color : "bg-green-600 text-white"}
        >
          {bp.label}
        </Button>
      ))}
    </div>
  ) : (
    <Button
      onClick={() => router.push(`${createButtonsLabels}/criar`)}
      className="bg-green-600 text-white"
    >
      {createButtonLabel}
    </Button>
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 bg-blue-500 p-4 rounded">
        <h1 className="text-xl font-bold text-gray-100">{title}</h1>
        {createButtons}
      </div>

      <Card className="bg-white border-none">
        <CardHeader>
          {/* Filtros dinâmicos */}
          {filtersConfig.length > 0 && (
            <div className="flex gap-4 mb-4">
              {filtersConfig.map((f) => (
                <div key={f.key} className="flex flex-col">
                  <label className="text-sm font-nomal mb-1">{f.label}</label>
                  {f.type === "text" ? (
                    <Input
                      className="h-8 text-sm px-2 w-[160px]" // <-- reduzido
                      value={filters[f.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(f.key, e.target.value)
                      }
                      placeholder={`Filtrar por ${f.label}`}
                    />
                  ) : (
                    <Select
                      value={filters[f.key] || ""}
                      onValueChange={(v) => handleFilterChange(f.key, v)}
                    >
                      <SelectTrigger className="h-8 text-sm px-2 w-[160px]">
                        <SelectValue placeholder={`Selecione ${f.label}`} />
                      </SelectTrigger>
                      <SelectContent className="text-sm">
                        {f.options?.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            className="text-sm py-1"
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, i) => (
                  <TableHead className=" " key={i} style={{ width: col.width }}>
                    {col.header}
                  </TableHead>
                ))}
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, idx) => (
                <TableRow
                  key={idx}
                  className="text-gray-500 text-sx text-[11px] font-normal"
                >
                  {columns.map((col, i) => (
                    <TableCell key={i}>{col.accessor(item)}</TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {rowActions && rowActions(item, fetchData)}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginação */}
          <div className="flex justify-between items-center mt-4">
            <span>
              Página {page} de {Math.ceil(total / limit)}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="secondary"
                disabled={page * limit >= total}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
