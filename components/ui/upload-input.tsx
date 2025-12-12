import { Controller, Control } from "react-hook-form";
import { Paperclip, X } from "lucide-react";

interface UploadArquivosProps {
  name: string;
  control: Control<any>;
}

export default function UploadInput({ name, control }: UploadArquivosProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            const novosArquivos = Array.from(e.target.files);
            const maxSize = 2 * 1024 * 1024; // 2MB
            const invalidFiles = novosArquivos.filter(file => file.size > maxSize);

            if (invalidFiles.length > 0) {
              alert(`Alguns arquivos excedem 2MB:\n${invalidFiles.map(f => f.name).join('\n')}`);
              e.target.value = '';
              return; // <- Impede que os arquivos inválidos sejam adicionados
            }

            // Todos os arquivos são válidos
            console.log("Arquivos válidos:", novosArquivos);
            onChange([...(value || []), ...novosArquivos]);
          }
        };

        const removerDocumento = (index: number) => {
          const atualizados = value.filter((_: File, i: number) => i !== index);
          onChange(atualizados);
        };

        return (
          <div className="space-y-2">
            {/* Botão de adicionar documentos */}
            <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline">
              <Paperclip className="w-5 h-5" />
              <span>Adicionar documentos</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpeg, .png"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Lista de arquivos */}
            {value.length > 0 && (
              <ul className="space-y-1">
                {value.map((arquivo: File, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md text-sm"
                  >
                    <span className="truncate max-w-[80%]">{arquivo.name}</span>
                    <button
                      type="button"
                      onClick={() => removerDocumento(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    />
  );
}
