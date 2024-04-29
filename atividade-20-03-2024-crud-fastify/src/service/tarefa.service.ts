import { Status } from "../domain/enums/status.enum";
import { Tarefa } from "../domain/interfaces/tarefa.interface";
import TarefaRepository from "../repository/tarefa.repository";

class TarefaService{
    private repository = TarefaRepository;
    constructor(){}

    async findAll(): Promise<Tarefa[]>{
        return await this.repository.findAll();
    }

    async findById(id: number): Promise<Tarefa>{
        return await this.repository.findById(id);
    }

    async create(tarefa: Tarefa): Promise<Tarefa>{
        return await this.repository.create(tarefa);
    }

    async update(id: number, tarefa: Tarefa): Promise<Tarefa>{
        return await this.repository.update(id, tarefa);
    }

    async delete(id: number): Promise<void>{
        await this.repository.delete(id); 
    }

    async findByCategoria(categoriaId: number): Promise<Tarefa[]>{
        let tarefas:Promise<Tarefa[]> = this.findAll();
        return (await tarefas).filter(t =>{return t.categoriaId === categoriaId}); 
    }

    async findByStatus(statusConclusao: Status): Promise<Tarefa[]>{
        let tarefas:Promise<Tarefa[]> = this.findAll();
        return this.filterByStatus(await tarefas, statusConclusao); 
    }

    async findByUsuario(usuarioId: number): Promise<Tarefa[]>{
        let tarefas:Promise<Tarefa[]> = this.findAll();
        return (await tarefas).filter(t =>{return t.usuarioId === usuarioId});  
    }

    async findCountByUsuario(usuarioId: number): Promise<number>{
        return ((await this.findByUsuario(usuarioId)).length); 
    }

    async findTarefasOrdenadaPelaData(usuarioId: number): Promise<Tarefa[]>{
        return ((await this.findByUsuario(usuarioId)).sort((a, b) => {
            return (b.dataCriacao.getTime()) - (a.dataCriacao.getTime())
        })); 
    }

    async findTarefaMaisRecente(usuarioId: number): Promise<Tarefa>{
        return (await this.findTarefasOrdenadaPelaData(usuarioId))[0];
    }

    async findTarefaMaisAntiga(usuarioId: number): Promise<Tarefa>{
        let tarefasOrdenadas = await this.findTarefasOrdenadaPelaData(usuarioId);
        return tarefasOrdenadas[tarefasOrdenadas.length-1]
    }

    async findTarefaAgruparPorCategoria(): Promise<Tarefa[]>{
        return ((await this.findAll()).sort((a, b) => {
            return b.categoriaId - a.categoriaId;
        })); 
    }

    async findVencerEm(dataInicio: Date, dataConclusao: Date): Promise<Tarefa[]>{
        let tarefas:Promise<Tarefa[]> = this.findAll();
        return (await tarefas).filter(t =>{return t.dataConclusao >= dataInicio && t.dataConclusao <= dataConclusao}); 
    }

    async findMaiorDescricao(): Promise<Tarefa>{
        let tarefas:Promise<Tarefa[]> = this.findAll();
        return (await tarefas).sort((a, b) => b.descricao.length - a.descricao.length)[0]; 
    }

    async mediaConclusaoTarefa(): Promise<number>{
        let tarefas:Tarefa[] = await this.findAll();
        return this.filterByStatus(tarefas, Status.CONCLUIDO).length/tarefas.length ; 
    }

    private filterByStatus(tarefas: Tarefa[], statusConclusao: Status): Tarefa[]{
        return tarefas.filter(t =>{return (t.status as Status) === statusConclusao})
    }
}

export default new TarefaService();