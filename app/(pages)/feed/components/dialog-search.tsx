import AvatarImageCustom from "@/components/comp-390";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DialogSearchProfissional({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
    return (<Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="max-w-3xl w-full">
            <div className="w-full flex flex-col gap-4 ">
                <h1 className="text-zinc-700 font-semibold">Pesquisar Professional</h1>
                <Separator />
                <Input
                    type="text"
                    placeholder="Pesquisar por nome, título, categoria..."
                    className="w-full md:w-full px-4 py-2 border rounded-xs shadow-sm    focus:outline-none"
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Categoria</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><AvatarImageCustom /></TableCell>
                            <TableCell>João Silva</TableCell>
                            <TableCell>Desenvolvedor Web</TableCell>
                            <TableCell>Tecnologia</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AvatarImageCustom /></TableCell>
                            <TableCell>João Silva</TableCell>
                            <TableCell>Desenvolvedor Web</TableCell>
                            <TableCell>Tecnologia</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AvatarImageCustom /></TableCell>
                            <TableCell>João Silva</TableCell>
                            <TableCell>Desenvolvedor Web</TableCell>
                            <TableCell>Tecnologia</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    </Dialog>
    )
}