// lib/ApiService.ts


// Buscar usuários ativos dos tipos "ADMIN" ou "GESTOR", paginados
// await ApiService.get("/api/usuarios", {
//   tipo: ["ADMIN", "GESTOR"],
//   ativo: true,
//   page: 1,
//   limit: 20,
// });

export class ApiService {
  static async get<T>(url: string, filters?: Record<string, any>): Promise<T> {
    const query = filters ? this.toQueryString(filters) : "";
    const fullUrl = query ? `${url}?${query}` : url;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  static async post<T, R = T>(url: string, data: T): Promise<R> {
    const response = await fetch(url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<R>(response);
  }

  static async put<T, R = T>(url: string, data: T): Promise<R> {
    const response = await fetch(url, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<R>(response);
  }

  static async delete<T = unknown>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  private static getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
    };
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Erro ao conectar com o servidor");
    }
    return response.json();
  }

  private static toQueryString(params: Record<string, any>): string {
    const queryParts: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;

      // Suporta múltiplos valores por chave (array)
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v !== null && v !== undefined && v !== "") {
            queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
          }
        });
      } else {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    });

    return queryParts.join("&");
  }
}
