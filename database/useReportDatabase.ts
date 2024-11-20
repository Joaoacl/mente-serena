import { useSQLiteContext } from "expo-sqlite"
import { useAuth } from "../context/authContext"

export type ReportDatabase = {
    id: number
    report: string
    feelings: string
    date: string
    userId: string
    emotion: string
}

export function useReportDatabase(){
    const database = useSQLiteContext()
    const { user } = useAuth();

    async function create(data: Omit<ReportDatabase, "id">) {
        
        const statement = await database.prepareAsync(
            "INSERT INTO reports (report, feelings, date, userId, emotion) VALUES ($report, $feelings, $date, $userId, $emotion)"
        )

        console.log("Salvando no banco de dados:", data);

        try {
            const result = await statement.executeAsync({
                $report: data.report,
                $feelings: data.feelings,
                $date: data.date,
                $userId: data.userId,
                $emotion: data.emotion,
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function get() {
        try {
            const query = "SELECT * FROM reports ORDER BY id DESC"

            const response = await database.getAllAsync<ReportDatabase>(query)
            console.log("Dados recuperados:", response);
            return response
        } catch (error) {
            console.error('Erro ao obter relatos:', error);
            throw error
        }
    }

    {/* Recupera os relatos cadastrados por cada usuário */}
    async function getByUserId(userId: string) {
        const query = "SELECT * FROM reports WHERE userId = ? ORDER BY date DESC";
        try {
            const response = await database.getAllAsync<ReportDatabase>(query, [userId]);
            return response;
        } catch (error) {
            console.error('Erro ao buscar relatos pelo ID do usuário:', error);
            throw error;
        }
    }

    async function getById(id: number) {
        const query = "SELECT * FROM reports WHERE id = ?";
        try {
            const response = await database.getAllAsync<ReportDatabase>(query, [id]);
            console.log("Relato recuperado:", response);
            return response;
        } catch (error) {
            console.error('Erro ao obter o relato pelo ID:', error);
            throw error;
        }
    }
    
    

    async function deleteAll() {
        const statement = await database.prepareAsync("DELETE FROM reports");
        try {
            await statement.executeAsync();
            console.log("Todos os registros foram deletados.");
        } catch (error) {
            console.error('Erro ao deletar todos os registros:', error);
        } finally {
            await statement.finalizeAsync();
        }
    }
    
    
    return { create, get, deleteAll, getById, getByUserId }
}