export async function uploadFilesAction(formData: FormData) : Promise<{
    success: boolean,
    uploads: { 
        nome: string,
        tipo: "imagem" | "video" | "documento" | "",
        success: boolean,
        caminho: string,
        mensagem: string
    }[]
}> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/uploads`,
    {
        method: "POST",
        body: formData,
     
    })
    if (!response.ok) {
        console.log(await(response.text()))
        return {
            success: false,
            uploads: [{ nome: "", tipo: "", success: false, caminho: "", mensagem: "Erro ao fazer upload"}]
        }
    }
    const data = await response.json();
    return data
}