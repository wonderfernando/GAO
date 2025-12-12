"use client";

import {
  useForm,
  useWatch,
  DefaultValues,
  Path,
  FieldValues,
  PathValue,
  type UseFormSetValue,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

type FieldType = "text" | "email" | "password" | "select" | "number";

interface FormField<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: FieldType;
  options?: { label: string; value: string }[];
  hiddenOnEdit?: boolean;
}

interface GeneriPageProps<T extends FieldValues> {
  title: string;
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  formFields: FormField<T>[];
  isEditing?: boolean;
  dataToEdit?: DefaultValues<T>;
  endpoint: string;
  onSuccess: () => void;
}

export default function GeneriPage<T extends FieldValues>({
  title,
  schema,
  defaultValues,
  formFields,
  isEditing = false,
  dataToEdit,
  endpoint,
  onSuccess,
}: GeneriPageProps<T>) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    reset(isEditing && dataToEdit ? dataToEdit : defaultValues);
  }, [isEditing, dataToEdit, reset, defaultValues]);

  const onSubmit = async (data: T) => {
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro inesperado");
      }

      toast({
        title: "Sucesso",
        description: isEditing
          ? "Alterações salvas!"
          : "Cadastro realizado com sucesso!",
      });

      reset(defaultValues);
      onSuccess();
    } catch (err) {
      toast({
        title: "Erro ao enviar",
        description: err instanceof Error ? err.message : "Erro inesperado",
        variant: "destructive",
      });
    }
  };

  const onError = (formErrors: typeof errors) => {
    const messages = Object.entries(formErrors)
      .map(
        ([key, value]) =>
          `${key}: ${(value?.message as string) || "Campo inválido"}`
      )
      .join("\n");

    toast({
      title: "Erros de validação",
      description: messages,
      variant: "destructive",
    });
  };

  // ⚡️ useWatch uma vez para pegar todos os valores
  const values = useWatch({ control });
  function safeSetValue<T extends FieldValues>(
    setValue: UseFormSetValue<T>,
    name: Path<T>,
    value: unknown
  ) {
    setValue(name, value as any);
  }
  // Agrupar em arrays de 3 campos
  const groupedFields = formFields.reduce<FormField<T>[][]>(
    (acc, curr, index) => {
      if (isEditing && curr.hiddenOnEdit) return acc;
      const groupIndex = Math.floor(index / 3);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(curr);
      return acc;
    },
    []
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4 bg-blue-500 p-4 rounded">
        <h1 className="text-xl font-bold text-gray-100">{title}</h1>
        <Button
          type="submit"
          className="w-sm bg-green-600 hover:bg-green-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditing
              ? "Salvando alterações..."
              : "Cadastrando..."
            : isEditing
            ? "Salvar Alterações"
            : "Cadastrar os Dados"}
        </Button>
      </div>

      <div className="max-w-8xl mx-auto p-6 bg-white rounded-md shadow">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {groupedFields.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {group.map((field) => {
                if (field.type === "select" && field.options) {
                  const selectedValue = values?.[field.name] as string;

                  return (
                    <div key={field.name} className="w-full">
                      {field.label && (
                        <label className="block text-sm font-medium mb-1">
                          {field.label}
                        </label>
                      )}
                      <Select
                        value={selectedValue}
                        onValueChange={(value) =>
                          safeSetValue(setValue, field.name as Path<T>, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }

                return (
                  <div key={field.name} className="w-full">
                    {field.label && (
                      <label className="block text-sm font-medium mb-1">
                        {field.label}
                      </label>
                    )}
                    <Input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      {...register(field.name)}
                      className={
                        errors[field.name] ? "border border-destructive " : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </form>
      </div>
    </>
  );
}
